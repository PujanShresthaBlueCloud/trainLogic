// "use client";

// import { useState, useEffect } from "react";

// export default function RetellVoicePopup() {
//   const [open, setOpen] = useState(false);
//   const [retellWebClient, setRetellWebClient] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Dynamically import the Retell client on the client-side
//   useEffect(() => {
//     async function loadClient() {
//       const { RetellWebClient } = await import("retell-client-js-sdk");
//       setRetellWebClient(new RetellWebClient());
//     }
//     loadClient();
//   }, []);

//   // Start the AI voice call
//   async function startCall() {
//   try {
//     setLoading(true);
//     setMessage("Preparing voice client...");

//     // 1) import the SDK dynamically
//     const sdkModule: any = await import("retell-client-js-sdk");
//     console.log("retell sdk module", sdkModule);

//     // 2) create a client instance (try several possibilities)
//     let client: any = null;
//     if (typeof sdkModule.RetellWebClient === "function") {
//       client = new sdkModule.RetellWebClient();
//     } else if (typeof sdkModule.default === "function") {
//       client = new sdkModule.default();
//     } else if (typeof sdkModule.createClient === "function") {
//       client = sdkModule.createClient();
//     } else {
//       // last resort: if the module itself looks like an instance
//       client = sdkModule;
//     }

//     console.log("retell client instance:", client);

//     if (!client) {
//       throw new Error("Failed to create Retell client — check SDK exports.");
//     }

//     // 3) get token and call_id from your backend
//     setMessage("Requesting access token...");
//     const tokenRes = await fetch("/api/retell/token");
//     const tokenData = await tokenRes.json();
//     if (!tokenRes.ok || !tokenData?.access_token) {
//       console.error("token fetch failed", tokenData);
//       throw new Error("Could not obtain access token from server");
//     }

//     // 4) determine which method to call on the client
//     const possibleMethods = [
//       "startConversation",
//       "startCall",
//       "startWebCall",
//       "start",
//       "connect",
//       "initiateCall",
//     ];

//     const availableMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).concat(
//       Object.keys(client)
//     );
//     console.log("availableMethods", availableMethods);

//     const methodToUse = possibleMethods.find((m) => typeof client[m] === "function");

//     if (!methodToUse) {
//       // show helpful guidance
//       throw new Error(
//         "No suitable start method found on retell client. Check console to see available methods and adjust code accordingly."
//       );
//     }

//     console.log("Using retell client method:", methodToUse);

//     // 5) call the method with the expected arguments (common signature)
//     const startArgs = {
//       callId: tokenData.call_id,
//       sampleRate: 16000,
//       audioEncoding: "s16le",
//       accessToken: tokenData.access_token,
//     };

//     // Some SDK methods may expect (options) or (callId, options). Try both.
//     if (client[methodToUse].length === 1) {
//       await client[methodToUse](startArgs);
//     } else {
//       await client[methodToUse](tokenData.call_id, startArgs);
//     }

//     setMessage("Connected — you can speak now.");
//   } catch (err: any) {
//     console.error("Error starting call:", err);
//     setMessage(`Error starting call: ${err?.message || String(err)}`);
//   } finally {
//     setLoading(false);
//   }
// }


//   return (
//     <div style={wrapperStyle}>
//       {!open ? (
//         <button style={fabStyle} onClick={() => setOpen(true)}>
//           🗣️
//         </button>
//       ) : (
//         <div style={popupStyle}>
//           <div style={headerStyle}>
//             <strong>AI Voice Agent</strong>
//             <button onClick={() => setOpen(false)} style={closeStyle}>
//               ✕
//             </button>
//           </div>
//           <div style={bodyStyle}>
//             <p>{message || "Click below to start a conversation"}</p>
//             <button onClick={startCall} disabled={loading} style={callBtnStyle}>
//               {loading ? "Connecting..." : "Start Call"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* Inline styles for demo */
// const wrapperStyle: React.CSSProperties = {
//   position: "fixed",
//   bottom: 20,
//   right: 20,
//   zIndex: 1000,
// };

// const fabStyle: React.CSSProperties = {
//   width: 60,
//   height: 60,
//   borderRadius: "50%",
//   backgroundColor: "#2563eb",
//   color: "white",
//   fontSize: 24,
//   border: "none",
//   cursor: "pointer",
//   boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
// };

// const popupStyle: React.CSSProperties = {
//   width: 300,
//   background: "#fff",
//   borderRadius: 12,
//   boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
//   overflow: "hidden",
//   fontFamily: "sans-serif",
// };

// const headerStyle: React.CSSProperties = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px 14px",
//   borderBottom: "1px solid #eee",
//   fontSize: 14,
// };

// const closeStyle: React.CSSProperties = {
//   border: "none",
//   background: "transparent",
//   cursor: "pointer",
//   fontSize: 18,
// };

// const bodyStyle: React.CSSProperties = {
//   padding: "14px",
//   textAlign: "center",
//   fontSize: 14,
// };

// const callBtnStyle: React.CSSProperties = {
//   marginTop: 10,
//   padding: "10px 20px",
//   backgroundColor: "#2563eb",
//   color: "white",
//   border: "none",
//   borderRadius: 8,
//   cursor: "pointer",
// };






"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      text: "Hi! I'm Trained Logic's AI assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getResponse = (userMessage:string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "Our AI solutions start from $399/month. Pricing varies based on your specific needs, conversation volume, and features. Would you like to get a custom quote? Please fill out our contact form for detailed pricing!";
    }
    
    if (lowerMessage.includes('demo') || lowerMessage.includes('try')) {
      return "I'd love to help you schedule a demo! Please scroll down to our contact form and fill in your details. Our team will get back to you within 24 hours to arrange a personalized demonstration.";
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('chatbot') || lowerMessage.includes('voice')) {
      return "We offer two main services: AI Chatbots for your website (handling customer queries 24/7) and AI Voice Agents for phone calls (your 24/7 receptionist). Both solutions are designed specifically for Australian businesses. Which one interests you?";
    }
    
    return "Thanks for your message! For detailed information and personalized assistance, please fill out our contact form below. Our team typically responds within 24 hours.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(inputValue);
      setMessages((prev) => [...prev, { type: 'assistant', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action:string) => {

    if (action === 'contact') {
      setIsOpen(false);
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // optional: log or fallback
        console.warn("Element with id 'contact' not found to scroll to.");
      }
      // document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'services') {
      setInputValue('Tell me about your services');
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] shadow-lg shadow-purple-400 flex items-center justify-center text-white group"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-purple-400 opacity-50"
        />
        <MessageCircle size={32} className="relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with our AI assistant
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white">Trained Logic AI</p>
                  <p className="text-xs text-white/80">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-[#8B5CF6] text-white rounded-br-sm'
                        : 'bg-gray-200 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 bg-white border-t border-gray-200 flex gap-2">
              <button
                onClick={() => handleQuickAction('contact')}
                className="flex-1 px-3 py-2 text-xs border-2 border-[#8B5CF6] text-[#8B5CF6] rounded-lg hover:bg-purple-50 transition-colors"
              >
                📧 Contact Us
              </button>
              <button
                onClick={() => handleQuickAction('services')}
                className="flex-1 px-3 py-2 text-xs border-2 border-[#8B5CF6] text-[#8B5CF6] rounded-lg hover:bg-purple-50 transition-colors"
              >
                💬 Services
              </button>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#8B5CF6] focus:outline-none text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}