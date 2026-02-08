"use client";

import { Phone, PhoneOff, Loader2 } from "lucide-react";
import { useVoiceSession, VoiceState } from "@/lib/useVoiceSession";

interface VoiceCallButtonProps {
  agentId?: string;
  systemPrompt?: string;
  voiceId?: string;
}

const STATE_LABELS: Record<VoiceState, string> = {
  idle: "Start Call",
  connecting: "Connecting...",
  listening: "Listening...",
  thinking: "Thinking...",
  speaking: "Speaking...",
  ended: "Call Ended",
};

export default function VoiceCallButton({
  agentId,
  systemPrompt,
  voiceId,
}: VoiceCallButtonProps) {
  const { state, connect, disconnect } = useVoiceSession({
    agentId,
    systemPrompt,
    voiceId,
  });

  const isActive = state !== "idle" && state !== "ended";

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={isActive ? disconnect : connect}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
          isActive
            ? "bg-[var(--destructive)] text-white hover:opacity-90"
            : "bg-[var(--primary)] text-white hover:opacity-90"
        }`}
      >
        {state === "connecting" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isActive ? (
          <PhoneOff className="w-5 h-5" />
        ) : (
          <Phone className="w-5 h-5" />
        )}
        {STATE_LABELS[state]}
      </button>

      {isActive && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-[var(--muted-foreground)]">
            {STATE_LABELS[state]}
          </span>
        </div>
      )}
    </div>
  );
}
