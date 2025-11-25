import { NextResponse } from 'next/server';
import Retell from 'retell-sdk';


function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}
const apiKey = getRequiredEnv('RETELL_API_KEY');
export async function POST(request: Request) {
  try {
    const { chatId } = await request.json();

    if (!chatId) {
      return NextResponse.json({ error: 'Missing chatId' }, { status: 400 });
    }

    const client = new Retell({
      apiKey: apiKey,
    });

    // Call Retell end chat
    await client.chat.end(chatId);


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error ending chat:', error);
    return NextResponse.json(
      { error: 'Failed to end chat' },
      { status: 500 }
    );
  }
}
