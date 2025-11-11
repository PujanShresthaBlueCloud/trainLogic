// app/api/retell/create-chat-completion/route.ts
import { NextResponse } from "next/server";
import { appendMessage, getLocalChat, createLocalChat } from "../store";


export async function POST(req: Request) {
const RETELL_API_KEY = process.env.RETELL_API_KEY;
if (!RETELL_API_KEY) return NextResponse.json({ error: "Missing RETELL_API_KEY" }, { status: 500 });


const body = await req.json().catch(() => ({}));
let chat_id: string | undefined = body?.chat_id;
const input = body?.input;


if (!input || !input.content) return NextResponse.json({ error: "Missing input.content" }, { status: 400 });


try {
// ensure local chat exists
if (!chat_id) {
// create a local placeholder chat id if not provided
chat_id = `local-${Date.now()}`;
createLocalChat(chat_id);
} else if (!getLocalChat(chat_id)) {
createLocalChat(chat_id);
}


appendMessage(chat_id, { role: "user", content: input.content, time: new Date().toISOString() });


const resp = await fetch("https://api.retellai.com/create-chat-completion", {
method: "POST",
headers: { Authorization: `Bearer ${RETELL_API_KEY}`, "Content-Type": "application/json" },
body: JSON.stringify({ chat_id, input }),
next: { revalidate: 0 },
});


const data = await resp.json();
if (!resp.ok) return NextResponse.json({ error: data }, { status: 502 });


// extract assistant reply
let assistantText = "";
if (typeof data?.output_text === "string") assistantText = data.output_text;
else if (typeof data?.message === "string") assistantText = data.message;
else if (data?.choices && Array.isArray(data.choices) && data.choices[0]) {
assistantText = data.choices[0].message?.content ?? data.choices[0].text ?? "";
} else assistantText = JSON.stringify(data);


appendMessage(chat_id, { role: "assistant", content: assistantText, time: new Date().toISOString() });


return NextResponse.json({ completion: data, chat: getLocalChat(chat_id) });
} catch (err: any) {
return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
}
}