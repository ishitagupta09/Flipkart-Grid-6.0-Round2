import os
import cv2
import pytesseract
from tensorflow import keras
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np

# Load pre-trained brand recognition model
model = keras.models.load_model('brand_recognition_model.h5')  # Path to your trained model

def predict_brand(image_path):
    try:
        # Load the image
        image = cv2.imread(image_path)
        if image is None:
            raise FileNotFoundError(f"Could not find the image: {image_path}")

        # Preprocess the image
        image = cv2.resize(image, (224, 224))  # Adjust based on your model's input size
        image = img_to_array(image) / 255.0  # Normalize the image
        image = np.expand_dims(image, axis=0)  # Add batch dimension

        # Predict the brand
        prediction = model.predict(image)

        # Output predicted brand (assuming multi-class classification)
        brand = np.argmax(prediction)  # If your model outputs one-hot encoded labels
        return brand

    except Exception as e:
        print(f"Error during brand recognition: {e}")
        return None

if __name__ == "__main__":
    # Folder containing images
    image_folder = r"C:\Users\HP\Desktop\ML_Flipkart_UseCases\dataset"  # Replace with your folder path
    for file_name in os.listdir(image_folder):
        # Full path to the image
        image_path = os.path.join(image_folder, file_name)
        
        # Check if the file is an image
        if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
            print(f"Processing image: {file_name}")
            brand = predict_brand(image_path)
            
            # Display the results
            print(f"Predicted Brand: {brand}")
