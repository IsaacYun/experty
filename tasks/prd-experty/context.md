# Experty 컨텍스트

Parent PRD: [PRD: Experty](../prd-experty.md)
Last Updated: 2026-08-08

## Product Positioning

**소속사 없이 활동하는 일정 많은 전문가를 위한 자동 섭외 관리 시스템.**

국내 강연 서비스는 연사 탐색·중개 중심인 경우가 많고, Experty는 전문가 본인이 문의와 일정을 소유하는 운영 SaaS를 목표로 한다. 창업자의 연예기획사 섭외·출연·일정 관리 경험은 ‘전문가도 소속사 수준의 운영 체계를 갖게 한다’는 브랜드 메시지의 근거로 활용한다.

## Confirmed Decisions

- 공개 마켓플레이스 없이 개인 전문가 페이지와 공유 링크로 시작한다.
- 개인 전문가와 Assistant를 위한 단일 전문가 공간을 제공한다.
- 역할은 Owner, Assistant, PlatformAdmin만 제공한다.
- 페이지는 전체 소개형 또는 섭외 문의 전용형 중 선택한다.
- 활동은 URL 미리보기 후 전문가가 직접 승인한다.
- Google에서는 private event 상세를 가져오지 않고 free/busy만 읽는다.
- 확정 섭외는 Experty를 원본으로 하여 Google에 기록한다.
- 문의는 계속 접수하되 한도 초과분의 상세 정보만 잠근다.
- 구독은 Free 0원 / Basic 29,000원 / Pro 99,000원이다.

## Future Business Expansion

SaaS 검증 후, 선택된 전문가에 대해 사람이 직접 다음을 조율하는 매니지먼트 서비스로 확장한다.

- 행사 날짜·시간·이동·촬영 조건
- 섭외비와 지급 조건
- 강연 주제, 방송 포맷, 자료, 녹화·2차 활용 범위
- 계약, 정산, 현장 운영 커뮤니케이션

이 단계는 별도 서비스 계약과 운영 인력, 수수료 또는 월 관리비, 개인정보 처리 역할, 분쟁 책임 범위를 정의한 뒤 시작한다. MVP의 자동화·SaaS 데이터 모델은 매니저가 여러 전문가를 관리할 수 있도록 확장 가능하게 설계하되 해당 기능은 구현하지 않는다.

## Recommended Architecture

- Next.js + TypeScript 단일 웹 애플리케이션
- PostgreSQL/Supabase: 인증, DB, 저장소, Row Level Security
- Vercel: 배포와 예약 작업
- Toss Payments: 구독 자동결제
- Google Calendar API: free/busy 조회와 확정 일정 쓰기
- 이메일: 인증·접수·상태변경·재알림 발송

## Data Model Boundary

- `ExpertWorkspace`, `ExpertProfile`, `Membership`
- `Activity`, `Inquiry`, `InquiryStatusHistory`, `Contact`, `Organization`
- `ScheduleEvent`, `Booking`, `CalendarConnection`
- `Plan`, `Subscription`, `Payment`, `UsageLedger`
- `Notification`, `AuditLog`

`workspace_id`가 모든 전문가 소유 데이터의 격리 키다. PlatformAdmin의 지원 접근은 사유·대상·시간을 `AuditLog`에 기록한다.

## External Evidence

- 해외 스피커 CRM은 프로필, 문의·관계 관리, 예약을 결합한다: [Bookd](https://www.bookdcrm.com/for/speakers/), [SpeakerHUB](https://speakerhub.com/pricing).
- Google은 최소 OAuth 권한, 증분 동기화, 서버 측 토큰 보관을 권장한다: [OAuth](https://developers.google.com/identity/protocols/oauth2/web-server), [Calendar sync](https://developers.google.com/workspace/calendar/api/guides/sync).
- Toss 자동결제는 별도 계약 후 빌링키 발급·보관·주기별 승인 처리가 필요하다: [Toss billing](https://docs.tosspayments.com/guides/v2/billing).

## Validation Surface

현재 저장소는 빈 Git 저장소다. 기존 앱, DB, 테스트, 배포 설정은 없다. 구현 시작 시 TypeScript 검사, 린트, DB 통합 테스트, Playwright 공개 폼·어드민 흐름 테스트, Google/Toss sandbox 테스트를 추가한다.
