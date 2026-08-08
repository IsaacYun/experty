# Phase 3: 구독·운영자

Parent PRD: [PRD: Experty](../prd-experty.md)
Status: Not Started
Last Updated: 2026-08-08

## Objective

문의량 기반 구독, 잠금 처리, 결제 상태 관리, 플랫폼 운영자 도구를 완성한다.

## Context From Master PRD

- Goals Covered: G-4
- Success Criteria: SC-2, SC-4
- Requirements Covered: FR-7, FR-8, FR-9, NFR-2, NFR-4

## Phase Discovery Gate

- [ ] Toss 자동결제 계약·테스트 MID·웹훅 서명 검증 방식을 확인한다.
- [ ] 문의 사용량 기준과 Free→유료 전환 시 보관·해제 정책을 확인한다.
- [ ] 결제 실패, 해지, 환불 정책의 법률·고객지원 문구를 확인한다.
- [ ] PlatformAdmin 지원 접근 정책과 운영 담당자를 확인한다.

## Scope

### In Scope

- [ ] Free 4건, Basic 9건, Pro 무제한의 usage ledger를 구현한다.
- [ ] 초과 문의 접수·상세 잠금·업그레이드 후 해제 흐름을 구현한다.
- [ ] Toss 정기결제 등록, 승인, 결제 실패 재시도, 해지, 업그레이드를 구현한다.
- [ ] 결제 webhook의 서명 검증과 멱등 처리를 구현한다.
- [ ] PlatformAdmin의 전문가·구독·사용량·스팸·지원 접근 화면을 구현한다.
- [ ] 관리자 접근과 결제·권한 변경 감사 로그를 구현한다.

### Out of Scope

- 섭외비 수납·정산, 계약서, 사람 매니저의 조건 협상 대행.

## Validation Strategy

- 한도 경계값 4/5/9/10과 스팸 제외를 자동 테스트한다.
- Toss sandbox에서 등록·승인·실패·webhook 재전송을 검증한다.
- PlatformAdmin 지원 접근과 전문가 데이터 격리를 권한 테스트한다.

## Exit Criteria

- [ ] 각 플랜의 한도와 잠금 상태가 정확히 표시된다.
- [ ] 결제 이벤트 재전송에도 중복 결제·중복 권한 변경이 없다.
- [ ] PlatformAdmin의 접근 기록을 조회할 수 있다.

## Phase-End Multi-Pass Review

- [ ] 의도·결제·권한·감사·장애·테스트·문서 검토를 완료한다.

## Phase Change Log

- 2026-08-08: Phase file created.
