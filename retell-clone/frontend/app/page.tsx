import Link from "next/link";
import { Phone, Bot, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        Welcome to your voice AI platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          href="/agents"
          icon={<Bot className="w-8 h-8 text-[var(--primary)]" />}
          title="Agents"
          description="Create and manage your voice AI agents."
          stat="0 active"
        />
        <DashboardCard
          href="/calls"
          icon={<Phone className="w-8 h-8 text-[var(--primary)]" />}
          title="Calls"
          description="View call history, transcripts, and recordings."
          stat="0 today"
        />
        <DashboardCard
          href="/dashboard"
          icon={<BarChart3 className="w-8 h-8 text-[var(--primary)]" />}
          title="Analytics"
          description="Monitor usage, performance, and costs."
          stat="—"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  href,
  icon,
  title,
  description,
  stat,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-[var(--border)] bg-white p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-sm text-[var(--muted-foreground)]">{stat}</span>
      </div>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </Link>
  );
}
