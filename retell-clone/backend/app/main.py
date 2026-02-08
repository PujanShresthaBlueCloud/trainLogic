"""Main FastAPI application entry point."""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import config
from app.api.agents import router as agents_router
from app.api.calls import router as calls_router
from app.voice.websocket import router as ws_router

app = FastAPI(
    title="Retell AI Clone",
    description="Open-source voice AI agent platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REST API routes
app.include_router(agents_router, prefix="/api/agents", tags=["agents"])
app.include_router(calls_router, prefix="/api/calls", tags=["calls"])

# WebSocket route for real-time voice
app.include_router(ws_router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host=config.host, port=config.port, reload=True)
