"use client";

import { useEffect, useState } from "react";
import { Phone, PhoneOff, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { apiClient } from "@/lib/api";

interface TranscriptEntry {
  role: string;
  text: string;
  timestamp: string;
}

interface Call {
  id: string;
  agent_id: string;
  direction: string;
  caller_number: string;
  status: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  transcript: TranscriptEntry[];
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [expandedCall, setExpandedCall] = useState<string | null>(null);

  useEffect(() => {
    fetchCalls();
  }, []);

  async function fetchCalls() {
    try {
      const data = await apiClient.get("/calls");
      setCalls(data.calls || []);
    } catch {
      // API not available
    }
  }

  function formatDuration(seconds: number | null): string {
    if (!seconds) return "—";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleString();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Call History</h1>
        <button
          onClick={fetchCalls}
          className="border border-[var(--border)] px-4 py-2 rounded-lg hover:bg-white transition-colors"
        >
          Refresh
        </button>
      </div>

      {calls.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-white p-12 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 text-[var(--muted-foreground)]" />
          <h2 className="text-lg font-semibold mb-1">No calls yet</h2>
          <p className="text-[var(--muted-foreground)]">
            Calls will appear here once agents start handling conversations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {calls.map((call) => (
            <div
              key={call.id}
              className="rounded-xl border border-[var(--border)] bg-white overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedCall(
                    expandedCall === call.id ? null : call.id
                  )
                }
                className="w-full p-5 flex items-center justify-between hover:bg-[var(--muted)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  {call.status === "in_progress" ? (
                    <Phone className="w-5 h-5 text-green-600" />
                  ) : (
                    <PhoneOff className="w-5 h-5 text-[var(--muted-foreground)]" />
                  )}
                  <div className="text-left">
                    <p className="font-medium">
                      {call.direction === "inbound" ? "Inbound" : "Outbound"}{" "}
                      Call
                      {call.caller_number && ` — ${call.caller_number}`}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {formatDate(call.started_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4" />
                    {formatDuration(call.duration_seconds)}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      call.status === "in_progress"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {call.status}
                  </span>
                  {expandedCall === call.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {expandedCall === call.id && (
                <div className="border-t border-[var(--border)] p-5">
                  <h4 className="font-medium mb-3">Transcript</h4>
                  {call.transcript.length === 0 ? (
                    <p className="text-sm text-[var(--muted-foreground)]">
                      No transcript available.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {call.transcript.map((entry, i) => (
                        <div
                          key={i}
                          className={`text-sm p-3 rounded-lg ${
                            entry.role === "user"
                              ? "bg-[var(--muted)] ml-8"
                              : "bg-[var(--accent)] mr-8"
                          }`}
                        >
                          <span className="font-medium capitalize">
                            {entry.role}:
                          </span>{" "}
                          {entry.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
