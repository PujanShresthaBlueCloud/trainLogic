"""WebSocket endpoint for real-time voice communication."""

import asyncio
import json
import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query

from app.voice.session import VoiceSession

logger = logging.getLogger(__name__)
router = APIRouter()

# In-memory session store (swap for Redis/DB in production)
active_sessions: dict[str, VoiceSession] = {}


@router.websocket("/ws/voice")
async def voice_websocket(
    websocket: WebSocket,
    agent_id: str = Query(default="default"),
    system_prompt: str = Query(default=""),
    voice_id: str = Query(default=None),
):
    """Bidirectional WebSocket for a voice call.

    Protocol:
        Client -> Server:
            - Binary frames: raw PCM audio (16-bit, 16 kHz, mono)
            - Text frames: JSON control messages
                {"type": "end"} — end the session

        Server -> Client:
            - Binary frames: synthesized PCM audio
            - Text frames: JSON status messages
                {"type": "state", "state": "listening"|"thinking"|"speaking"|"ended"}
                {"type": "transcript", "text": "...", "is_final": true|false}
    """
    await websocket.accept()

    session = VoiceSession(agent_id=agent_id)

    async def _send_audio(data: bytes) -> None:
        try:
            await websocket.send_bytes(data)
        except Exception:
            pass

    async def _send_state(state: str) -> None:
        try:
            await websocket.send_text(json.dumps({"type": "state", "state": state}))
        except Exception:
            pass

    session.send_audio = _send_audio
    session.send_state = _send_state

    await session.setup(system_prompt=system_prompt, voice_id=voice_id)
    active_sessions[session.session_id] = session

    logger.info("Voice session started: %s (agent=%s)", session.session_id, agent_id)
    await websocket.send_text(
        json.dumps({"type": "session_start", "session_id": session.session_id})
    )

    try:
        while True:
            message = await websocket.receive()

            if message.get("bytes"):
                await session.receive_audio(message["bytes"])

            elif message.get("text"):
                data = json.loads(message["text"])
                if data.get("type") == "end":
                    break

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected: %s", session.session_id)
    except Exception:
        logger.exception("WebSocket error in session %s", session.session_id)
    finally:
        summary = await session.end()
        active_sessions.pop(session.session_id, None)
        logger.info("Voice session ended: %s", session.session_id)
        try:
            await websocket.send_text(json.dumps({"type": "session_end", **summary}))
        except Exception:
            pass
