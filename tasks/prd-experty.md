# PRD: Experty

## Document Status

- Status: Draft
- File Mode: Split
- Current Phase: Not Started
- Active Phase File: [Phase 1](./prd-experty/phase-01-foundation-and-public-intake.md)
- Context File: [context.md](./prd-experty/context.md)
- Last Updated: 2026-08-08
- PRD File: `tasks/prd-experty.md`
- Purpose: 소속사 없이 활동하는 전문가의 자동 섭외 관리 SaaS MVP 실행 기준.

## Problem

일정이 많은 부동산·IT·경제·투자 전문가는 이메일, 전화, 문자, DM으로 흩어진 섭외를 직접 처리한다. 문의 정보가 불완전하고 일정 충돌·후속 답변 누락이 발생하며, 소속사 수준의 운영 체계는 갖추기 어렵다.

## Goals

- G-1: 전문가가 전용 페이지와 표준 섭외 양식으로 문의를 한곳에서 받는다.
- G-2: 문의 분류, 알림, 일정 충돌 확인, 확정 일정의 Google Calendar 등록을 자동화한다.
- G-3: 전문가가 문의·일정·최근 활동을 모바일 웹에서 스스로 관리한다.
- G-4: 문의량 기반 구독으로 5명 파일럿의 유료 전환 가능성을 검증한다.

## Non-Goals

- NG-1: 공개 전문가 검색·비교 마켓플레이스 및 섭외 중개.
- NG-2: 섭외비 결제, 계약, 세금계산서, 정산.
- NG-3: AI가 전문가 대신 수락·거절·가격 협상하는 기능.
- NG-4: 소속사 단위의 다중 전문가 관리와 맞춤 홈페이지 제작.

## Success Criteria

- SC-1: 파일럿 전문가 5명이 모두 공개 페이지와 문의 링크를 운영한다.
- SC-2: 8주 동안 인증된 문의 25건 이상을 접수하고 70% 이상을 48시간 안에 처리한다.
- SC-3: 4명 이상이 Google Calendar를 연결하고 확정 일정 누락·이중 등록 사고가 없다.
- SC-4: 파일럿 5명 중 3명 이상이 유료 사용 의사를 밝히고 2명 이상이 유료 전환한다.

## Key Scenarios

### Scenario 1: 섭외 담당자의 문의

- Actor: 기업·방송·행사 담당자
- Trigger: 전문가의 공유 링크 방문
- Expected Outcome: 필요한 조건을 한 번에 제출하고 접수 완료 안내를 받는다.

### Scenario 2: 전문가의 빠른 수락

- Actor: 전문가 또는 개인 비서
- Trigger: 인증된 새 문의 알림 수신
- Expected Outcome: 조건·일정 충돌을 확인하고 수락 시 Google Calendar에 확정 일정을 생성한다.

### Scenario 3: 플랜 한도 초과

- Actor: Free 또는 Basic 전문가
- Trigger: 월간 열람·처리 가능 문의 한도 초과
- Expected Outcome: 새 문의는 접수되지만 상세 정보는 잠기며, 업그레이드 후 열람할 수 있다.

## Requirements

### Functional Requirements

- FR-1: 전문가별 공개 페이지와 섭외 문의 전용 페이지를 제공한다.
- FR-2: 문의는 이메일 인증, 스팸 방지, 필수 정보 검증 후 저장한다.
- FR-3: 문의 상태는 `신규 → 검토 → 협상 → 수락/거절 → 완료/취소`로 관리한다.
- FR-4: 직접 입력 일정, 가예약, 수락 문의의 확정 일정을 하나의 캘린더에 표시한다.
- FR-5: Google 기존 일정은 바쁨 여부만 조회하고 확정 섭외만 Google에 생성·수정·취소한다.
- FR-6: Owner와 Assistant, PlatformAdmin 권한을 분리한다.
- FR-7: Free는 4건, Basic은 9건, Pro는 무제한으로 월간 문의 열람·처리를 제한한다.
- FR-8: 월 구독 가격은 Free 0원, Basic 29,000원, Pro 99,000원이다.
- FR-9: PlatformAdmin은 전문가·플랜·사용량·스팸·지원 접근을 관리하고 감사 로그를 남긴다.
- FR-10: 전문가가 최근 활동 URL을 등록하고 제목·이미지·출처를 검수해 공개한다.

### Non-Functional Requirements

- NFR-1: 전문가 간 데이터는 서버와 DB 정책에서 격리한다.
- NFR-2: OAuth 토큰과 빌링키는 암호화해 저장하고 접근을 감사한다.
- NFR-3: 공개 문의 양식은 모바일에서 완결 가능해야 한다.
- NFR-4: 결제 웹훅과 알림 작업은 중복 실행에도 안전해야 한다.

## Assumptions

- A-1: 초기 고객은 소속사 없이 활동하는 전문가와 개인 비서다.
- A-2: 전문가 통합 검색은 제공하지 않고 각자의 링크 유입에 집중한다.
- A-3: 최근 활동은 자동 크롤링이 아닌 URL 기반 수동 승인이다.
- A-4: 초기 8주 파일럿은 Pro 권한을 무료로 제공한다.
- A-5: 창업자는 SM엔터테인먼트 등 연예기획사 환경의 섭외·출연·일정 관리 경험을 제품 신뢰 메시지로 사용한다. 사실 관계와 표현 사용 권한은 출시 전 확인한다.

## Dependencies / Constraints

- Toss Payments 자동결제 계약과 심사 완료가 유료 출시의 선행 조건이다.
- Google OAuth 동의 화면·검증 요구사항과 Calendar API 권한 심사가 필요하다.
- 개인정보처리방침, 서비스 약관, 구독·환불 정책의 한국 법률 검토가 필요하다.

## Risks / Edge Cases

- 저가 플랜에서 맞춤 온보딩·사람 지원 비용이 수익을 초과할 수 있다.
- 봇·중복 문의가 사용량을 소진하지 않도록 인증과 스팸 처리 흐름이 필요하다.
- Calendar 권한 또는 토큰 만료 시 자동 등록이 실패할 수 있다.
- 후속 매니지먼트 서비스가 시작되면 SaaS와 대행 업무의 책임·가격·개인정보 경계를 분리해야 한다.

## Execution Rules

- 각 단계 시작 전 마스터 PRD, 단계 파일, 컨텍스트를 다시 읽는다.
- 계획 변경은 이 문서와 영향받는 후속 단계에 먼저 반영한다.
- 섭외비 조율 등 사람 중심 매니지먼트는 후속 사업 단계이며 MVP 구현 범위로 섞지 않는다.

## Phase Index

| Phase | Status | Objective | Validation Focus | File |
|---|---|---|---|---|
| 1. 기반·공개 문의 | Not Started | 전문가 페이지와 안전한 문의 접수 | 공개 폼·인증·데이터 격리 | [phase-01](./prd-experty/phase-01-foundation-and-public-intake.md) |
| 2. 자동 섭외·일정 | Not Started | 문의 파이프라인·알림·Google 연동 | 상태 전이·충돌·동기화 | [phase-02](./prd-experty/phase-02-booking-and-calendar.md) |
| 3. 구독·운영자 | Not Started | 한도·결제·관리자 운영 | 결제·권한·감사 로그 | [phase-03](./prd-experty/phase-03-billing-and-operations.md) |
| 4. 파일럿·유료 출시 | Not Started | 5명 검증과 출시 준비 | KPI·지원·보안·전환 | [phase-04](./prd-experty/phase-04-pilot-and-launch.md) |

## Final Multi-Pass Review

- [ ] 요구사항과 구현 범위가 일치한다.
- [ ] 권한·개인정보·결제·OAuth 보안 검토를 완료한다.
- [ ] Google·Toss 장애와 재시도 시나리오를 점검한다.
- [ ] 파일럿 KPI와 유료 전환 결과를 기록한다.
- [ ] 후속 매니지먼트 서비스 범위와 SaaS 범위를 분리한다.

## Open Questions

- 맞춤 도메인과 카카오 알림톡의 도입 시점
- 유료 출시 시 고객 지원 채널과 응답 SLA

## Change Log

- 2026-08-08: 초기 PRD 생성. 가격, 권한, 창업자 포지셔닝, 후속 매니지먼트 확장 반영.
