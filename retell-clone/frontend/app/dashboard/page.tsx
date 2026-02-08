"use client";

import { useEffect, useState } from "react";
import { Phone, Bot, Clock, TrendingUp } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Stats {
  totalAgents: number;
  totalCalls: number;
  activeCalls: number;
  avgDuration: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalAgents: 0,
    totalCalls: 0,
    activeCalls: 0,
    avgDuration: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [agents, callsRes] = await Promise.all([
          apiClient.get("/agents"),
          apiClient.get("/calls"),
        ]);
        const calls = callsRes.calls || [];
        const active = calls.filter(
          (c: { status: string }) => c.status === "in_progress"
        );
        const completed = calls.filter(
          (c: { status: string; duration_seconds: number | null }) =>
            c.status === "completed" && c.duration_seconds
        );
        const avgDur =
          completed.length > 0
            ? completed.reduce(
                (sum: number, c: { duration_seconds: number }) =>
                  sum + c.duration_seconds,
                0
              ) / completed.length
            : 0;

        setStats({
          totalAgents: agents.length,
          totalCalls: calls.length,
          activeCalls: active.length,
          avgDuration: Math.round(avgDur),
        });
      } catch {
        // API not available yet
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Bot className="w-5 h-5" />}
          label="Total Agents"
          value={stats.totalAgents}
        />
        <StatCard
          icon={<Phone className="w-5 h-5" />}
          label="Total Calls"
          value={stats.totalCalls}
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Active Calls"
          value={stats.activeCalls}
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Avg Duration"
          value={`${stats.avgDuration}s`}
        />
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-white p-8 text-center text-[var(--muted-foreground)]">
        <p>Detailed analytics charts will appear here as call data accumulates.</p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
