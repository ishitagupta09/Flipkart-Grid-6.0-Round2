import os
import cv2
import easyocr

# Initialize the easyOCR reader
reader = easyocr.Reader(['en'])  # English language

def extract_label_details(image_path):
    try:
        # Load the image
        image = cv2.imread(image_path)
        if image is None:
            raise FileNotFoundError(f"Could not find the image: {image_path}")

        # Use easyocr to extract text from the image
        result = reader.readtext(image)

        extracted_text = []
        for detection in result:
            text = detection[1]
            confidence = detection[2]

            # Only consider non-empty text
            if text.strip():
                extracted_text.append({
                    'text': text,
                    'confidence': confidence
                })

        return extracted_text

    except Exception as e:
        print(f"Error during OCR processing: {e}")
        return None

if __name__ == "__main__":
    # Folder containing images
    image_folder = r"C:\Users\HP\Desktop\ML_Flipkart_UseCases\dataset"  # Replace with your folder path
    for file_name in os.listdir(image_folder):
        # Full path to the image
        image_path = os.path.join(image_folder, file_name)
        
        # Check if the file is an image (you can extend this for more formats)
        if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
            print(f"Processing image: {file_name}")
            label_details = extract_label_details(image_path)
            
            # Display the results
            if label_details:
                print("Extracted Details:")
                for item in label_details:
                    print(f"Text: {item['text']}, Confidence: {item['confidence']}")
            else:
                print("No details extracted.")

