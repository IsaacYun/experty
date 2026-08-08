# Phase 1: 기반·공개 문의

Parent PRD: [PRD: Experty](../prd-experty.md)
Status: Not Started
Last Updated: 2026-08-08

## Objective

전문가의 공유 가능한 페이지와 안전한 섭외 문의 접수 흐름을 구축한다.

## Context From Master PRD

- Goals Covered: G-1, G-3
- Success Criteria: SC-1, SC-2
- Requirements Covered: FR-1, FR-2, FR-6, FR-10, NFR-1, NFR-3

## Phase Discovery Gate

- [ ] 앱 프레임워크와 Supabase 프로젝트·환경변수를 확인한다.
- [ ] 실제 도메인, 이메일 제공자, 인증 방식 결정을 확인한다.
- [ ] 개인정보 동의 문구와 보유 기간을 법률 검토본으로 확인한다.
- [ ] 공개 페이지 디자인과 창업자 경력 표현의 승인 범위를 확인한다.

## Scope

### In Scope

- [ ] Next.js 애플리케이션과 TypeScript·DB 마이그레이션 기반을 만든다.
- [ ] Owner, Assistant, PlatformAdmin 인증·권한과 Row Level Security를 구현한다.
- [ ] 전문가 프로필, 페이지 모드, 최근 활동 CRUD를 구현한다.
- [ ] `/{slug}` 공개 페이지와 `/{slug}/inquiry` 양식을 구현한다.
- [ ] URL 미리보기의 SSRF 방지와 수동 검수 흐름을 구현한다.
- [ ] 이메일 인증, rate limit, honeypot을 포함한 문의 접수를 구현한다.
- [ ] 접수 완료 메일과 전문가 신규 문의 알림을 구현한다.

### Out of Scope

- Google Calendar, 결제, 문의 한도 잠금, 공개 전문가 검색.

## Validation Strategy

- 권한·입력 검증은 단위 및 DB 통합 테스트로 검증한다.
- 공개 페이지와 모바일 문의 폼은 브라우저 E2E로 검증한다.
- 이메일은 sandbox 또는 테스트 수신함으로 검증한다.

## Exit Criteria

- [ ] Owner가 페이지를 공개하고 문의 전용 모드로 전환할 수 있다.
- [ ] 인증된 문의가 올바른 전문가 공간에만 저장되고 알림이 발송된다.
- [ ] 다른 전문가나 Assistant가 허가 없이 데이터에 접근하지 못한다.

## Phase-End Multi-Pass Review

- [ ] 의도·권한·입력·모바일·개인정보·테스트·문서 검토를 완료한다.

## Phase Change Log

- 2026-08-08: Phase file created.
