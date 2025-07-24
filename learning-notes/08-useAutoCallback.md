# useAutoCallback 커스텀 훅 설명

## 목적
`useAutoCallback`은 함수 참조는 항상 동일하게 유지하면서, 내부적으로 최신 값을 사용할 수 있는 콜백을 만드는 커스텀 훅입니다. 불필요한 함수 재생성을 막으면서, 최신 상태/값을 안전하게 참조할 수 있습니다.

## 구현 원리
- `useRef`로 최신 함수를 저장합니다.
- `useCallback`으로 함수 참조를 고정합니다(의존성 배열은 빈 배열).
- 반환되는 함수는 항상 같은 참조를 가지지만, 내부적으로 최신 `fn`을 실행합니다.

## 코드 예시
```typescript
import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  const ref = useRef(fn);
  ref.current = fn;

  const callback = useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []);

  return callback as T;
};
```

## 사용 예시
```typescript
const handleClick = useAutoCallback((value) => {
  // 최신 value를 항상 사용할 수 있음
});
```

## 요약
- 함수 참조는 항상 동일하게 유지됨
- 내부적으로 최신 값을 사용할 수 있음
- 불필요한 함수 재생성을 막고, 안전하게 최신 상태/값을 참조할 수 있음
