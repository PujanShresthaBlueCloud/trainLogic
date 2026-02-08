"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Phone, BarChart3 } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/calls", label: "Calls", icon: Phone },
  { href: "/dashboard", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-[var(--border)] bg-white flex flex-col">
      <div className="p-5 border-b border-[var(--border)]">
        <h1 className="text-lg font-bold tracking-tight">Retell Clone</h1>
        <p className="text-xs text-[var(--muted-foreground)]">Voice AI Platform</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--primary)] font-medium"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)]">
        Open Source &middot; v0.1.0
      </div>
    </aside>
  );
}
