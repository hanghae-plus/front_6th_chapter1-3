# 13-useRouter.md

## useRouter 훅 구현 및 설명

### 목적

- 외부 라우터(router)의 상태를 React 컴포넌트에서 안전하게 구독하고, selector로 원하는 값만 추출하여 반환하는 훅.
- 라우터 상태 변경 시 컴포넌트가 자동으로 업데이트되며, 불필요한 리렌더링을 방지함.

### 주요 구현 흐름

#### 구현 코드

```typescript
import type { RouterInstance } from "../Router";
import type { AnyFunction } from "../types";
import { useSyncExternalStore } from "react";
import { useShallowSelector } from "./useShallowSelector";

const defaultSelector = <T, S = T>(state: T) => state as unknown as S;

export const useRouter = <T extends RouterInstance<AnyFunction>, S>(router: T, selector = defaultSelector<T, S>) => {
  const shallowSelector = useShallowSelector(selector);
  return useSyncExternalStore(router.subscribe, () => shallowSelector(router));
};
```

### 핵심 동작

- `useSyncExternalStore`: router의 상태 변화를 구독하여, 상태가 바뀌면 컴포넌트가 자동으로 업데이트됨.
- `selector`: router의 전체 상태에서 원하는 부분만 추출.
- `useShallowSelector`: selector 결과를 얕은 비교하여, 값이 바뀌지 않으면 리렌더링을 방지.

### 주의점

- `shallowSelector(router)`에서 router 객체 자체를 넘기므로, selector가 router의 상태를 올바르게 추출하도록 작성해야 함.
- 만약 router에 `getState` 메서드가 있다면, `shallowSelector(router.getState())`로 변경하는 것이 더 일반적임.

### 학습 포인트

- 외부 라우터와 React의 상태 구독을 연결하는 패턴.
- selector와 shallow 비교를 활용한 최적화.
- 실무에서 Next.js, React Router 등 다양한 라우팅 라이브러리와 유사한 구조.

---

이 문서는 useRouter 훅의 구현 코드, 동작 원리, 학습 포인트를 정리한 내용입니다.
