import cv2

cap = cv2.VideoCapture(1)
if not cap.isOpened():
    print("Error: Could not access the camera.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture frame.")
        break

    # Save each frame to a specific location
    cv2.imwrite("frames/frame.jpg", frame)

    # Optionally display the feed
    cv2.imshow("DroidCam Feed", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()



