// import { NextRequest, NextResponse } from "next/server";

// function getEnvVar(name: string): string {
//   const val = process.env[name];
//   if (!val) throw new Error(`Missing required env var: ${name}`);
//   return val;
// }
// const RETELL_TRAINEDLOGIC_CHAT_AGENT_ID=getEnvVar("RETELL_TRAINEDLOGIC_CHAT_AGENT_ID");

// type RequestBody = {
//   agentId: string;
//   initial_message?: string;
//   metadata?: Record<string, any>;
// };

// export async function POST(req: NextRequest) {
//   try {
//     const RETELL_API_KEY = getEnvVar("RETELL_API_KEY");
//     const RETELL_TRAINEDLOGIC_CHAT_AGENT_ID = getEnvVar("RETELL_TRAINEDLOGIC_CHAT_AGENT_ID");

//     if (!RETELL_API_KEY || !RETELL_TRAINEDLOGIC_CHAT_AGENT_ID) {
//       return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
//     }
//     let body: RequestBody;
//     try {
//         body = await req.json();

//     } catch (error) {
//             console.log(" Error chat json body: ", error);
//             return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//     }

//     const { initial_message } = body;                  
//     const response = await fetch('https://api.retellai.com/create-chat', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${RETELL_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({agent_id: RETELL_TRAINEDLOGIC_CHAT_AGENT_ID, initial_message: initial_message}),
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       console.error("Retell chat API error:", data);
//       return NextResponse.json({ error: data }, { status: 400 });
//     }

//     // async function sendMessageToRetell(chatId: string, message: string) {
//     const responseChatCompletion = await fetch("https://api.retellai.com/create-chat-completion", {
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${RETELL_API_KEY}`, },
//             body: JSON.stringify({
//             chat_id: data.chat_id,
//             input: {
//             role: "user",
//             content: initial_message,
//         },
//         }),
//     });
//     const chatCompletion = await responseChatCompletion.json();
//     if (!responseChatCompletion.ok) throw new Error(chatCompletion?.error || "Failed to send message");

//     data['completion'] = chatCompletion;
//     console.log("agent reply -- ", data)
//     return NextResponse.json(data);
//   } catch (error: any) {
//     console.error("Server error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }    



// app/api/retell/create-chat/route.ts
import { NextResponse } from "next/server";
import { createLocalChat } from "../store";


export async function POST(req: Request) {
const RETELL_API_KEY = process.env.RETELL_API_KEY;
const RETELL_AGENT_ID = process.env.RETELL_TRAINEDLOGIC_CHAT_AGENT_ID;


if (!RETELL_API_KEY || !RETELL_AGENT_ID) {
return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
}


const body = await req.json().catch(() => ({}));
const initial_message = body?.initial_message;


try {
const resp = await fetch("https://api.retellai.com/create-chat", {
method: "POST",
headers: { Authorization: `Bearer ${RETELL_API_KEY}`, "Content-Type": "application/json" },
body: JSON.stringify({ agent_id: RETELL_AGENT_ID, initial_message }),
next: { revalidate: 0 },
});


const data = await resp.json();
if (!resp.ok) return NextResponse.json({ error: data }, { status: 502 });

console.log("creae chat ----", data)
// store locally for demo
createLocalChat(data.chat_id, initial_message);
return NextResponse.json(data);
} catch (err: any) {
return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
}
}


