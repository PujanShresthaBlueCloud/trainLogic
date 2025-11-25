import Retell from 'retell-sdk';
import { NextResponse } from 'next/server';

function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}
const apiKey = getRequiredEnv('RETELL_API_KEY');

export async function POST(req: Request) {
  try {
    const client = new Retell({
      apiKey: apiKey,
    });
    const chatResponse = await client.chat.create({ 
      agent_id: 'agent_b7f43bbbd71ecaa0224140cdf1' 
    });
    return NextResponse.json(chatResponse);
  } catch (error) {
    console.log("create chat error ", error);
  }

}

// console.log("here is ",chatResponse);