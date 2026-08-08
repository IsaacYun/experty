import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "experty — 소속사 없이 활동하는 전문가를 위한 자동 섭외 관리",
  description:
    "흩어진 섭외 문의를 한곳에서 받고, 일정과 조건을 자동으로 정리하는 전문가 전용 섭외 관리 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased tracking-tight">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
