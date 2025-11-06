import { NextRequest, NextResponse } from "next/server";

function getEnvVar(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

const agentIdMap: Record<string, string> = {
  "Builder / Renovator": getEnvVar("RETELL_BUILDER_RENOVATOR_VOICE_AGENT_ID"),
  "Plumber": getEnvVar("RETELL_PLUMBER_VOICE_AGENT_ID"),
  "Removalist": getEnvVar("RETELL_REMOVALIST_VOICE_AGENT_ID"),
  "Migration Agent": getEnvVar("RETELL_MIGRATION_AGENT_VOICE_AGENT_ID"),
  "Mortgage Broker": getEnvVar("RETELL_MORTGAGE_BROKER_VOICE_AGENT_ID"),
  "Electrician": getEnvVar("RETELL_ELECTRICIAN_VOICE_AGENT_ID"),
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phoneNumber, businessType, from_number} = body;
    const RETELL_API_KEY = process.env.RETELL_API_KEY;

    if (!RETELL_API_KEY) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    const agentId = agentIdMap[businessType];
    const response = await fetch('https://api.retellai.com/v2/create-phone-call', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RETELL_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from_number: from_number,
            to_number: phoneNumber,
            override_agent_id: agentId,
            retell_llm_dynamic_variables: {
            full_name: name,
            },
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
