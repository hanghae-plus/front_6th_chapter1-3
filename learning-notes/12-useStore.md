# 12-useStore.md

## useStore 훅 구현 및 설명

### 목적

- 외부 상태 관리(store)의 값을 React 컴포넌트에서 안전하게 구독하고, selector로 원하는 값만 추출하여 반환하는 훅.
- 상태 변경 시 컴포넌트가 자동으로 업데이트되며, 불필요한 리렌더링을 방지함.

### 주요 구현 흐름

#### 기존 코드 방식

```typescript
export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  // 1. store의 상태 변화를 구독
  const state = useSyncExternalStore(store.subscribe, store.getState);
  // 2. selector로 원하는 값 추출 및 shallow 비교
  return useShallowSelector(selector)(state);
};
```

#### 알게 된 코드 방식

```typescript
export const useStore = <T, S = T>(store: Store<T>, selector: (state: T) => S = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  // 상태가 변하지 않았을 때는 렌더링이 되지 않기 위해 shallowSelector를 사용
  return useSyncExternalStore(store.subscribe, () => shallowSelector(store.getState()));
};
```

### 차이점 요약

- **기존 코드**: 전체 상태를 먼저 구독한 뒤, selector와 shallow 비교를 별도로 적용.
- **알게 된 코드**: shallow 비교가 적용된 selector를 상태 getter에서 바로 사용하여 불필요한 리렌더링을 더 효과적으로 방지.

### 핵심 동작

- `useSyncExternalStore`: store의 상태 변화를 구독하여, 상태가 바뀌면 컴포넌트가 자동으로 업데이트됨.
- `selector`: store의 전체 상태에서 원하는 부분만 추출.
- `useShallowSelector`: selector 결과를 얕은 비교하여, 값이 바뀌지 않으면 리렌더링을 방지.

### 학습 포인트

- 외부 상태 관리와 React의 상태 구독을 연결하는 패턴.
- selector와 shallow 비교를 활용한 최적화.
- 실무에서 Redux, Zustand 등 다양한 상태 관리 라이브러리와 유사한 구조.

---

이 문서는 useStore 훅의 구현 코드, 동작 원리, 학습 포인트, 그리고 기존 코드와 알게 된 코드의 차이점을 정리한 내용입니다.
