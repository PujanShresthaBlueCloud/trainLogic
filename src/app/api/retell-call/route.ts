import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber } = body;

    if (!phoneNumber || !phoneNumber.startsWith("+")) {
      return NextResponse.json(
        { ok: false, error: "Invalid phoneNumber. Must include country code, e.g., +11234567890" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.retellai.com/v2/create-phone-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
      },
      body: JSON.stringify({
        to_number: phoneNumber, // customer number
        from_number: process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER, // your verified Retell number
        agentId: process.env.NEXT_PUBLIC_RETELL_VOICE_AGENT_ID,   // your Retell agent ID
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: data }, { status: response.status });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
