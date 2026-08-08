"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/section";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { BookOpen, CalendarDays, Mic, Newspaper, Radio } from "lucide-react";

const activities = [
  { date: "08.05", title: "KBS 1라디오 갓생쇼 — 부동산 대토론회·전세난 해설", meta: "방송 출연 · 라디오", icon: Radio },
  { date: "07.24", title: "「하반기 서울 아파트 시장 전망」 기업 포럼 강연", meta: "강연 · 경기상공회의소", icon: Mic },
  { date: "07.18", title: "할터뷰 — 매매·전세·월세 전망 대담", meta: "유튜브 출연", icon: CalendarDays },
  { date: "07.14", title: "KBS 사사건건 — 부동산 정책 전방위 분석 토론", meta: "방송 출연 · TV", icon: Radio },
  { date: "06.24", title: "「변동성의 시대 속, 부동산 경제 전망」 충남경제포럼 특강", meta: "강연 · 아산", icon: Mic },
  { date: "05.30", title: "저서 『서울 아파트 투자 지도』 개정판 출간", meta: "저서", icon: BookOpen },
];

const topics = [
  { title: "부동산 정책과 시장 전망", desc: "규제·세제·공급 정책이 실수요자에게 미치는 영향과 분기별 시장 시나리오" },
  { title: "자산가 대상 시장 전략", desc: "고액 자산가의 보유·매도·증여 타이밍 판단 기준" },
  { title: "실수요자 내 집 마련 전략", desc: "청약·매매·전월세 선택 프레임워크, 지역 분석 방법" },
  { title: "방송·미디어 부동산 해설", desc: "뉴스 속 부동산 이슈를 짧은 시간에 이해시키는 패널·기고" },
];

const steps = ["문의 작성", "접수 확인", "조건 조율", "일정 확정"];

export default function ExpertPage() {
  return (
    <div className="overflow-x-clip">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-14 md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(55%_70%_at_50%_0%,#ffe9d5_0%,#fff8f2_50%,transparent_100%)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <FadeIn>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-navy-900 text-4xl font-bold text-white shadow-lg" style={{ fontFamily: "var(--font-display)" }}>
              김
            </div>
            <h1 className="mt-6 text-3xl font-bold text-ink-950 md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              김인만
            </h1>
            <p className="mt-3 text-base text-ink-500 md:text-lg">부동산경제연구소장 · 부동산 시장 분석 전문가</p>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-700">
              정부 정책·금리·세제가 서울과 수도권 아파트 가격에 미치는 영향을 현장에서 해석해 드립니다.
              방송 출연과 기업 강연을 병행하고 있습니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/kim-inman/inquiry">
                <Button size="lg">섭외 문의하기</Button>
              </Link>
              <Badge variant="ok" className="px-4 py-1.5 text-sm">섭외 가능</Badge>
              <Badge variant="outline" className="px-4 py-1.5 text-sm">평균 응답 24시간 이내</Badge>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Activities */}
      <section className="mx-auto max-w-3xl px-5 py-14">
        <FadeIn>
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink-950" style={{ fontFamily: "var(--font-display)" }}>최근 활동</h2>
            <span className="flex items-center gap-1.5 text-sm text-ink-400"><Newspaper className="h-4 w-4" aria-hidden />최근 3개월</span>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
            {activities.map((a) => (
              <div key={a.title} className="flex items-start gap-4 border-b border-line px-6 py-5 last:border-0 hover:bg-brand-50/60 transition-colors">
                <span className="w-12 shrink-0 pt-0.5 text-sm font-semibold text-ink-400 tabular-nums">{a.date}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-ink-950">{a.title}</div>
                  <div className="mt-1 text-sm text-ink-500">{a.meta}</div>
                </div>
                <a.icon className="mt-1 h-4.5 w-4.5 shrink-0 text-brand" aria-hidden />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Topics */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-3xl px-5">
          <FadeIn>
            <h2 className="mb-7 text-2xl font-bold text-ink-950" style={{ fontFamily: "var(--font-display)" }}>섭외 가능한 주제</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {topics.map((t) => (
                <div key={t.title} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-ink-950">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{t.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Steps + CTA */}
      <section className="mx-auto max-w-3xl px-5 py-14">
        <FadeIn>
          <h2 className="mb-7 text-2xl font-bold text-ink-950" style={{ fontFamily: "var(--font-display)" }}>섭외 문의 절차</h2>
          <div className="grid gap-3 sm:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s} className="rounded-3xl border border-line bg-white p-5 text-center shadow-sm">
                <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</span>
                <div className="mt-3 text-sm font-semibold text-ink-950">{s}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-12 text-center">
          <Link href="/kim-inman/inquiry">
            <Button size="xl">섭외 문의하기</Button>
          </Link>
          <p className="mt-4 text-sm text-ink-400">방송 · 강연 · 인터뷰 · 컨설팅 섭외를 희망하시면 문의해 주세요.</p>
        </FadeIn>
      </section>

      <SiteFooter />
    </div>
  );
}
