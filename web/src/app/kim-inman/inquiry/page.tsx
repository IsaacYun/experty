"use client";

import { useState } from "react";
import Link from "next/link";
import * as LabelPrimitive from "@radix-ui/react-label";
import { CheckCircle2, MailCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FadeIn } from "@/components/ui/section";
import { Wordmark } from "@/components/site-header";
import { cn } from "@/lib/utils";

const inquiryTypes = ["강연", "방송", "인터뷰", "컨설팅", "기타"];

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <LabelPrimitive.Root className="mb-2 block text-sm font-semibold text-ink-950">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </LabelPrimitive.Root>
      {children}
      {hint && <p className="mt-1.5 text-[13px] text-ink-400">{hint}</p>}
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1";

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("강연");

  if (submitted) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-brand-50 px-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
          <CheckCircle2 className="h-8 w-8 text-brand" aria-hidden />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-ink-950 md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          문의가 접수됐습니다
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
          확인 메일을 보내드렸어요. 이메일 인증을 완료하면 전문가에게 즉시 전달되며, 보통 24시간 이내에 회신을 드립니다.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/kim-inman">
            <Button variant="outline">전문가 프로필로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-brand-50">
      <header className="border-b border-white/60 bg-brand-50/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5">
          <Link href="/" aria-label="experty 홈"><Wordmark /></Link>
          <Link href="/kim-inman" className="text-sm font-medium text-ink-500 hover:text-brand">
            프로필로 돌아가기
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10 md:py-14">
        <FadeIn>
          <div className="mb-8 flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              김
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink-950 md:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                김인만 소장에게 섭외 문의하기
              </h1>
              <p className="mt-1 text-sm text-ink-500">방송 · 강연 · 인터뷰 · 컨설팅 문의를 받습니다.</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-9"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <Field label="섭외 유형" required>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="섭외 유형">
                {inquiryTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    aria-pressed={type === t}
                    className={cn(
                      "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                      type === t
                        ? "border-brand bg-brand text-white shadow-[0_4px_12px_rgba(255,88,0,0.3)]"
                        : "border-line bg-white text-ink-700 hover:border-brand hover:text-brand"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="행사·프로그램명" required>
              <input className={inputCls} placeholder="예) 2026 하반기 경영포럼, 사내 리더십 특강" required />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="희망 일시" required hint="정확하지 않아도 됩니다">
                <input type="date" className={inputCls} required />
              </Field>
              <Field label="시작 시간">
                <input type="time" className={inputCls} defaultValue="10:00" />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="진행 방식" required>
                <Select defaultValue="onsite">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">오프라인</SelectItem>
                    <SelectItem value="online">온라인</SelectItem>
                    <SelectItem value="hybrid">온·오프라인 혼합</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="예상 진행 시간">
                <Select defaultValue="60">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30분 이내</SelectItem>
                    <SelectItem value="60">1시간</SelectItem>
                    <SelectItem value="90">1시간 30분</SelectItem>
                    <SelectItem value="120">2시간 이상</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="장소" required>
              <input className={inputCls} placeholder="오프라인은 주소, 온라인은 플랫폼명을 적어주세요" required />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="청중 규모">
                <Select defaultValue="50-200">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50">50명 미만</SelectItem>
                    <SelectItem value="50-200">50~200명</SelectItem>
                    <SelectItem value="200-500">200~500명</SelectItem>
                    <SelectItem value="over-500">500명 이상</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="예산" required hint="‘협의 필요’를 선택해도 문의 가능합니다">
                <Select defaultValue="tbd">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tbd">협의 필요</SelectItem>
                    <SelectItem value="under-100">100만원 미만</SelectItem>
                    <SelectItem value="100-300">100~300만원</SelectItem>
                    <SelectItem value="300-500">300~500만원</SelectItem>
                    <SelectItem value="over-500">500만원 이상</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="희망 주제">
              <input className={inputCls} placeholder="예) 하반기 부동산 시장 전망과 투자 전략" />
            </Field>

            <div className="my-8 border-t border-line" />

            <Field label="이름" required>
              <input className={inputCls} autoComplete="name" required />
            </Field>
            <Field label="소속" required>
              <input className={inputCls} autoComplete="organization" required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="이메일" required hint="인증 메일이 발송됩니다">
                <input type="email" className={inputCls} autoComplete="email" required />
              </Field>
              <Field label="연락처" required>
                <input type="tel" className={inputCls} placeholder="010-0000-0000" autoComplete="tel" required />
              </Field>
            </div>

            <Field label="요청 내용" required>
              <textarea
                className="min-h-28 w-full rounded-xl border border-line bg-white p-4 text-[15px] text-ink-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
                placeholder="행사 성격, 참석자 특성, 섭외 배경 등 알려주고 싶은 내용을 자유롭게 적어주세요."
                required
              />
            </Field>

            <div className="mb-6 flex flex-wrap gap-4 text-sm text-ink-700">
              <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-brand" />교통·숙박 지원 가능</label>
              <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-brand" />촬영·녹화·2차 활용 예정</label>
            </div>

            <label className="mb-7 flex cursor-pointer items-start gap-2.5 rounded-2xl bg-surface p-4 text-[13px] leading-relaxed text-ink-500">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-brand" required />
              섭외 문의 처리를 위해 개인정보(이름, 소속, 이메일, 연락처) 수집·이용에 동의합니다. 수집된 정보는 문의 처리 후 보유 기간 경과 시 파기됩니다.
            </label>

            <Button type="submit" size="lg" className="w-full">
              <MailCheck className="h-5 w-5" aria-hidden /> 문의 접수하기
            </Button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[13px] text-ink-400">
              <Badge variant="outline">보안 전송</Badge> 이메일 인증을 완료해야 문의가 접수됩니다
            </p>
          </form>
        </FadeIn>
      </main>
    </div>
  );
}
