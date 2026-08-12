"use client";

import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, CalendarPlus, ChevronLeft, ChevronRight, Plus, Repeat2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EventKind = "booked" | "hold" | "direct" | "inquiry" | "blocked";
type CalendarEvent = { id: number; day: number; title: string; time: string; kind: EventKind; sub?: string; recurring?: boolean; conflict?: boolean };

const seededEvents: CalendarEvent[] = [
  { id: 1, day: 3, time: "10:00", title: "사내 리더십 특강", sub: "대성전자 · 확정", kind: "booked" },
  { id: 2, day: 6, time: "오전", title: "개인 일정", sub: "직접 입력", kind: "direct" },
  { id: 3, day: 12, time: "15:00", title: "기업 포럼 강연", sub: "경기상공회의소 · 확정", kind: "booked" },
  { id: 4, day: 12, time: "16:30", title: "경영포럼 섭외 검토", sub: "한빛금융지주 문의", kind: "inquiry" },
  { id: 5, day: 14, time: "19:00", title: "방송 출연 가예약", sub: "YTN 패널 · 조건 조율", kind: "hold" },
  { id: 6, day: 18, time: "09:00", title: "월요일 오전 개인 시간", sub: "매주 반복", kind: "blocked", recurring: true },
  { id: 7, day: 21, time: "13:00", title: "이동 불가", sub: "일회성 일정 블록", kind: "blocked" },
  { id: 8, day: 28, time: "10:00", title: "포럼 가예약", sub: "Google 일정과 겹침", kind: "hold", conflict: true },
];

const eventClass: Record<EventKind, string> = {
  booked: "border-emerald-200 bg-emerald-50 text-emerald-700",
  hold: "border-amber-200 bg-amber-50 text-amber-700",
  direct: "border-slate-200 bg-slate-50 text-slate-600",
  inquiry: "border-orange-200 bg-brand-50 text-brand-deep",
  blocked: "border-dashed border-slate-300 bg-slate-100 text-slate-500",
};

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

export function MonthlyCalendar() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [events, setEvents] = useState(seededEvents);
  const [selectedDay, setSelectedDay] = useState(12);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blockType, setBlockType] = useState<"repeat" | "once">("repeat");
  const [blockName, setBlockName] = useState("개인 일정");

  const month = useMemo(() => new Date(2026, 7 + monthOffset, 1), [monthOffset]);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leading = month.getDay();
  const cells = Array.from({ length: Math.ceil((leading + daysInMonth) / 7) * 7 }, (_, index) => index - leading + 1);
  const selectedEvents = events.filter((event) => event.day === selectedDay);

  function addBlock() {
    setEvents((current) => [
      ...current,
      {
        id: Date.now(),
        day: blockType === "once" ? selectedDay : 25,
        time: blockType === "once" ? "09:00" : "매주 월",
        title: blockName || "개인 일정",
        sub: blockType === "once" ? "일회성 일정 블록" : "매주 반복",
        kind: "blocked",
        recurring: blockType === "repeat",
      },
    ]);
    setDialogOpen(false);
    setBlockName("개인 일정");
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-brand">KIM INMAN · SCHEDULE</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.045em] text-ink-950">월간 일정</h1>
          <p className="mt-1 text-sm text-ink-500">섭외 일정과 응답 불가 시간을 한 달 단위로 확인합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setMonthOffset((value) => value - 1)} aria-label="이전 달"><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => setMonthOffset(0)}>오늘</Button>
          <Button variant="outline" size="sm" onClick={() => setMonthOffset((value) => value + 1)} aria-label="다음 달"><ChevronRight className="h-4 w-4" /></Button>
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild><Button size="sm"><Plus className="h-4 w-4" /> 일정 블록</Button></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink-950/45 backdrop-blur-sm" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4"><div><Dialog.Title className="text-xl font-bold text-ink-950">응답 불가 시간 추가</Dialog.Title><Dialog.Description className="mt-1 text-sm text-ink-500">개인 일정은 섭외 수락 시 충돌로 표시됩니다.</Dialog.Description></div><Dialog.Close className="rounded-full p-2 text-ink-400 hover:bg-surface"><X className="h-5 w-5" /></Dialog.Close></div>
                <div className="mt-6 flex gap-2" role="group" aria-label="일정 블록 유형">
                  {[{ value: "repeat", label: "반복" }, { value: "once", label: "일회성" }].map((item) => <button key={item.value} type="button" onClick={() => setBlockType(item.value as "repeat" | "once")} className={cn("flex-1 rounded-xl border px-4 py-3 text-sm font-bold", blockType === item.value ? "border-brand bg-brand text-white" : "border-line text-ink-500")}>{item.label}</button>)}
                </div>
                <label className="mt-5 block text-sm font-semibold text-ink-950">블록 이름<input value={blockName} onChange={(event) => setBlockName(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-line px-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-brand" /></label>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-surface p-4"><b className="block text-ink-950">{blockType === "repeat" ? "매주 월요일" : `8월 ${selectedDay}일`}</b><span className="mt-1 block text-ink-500">09:00 – 12:00</span></div><div className="rounded-xl bg-surface p-4"><b className="block text-ink-950">섭외 처리</b><span className="mt-1 block text-ink-500">충돌 경고 표시</span></div></div>
                <Button className="mt-6 w-full" onClick={addBlock}><CalendarPlus className="h-4 w-4" /> 일정 블록 저장</Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><h2 className="text-xl font-bold text-ink-950">{year}년 {monthIndex + 1}월</h2><span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-500">Asia/Seoul</span></div><div className="flex items-center gap-4 text-xs font-semibold text-ink-500"><span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />확정</span><span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-amber-400" />가예약</span><span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-slate-400" />일정 블록</span></div></div>

      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm"><div className="grid grid-cols-7 border-b border-line bg-surface px-2">{weekdays.map((day) => <div key={day} className="px-2 py-3 text-center text-xs font-bold text-ink-400">{day}</div>)}</div><div className="grid grid-cols-7">{cells.map((day, index) => { const inMonth = day > 0 && day <= daysInMonth; const dayEvents = inMonth ? events.filter((event) => event.day === day) : []; return <button key={index} type="button" disabled={!inMonth} onClick={() => setSelectedDay(day)} className={cn("min-h-32 border-b border-r border-line p-2 text-left transition-colors last:border-r-0 hover:bg-brand-50/50", !inMonth && "bg-surface/60", selectedDay === day && "bg-brand-50 ring-1 ring-inset ring-brand/30")}><span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold", selectedDay === day ? "bg-brand text-white" : "text-ink-700")}>{inMonth ? day : ""}</span><div className="mt-1.5 space-y-1">{dayEvents.slice(0, 3).map((event) => <span key={event.id} className={cn("block truncate rounded-md border px-1.5 py-1 text-[10px] font-bold", eventClass[event.kind])}>{event.recurring && <Repeat2 className="mr-1 inline h-2.5 w-2.5" />}{event.time} {event.title}</span>)}{dayEvents.length > 3 && <span className="block px-1 text-[10px] font-bold text-ink-400">+{dayEvents.length - 3}개 더보기</span>}</div></button>})}</div></div>

      <section className="mt-5 rounded-3xl border border-line bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-brand">{monthIndex + 1}월 {selectedDay}일</p><h2 className="mt-1 text-lg font-bold text-ink-950">선택 날짜 상세</h2></div><span className="text-sm text-ink-400">{selectedEvents.length}개 일정</span></div><div className="mt-4 grid gap-2 md:grid-cols-2">{selectedEvents.length ? selectedEvents.map((event) => <div key={event.id} className={cn("rounded-2xl border p-4", eventClass[event.kind])}><div className="flex justify-between gap-3"><b>{event.title}</b><span className="shrink-0 text-xs font-bold">{event.time}</span></div><p className="mt-1 text-xs opacity-80">{event.sub}</p>{event.conflict && <p className="mt-2 flex items-center gap-1 text-xs font-bold text-red-600"><AlertTriangle className="h-3.5 w-3.5" /> 다른 일정과 겹칩니다</p>}</div>) : <div className="rounded-2xl bg-surface p-5 text-sm text-ink-500">등록된 일정이 없습니다. 일회성 일정 블록을 추가할 수 있습니다.</div>}</div></section>
    </div>
  );
}
