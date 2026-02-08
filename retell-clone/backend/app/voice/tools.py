"""Tool definitions and executor for LLM function calling."""

import json
import logging
from datetime import datetime, timezone
from typing import Any

logger = logging.getLogger(__name__)

# Registry of available tools. Each tool has an OpenAI-compatible schema
# and an async handler function.
TOOL_REGISTRY: dict[str, dict[str, Any]] = {
    "get_current_time": {
        "schema": {
            "type": "function",
            "function": {
                "name": "get_current_time",
                "description": "Get the current date and time in UTC.",
                "parameters": {"type": "object", "properties": {}, "required": []},
            },
        },
        "handler": None,  # set below
    },
    "book_appointment": {
        "schema": {
            "type": "function",
            "function": {
                "name": "book_appointment",
                "description": "Book an appointment for the caller.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "Full name of the person booking.",
                        },
                        "date": {
                            "type": "string",
                            "description": "Preferred date in YYYY-MM-DD format.",
                        },
                        "time": {
                            "type": "string",
                            "description": "Preferred time in HH:MM format.",
                        },
                        "reason": {
                            "type": "string",
                            "description": "Reason for the appointment.",
                        },
                    },
                    "required": ["name", "date", "time"],
                },
            },
        },
        "handler": None,
    },
    "transfer_call": {
        "schema": {
            "type": "function",
            "function": {
                "name": "transfer_call",
                "description": "Transfer the call to a human agent.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "department": {
                            "type": "string",
                            "description": "Department to transfer to (e.g. sales, support).",
                        },
                    },
                    "required": [],
                },
            },
        },
        "handler": None,
    },
}


async def _handle_get_current_time(**_kwargs: Any) -> str:
    now = datetime.now(timezone.utc).isoformat()
    return json.dumps({"current_time": now})


async def _handle_book_appointment(**kwargs: Any) -> str:
    # In production, this would write to a database or calendar API.
    logger.info("Booking appointment: %s", kwargs)
    return json.dumps(
        {
            "status": "confirmed",
            "name": kwargs.get("name"),
            "date": kwargs.get("date"),
            "time": kwargs.get("time"),
            "reason": kwargs.get("reason", ""),
        }
    )


async def _handle_transfer_call(**kwargs: Any) -> str:
    department = kwargs.get("department", "general")
    logger.info("Transferring call to %s", department)
    return json.dumps({"status": "transferring", "department": department})


# Bind handlers
TOOL_REGISTRY["get_current_time"]["handler"] = _handle_get_current_time
TOOL_REGISTRY["book_appointment"]["handler"] = _handle_book_appointment
TOOL_REGISTRY["transfer_call"]["handler"] = _handle_transfer_call


class ToolExecutor:
    """Resolves and executes tool calls from the LLM."""

    def get_openai_tools_schema(self) -> list[dict]:
        return [tool["schema"] for tool in TOOL_REGISTRY.values()]

    async def execute(self, name: str, arguments_json: str) -> str:
        tool = TOOL_REGISTRY.get(name)
        if not tool or not tool["handler"]:
            return json.dumps({"error": f"Unknown tool: {name}"})
        try:
            args = json.loads(arguments_json) if arguments_json else {}
            return await tool["handler"](**args)
        except Exception as exc:
            logger.exception("Tool execution error for %s", name)
            return json.dumps({"error": str(exc)})
