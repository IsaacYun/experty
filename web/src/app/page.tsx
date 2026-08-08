"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Check,
  MailCheck,
  Megaphone,
  Sparkles,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionHeading } from "@/components/ui/section";
import { SiteFooter, SiteHeader } from "@/components/site-header";

const marqueeItems = [
  "KBS 갓생쇼 출연 섭외 완료",
  "기업 경영포럼 기조강연 확정",
  "YTN 생방송 패널 섭외 조율",
  "시 경제연구소 컨설팅 자문 수락",
  "월간 투자레터 인터뷰 확정",
  "상공회의소 리더십 특강 섭외 완료",
  "채널A 경제시그널 패널 출연",
  "국방 정보화 컨퍼런스 강연 확정",
];

const steps = [
  {
    title: "전용 문의 링크 오픈",
    desc: "이름과 분야만 있으면 3분 만에 전문가 페이지와 섭외 문의 링크가 생깁니다. 홈페이지가 없어도 됩니다.",
    chips: ["템플릿형 프로필", "섭외 문의 전용 페이지", "3분 오픈"],
    icon: Megaphone,
  },
  {
    title: "문의가 자동으로 정리",
    desc: "카테고리·행사명·장소·시간·예산이 구조화되어 들어옵니다. 반복적으로 되묻는 연락이 사라집니다.",
    chips: ["필수 정보 수집", "이메일 인증", "스팸 차단"],
    icon: MailCheck,
  },
  {
    title: "일정·조건 조율",
    desc: "수락한 문의가 캘린더에 바로 등록됩니다. Google Calendar 바쁨 정보와 충돌을 먼저 알려드립니다.",
    chips: ["Google 충돌 확인", "가예약 관리", "확정 일정 쓰기"],
    icon: CalendarCheck,
  },
  {
    title: "결정만 남습니다",
    desc: "섭외비 협의와 최종 판단은 전문가가 합니다. 그 앞의 모든 수집·정리·알림을 experty가 자동 처리합니다.",
    chips: ["상태별 알림", "응답 지연 재알림", "확정 안내 발송"],
    icon: Sparkles,
  },
];

const compareRows = [
  { label: "섭외 문의 창구", before: "이메일·전화·DM에 흩어짐", after: "전용 링크 하나로 수집" },
  { label: "행사 정보 수집", before: "되묻고 되묻는 연락", after: "필수 항목 자동 수집" },
  { label: "일정 확인", before: "캘린더 열어 하나씩 대조", after: "Google 바쁨 정보로 자동 경고" },
  { label: "후속 관리", before: "답장 누락·이중 예약", after: "상태 알림과 재알림 자동화" },
  { label: "비용", before: "매니저 고용 또는 대행 수수료", after: "월 0원부터 직접 운영" },
];

const plans = [
  {
    name: "Free",
    price: "0원",
    unit: "/월",
    desc: "섭외를 처음 시작하는 전문가",
    features: ["월 4건까지 문의 열람·처리", "전문가 페이지 또는 문의 전용 페이지", "기본 일정 관리"],
    cta: "무료로 시작",
    highlight: false,
  },
  {
    name: "Basic",
    price: "29,000원",
    unit: "/월",
    desc: "월 10건 미만의 문의를 받는 전문가",
    features: ["월 9건까지 문의 열람·처리", "문의 상태별 알림과 재알림", "Google Calendar 연동"],
    cta: "Basic 시작",
    highlight: true,
  },
  {
    name: "Pro",
    price: "99,000원",
    unit: "/월",
    desc: "일정이 빡빡한 전문가와 개인 비서",
    features: ["무제한 문의 열람·처리", "모든 Basic 기능 포함", "우선 지원과 전용 온보딩"],
    cta: "Pro 시작",
    highlight: false,
  },
];

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,#ffe9d5_0%,#fff8f2_45%,transparent_100%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="brand" className="px-4 py-1.5 text-sm">
              지금 experty는 <span className="text-brand-deep">소속사 없이 활동하는 전문가</span>를 위한 시스템
            </Badge>
          </motion.div>

          <motion.h1
            className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.15] text-ink-950 md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            섭외 문의,<br className="md:hidden" /> 이제 <span className="text-brand">3분</span> 만에 시작
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            이메일, 전화, DM으로 흩어지던 강연·방송·인터뷰 섭외를 한곳에서 받고,
            일정과 조건을 자동으로 정리합니다. 수수료는 평생 0원.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Link href="/kim-inman/inquiry">
              <Button size="xl">무료로 문의 링크 만들기</Button>
            </Link>
            <Link href="/kim-inman">
              <Button variant="outline" size="xl">전문가 페이지 미리보기</Button>
            </Link>
          </motion.div>

          <motion.div
            className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-ok" />
              25분 전 김인만 소장이 새 섭외 문의를 수락했어요
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-700 shadow-sm sm:flex">
              <span className="flex h-2 w-2 rounded-full bg-brand" />
              박정호 교수의 경영포럼 일정이 확정됐어요
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-line bg-surface py-5" aria-label="최근 섭외 사례">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm text-ink-700 shadow-sm"
              >
                <span className="text-brand">●</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <SectionHeading
              eyebrow="왜 experty인가요"
              title={<>일정이 많은 전문가일수록,<br />섭외 정리가 가장 큰 일입니다</>}
              desc="한 번 촬영하면 여러 채널에 공개되고, 고정 방송과 강연, 기고가 겹칩니다. 소속사가 없다면 이 정리는 전부 전문가 몫입니다."
            />
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <table className="w-full text-left text-sm md:text-[15px]">
                <thead>
                  <tr className="border-b border-line bg-surface-2">
                    <th className="px-5 py-4 font-semibold text-ink-950 md:px-8">항목</th>
                    <th className="px-5 py-4 font-semibold text-ink-500 md:px-8">지금까지</th>
                    <th className="px-5 py-4 md:px-8">
                      <span className="font-bold text-brand">experty</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-0">
                      <td className="px-5 py-4 font-medium text-ink-950 md:px-8">{row.label}</td>
                      <td className="px-5 py-4 text-ink-500 md:px-8">
                        <span className="inline-flex items-center gap-1.5">
                          <X className="h-4 w-4 shrink-0 text-ink-400" aria-hidden />
                          {row.before}
                        </span>
                      </td>
                      <td className="bg-brand-50 px-5 py-4 font-semibold text-ink-950 md:px-8">
                        <span className="inline-flex items-center gap-1.5">
                          <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                          {row.after}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section id="how" className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <SectionHeading
              eyebrow="이용 방법"
              title={<>링크 오픈부터 일정 확정까지,<br />자동으로 이어집니다</>}
              desc="전문가는 링크를 나누기만 하세요. 이후의 수집·정리·알림·일정 등록은 시스템이 담당합니다."
            />
          </FadeIn>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-white p-7 shadow-sm transition-shadow hover:shadow-md md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand-100 px-3.5 py-1 text-sm font-bold text-brand-deep">
                      STEP {i + 1}
                    </span>
                    <step.icon className="h-6 w-6 text-brand" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink-950 md:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{step.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.chips.map((chip) => (
                      <Badge key={chip} variant="soft" className="px-3 py-1.5">{chip}</Badge>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <SectionHeading
              eyebrow="요금제"
              title={<>수수료는 평생 0원,<br />문의량만큼만 선택하세요</>}
              desc="섭외 확정 여부와 상관없이 없습니다. 문의가 늘어날 때만 플랜을 올리면 됩니다."
            />
          </FadeIn>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {plans.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.08}>
                <div
                  className={
                    plan.highlight
                      ? "relative h-full rounded-3xl bg-navy-900 p-8 text-white shadow-[0_20px_50px_rgba(16,24,40,0.25)]"
                      : "h-full rounded-3xl border border-line bg-white p-8 shadow-sm"
                  }
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-8 rounded-full bg-brand px-3.5 py-1 text-xs font-bold text-white">
                      가장 많이 선택
                    </span>
                  )}
                  <div className="text-sm font-semibold opacity-70">{plan.name}</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                      {plan.price}
                    </span>
                    <span className="text-sm opacity-60">{plan.unit}</span>
                  </div>
                  <p className={plan.highlight ? "mt-2 text-sm text-white/60" : "mt-2 text-sm text-ink-500"}>
                    {plan.desc}
                  </p>
                  <ul className="mt-6 space-y-3 text-[15px]">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" aria-hidden />
                        <span className={plan.highlight ? "text-white/85" : "text-ink-700"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/kim-inman/inquiry" className="block">
                      <Button
                        variant={plan.highlight ? "primary" : "outline"}
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-center text-sm text-ink-400">
              한도 초과 문의도 계속 접수됩니다. 업그레이드 즉시 잠긴 문의를 열람할 수 있습니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[32px] bg-brand px-6 py-16 text-center md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_110%,rgba(255,255,255,0.25)_0%,transparent_60%)]"
            />
            <h2
              className="relative text-3xl font-bold leading-tight text-white md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              문의는 늘 놓치기 전에<br />미리 정리해 두는 겁니다
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-base text-white/80 md:text-lg">
              강연, 방송, 인터뷰, 컨설팅. 흩어진 섭외를 한곳에서 시작하세요.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/kim-inman/inquiry">
                <Button variant="white" size="lg">무료로 시작하기</Button>
              </Link>
              <a href="mailto:hello@experty.kr">
                <Button variant="dark" size="lg">도입 문의하기</Button>
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      <SiteFooter />
    </div>
  );
}
