"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Globe2, Inbox, LayoutPanelTop, Settings2, type LucideIcon } from "lucide-react";
import { Wordmark } from "@/components/site-header";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon; count?: number };

const expertNavItems: NavItem[] = [
  { href: "/expert-admin/kim-inman/inquiries", label: "문의 관리", icon: Inbox, count: 12 },
  { href: "/expert-admin/kim-inman/calendar", label: "월간 일정", icon: CalendarDays },
  { href: "/expert-admin/kim-inman/profile", label: "홈페이지·활동", icon: LayoutPanelTop },
  { href: "/expert-admin/kim-inman/domain", label: "도메인 연결", icon: Globe2 },
];

const platformNavItems: NavItem[] = [
  { href: "/platform-admin", label: "전문가 운영", icon: Settings2 },
];

export function AdminShell({ children, platform = false }: { children: React.ReactNode; platform?: boolean }) {
  const pathname = usePathname();
  const navItems = platform ? platformNavItems : expertNavItems;

  return (
    <div className="min-h-dvh bg-[#f4f4f2] md:grid md:grid-cols-[248px_1fr]">
      <aside className="border-b border-white/10 bg-navy-900 text-white md:border-b-0 md:border-r md:border-r-white/10">
        <div className="flex items-center justify-between px-5 py-5 md:block">
          <Link href="/" aria-label="experty 홈">
            <Wordmark light />
          </Link>
          <span className="hidden rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/60 md:inline-flex">{platform ? "PLATFORM" : "KIM INMAN"}</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0" aria-label="어드민 메뉴">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand text-white shadow-[0_10px_24px_rgba(255,91,0,.24)]"
                    : "text-white/55 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" aria-hidden />
                {item.label}
                {item.count && (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-xs font-bold",
                      active ? "bg-white/20 text-white" : "bg-white/10 text-white/75"
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-2 hidden border-t border-white/10 px-5 py-4 md:block">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              김
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">{platform ? "Experty 운영팀" : "김인만"}</div>
              <div className="truncate text-xs text-white/45">{platform ? "Platform administrator" : "김인만 부동산경제연구소"}</div>
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
