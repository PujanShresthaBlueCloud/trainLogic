"""CRUD API for voice agents."""

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# In-memory store (replace with a real database in production)
agents_db: dict[str, dict] = {}


class AgentCreate(BaseModel):
    name: str
    system_prompt: str = "You are a helpful voice AI assistant."
    voice_id: str = ""
    language: str = "en-US"
    llm_model: str = "gpt-4o-mini"
    tools_enabled: list[str] = []


class AgentUpdate(BaseModel):
    name: str | None = None
    system_prompt: str | None = None
    voice_id: str | None = None
    language: str | None = None
    llm_model: str | None = None
    tools_enabled: list[str] | None = None


@router.post("")
async def create_agent(body: AgentCreate):
    agent_id = str(uuid.uuid4())
    agent = {
        "id": agent_id,
        **body.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "call_count": 0,
    }
    agents_db[agent_id] = agent
    return agent


@router.get("")
async def list_agents():
    return list(agents_db.values())


@router.get("/{agent_id}")
async def get_agent(agent_id: str):
    agent = agents_db.get(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent


@router.patch("/{agent_id}")
async def update_agent(agent_id: str, body: AgentUpdate):
    agent = agents_db.get(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    updates = body.model_dump(exclude_unset=True)
    agent.update(updates)
    agent["updated_at"] = datetime.now(timezone.utc).isoformat()
    return agent


@router.delete("/{agent_id}")
async def delete_agent(agent_id: str):
    agent = agents_db.pop(agent_id, None)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"deleted": True, "id": agent_id}
