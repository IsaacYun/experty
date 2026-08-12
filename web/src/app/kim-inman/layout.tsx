import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김인만 | 공식 홈페이지",
  description: "김인만 부동산경제연구소장의 공식 홈페이지입니다. 방송, 강연, 인터뷰, 컨설팅 섭외 문의를 받습니다.",
};

export default function KimInmanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
