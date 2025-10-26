import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.RETELL_API_KEY;
    const agentId = process.env.NEXT_PUBLIC_API_URL_RETELL_VOICE_AGENT_ID;

    if (!apiKey || !agentId) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    // Call Retell API (server-side)
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Retell API error:", data);
      return NextResponse.json({ error: data }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
