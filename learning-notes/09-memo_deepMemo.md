# 05-memo_deepMemo.md

## memo, deepMemo HOC 구현 및 코드 설명

### 1. memo HOC

- 목적: 컴포넌트의 props를 얕은 비교(shallowEquals)하여, 변경되지 않은 경우 이전 렌더 결과를 재사용해 불필요한 리렌더링을 방지한다.
- 주요 구현 흐름:

```typescript
import type { FunctionComponent, ReactNode } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const componentRef = useRef<ReactNode>(null);

    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      componentRef.current = Component(props);
    }

    return componentRef.current;
  };
  return MemoizedComponent;
}
```

- 핵심: 최초 렌더링 또는 props가 변경된 경우에만 새로 렌더링, 아니면 이전 결과 재사용
- useRef를 활용해 각 인스턴스별로 안전하게 상태 관리

### 2. deepMemo HOC

- 목적: 컴포넌트의 props를 깊은 비교(deepEquals)하여, 모든 값이 동일할 때만 이전 렌더 결과를 재사용한다.
- 주요 구현 흐름:

```typescript
import type { FunctionComponent, ReactNode } from "react";
import { deepEquals } from "../equals";
import { useRef } from "../hooks";

export function deepMemo<P extends object>(Component: FunctionComponent<P>, equals = deepEquals) {
  const DeepMemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<P | null>(null);
    const componentRef = useRef<ReactNode>(null);

    if (prevPropsRef.current === null || !equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      componentRef.current = Component(props);
    }

    return componentRef.current;
  };
  return DeepMemoizedComponent;
}
```

- 핵심: props의 모든 값이 깊게 동일할 때만 이전 결과를 재사용
- shallowEquals 대신 deepEquals를 사용

### 3. 비교 및 학습 포인트

- memo: 얕은 비교로 빠른 최적화, 일반적인 props에 적합
- deepMemo: 깊은 비교로 복잡한 객체/배열 props에 적합
- 둘 다 useRef를 활용해 인스턴스별로 안전하게 동작
- 비교 함수(equals)를 주입받아 커스텀 비교도 가능

---

이 문서는 memo와 deepMemo HOC의 구현 코드, 동작 원리, 학습 포인트를 정리한 내용입니다.
