"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={cn("text-xl font-bold tracking-tight", light ? "text-white" : "text-ink-950")}
      style={{ fontFamily: "var(--font-logo)" }}
    >
      experty<span className="text-brand">.</span>
    </span>
  );
}

export function SiteHeader({ light = false }: { light?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const useLightText = light && !scrolled;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-white/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px]">
        <Link href="/" aria-label="experty 홈">
          <Wordmark light={useLightText} />
        </Link>
        <nav className={cn("hidden items-center gap-8 text-[15px] font-medium md:flex", useLightText ? "text-white/70" : "text-ink-700")}>
          <Link href="/#why" className={cn(useLightText ? "hover:text-white" : "hover:text-ink-950")}>왜 experty</Link>
          <Link href="/#how" className={cn(useLightText ? "hover:text-white" : "hover:text-ink-950")}>이용 방법</Link>
          <Link href="/#pricing" className={cn(useLightText ? "hover:text-white" : "hover:text-ink-950")}>요금제</Link>
          <Link href="/kim-inman" className={cn(useLightText ? "hover:text-white" : "hover:text-ink-950")}>전문가 페이지</Link>
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/app/inquiries">
            <Button variant="ghost" size="sm" className={cn(useLightText && "text-white hover:bg-white/10 hover:text-white")}>로그인</Button>
          </Link>
          <Link href="/kim-inman/inquiry">
            <Button size="sm">섭외 문의</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              소속사 없이 활동하는 일정 많은 전문가를 위한 자동 섭외 관리 시스템.
              문의부터 일정 확정까지 자동으로.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm md:grid-cols-3">
            <div>
              <div className="mb-3 font-semibold text-ink-950">제품</div>
              <ul className="space-y-2 text-ink-500">
                <li><Link href="/#why" className="hover:text-brand">왜 experty</Link></li>
                <li><Link href="/#pricing" className="hover:text-brand">요금제</Link></li>
                <li><Link href="/kim-inman" className="hover:text-brand">전문가 페이지</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-semibold text-ink-950">문의</div>
              <ul className="space-y-2 text-ink-500">
                <li><Link href="/kim-inman/inquiry" className="hover:text-brand">섭외 문의</Link></li>
                <li><a href="mailto:hello@experty.kr" className="hover:text-brand">hello@experty.kr</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-semibold text-ink-950">정책</div>
              <ul className="space-y-2 text-ink-500">
                <li><a href="#" className="hover:text-brand">이용약관</a></li>
                <li><a href="#" className="hover:text-brand">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6 text-xs text-ink-400">
          © 2026 experty. 전문가를 위한 자동 섭외 관리.
        </div>
      </div>
    </footer>
  );
}
