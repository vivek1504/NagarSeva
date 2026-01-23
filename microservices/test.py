import requests

BASE_URL = "http://127.0.0.1:7860"

IMAGE_PATH = "test.jpg"
VIDEO_PATH = "test.mp4"


def test_health():
    print("\n[TEST] /health")
    r = requests.get(f"{BASE_URL}/health")
    print("Status:", r.status_code)
    print("Response:", r.json())


def test_detect_image():
    print("\n[TEST] /detect (image)")
    with open(IMAGE_PATH, "rb") as f:
        r = requests.post(
            f"{BASE_URL}/detect",
            files={"file": ("test.jpg", f, "image/jpeg")}
        )
    print("Status:", r.status_code)
    print("Response:", r.json())


def test_detect_image_visual():
    print("\n[TEST] /detect_with_visualization")
    with open(IMAGE_PATH, "rb") as f:
        r = requests.post(
            f"{BASE_URL}/detect_with_visualization",
            files={"file": ("test.jpg", f, "image/jpeg")}
        )

    if r.status_code == 200:
        with open("output_image.jpg", "wb") as out:
            out.write(r.content)
        print("Annotated image saved as output_image.jpg")
    else:
        print("Error:", r.text)


def test_video_report():
    print("\n[TEST] /detect_video_report")
    with open(VIDEO_PATH, "rb") as f:
        r = requests.post(
            f"{BASE_URL}/detect_video_report",
            files={"file": ("test.mp4", f, "video/mp4")}
        )
    print("Status:", r.status_code)
    print("Response:", r.json())


def test_video_file():
    print("\n[TEST] /detect_video_file")
    with open(VIDEO_PATH, "rb") as f:
        r = requests.post(
            f"{BASE_URL}/detect_video_file",
            files={"file": ("test.mp4", f, "video/mp4")}
        )

    if r.status_code == 200:
        with open("annotated_video.mp4", "wb") as out:
            out.write(r.content)
        print("Annotated video saved as annotated_video.mp4")
    else:
        print("Error:", r.text)


if __name__ == "__main__":
    test_health()
    test_detect_image()
    test_detect_image_visual()
    test_video_report()
    test_video_file()
