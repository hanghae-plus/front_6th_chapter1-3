# useCallback 커스텀 훅 설명

## 목적

`useCallback`은 함수형 컴포넌트에서 콜백 함수를 메모이제이션하여, 의존성 배열이 변경될 때만 새로운 함수를 반환합니다. 불필요한 함수 재생성을 방지해 성능을 최적화할 수 있습니다.

## 구현 원리

- 내부적으로 직접 만든 `useMemo`를 활용해, 콜백 함수(factory)를 의존성 배열(deps)에 따라 메모이제이션합니다.
- 의존성 배열이 변경되지 않으면 이전에 생성한 함수를 그대로 반환합니다.

## 코드 예시

```typescript
import { useMemo } from "./useMemo";
import type { DependencyList } from "react";

export function useCallback<T extends Function>(factory: T, deps: DependencyList): T {
  return useMemo(() => factory, deps);
}
```

## 사용 예시

```typescript
const memoizedCallback = useCallback(() => {
  // ...콜백 로직...
}, [value]);
```

## 요약

- 함수 타입만 인자로 받을 수 있도록 제한합니다.
- useMemo와 비슷하게 동작하지만, 항상 함수(콜백) 타입을 반환합니다.
- 의존성 배열이 변경될 때만 새로운 함수를 반환하고, 그렇지 않으면 이전 함수를 그대로 반환합니다.
- 불필요한 함수 재생성을 방지해 성능을 최적화할 수 있습니다.

## 주의사항

- 의존성 배열(deps)에 포함된 값이 변경될 때만 새로운 콜백 함수가 생성됩니다.
- 의존성 배열이 올바르게 작성되어야 불필요한 함수 재생성을 막을 수 있습니다.

## 요약

`useCallback`은 `useMemo`를 활용해 콜백 함수의 참조를 안정적으로 유지하고, 의존성 배열이 변경될 때만 새로운 함수를 반환하는 커스텀 훅입니다.
