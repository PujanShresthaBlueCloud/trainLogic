import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phoneNumber, business } = body;
    const TWILIO_AUTH_HEADER = process.env.TWILIO_AUTH_HEADER;
    const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!TWILIO_AUTH_HEADER || !TWILIO_VERIFY_SERVICE_SID) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    // Call Retell API (server-side)
    const response = await fetch(`https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/Verifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': TWILIO_AUTH_HEADER,
        },
        body: new URLSearchParams({
            'To': phoneNumber,
            'Channel': 'sms'
        })
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
