"use client";

import { useState, useEffect } from "react";

export default function RetellVoicePopup() {
  const [open, setOpen] = useState(false);
  const [retellWebClient, setRetellWebClient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Dynamically import the Retell client on the client-side
  useEffect(() => {
    async function loadClient() {
      const { RetellWebClient } = await import("retell-client-js-sdk");
      setRetellWebClient(new RetellWebClient());
    }
    loadClient();
  }, []);

  // Start the AI voice call
  async function startCall() {
  try {
    setLoading(true);
    setMessage("Preparing voice client...");

    // 1) import the SDK dynamically
    const sdkModule: any = await import("retell-client-js-sdk");
    console.log("retell sdk module", sdkModule);

    // 2) create a client instance (try several possibilities)
    let client: any = null;
    if (typeof sdkModule.RetellWebClient === "function") {
      client = new sdkModule.RetellWebClient();
    } else if (typeof sdkModule.default === "function") {
      client = new sdkModule.default();
    } else if (typeof sdkModule.createClient === "function") {
      client = sdkModule.createClient();
    } else {
      // last resort: if the module itself looks like an instance
      client = sdkModule;
    }

    console.log("retell client instance:", client);

    if (!client) {
      throw new Error("Failed to create Retell client — check SDK exports.");
    }

    // 3) get token and call_id from your backend
    setMessage("Requesting access token...");
    const tokenRes = await fetch("/api/retell/token");
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData?.access_token) {
      console.error("token fetch failed", tokenData);
      throw new Error("Could not obtain access token from server");
    }

    // 4) determine which method to call on the client
    const possibleMethods = [
      "startConversation",
      "startCall",
      "startWebCall",
      "start",
      "connect",
      "initiateCall",
    ];

    const availableMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(client)).concat(
      Object.keys(client)
    );
    console.log("availableMethods", availableMethods);

    const methodToUse = possibleMethods.find((m) => typeof client[m] === "function");

    if (!methodToUse) {
      // show helpful guidance
      throw new Error(
        "No suitable start method found on retell client. Check console to see available methods and adjust code accordingly."
      );
    }

    console.log("Using retell client method:", methodToUse);

    // 5) call the method with the expected arguments (common signature)
    const startArgs = {
      callId: tokenData.call_id,
      sampleRate: 16000,
      audioEncoding: "s16le",
      accessToken: tokenData.access_token,
    };

    // Some SDK methods may expect (options) or (callId, options). Try both.
    if (client[methodToUse].length === 1) {
      await client[methodToUse](startArgs);
    } else {
      await client[methodToUse](tokenData.call_id, startArgs);
    }

    setMessage("Connected — you can speak now.");
  } catch (err: any) {
    console.error("Error starting call:", err);
    setMessage(`Error starting call: ${err?.message || String(err)}`);
  } finally {
    setLoading(false);
  }
}


  return (
    <div style={wrapperStyle}>
      {!open ? (
        <button style={fabStyle} onClick={() => setOpen(true)}>
          🗣️
        </button>
      ) : (
        <div style={popupStyle}>
          <div style={headerStyle}>
            <strong>AI Voice Agent</strong>
            <button onClick={() => setOpen(false)} style={closeStyle}>
              ✕
            </button>
          </div>
          <div style={bodyStyle}>
            <p>{message || "Click below to start a conversation"}</p>
            <button onClick={startCall} disabled={loading} style={callBtnStyle}>
              {loading ? "Connecting..." : "Start Call"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Inline styles for demo */
const wrapperStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 20,
  right: 20,
  zIndex: 1000,
};

const fabStyle: React.CSSProperties = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  backgroundColor: "#2563eb",
  color: "white",
  fontSize: 24,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
};

const popupStyle: React.CSSProperties = {
  width: 300,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
  overflow: "hidden",
  fontFamily: "sans-serif",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
  borderBottom: "1px solid #eee",
  fontSize: 14,
};

const closeStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 18,
};

const bodyStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "center",
  fontSize: 14,
};

const callBtnStyle: React.CSSProperties = {
  marginTop: 10,
  padding: "10px 20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
