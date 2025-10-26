// src/app/api/retell/route.ts
export const runtime = "nodejs"; // ensure Node runtime (not Edge)

import { NextResponse } from "next/server";

const RETELL_BASE = "https://api.retellai.com/v2"; // <- replace with actual base URL if different

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RETELL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "RETELL_API_KEY not set on server environment" },
        { status: 500 }
      );
    }

    // parse incoming request (whatever your frontend sends)
    const payload = await req.json();

    // Example: forward the payload to Retell's "start call" endpoint.
    // **Replace** "/voice/calls" and body fields with the exact Retell endpoint / schema.
    const resp = await fetch(`${RETELL_BASE}/create-phone-call`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
      // optionally set a reasonable timeout wrapper if needed
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error("Retell API error:", resp.status, data);
      return NextResponse.json({ ok: false, error: data }, { status: resp.status });
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err: any) {
    console.error("Unexpected error in /api/retell:", err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
