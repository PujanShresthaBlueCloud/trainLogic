"""API for managing and querying call records."""

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

router = APIRouter()

# In-memory store (replace with a real database in production)
calls_db: dict[str, dict] = {}


class CallCreate(BaseModel):
    agent_id: str
    direction: str = "inbound"  # inbound | outbound
    caller_number: str = ""
    metadata: dict = {}


@router.post("")
async def create_call(body: CallCreate):
    """Register a new call record (typically called when a WebSocket session starts)."""
    call_id = str(uuid.uuid4())
    call = {
        "id": call_id,
        **body.model_dump(),
        "status": "in_progress",
        "started_at": datetime.now(timezone.utc).isoformat(),
        "ended_at": None,
        "duration_seconds": None,
        "transcript": [],
        "summary": None,
    }
    calls_db[call_id] = call
    return call


@router.get("")
async def list_calls(
    agent_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
    limit: int = Query(default=50, le=200),
    offset: int = Query(default=0, ge=0),
):
    """List call records with optional filters."""
    results = list(calls_db.values())
    if agent_id:
        results = [c for c in results if c["agent_id"] == agent_id]
    if status:
        results = [c for c in results if c["status"] == status]

    # Sort by most recent first
    results.sort(key=lambda c: c["started_at"], reverse=True)
    return {"total": len(results), "calls": results[offset : offset + limit]}


@router.get("/{call_id}")
async def get_call(call_id: str):
    call = calls_db.get(call_id)
    if not call:
        raise HTTPException(status_code=404, detail="Call not found")
    return call


@router.patch("/{call_id}/end")
async def end_call(call_id: str):
    """Mark a call as ended and compute duration."""
    call = calls_db.get(call_id)
    if not call:
        raise HTTPException(status_code=404, detail="Call not found")

    now = datetime.now(timezone.utc)
    started = datetime.fromisoformat(call["started_at"])
    call["ended_at"] = now.isoformat()
    call["duration_seconds"] = round((now - started).total_seconds())
    call["status"] = "completed"
    return call


@router.post("/{call_id}/transcript")
async def append_transcript(call_id: str, entry: dict):
    """Append a transcript entry to a call."""
    call = calls_db.get(call_id)
    if not call:
        raise HTTPException(status_code=404, detail="Call not found")

    call["transcript"].append(
        {
            "role": entry.get("role", "user"),
            "text": entry.get("text", ""),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    )
    return {"status": "ok", "transcript_length": len(call["transcript"])}
