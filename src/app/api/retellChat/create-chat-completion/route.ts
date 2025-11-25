// Ensure the Retell SDK uses the global web fetch in Next.js
import 'retell-sdk/shims/web'; 
import Retell from 'retell-sdk';
import { NextResponse } from 'next/server';


function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const apiKey = getRequiredEnv('RETELL_API_KEY');
const agentId = getRequiredEnv('RETELL_AGENT_ID');
const client = new Retell({ apiKey: apiKey});

export async function POST(req: Request) {
  const { chatId, message } = await req.json();

  try {
    // Call the Retell create chat completion API
    const response = await client.chat.createChatCompletion({
      chat_id: chatId,
      content: message,
    });

    // Extract the AI response from the completion
    const aiResponse = response.messages?.[0]?.content || 'No response from AI.';

    return NextResponse.json({ aiResponse });

  } catch (error) {
    console.error('Error creating chat completion:', error);
    return NextResponse.json({ error: 'Failed to get chat completion' }, { status: 500 });
  }
}