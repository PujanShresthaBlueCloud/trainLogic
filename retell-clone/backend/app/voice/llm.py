"""LLM module for generating conversational responses via OpenAI."""

import logging
from typing import AsyncGenerator

from openai import AsyncOpenAI

from app.config import config
from app.voice.tools import ToolExecutor

logger = logging.getLogger(__name__)


class LLMEngine:
    """Wraps the OpenAI chat completions API with streaming and tool calling."""

    def __init__(
        self,
        system_prompt: str = "You are a helpful voice AI assistant. Keep responses concise and conversational.",
        model: str | None = None,
    ):
        self.client = AsyncOpenAI(api_key=config.openai_api_key)
        self.model = model or config.openai_model
        self.system_prompt = system_prompt
        self.messages: list[dict] = [{"role": "system", "content": self.system_prompt}]
        self.tool_executor = ToolExecutor()

    def set_system_prompt(self, prompt: str) -> None:
        self.system_prompt = prompt
        self.messages = [{"role": "system", "content": prompt}]

    async def generate_response(self, user_text: str) -> AsyncGenerator[str, None]:
        """Stream LLM response token-by-token. Yields text chunks."""
        self.messages.append({"role": "user", "content": user_text})

        tools_schema = self.tool_executor.get_openai_tools_schema()
        kwargs: dict = {
            "model": self.model,
            "messages": self.messages,
            "stream": True,
            "max_tokens": 300,
        }
        if tools_schema:
            kwargs["tools"] = tools_schema

        full_response = ""
        tool_calls_buffer: list[dict] = []

        stream = await self.client.chat.completions.create(**kwargs)

        async for chunk in stream:
            delta = chunk.choices[0].delta

            # Handle tool calls
            if delta.tool_calls:
                for tc in delta.tool_calls:
                    if tc.index >= len(tool_calls_buffer):
                        tool_calls_buffer.append(
                            {"id": tc.id, "function": {"name": "", "arguments": ""}}
                        )
                    if tc.function.name:
                        tool_calls_buffer[tc.index]["function"]["name"] = tc.function.name
                    if tc.function.arguments:
                        tool_calls_buffer[tc.index]["function"]["arguments"] += (
                            tc.function.arguments
                        )
                continue

            # Handle text content
            if delta.content:
                full_response += delta.content
                yield delta.content

        # Execute any tool calls and get follow-up response
        if tool_calls_buffer:
            self.messages.append(
                {"role": "assistant", "tool_calls": tool_calls_buffer}
            )
            for tc in tool_calls_buffer:
                result = await self.tool_executor.execute(
                    tc["function"]["name"], tc["function"]["arguments"]
                )
                self.messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tc["id"],
                        "content": result,
                    }
                )
            # Recurse to get the final text response after tool use
            async for token in self.generate_response(""):
                yield token
        else:
            self.messages.append({"role": "assistant", "content": full_response})

    def reset(self) -> None:
        self.messages = [{"role": "system", "content": self.system_prompt}]
