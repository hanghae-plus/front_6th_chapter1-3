# React Hooks 구현 프로젝트

커스텀 훅과 비교 함수를 직접 구현해보는 종합적인 React 훅 구현 프로젝트입니다.

## 프로젝트 구조

```
packages/lib/src/
├── equals/           # 비교 함수들
│   ├── shallowEquals.ts
│   ├── deepEquals.ts
│   └── index.ts
├── hooks/           # 훅 구현
│   ├── useRef.ts
│   ├── useMemo.ts
│   ├── useCallback.ts
│   ├── useShallowState.ts
│   ├── useDeepMemo.ts
│   ├── useAutoCallback.ts
│   └── index.ts
├── hocs/            # 고차 컴포넌트
│   ├── memo.ts
│   └── deepMemo.ts
└── __tests__/
    └── basic.test.tsx
```

## 개발 명령어

```bash
# 기본 테스트 실행 (우리의 구현 목표)
pnpm test:basic

# 모든 테스트 실행
pnpm test

# 개발 서버 실행
pnpm dev

# 프로젝트 빌드
pnpm build

# 타입 체킹
pnpm tsc

# 린트 및 포맷팅
pnpm lint:fix
pnpm prettier:write
```

## 구현 순서

1. **비교 함수**: `shallowEquals`와 `deepEquals`부터 시작
2. **핵심 훅**: `useRef`, `useMemo`, `useCallback` 구현 
3. **커스텀 훅**: `useShallowState`, `useDeepMemo`, `useAutoCallback` 구현
4. **고차 컴포넌트**: `memo`와 `deepMemo` 컴포넌트 생성

## 이해해야 할 핵심 개념

- **얕은 vs 깊은 비교**: 참조 비교와 값 비교를 언제 사용할지 이해하기
- **메모이제이션**: 의존성 변화에 따른 결과 캐싱
- **React 렌더링**: 상태 변화가 어떻게 리렌더링을 유발하는지
- **훅 의존성**: 의존성 배열이 메모이제이션 동작을 어떻게 제어하는지

## 테스트 전략

각 구현은 `basic.test.tsx`의 해당 테스트를 통과해야 합니다. 테스트는 각 함수의 명확한 동작 명세를 제공합니다.

각 구현 후 `pnpm test:basic`을 실행하여 정확성을 검증하세요.