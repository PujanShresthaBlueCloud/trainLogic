// app/api/retell/list/route.ts
import { NextResponse } from "next/server";
import { listLocalChats, getLocalChat } from "../store";


export async function GET() {
return NextResponse.json({ chats: listLocalChats() });
}


export async function POST(req: Request) {
const body = await req.json().catch(() => ({}));
const chat_id = body?.chat_id;
if (!chat_id) return NextResponse.json({ error: "chat_id required" }, { status: 400 });
const c = getLocalChat(chat_id);
if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });
return NextResponse.json({ chat: c });
}