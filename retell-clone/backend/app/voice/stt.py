"""Speech-to-Text module using Deepgram for real-time transcription."""

import asyncio
import json
import logging
from typing import AsyncGenerator, Callable

import websockets

from app.config import config

logger = logging.getLogger(__name__)

DEEPGRAM_WS_URL = "wss://api.deepgram.com/v1/listen"


class SpeechToText:
    """Streams audio bytes to Deepgram and yields transcript strings."""

    def __init__(
        self,
        on_transcript: Callable[[str, bool], None] | None = None,
        language: str = "en-US",
        sample_rate: int = 16000,
    ):
        self.on_transcript = on_transcript
        self.language = language
        self.sample_rate = sample_rate
        self._ws: websockets.WebSocketClientProtocol | None = None
        self._running = False

    async def connect(self) -> None:
        params = (
            f"?encoding=linear16&sample_rate={self.sample_rate}"
            f"&channels=1&language={self.language}"
            f"&punctuate=true&interim_results=true&endpointing=300"
        )
        headers = {"Authorization": f"Token {config.deepgram_api_key}"}
        self._ws = await websockets.connect(
            DEEPGRAM_WS_URL + params, extra_headers=headers
        )
        self._running = True
        logger.info("STT connected to Deepgram")

    async def send_audio(self, audio_chunk: bytes) -> None:
        if self._ws and self._running:
            await self._ws.send(audio_chunk)

    async def receive_transcripts(self) -> AsyncGenerator[tuple[str, bool], None]:
        """Yields (transcript_text, is_final) tuples."""
        if not self._ws:
            return
        try:
            async for message in self._ws:
                data = json.loads(message)
                transcript = (
                    data.get("channel", {})
                    .get("alternatives", [{}])[0]
                    .get("transcript", "")
                )
                is_final = data.get("is_final", False)
                if transcript:
                    if self.on_transcript:
                        self.on_transcript(transcript, is_final)
                    yield transcript, is_final
        except websockets.exceptions.ConnectionClosed:
            logger.info("STT websocket closed")

    async def close(self) -> None:
        self._running = False
        if self._ws:
            await self._ws.send(json.dumps({"type": "CloseStream"}))
            await self._ws.close()
            logger.info("STT connection closed")
