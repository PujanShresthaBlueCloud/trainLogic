// app/api/retell/store.ts
export type ChatMsg = { role: "user" | "assistant" | "system"; content: string; time: string };
export type ChatObj = { chat_id: string; created_at: string; updated_at: string; messages: ChatMsg[] };


declare global {
// allow a long-lived store across module reloads in dev
// eslint-disable-next-line no-var
var __RETELL_CHAT_STORE__: { chats: Record<string, ChatObj> } | undefined;
}


if (!global.__RETELL_CHAT_STORE__) global.__RETELL_CHAT_STORE__ = { chats: {} };


export const store = global.__RETELL_CHAT_STORE__;


export function createLocalChat(chat_id: string, initial_message?: string) {
const now = new Date().toISOString();
const messages: ChatMsg[] = initial_message ? [{ role: "user", content: initial_message, time: now }] : [];
const obj: ChatObj = { chat_id, created_at: now, updated_at: now, messages };
store.chats[chat_id] = obj;
return obj;
}


export function appendMessage(chat_id: string, msg: ChatMsg) {
const c = store.chats[chat_id];
if (!c) return null;
c.messages.push(msg);
c.updated_at = new Date().toISOString();
return c;
}


export function getLocalChat(chat_id: string) {
return store.chats[chat_id] ?? null;
}


export function listLocalChats() {
return Object.values(store.chats).sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
}