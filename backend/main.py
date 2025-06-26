from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class TranscriptRequest(BaseModel):
    url: str

class TranscriptResponse(BaseModel):
    transcript: list[str]

@app.get("/")
def read_root():
    return {"message": "YouTube Transcript API Backend is running."}

@app.post("/transcript", response_model=TranscriptResponse)
def get_transcript(request: TranscriptRequest):
    # Placeholder: In the future, call youtube-transcript-api here
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required.")
    return {"transcript": ["This is a placeholder transcript."]} 