"""Text-to-Speech module using ElevenLabs for streaming audio synthesis."""

import logging
from typing import AsyncGenerator

import httpx

from app.config import config

logger = logging.getLogger(__name__)

ELEVENLABS_STREAM_URL = "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream"


class TextToSpeech:
    """Converts text to audio bytes using the ElevenLabs streaming API."""

    def __init__(
        self,
        voice_id: str | None = None,
        model_id: str = "eleven_turbo_v2",
        output_format: str = "pcm_16000",
    ):
        self.voice_id = voice_id or config.elevenlabs_voice_id
        self.model_id = model_id
        self.output_format = output_format
        self._client = httpx.AsyncClient(timeout=30.0)

    async def synthesize_stream(self, text: str) -> AsyncGenerator[bytes, None]:
        """Stream audio bytes for a given text string."""
        url = ELEVENLABS_STREAM_URL.format(voice_id=self.voice_id)
        headers = {
            "xi-api-key": config.elevenlabs_api_key,
            "Content-Type": "application/json",
        }
        payload = {
            "text": text,
            "model_id": self.model_id,
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75,
                "speed": 1.0,
            },
            "output_format": self.output_format,
        }

        async with self._client.stream(
            "POST", url, json=payload, headers=headers
        ) as response:
            if response.status_code != 200:
                body = await response.aread()
                logger.error("TTS error %s: %s", response.status_code, body)
                return
            async for chunk in response.aiter_bytes(chunk_size=4096):
                yield chunk

    async def synthesize_full(self, text: str) -> bytes:
        """Return complete audio bytes for a text string."""
        audio_chunks: list[bytes] = []
        async for chunk in self.synthesize_stream(text):
            audio_chunks.append(chunk)
        return b"".join(audio_chunks)

    async def close(self) -> None:
        await self._client.aclose()
