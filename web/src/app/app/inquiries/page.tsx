"use client";

import { useState } from "react";
import { AlertTriangle, ArrowUpRight, CalendarCheck, CheckCircle2, Clock3, Lock, Send, X } from "lucide-react";
import { AdminShell, StatCard } from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "new" | "review" | "negotiate" | "accepted" | "declined" | "locked";

interface Inquiry {
  id: number;
  title: string;
  time: string;
  person: string;
  org: string;
  type: string;
  status: Status;
  note?: string;
}

const inquiries: Inquiry[] = [
  { id: 1, title: "2026 하반기 경영포럼 기조강연", time: "오늘 09:42", person: "최민지 팀장", org: "한빛금융지주", type: "강연", status: "new", note: "Google 충돌 없음" },
  { id: 2, title: "생방송 패널 섭외 — 부동산 규제 진단", time: "어제 16:10", person: "박수호 PD", org: "YTN 사이언스", type: "방송", status: "review", note: "8.14 오전 가용" },
  { id: 3, title: "사내 리더십 특강 — 자산관리 관점", time: "8.6", person: "정유진 매니저", org: "대성전자 인사팀", type: "강연", status: "negotiate" },
  { id: 4, title: "월간 투자레터 인터뷰", time: "8.5", person: "서예린 기자", org: "머니위크", type: "인터뷰", status: "accepted" },
  { id: 5, title: "경제연구소 컨설팅 자문", time: "오늘 11:20", person: "문의자 정보는 잠금 상태", org: "", type: "컨설팅", status: "locked" },
];

const statusMeta: Record<Status, { label: string; cls: string }> = {
  new: { label: "신규", cls: "bg-brand-100 text-brand-deep" },
  review: { label: "검토", cls: "bg-surface-2 text-ink-700" },
  negotiate: { label: "협상", cls: "bg-amber-50 text-amber-600" },
  accepted: { label: "수락", cls: "bg-emerald-50 text-emerald-600" },
  declined: { label: "거절", cls: "bg-red-50 text-red-600" },
  locked: { label: "잠금", cls: "bg-surface-2 text-ink-400" },
};

const pipeline = ["신규", "검토", "협상", "수락/거절", "완료/취소"];

const detail = {
  title: "2026 하반기 경영포럼 기조강연",
  person: "최민지 팀장",
  org: "한빛금융지주",
  email: "cm.choi@hanbitfg.co.kr",
  fields: [
    ["섭외 유형", "강연 · 오프라인"],
    ["희망 일시", "9월 18일(금) 10:00 · 대체 가능"],
    ["장소", "서울 여의도 콘래드호텔 그랜드볼룸"],
    ["진행 시간", "1시간 30분 (Q&A 포함)"],
    ["청중", "200~500명 · 금융권 임직원"],
    ["예산", "300~500만원"],
    ["희망 주제", "하반기 부동산 시장 전망과 자산 포트폴리오 전략"],
    ["특이사항", "촬영·녹화 예정 · 녹화본 사내 아카이브 활용 희망"],
  ],
  request:
    "매년 하반기에 개최하는 경영포럼의 기조강연자를 찾고 있습니다. 임직원 300명 내외가 참석하며, 금리·정책 변화가 자산시장에 미치는 영향과 대응 전략을 다뤄주시면 좋겠습니다. 강연 후 30분 패널 토론과 녹화본 아카이브 활용을 함께 희망합니다.",
};

export default function InquiriesPage() {
  const [selected, setSelected] = useState(1);
  const [filter, setFilter] = useState("전체");

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-950" style={{ fontFamily: "var(--font-display)" }}>문의 관리</h1>
          <p className="mt-1 text-sm text-ink-500">김인만 전문가 공간 · 2026년 8월 · 유효 문의 4/4건 사용</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-4 py-2 text-sm">플랜: <span className="font-bold text-ink-950">Free</span> · 4/4건</Badge>
          <Button size="sm">Basic으로 업그레이드 <ArrowUpRight className="h-4 w-4" aria-hidden /></Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="신규 문의" value="3건" delta="이번 주 +3" icon={Send} />
        <StatCard label="평균 응답 시간" value="6.5시간" delta="지난주 대비 -1.2시간" icon={Clock3} />
        <StatCard label="섭외 확정" value="2건" delta="8월 누적 섭외비 750만원" icon={CheckCircle2} />
        <StatCard label="확정된 일정" value="5건" delta="다음: 8.12 기업 포럼" icon={CalendarCheck} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        {/* List */}
        <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm" aria-label="문의 목록">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <strong className="text-sm text-ink-950">문의 12건</strong>
            <div className="flex gap-1.5" role="group" aria-label="상태 필터">
              {["전체", "신규", "확정"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn(
                    "rounded-full border px-3.5 py-1 text-xs font-semibold transition-colors",
                    filter === f
                      ? "border-ink-950 bg-ink-950 text-white"
                      : "border-line bg-white text-ink-500 hover:border-ink-400"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {inquiries.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelected(q.id)}
              className={cn(
                "block w-full border-b border-line px-5 py-4 text-left transition-colors last:border-0",
                selected === q.id ? "bg-brand-50 shadow-[inset_3px_0_0_var(--color-brand)]" : "hover:bg-surface",
                q.status === "locked" && "opacity-80"
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold text-ink-950 text-[15px]">{q.title}</span>
                <time className="shrink-0 text-xs text-ink-400 tabular-nums">{q.time}</time>
              </div>
              <div className="mt-1 text-[13px] text-ink-500">{q.person}{q.org && ` · ${q.org}`}</div>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", statusMeta[q.status].cls)}>
                  {statusMeta[q.status].label}
                </span>
                <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-xs font-medium text-ink-500">{q.type}</span>
                {q.note && (
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", q.note.includes("가용") ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600")}>
                    {q.note}
                  </span>
                )}
                {q.status === "locked" && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                    <Lock className="h-3.5 w-3.5" aria-hidden /> Basic으로 업그레이드하면 열람됩니다
                  </span>
                )}
              </div>
            </button>
          ))}
        </section>

        {/* Detail */}
        <section className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8" aria-label="문의 상세">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink-950">{detail.title}</h2>
              <p className="mt-1 text-sm text-ink-500">{detail.org} · {detail.person} ({detail.email})</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><X className="h-4 w-4" aria-hidden /> 거절</Button>
              <Button size="sm"><CheckCircle2 className="h-4 w-4" aria-hidden /> 수락하고 일정 만들기</Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5" aria-label="문의 상태">
            {pipeline.map((stage, i) => (
              <span
                key={stage}
                className={cn(
                  "min-w-20 flex-1 rounded-lg px-2 py-2 text-center text-xs font-semibold",
                  i === 0 && "bg-emerald-50 text-emerald-600",
                  i === 1 && "bg-brand text-white",
                  i > 1 && "bg-surface-2 text-ink-400"
                )}
              >
                {stage}
              </span>
            ))}
          </div>

          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {detail.fields.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[13px] text-ink-500">{k}</dt>
                <dd className="mt-0.5 text-[15px] font-semibold text-ink-950">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-2xl bg-surface p-5">
            <div className="mb-2 text-[13px] font-semibold text-ink-500">요청 내용</div>
            <p className="text-[15px] leading-relaxed text-ink-700">{detail.request}</p>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-line bg-white p-4">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-amber-500" aria-hidden />
            <p className="text-[13px] leading-relaxed text-ink-500">
              Free 플랜의 4건 한도를 모두 사용했습니다. 새 문의는 접수되지만 상세 정보는 잠깁니다.
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <input
              className="h-11 flex-1 rounded-xl border border-line bg-white px-4 text-sm placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
              placeholder="메모 추가 (예) 9월 3주차 금요일 오전 가능, 교통 지원 확인"
              aria-label="메모 입력"
            />
            <Button variant="outline" size="sm" className="h-11">저장</Button>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
