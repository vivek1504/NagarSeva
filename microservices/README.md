# 🤖 NagarSeva — AI Microservices (Pothole Detection)

A **FastAPI** microservice that runs **YOLOv8** (Ultralytics) for real-time **pothole detection** on images and videos. It provides endpoints for detection with JSON reports, annotated image/video output, and health checks.

---

## 🗂️ Folder Structure

```
microservices/
├── app.py              # FastAPI application — all endpoints
├── model/
│   └── temp.pt         # YOLOv8 model weights (custom-trained)
├── requirements.txt    # Python dependencies
└── test.py             # Test script for all endpoints
```

---

## 🔌 API Endpoints

| Method | Endpoint | Input | Output | Description |
|---|---|---|---|---|
| `POST` | `/detect` | Image file | JSON | Returns detection results (bounding boxes, confidence, class) |
| `POST` | `/detect_with_visualization` | Image file | JPEG image | Returns the annotated image with detection boxes drawn |
| `POST` | `/detect_video_report` | Video file | JSON | Processes video (1 frame / 3 sec), returns pothole count & severity |
| `POST` | `/detect_video_file` | Video file | MP4 video | Returns annotated video with detections drawn on sampled frames |
| `GET` | `/health` | — | JSON | Health check — returns model load status |

### Example Responses

#### `POST /detect`
```json
{
  "filename": "road.jpg",
  "total_potholes": 3,
  "detections": [
    {
      "confidence": 0.892,
      "bbox": [120.5, 230.1, 340.8, 410.6],
      "class": "pothole"
    }
  ]
}
```

#### `POST /detect_video_report`
```json
{
  "summary": {
    "potholes_detected": 12,
    "severity": "CRITICAL",
    "video_duration_approx_sec": 45.3
  }
}
```

### Severity Scale
| Potholes Detected | Severity |
|---|---|
| 0 | `LOW` |
| 1–5 | `MEDIUM` |
| 6–10 | `HIGH` |
| 11+ | `CRITICAL` |

---

## 🧠 Model Details

- **Architecture**: YOLOv8 (Ultralytics)
- **Framework**: PyTorch
- **Model file**: `model/temp.pt`
- **Input**: RGB images / video frames
- **Output**: Bounding boxes with class labels and confidence scores
- **Video optimization**: Processes 1 frame every 3 seconds to reduce computation

---

## 🚀 Local Setup

### Prerequisites
- Python ≥ 3.10
- pip

### Steps

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Ensure model file exists
ls model/temp.pt   # Should exist (YOLOv8 weights)

# 3. Start the server
python app.py
# Server starts on http://localhost:7860
```

### Configuration

| Variable | Default | Description |
|---|---|---|
| `PORT` | `7860` | Server port (via environment variable) |

---

## 🧪 Testing

A test script is included that hits all endpoints:

```bash
# Place test.jpg and test.mp4 in the microservices/ directory, then run:
python test.py
```

The test script covers:
1. `/health` — Health check
2. `/detect` — Image detection (JSON)
3. `/detect_with_visualization` — Image detection (annotated image)
4. `/detect_video_report` — Video detection (JSON report)
5. `/detect_video_file` — Video detection (annotated video)

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `fastapi` | Web framework |
| `uvicorn` (via FastAPI) | ASGI server |
| `torch` / `torchvision` | PyTorch deep learning |
| `ultralytics` | YOLOv8 model loading & inference |
| `opencv-python` | Image/video processing |
| `numpy` | Numerical operations |
| `starlette` | Background tasks (temp file cleanup) |

---

## ⚠️ Notes

- The model file (`model/temp.pt`) must be a valid YOLOv8-compatible `.pt` weights file.
- Video processing can be CPU-intensive. GPU acceleration (CUDA) is recommended for production.
- Temporary files are automatically cleaned up after responses are sent.
- CORS is enabled for all origins (`allow_origins=['*']`).
