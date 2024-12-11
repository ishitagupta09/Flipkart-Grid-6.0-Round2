import cv2
import base64
import asyncio
import websockets

async def stream_video(websocket, path):
    cap = cv2.VideoCapture(1)
    if not cap.isOpened():
        print("Error: Could not access the camera.")
        return

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Error: Failed to capture frame.")
                break

            _, buffer = cv2.imencode('.jpg', frame)
            frame_base64 = base64.b64encode(buffer).decode('utf-8')
            await websocket.send(frame_base64)
            await asyncio.sleep(0.1)
    except Exception as e:
        print(f"Error during video streaming: {e}")
    finally:
        cap.release()

start_server = websockets.serve(stream_video, "localhost", 8000)

print("WebSocket server running on ws://localhost:8000")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

