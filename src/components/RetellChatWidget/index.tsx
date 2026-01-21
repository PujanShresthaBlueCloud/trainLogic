'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

const RetellChatWidget = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Create chat session
  useEffect(() => {
    const createChatSession = async () => {
      try {
        const response = await fetch('/api/retellChat/create-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Hello Retell!' }),
        });

        if (!response.ok) throw new Error('Failed to create chat session');

        const data = await response.json();
        setChatId(data.chat_id);

        setMessages([
          { role: 'AI', content: 'Hello! How can I help you today?' },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    createChatSession();
  }, []);

  // 🟦 END CHAT WHEN CLOSING
  const handleToggleChat = async () => {
    if (isOpen && chatId) {
      // user is closing → end chat
      try {
        await fetch('/api/retellChat/end-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId }),
        });
        console.log("Chat ended successfully");
      } catch (e) {
        console.error("Failed to end chat", e);
      }
    }

    setIsOpen(!isOpen);
  };

  // Send message
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatId || isLoading) return;

    const userMessage = input;
    setInput('');
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'User', content: userMessage }]);

    try {
      const response = await fetch('/api/retellChat/create-chat-completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'AI', content: data.aiResponse }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggleChat}
        className="
          fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl bg-white 
          flex items-center justify-center border 
          hover:scale-105 transition-all duration-300
        "
      >
        {isOpen ? (
          <span className="text-3xl font-bold text-gray-700">×</span>
        ) : (
          <Image
            src="/images/logo/logo.png"
            alt="Chat Logo"
            width={40}
            height={40}
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[480px] bg-white shadow-2xl border rounded-xl flex flex-col overflow-hidden animate-fadeIn">
          <div className="p-3 bg-blue-600 text-white font-bold">
            Trained Logic Assistant
          </div>

          {error && <div className="text-red-500 p-2">{error}</div>}

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === 'User'
                    ? 'bg-blue-100 ml-auto text-right'
                    : 'bg-gray-200 mr-auto'
                }`}
              >
                <strong>{msg.role}: </strong> {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-3 flex gap-2 border-t bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chatId ? 'Type a message…' : 'Initializing…'}
              disabled={!chatId || isLoading}
              className="border p-2 rounded flex-1 text-sm"
            />
            <button
              type="submit"
              disabled={!chatId || isLoading}
              className="bg-blue-600 text-white px-3 py-2 rounded text-sm disabled:bg-blue-300"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RetellChatWidget;
