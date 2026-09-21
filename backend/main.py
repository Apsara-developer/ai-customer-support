from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = FastAPI(title="AI Customer Support API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SupportRequest(BaseModel):
    name: str
    email: EmailStr
    order_id: str
    message: str

@app.get("/")
def home():
    return {"message": "AI Customer Support Backend is running"}

@app.post("/api/support")
def submit_support(request: SupportRequest):
    n8n_url = os.getenv("N8N_WEBHOOK_URL")

    if not n8n_url:
        raise HTTPException(status_code=500, detail="N8N_WEBHOOK_URL is missing")

    data = {
        "name": request.name,
        "email": request.email,
        "order_id": request.order_id,
        "message": request.message
    }

    try:
        response = requests.post(n8n_url, json=data, timeout=60)

        if response.status_code >= 400:
            raise HTTPException(status_code=500, detail="n8n workflow failed")

        try:
            result = response.json()
        except Exception:
            result = {"message": response.text}

        return {"success": True, "result": result}

    except requests.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not connect to n8n: {str(e)}"
        )