# 🧠 NagarSeva — Pre-trained Model Weights

This directory contains pre-trained **YOLOv8** model weights used by the AI microservices for civic issue detection.

---

## 📁 Files

| File | Size | Description |
|---|---|---|
| `pothole.pt` | ~133 B (placeholder) | YOLOv8 weights trained for pothole detection |
| `garbage.pt` | ~133 B (placeholder) | YOLOv8 weights trained for garbage detection |

> **Note**: The current `.pt` files are placeholders. Replace them with your actual trained model weights for real inference.

---

## 🏗️ Training

These models are expected to be trained using [Ultralytics YOLOv8](https://docs.ultralytics.com/):

```bash
# Example training command
yolo detect train data=pothole-dataset.yaml model=yolov8n.pt epochs=100 imgsz=640
```

### Expected Dataset Format

YOLOv8 expects datasets in the following structure:

```
dataset/
├── train/
│   ├── images/
│   └── labels/
├── val/
│   ├── images/
│   └── labels/
└── data.yaml
```

---

## 🔗 Usage

The `microservices/app.py` loads the model from `microservices/model/temp.pt`. To use these weights instead:

1. Copy the desired `.pt` file to `microservices/model/temp.pt`
2. Restart the microservices server

```bash
cp models/pothole.pt microservices/model/temp.pt
```

---

## ⚠️ Important

- Model weights should **NOT** be committed to git if they are large (>100 MB). Use [Git LFS](https://git-lfs.github.com/) for large model files.
- Ensure the model architecture matches what `ultralytics.YOLO()` expects.
