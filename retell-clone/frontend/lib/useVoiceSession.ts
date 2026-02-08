/**
 * React hook for managing a real-time voice WebSocket session.
 *
 * Usage:
 *   const { state, connect, disconnect } = useVoiceSession({ agentId: "..." });
 */

"use client";

import { useRef, useState, useCallback } from "react";

const WS_BASE = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";

export type VoiceState =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "ended";

interface UseVoiceSessionOptions {
  agentId?: string;
  systemPrompt?: string;
  voiceId?: string;
  onAudio?: (audio: ArrayBuffer) => void;
  onStateChange?: (state: VoiceState) => void;
}

export function useVoiceSession(options: UseVoiceSessionOptions = {}) {
  const [state, setState] = useState<VoiceState>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const updateState = useCallback(
    (newState: VoiceState) => {
      setState(newState);
      options.onStateChange?.(newState);
    },
    [options]
  );

  const connect = useCallback(async () => {
    if (wsRef.current) return;

    updateState("connecting");

    // Request mic access
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true },
    });
    mediaStreamRef.current = stream;

    // Set up AudioContext to capture PCM
    const audioContext = new AudioContext({ sampleRate: 16000 });
    audioContextRef.current = audioContext;
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);

    // Build WebSocket URL with query params
    const params = new URLSearchParams();
    if (options.agentId) params.set("agent_id", options.agentId);
    if (options.systemPrompt) params.set("system_prompt", options.systemPrompt);
    if (options.voiceId) params.set("voice_id", options.voiceId);

    const ws = new WebSocket(`${WS_BASE}/ws/voice?${params.toString()}`);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      // Start streaming mic audio
      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        const float32 = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(float32.length);
        for (let i = 0; i < float32.length; i++) {
          int16[i] = Math.max(-32768, Math.min(32767, float32[i] * 32768));
        }
        ws.send(int16.buffer);
      };
    };

    ws.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        // Audio from TTS
        options.onAudio?.(event.data);
      } else {
        const msg = JSON.parse(event.data);
        if (msg.type === "session_start") {
          setSessionId(msg.session_id);
        } else if (msg.type === "state") {
          updateState(msg.state as VoiceState);
        } else if (msg.type === "session_end") {
          updateState("ended");
        }
      }
    };

    ws.onclose = () => {
      updateState("ended");
      cleanup();
    };

    ws.onerror = () => {
      updateState("ended");
      cleanup();
    };
  }, [options, updateState]);

  const disconnect = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "end" }));
    }
    cleanup();
    updateState("idle");
  }, [updateState]);

  function cleanup() {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }

  return { state, sessionId, connect, disconnect };
}
