# Retell AI Clone

An open-source voice AI agent platform. Build, deploy, and manage conversational voice agents with real-time speech-to-text, LLM reasoning, and text-to-speech — all connected via WebSocket streaming.

## Architecture

```
Client (browser mic) ──► WebSocket ──► STT (Deepgram)
                                          │
                                          ▼
                                      LLM (OpenAI) ←→ Tools
                                          │
                                          ▼
Client (browser speaker) ◄── WebSocket ◄── TTS (ElevenLabs)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, FastAPI, WebSockets |
| STT | Deepgram (real-time streaming) |
| LLM | OpenAI GPT-4o / GPT-4o-mini |
| TTS | ElevenLabs (streaming synthesis) |
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS 4 |

## Project Structure

```
retell-clone/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI entry point
│   │   ├── config.py        # Environment configuration
│   │   ├── voice/
│   │   │   ├── websocket.py # WebSocket endpoint
│   │   │   ├── session.py   # Voice session orchestrator
│   │   │   ├── stt.py       # Speech-to-Text (Deepgram)
│   │   │   ├── llm.py       # LLM engine (OpenAI)
│   │   │   ├── tts.py       # Text-to-Speech (ElevenLabs)
│   │   │   └── tools.py     # Function calling tools
│   │   └── api/
│   │       ├── agents.py    # Agent CRUD API
│   │       └── calls.py     # Call records API
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Home page
│   │   ├── dashboard/       # Analytics dashboard
│   │   ├── agents/          # Agent management
│   │   └── calls/           # Call history & transcripts
│   ├── components/
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── VoiceCallButton.tsx  # Voice call widget
│   └── lib/
│       ├── api.ts           # REST API client
│       └── useVoiceSession.ts   # WebSocket voice hook
│
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
- API keys for: Deepgram, OpenAI, ElevenLabs

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env with your API keys

python -m app.main
```

The API server starts at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at `http://localhost:3000`.

## API Endpoints

### REST

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/agents` | Create an agent |
| GET | `/api/agents` | List agents |
| GET | `/api/agents/:id` | Get agent details |
| PATCH | `/api/agents/:id` | Update an agent |
| DELETE | `/api/agents/:id` | Delete an agent |
| POST | `/api/calls` | Create a call record |
| GET | `/api/calls` | List calls (filterable) |
| GET | `/api/calls/:id` | Get call details |
| PATCH | `/api/calls/:id/end` | End a call |

### WebSocket

| Endpoint | Description |
|----------|-------------|
| `ws://localhost:8000/ws/voice?agent_id=...` | Real-time voice session |

**Protocol:**
- Client sends binary frames (PCM 16-bit, 16 kHz, mono)
- Server returns binary frames (synthesized audio) and JSON control messages

## Built-in Tools

The LLM can invoke these tools during a conversation:

- `get_current_time` — Returns the current UTC time
- `book_appointment` — Books an appointment (name, date, time, reason)
- `transfer_call` — Transfers the call to a human agent department

Add custom tools by extending `backend/app/voice/tools.py`.

## Environment Variables

See `backend/.env.example` for the full list. Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DEEPGRAM_API_KEY` | Yes | Deepgram API key for STT |
| `OPENAI_API_KEY` | Yes | OpenAI API key for LLM |
| `ELEVENLABS_API_KEY` | Yes | ElevenLabs API key for TTS |
| `ELEVENLABS_VOICE_ID` | No | Default voice (defaults to Rachel) |
| `OPENAI_MODEL` | No | LLM model (defaults to gpt-4o-mini) |
