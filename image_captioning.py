from fastapi import FastAPI, UploadFile
from PIL import Image
from io import BytesIO
from transformers import pipeline
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add the origin of your React app
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.post("/model1")
async def image_to_text_model1(file: UploadFile):
    model_id = "nlpconnect/vit-gpt2-image-captioning"
    image_to_text = pipeline("image-to-text", model=model_id)
    
    # Read the file content as bytes
    file_content = await file.read()
    
    # Convert the bytes to a PIL image
    pil_image = Image.open(BytesIO(file_content))
    
    # Perform image-to-text processing
    result = image_to_text(pil_image)
    
    return result[0]["generated_text"]

@app.post("/model2")
async def image_to_text_model2(file: UploadFile):
    model_id = "Salesforce/blip-image-captioning-base"
    image_to_text = pipeline("image-to-text", model=model_id)
    
    # Read the file content as bytes
    file_content = await file.read()
    
    # Convert the bytes to a PIL image
    pil_image = Image.open(BytesIO(file_content))
    
    # Perform image-to-text processing
    result = image_to_text(pil_image)
    
    return result[0]["generated_text"]

@app.post("/model3")
async def image_to_text_model3(file: UploadFile):
    model_id = "ydshieh/vit-gpt2-coco-en"
    image_to_text = pipeline("image-to-text", model=model_id)
    
    # Read the file content as bytes
    file_content = await file.read()
    
    # Convert the bytes to a PIL image
    pil_image = Image.open(BytesIO(file_content))
    
    # Perform image-to-text processing
    result = image_to_text(pil_image)
    
    return result[0]["generated_text"]



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)