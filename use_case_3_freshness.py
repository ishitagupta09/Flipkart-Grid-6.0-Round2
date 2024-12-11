import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.image import img_to_array

# Load the trained model for freshness detection
model = keras.models.load_model('freshness_model.h5')  # Path to your trained model

def predict_freshness(image_path):
    try:
        # Load the image
        image = cv2.imread(image_path)
        if image is None:
            raise FileNotFoundError(f"Could not find the image: {image_path}")

        # Resize the image to the required input size for the model
        image = cv2.resize(image, (224, 224))  # Adjust based on your model's input size
        image = img_to_array(image) / 255.0  # Normalize the image
        image = np.expand_dims(image, axis=0)  # Add batch dimension

        # Predict the freshness
        prediction = model.predict(image)

        # Assuming a binary classification model (Fresh, Not Fresh)
        if prediction[0][0] > 0.5:
            result = "Fresh"
        else:
            result = "Not Fresh"

        return result

    except Exception as e:
        print(f"Error during freshness detection: {e}")
        return None

if __name__ == "__main__":
    # Folder containing images
    image_folder = r"D:\Desktop\Final Project\Final Project\dataset"  # Replace with your folder path
    for file_name in os.listdir(image_folder):
        # Full path to the image
        image_path = os.path.join(image_folder, file_name)

        # Check if the file is an image
        if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
            print(f"Processing image: {file_name}")
            freshness_result = predict_freshness(image_path)

            # Display the results
            print(f"Freshness Result: {freshness_result}")
