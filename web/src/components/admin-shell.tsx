"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Inbox, Settings, TrendingUp } from "lucide-react";
import { Wordmark } from "@/components/site-header";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app/inquiries", label: "문의 관리", icon: Inbox, count: 12 },
  { href: "/app/calendar", label: "일정", icon: CalendarDays },
  { href: "#", label: "프로필·활동", icon: TrendingUp },
  { href: "#", label: "설정·구독", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh bg-surface-2 md:grid md:grid-cols-[230px_1fr]">
      <aside className="border-b border-line bg-white md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-5 md:block">
          <Link href="/" aria-label="experty 홈">
            <Wordmark />
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0" aria-label="어드민 메뉴">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href) && item.href !== "#";
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-ink-950 text-white"
                    : "text-ink-500 hover:bg-surface hover:text-ink-950"
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" aria-hidden />
                {item.label}
                {item.count && (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-xs font-bold",
                      active ? "bg-white/15 text-white" : "bg-brand-100 text-brand-deep"
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-2 hidden border-t border-line px-5 py-4 md:block">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-sm font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              김
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-ink-950">김인만</div>
              <div className="truncate text-xs text-ink-400">김인만 부동산경제연구소</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-5 py-7 md:px-8">{children}</main>
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-ink-500">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-brand" aria-hidden />}
      </div>
      <div className="mt-1.5 text-2xl font-bold tabular-nums text-ink-950" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
      {delta && <div className="mt-1 text-xs font-semibold text-emerald-600">{delta}</div>}
    </div>
  );
}
