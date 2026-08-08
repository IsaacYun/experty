"use client";

import { AlertTriangle, ChevronLeft, ChevronRight, Plus, RefreshCw } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DayEvent {
  time: string;
  title: string;
  sub?: string;
  kind: "booked" | "hold" | "personal" | "inquiry";
  conflict?: boolean;
}

const week: { day: number; dow: string; today?: boolean; events: DayEvent[] }[] = [
  { day: 10, dow: "월", events: [{ time: "10:00", title: "사내 리더십 특강", sub: "대성전자 · 확정", kind: "booked" }] },
  { day: 11, dow: "화", events: [{ time: "14:00", title: "개인 일정 (Google)", sub: "바쁨으로만 표시", kind: "personal" }] },
  { day: 12, dow: "수", today: true, events: [{ time: "15:00", title: "기업 포럼 강연", sub: "경기상공회의소 · 확정", kind: "booked" }, { time: "16:30", title: "경영포럼 섭외 검토", sub: "한빛금융지주 문의", kind: "inquiry" }] },
  { day: 13, dow: "목", events: [{ time: "오전", title: "개인 일정 (Google)", sub: "바쁨으로만 표시", kind: "personal" }, { time: "19:00", title: "방송 출연 미확정", sub: "YTN 패널 · 가예약", kind: "hold" }] },
  { day: 14, dow: "금", events: [{ time: "11:00", title: "머니위크 인터뷰", sub: "서면+전화 · 확정", kind: "booked" }] },
  { day: 15, dow: "토", events: [{ time: "10:00", title: "포럼 가예약", sub: "조건 조율 중", kind: "hold", conflict: true }] },
  { day: 16, dow: "일", events: [] },
];

const eventCls: Record<DayEvent["kind"], string> = {
  booked: "border-emerald-200 bg-emerald-50 text-emerald-700",
  hold: "border-amber-200 bg-amber-50 text-amber-700",
  personal: "border-line bg-surface text-ink-500",
  inquiry: "border-orange-200 bg-brand-50 text-brand-deep",
};

export default function CalendarPage() {
  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-950" style={{ fontFamily: "var(--font-display)" }}>일정</h1>
          <p className="mt-1 text-sm text-ink-500">2026년 8월 10일 ~ 8월 16일 · 직접 일정과 섭외 일정을 함께 관리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" aria-label="이전 주"><ChevronLeft className="h-4 w-4" aria-hidden /></Button>
          <Button variant="outline" size="sm" aria-label="다음 주"><ChevronRight className="h-4 w-4" aria-hidden /></Button>
          <Button size="sm"><Plus className="h-4 w-4" aria-hidden /> 직접 일정 추가</Button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-ink-950">주간 보기</h2>
        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13px] text-ink-500">
          <span className="flex h-2 w-2 rounded-full bg-ok" aria-hidden />
          Google Calendar 연결됨 · 기존 일정은 바쁨 여부만 사용 · 확정 섭외는 Google에 등록됩니다
          <RefreshCw className="h-3.5 w-3.5 text-ink-400" aria-hidden />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7" role="list" aria-label="주간 일정">
        {week.map((d) => (
          <div
            key={d.day}
            role="listitem"
            className={cn(
              "flex min-h-56 flex-col rounded-3xl border bg-white shadow-sm",
              d.today ? "border-brand ring-1 ring-brand/30" : "border-line"
            )}
          >
            <header className={cn("border-b border-line px-4 py-3 text-sm", d.today && "text-brand")}>
              <b className="text-base tabular-nums">{d.day}</b>
              <span className="ml-1.5 text-ink-500">{d.dow}</span>
              {d.today && <span className="ml-1.5 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-deep">오늘</span>}
            </header>
            <div className="flex flex-1 flex-col gap-2 p-2.5">
              {d.events.map((e, i) => (
                <div key={i} className={cn("rounded-xl border px-3 py-2.5 text-[13px]", eventCls[e.kind])}>
                  <time className="block text-xs font-bold tabular-nums">{e.time}</time>
                  <span className="mt-0.5 block font-semibold leading-snug">{e.title}</span>
                  {e.sub && <span className="mt-0.5 block text-xs opacity-80">{e.sub}</span>}
                  {e.conflict && (
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[11px] font-bold text-red-600">
                      <AlertTriangle className="h-3 w-3" aria-hidden /> Google 일정과 겹침
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-5 text-[13px] text-ink-500" aria-label="범례">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden /> 확정 섭외 — Google Calendar에 등록</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden /> 가예약 — 조건 조율 중</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-soft" aria-hidden /> 문의 기반 검토</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ink-400/50" aria-hidden /> 개인/기존 일정 — 바쁨 여부만 표시</span>
      </div>
    </AdminShell>
  );
}
