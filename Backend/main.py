from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from typing import Optional
import uvicorn

from youtube import YoutubeClient
from search import YoutubeSearch
from config import YOUTUBE_API_KEY, GEMINI_API_KEY

app = FastAPI(
    title="JumpTube API",
    description="YouTube search and in-video prompt search",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # set your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

yt_client = YoutubeClient(YOUTUBE_API_KEY)
yt_search = YoutubeSearch(apikey=YOUTUBE_API_KEY, api_key=GEMINI_API_KEY)

class VideoInfo(BaseModel):
    video_id: str
    title: str
    description: str
    url: str

class SearchResponse(BaseModel):
    query: str
    results: List[VideoInfo]
    total_results: int

class InVideoSearchRequest(BaseModel):
    video_url: str
    prompt: str
    top_k: Optional[int] = 5

class InVideoMatch(BaseModel):
    time: str
    seconds: str
    text: str
    url: str

class InVideoSearchResponse(BaseModel):
    video_url: str
    prompt: str
    matches: List[InVideoMatch]

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/api/search", response_model=SearchResponse)
async def search_videos(
    query: str = Query(..., description="Search term for YouTube videos"),
    max_results: int = Query(20, description="Maximum number of results")
):
    try:
        if not query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        videos = yt_client.search(query, max_results)
        items: List[VideoInfo] = []
        for v in videos:
            items.append(VideoInfo(
                video_id=v["video_id"],
                title=v["title"],
                description=v["description"],
                url=f"https://youtu.be/{v['video_id']}"
            ))
        return SearchResponse(query=query, results=items, total_results=len(items))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")

@app.post("/api/invideo-search", response_model=InVideoSearchResponse)
async def invideo_search(payload: InVideoSearchRequest):
    try:
        if not payload.video_url.strip():
            raise HTTPException(status_code=400, detail="video_url is required")
        if not payload.prompt.strip():
            raise HTTPException(status_code=400, detail="prompt is required")
        matches = yt_search.search_timestamps(payload.video_url, payload.prompt, top_k=payload.top_k or 5)
        return InVideoSearchResponse(
            video_url=payload.video_url,
            prompt=payload.prompt,
            matches=[InVideoMatch(**m) for m in matches]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"In-video search failed: {e}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)