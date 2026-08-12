export type ExpertActivityType = "영상" | "기사" | "도서" | "강연";

export type ExpertActivity = {
  date: string;
  type: ExpertActivityType;
  title: string;
  description: string;
  sourceName: string;
  sourceUrl?: string;
  thumbnail?: {
    src: string;
    alt: string;
  };
};

export type ExpertProfile = {
  slug: string;
  name: string;
  brandName?: string;
  title: string;
  specialty: string;
  category: string;
  bio: string;
  responseTime: string;
  areas: string[];
  bookingFormats: string[];
  topics: Array<{ title: string; description: string }>;
  profileImage?: {
    src: string;
    alt: string;
    sourceName: string;
    sourceUrl: string;
  };
  activities: ExpertActivity[];
};

export const experts: Record<string, ExpertProfile> = {
  "kim-inman": {
    slug: "kim-inman",
    name: "김인만",
    brandName: "김인만",
    title: "부동산경제연구소장",
    specialty: "부동산 시장 분석 전문가",
    category: "REAL ESTATE ECONOMY",
    bio: "정부 정책·금리·세제가 서울과 수도권 아파트 가격에 미치는 영향을 현장에서 해석합니다. 방송 출연과 기업 강연을 병행하며, 시장을 움직이는 숫자와 변화를 쉽게 전달합니다.",
    responseTime: "평균 응답 24시간 이내",
    areas: ["부동산·경제", "서울·전국"],
    bookingFormats: ["기업 포럼·강연", "방송·미디어 출연", "인터뷰·기고", "컨설팅·자문"],
    profileImage: {
      src: "https://static.heraldcorp.com/wbazic/moneyfesta/2025/img/img_spk_05.jpg",
      alt: "헤럴드 머니페스타 2025 연사 소개에 수록된 김인만 부동산연구소 대표 프로필 사진",
      sourceName: "헤럴드 머니페스타 2025",
      sourceUrl: "https://heraldmoneyfesta.heraldcorp.com/home2025/program/speaker.php",
    },
    activities: [
      {
        date: "2024.06.22",
        type: "영상",
        title: "이상 신호 나타난 부동산 시장 — 경읽남과 토론합시다",
        description: "부동산 시장의 흐름과 리스크를 토론 형식으로 짚었습니다.",
        sourceName: "경제 읽어주는 남자(김광석TV)",
        sourceUrl: "https://www.youtube.com/watch?v=FVZMdGFNOkA",
        thumbnail: {
          src: "https://i.ytimg.com/vi/FVZMdGFNOkA/hqdefault.jpg",
          alt: "김인만 소장이 출연한 부동산 시장 토론 영상 썸네일",
        },
      },
      {
        date: "2023.05.22",
        type: "기사",
        title: "전세 전면 개혁보다 안전장치 마련이 우선",
        description: "전세 시장의 구조적 과제와 임차인 보호 장치를 인터뷰로 설명했습니다.",
        sourceName: "매거진한경",
        sourceUrl: "https://magazine.hankyung.com/money/article/202305220133c",
        thumbnail: {
          src: "https://img.hankyung.com/photo/202305/AD.33545656.1.jpg",
          alt: "매거진한경 인터뷰에 수록된 김인만 소장 사진",
        },
      },
      {
        date: "2025.07",
        type: "강연",
        title: "하반기 서울 아파트 시장 전망",
        description: "정책·금리·공급 변화를 중심으로 시장의 다음 분기를 해석합니다.",
        sourceName: "기업·기관 섭외 가능 주제",
      },
      {
        date: "2024",
        type: "도서",
        title: "서울 아파트 투자 지도",
        description: "서울 아파트 시장을 읽기 위한 기준과 관점을 정리한 저서입니다.",
        sourceName: "저서",
      },
    ],
    topics: [
      { title: "부동산 정책과 시장 전망", description: "금리·세제·공급 변화가 실수요와 시장에 미치는 영향을 분기별 시나리오로 해석합니다." },
      { title: "자산가 대상 시장 전략", description: "보유·매도·증여 타이밍과 자산 배분의 판단 기준을 사례 중심으로 다룹니다." },
      { title: "실수요자 내 집 마련 전략", description: "청약·매매·전월세 사이에서 실수요자가 확인해야 할 우선순위를 정리합니다." },
      { title: "방송·미디어 부동산 해설", description: "변화가 빠른 이슈를 대중이 이해할 수 있는 언어로 정확하게 풀어냅니다." },
    ],
  },
};

export function getExpert(slug: string) {
  return experts[slug];
}
