"""Voice session orchestrator — ties STT, LLM, and TTS into a single pipeline."""

import asyncio
import logging
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Callable

from app.voice.stt import SpeechToText
from app.voice.llm import LLMEngine
from app.voice.tts import TextToSpeech

logger = logging.getLogger(__name__)


class SessionState(str, Enum):
    IDLE = "idle"
    LISTENING = "listening"
    THINKING = "thinking"
    SPEAKING = "speaking"
    ENDED = "ended"


@dataclass
class VoiceSession:
    """Manages a single voice call session.

    Flow:
        Client audio -> STT -> LLM -> TTS -> audio back to client
    """

    session_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    agent_id: str = ""
    state: SessionState = SessionState.IDLE
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    # Pipeline components (initialized via setup())
    stt: SpeechToText | None = None
    llm: LLMEngine | None = None
    tts: TextToSpeech | None = None

    # Callback to send audio bytes back to the client websocket
    send_audio: Callable[[bytes], None] | None = None
    send_state: Callable[[str], None] | None = None

    # Internal
    _transcript_task: asyncio.Task | None = None
    _interrupt_event: asyncio.Event = field(default_factory=asyncio.Event)

    async def setup(
        self,
        system_prompt: str = "",
        voice_id: str | None = None,
    ) -> None:
        """Initialize STT, LLM, and TTS components."""
        self.stt = SpeechToText()
        self.llm = LLMEngine(system_prompt=system_prompt) if system_prompt else LLMEngine()
        self.tts = TextToSpeech(voice_id=voice_id) if voice_id else TextToSpeech()

        await self.stt.connect()
        self.state = SessionState.LISTENING

        # Start background transcript processing
        self._transcript_task = asyncio.create_task(self._process_transcripts())

    async def receive_audio(self, audio_bytes: bytes) -> None:
        """Forward incoming audio from the client to STT."""
        if self.stt and self.state != SessionState.ENDED:
            # If we're currently speaking and user talks, treat as interrupt
            if self.state == SessionState.SPEAKING:
                self._interrupt_event.set()
            await self.stt.send_audio(audio_bytes)

    async def _process_transcripts(self) -> None:
        """Background loop: read STT transcripts, send to LLM, then TTS."""
        if not self.stt:
            return

        async for transcript, is_final in self.stt.receive_transcripts():
            if not is_final:
                continue  # Only act on final transcripts

            logger.info("[%s] User said: %s", self.session_id, transcript)
            await self._respond(transcript)

    async def _respond(self, user_text: str) -> None:
        """Generate an LLM response and stream TTS audio back."""
        if not self.llm or not self.tts or not self.send_audio:
            return

        self._interrupt_event.clear()
        self.state = SessionState.THINKING
        if self.send_state:
            await self.send_state(self.state.value)

        # Accumulate tokens into sentence-sized chunks for TTS
        buffer = ""
        sentence_delimiters = {".", "!", "?", "\n"}

        self.state = SessionState.SPEAKING
        if self.send_state:
            await self.send_state(self.state.value)

        async for token in self.llm.generate_response(user_text):
            if self._interrupt_event.is_set():
                logger.info("[%s] Interrupted by user", self.session_id)
                break

            buffer += token
            # Flush buffer when we hit a sentence boundary
            if any(buffer.rstrip().endswith(d) for d in sentence_delimiters):
                await self._speak(buffer.strip())
                buffer = ""

        # Flush remaining buffer
        if buffer.strip() and not self._interrupt_event.is_set():
            await self._speak(buffer.strip())

        self.state = SessionState.LISTENING
        if self.send_state:
            await self.send_state(self.state.value)

    async def _speak(self, text: str) -> None:
        """Synthesize and send audio for a text chunk."""
        if not self.tts or not self.send_audio:
            return
        async for audio_chunk in self.tts.synthesize_stream(text):
            if self._interrupt_event.is_set():
                return
            await self.send_audio(audio_chunk)

    async def end(self) -> dict:
        """Tear down the session and return summary metadata."""
        self.state = SessionState.ENDED
        if self._transcript_task:
            self._transcript_task.cancel()
        if self.stt:
            await self.stt.close()
        if self.tts:
            await self.tts.close()

        return {
            "session_id": self.session_id,
            "agent_id": self.agent_id,
            "created_at": self.created_at,
            "ended_at": datetime.now(timezone.utc).isoformat(),
        }
