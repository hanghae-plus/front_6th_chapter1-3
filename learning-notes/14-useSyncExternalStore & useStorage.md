# useSyncExternalStore와 useStorage 설명

## useSyncExternalStore란?

React 18에서 도입된 훅으로, 외부 저장소(스토어, 스토리지 등)의 상태를 안전하게 구독하고 컴포넌트가 최신 상태를 사용할 수 있게 해줍니다.

### 주요 인자

- **subscribe**: 상태가 변경될 때마다 React에 알리는 함수. 컴포넌트가 상태 변화를 감지할 수 있게 해줌.
- **getSnapshot**: 현재 상태를 반환하는 함수. 클라이언트에서 사용됨.
- **getServerSnapshot**: 서버 사이드 렌더링(SSR)에서 상태를 반환하는 함수. SSR 환경에서 초기값을 제공할 때 사용.

## 왜 이런 인자를 넘겨야 할까?

- 외부 저장소의 상태가 바뀔 때마다 컴포넌트가 자동으로 최신 값을 받아오려면, React가 상태 변화를 감지할 수 있어야 함.
- subscribe로 상태 변화를 구독하고, getSnapshot으로 현재 값을 받아옴.
- SSR 환경에서는 getServerSnapshot으로 서버에서 렌더링 시 사용할 값을 따로 지정할 수 있음.

## useStorage의 역할

- 커스텀 스토리지의 상태를 React 컴포넌트에서 구독하고 사용할 수 있게 해주는 훅.
- useSyncExternalStore를 활용해 스토리지의 값이 바뀔 때마다 컴포넌트가 자동으로 최신 값을 받아옴.

## 예시 코드

```typescript
export const useStorage = <T>(storage: Storage<T>) => {
  return useSyncExternalStore(storage.subscribe, storage.get, storage.get);
};
```

## 요약

- useSyncExternalStore는 외부 저장소의 상태를 안전하게 React에서 사용할 수 있게 해주는 표준 훅
- subscribe, getSnapshot, getServerSnapshot을 넘겨주면, 상태 변화와 SSR까지 모두 대응 가능
- useStorage는 이 패턴을 활용해 스토리지의 상태를 React에서 쉽게 사용할 수 있도록 만든 커스텀 훅
