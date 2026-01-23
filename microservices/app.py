from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse, JSONResponse
import torch
import cv2
import numpy as np
import io
import os
import tempfile
import logging
from typing import Dict, Any, List
from pathlib import Path
from ultralytics import YOLO
from starlette.background import BackgroundTasks

# --- Configuration ---
PORT = int(os.environ.get("PORT", 7860))
BASE_DIR = Path(__file__).parent
MODEL_PATH = BASE_DIR / 'model' / 'temp.pt'

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title='Pothole Detection AI Pro', version='3.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Model Loading ---
model = None
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        try:
            model = YOLO(MODEL_PATH)
            logger.info("Custom Model Loaded Successfully.")
            return True
        except Exception as e:
            logger.error(f"Error loading model: {e}")
    return False

model_ready = load_model()

def cleanup_file(path: str):
    """Removes temporary files after response is sent."""
    if os.path.exists(path):
        os.remove(path)
        logger.info(f"Cleaned up temp file: {path}")

# --- 1. Image Endpoints ---

@app.post('/detect')
async def detect_image(file: UploadFile = File(...)):
    if not model: raise HTTPException(503, "Model not loaded")
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    results = model(img, verbose=False)
    detections = []
    for r in results:
        for box in r.boxes:
            detections.append({
                "confidence": round(float(box.conf[0]), 3),
                "bbox": box.xyxy[0].tolist(),
                "class": r.names[int(box.cls[0])]
            })
    return {"filename": file.filename, "total_potholes": len(detections), "detections": detections}

@app.post('/detect_with_visualization')
async def visualize_image(file: UploadFile = File(...)):
    if not model: raise HTTPException(503, "Model not loaded")
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    results = model(img, verbose=False)
    _, buffer = cv2.imencode('.jpg', results[0].plot())
    return StreamingResponse(io.BytesIO(buffer), media_type="image/jpeg")

# --- 2. Video Endpoints (Optimized) ---

@app.post('/detect_video_report')
async def detect_video_report(file: UploadFile = File(...)):
    """JSON Report: Processes 1 frame every 3 seconds for speed."""
    if not model: raise HTTPException(503, "Model not loaded")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    cap = cv2.VideoCapture(tmp_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    skip_interval = int(fps * 3) # Frame skip for 3-second intervals
    
    total_found = 0
    frame_count = 0
    
    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret: break
            if frame_count % skip_interval == 0:
                res = model(frame, verbose=False)
                total_found += len(res[0].boxes)
            frame_count += 1
            
        severity = "CRITICAL" if total_found > 10 else "HIGH" if total_found > 5 else "MEDIUM" if total_found > 0 else "LOW"
        return {
            "summary": {
                "potholes_detected": total_found,
                "severity": severity,
                "video_duration_approx_sec": round(frame_count / fps, 2)
            }
        }
    finally:
        cap.release()
        os.remove(tmp_path)

@app.post('/detect_video_file')
async def detect_video_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Returns the actual annotated video file (1 frame per 3 seconds)."""
    if not model: raise HTTPException(503, "Model not loaded")

    # Save Uploaded Video
    input_suffix = Path(file.filename).suffix
    with tempfile.NamedTemporaryFile(delete=False, suffix=input_suffix) as tmp_in:
        tmp_in.write(await file.read())
        input_path = tmp_in.name

    # Setup Reader
    cap = cv2.VideoCapture(input_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    skip_interval = int(fps * 3)

    # Setup Writer (Outputting at 1 FPS so the 3-sec samples are viewable)
    output_path = tempfile.mktemp(suffix=".mp4")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, 1.0, (width, height))

    try:
        f_idx = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret: break
            
            if f_idx % skip_interval == 0:
                results = model(frame, verbose=False)
                annotated = results[0].plot()
                out.write(annotated)
            f_idx += 1
    finally:
        cap.release()
        out.release()
        os.remove(input_path)

    # Schedule deletion of the result after sending
    background_tasks.add_task(cleanup_file, output_path)
    
    return FileResponse(
        output_path, 
        media_type="video/mp4", 
        filename=f"annotated_{file.filename}"
    )

# --- 3. System Routes ---

@app.get('/health')
async def health():
    return {"status": "ok", "model_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)