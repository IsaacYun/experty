# Phase 2: 자동 섭외·일정

Parent PRD: [PRD: Experty](../prd-experty.md)
Status: Not Started
Last Updated: 2026-08-08

## Objective

문의 처리 파이프라인과 통합 일정을 제공하고, 확정 섭외를 Google Calendar에 안전하게 반영한다.

## Context From Master PRD

- Goals Covered: G-2, G-3
- Success Criteria: SC-2, SC-3
- Requirements Covered: FR-3, FR-4, FR-5, NFR-2, NFR-4

## Phase Discovery Gate

- [ ] Phase 1의 문의·권한·알림 구현과 데이터 모델을 확인한다.
- [ ] Google OAuth 동의 화면, 필요한 최소 scope, redirect URI를 확인한다.
- [ ] Timezone을 Asia/Seoul로 고정할지 다국가 일정을 지원할지 재확인한다.
- [ ] 알림의 지연 기준과 발송 채널을 확인한다.

## Scope

### In Scope

- [ ] 문의 상태 전이, 메모, 변경 이력, 수락·거절 흐름을 구현한다.
- [ ] 직접 일정·가예약·확정 예약을 동일 캘린더에 표시한다.
- [ ] 신규·미응답·수락·거절·변경 알림과 재알림 작업을 구현한다.
- [ ] Google free/busy 조회를 통한 충돌 경고를 구현한다.
- [ ] 확정 섭외의 Google 생성·수정·취소와 동기화 실패 재시도를 구현한다.
- [ ] 토큰 암호화, 연결 해제, 만료 감지와 재연결 UI를 구현한다.

### Out of Scope

- Google 이벤트 제목·상세의 역동기화, Apple·Outlook 연동, AI 자동 응답.

## Validation Strategy

- 상태 전이와 권한은 단위·통합 테스트로 검증한다.
- Google sandbox 계정에서 충돌 경고와 생성·수정·취소를 E2E로 검증한다.
- 토큰 만료, API 오류, 중복 webhook/job을 재시도 시나리오로 검증한다.

## Exit Criteria

- [ ] 문의를 수락해 예약으로 전환할 수 있다.
- [ ] 비공개 Google 일정의 상세를 저장하지 않고 충돌만 경고한다.
- [ ] 확정 일정 변경이 Google에 한 번만 반영된다.

## Phase-End Multi-Pass Review

- [ ] 의도·상태 전이·동기화·재시도·보안·테스트·문서 검토를 완료한다.

## Phase Change Log

- 2026-08-08: Phase file created.
