# 04-useMemo.md

## useMemo 구현 및 코드 히스토리 정리

### 1. 기본 목표

- React의 useMemo와 동일하게, 의존성 배열이 변경될 때만 factory 함수를 실행하여 결과를 캐싱한다.
- 직접 useRef를 구현해서 내부적으로 활용한다.

### 2. 주요 코드 흐름

```typescript
import { useRef, type DependencyList } from "react";
import { shallowEquals } from "../equals";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const prevDeps = useRef<DependencyList>([]);
  const prevResult = useRef<T | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교
  if (prevResult.current === null || !_equals(prevDeps.current, _deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    prevDeps.current = _deps;
    prevResult.current = factory();
  }

  return prevResult.current;
}
```

### 3. 코드 설명

- `prevDeps`와 `prevResult`를 각각 useRef로 선언하여, 렌더링 사이에 값을 유지한다.
- 최초 실행이거나, 의존성 배열이 변경되었을 때만 factory 함수를 실행한다.
- shallowEquals를 통해 의존성 배열의 변경 여부를 판단한다.
- factory 함수의 반환값을 캐싱하여, 의존성이 바뀌지 않으면 이전 값을 그대로 반환한다.

### 4. 개선 및 리팩터링 히스토리

- 초기에 prevDeps와 prevResult를 따로 관리했으나, 객체로 합쳐서 관리하는 방식도 제안됨.
- 예외 처리(값이 undefined일 때 에러 발생)는 불필요하다고 판단되어 제거.
- useRef의 초기값을 콜백 함수로 받을 수 있도록 개선.

### 5. 주의사항

- 의존성 배열의 순서와 크기는 항상 일정해야 하며, 동적으로 변경되면 React에서 경고가 발생한다.
- 객체 등 복잡한 값을 의존성 배열에 넣을 때는 shallowEquals가 올바르게 동작하는지 확인 필요.

### 6. 학습 포인트

- useMemo의 핵심은 "의존성 배열이 바뀔 때만 factory를 실행한다"는 점.
- useRef를 직접 구현해보고, 내부적으로 어떻게 동작하는지 이해하는 것이 중요하다.
- 타입 안정성과 예외 상황에 대한 guard 코드 작성 습관을 들이는 것이 좋다.

---

이 파일은 useMemo 구현 과정과 주요 논의, 개선 히스토리를 정리한 문서입니다.
