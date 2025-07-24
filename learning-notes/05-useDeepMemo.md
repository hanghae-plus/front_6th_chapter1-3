# useDeepMemo 커스텀 훅 설명

## 목적

`useDeepMemo`는 React에서 의존성 배열을 깊은 비교(deepEquals)로 체크하여, 값이 진짜로 변경된 경우에만 factory 함수를 실행해 메모이제이션합니다. 일반적인 `useMemo`는 얕은 비교(shallowEquals)만 지원하기 때문에, 객체나 배열 등 복잡한 구조의 값이 변경될 때 정확하게 감지하기 어렵습니다.

## 구현 원리

- 내부적으로 직접 만든 `useMemo` 훅을 사용합니다.
- `useMemo`는 의존성 배열과 결과값을 `useRef`로 저장합니다.
- 비교 함수로 `deepEquals`를 전달하여, 의존성 배열의 깊은 비교를 수행합니다.
- 의존성 배열이 변경되었다고 판단되면 factory 함수를 실행하여 새로운 값을 저장합니다.

## 코드 예시

```typescript
export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps, deepEquals);
}
```

## 사용 예시

```typescript
const memoizedValue = useDeepMemo(() => expensiveCalculation(obj), [obj]);
```

## shallowEquals vs deepEquals

- shallowEquals: 1차원 값만 비교, 객체/배열의 참조만 체크
- deepEquals: 객체/배열 내부 값까지 모두 비교

## 요약

`useDeepMemo`는 복잡한 구조의 의존성 배열을 안전하게 감지하여, 불필요한 재계산을 막고 성능을 최적화할 수 있는 커스텀 훅입니다.
