import os
import cv2
import pytesseract
from pytesseract import Output

# Ensure pytesseract is pointing to the correct Tesseract OCR executable path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_expiry_date(image_path):
    try:
        # Load the image
        image = cv2.imread(image_path)
        if image is None:
            raise FileNotFoundError(f"Could not find the image: {image_path}")

        # Convert to grayscale for better OCR performance
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Apply Gaussian blur to reduce noise
        blurred_image = cv2.GaussianBlur(gray_image, (5, 5), 0)

        # Perform OCR to extract text
        ocr_data = pytesseract.image_to_data(blurred_image, output_type=Output.DICT)

        # Extract expiry date-related text
        expiry_text = []
        for i, text in enumerate(ocr_data['text']):
            if text.lower().find("exp") != -1 or text.lower().find("expiry") != -1:
                expiry_text.append({
                    'text': text,
                    'confidence': ocr_data['conf'][i]
                })

        return expiry_text

    except Exception as e:
        print(f"Error during OCR processing: {e}")
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
            expiry_details = extract_expiry_date(image_path)
            
            # Display the results
            if expiry_details:
                print("Extracted Expiry Date Details:")
                for item in expiry_details:
                    print(f"Text: {item['text']}, Confidence: {item['confidence']}")
            else:
                print("No expiry details extracted.")
