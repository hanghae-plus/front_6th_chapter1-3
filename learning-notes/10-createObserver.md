# createObserver.ts 설명

`createObserver` 함수는 옵저버 패턴을 간단하게 구현한 유틸리티입니다. 여러 리스너(구독자)를 등록하고, 특정 시점에 모두에게 알림을 보낼 수 있습니다. 주로 상태 관리나 외부 스토어와 연동할 때 활용됩니다.

## 주요 기능

- **subscribe(fn)**: 리스너를 등록합니다. 등록된 리스너는 notify 시 호출됩니다. 반환값으로 해당 리스너를 해제하는 unsubscribe 함수를 제공합니다.
- **unsubscribe(fn)**: 등록된 리스너를 해제합니다.
- **notify()**: 등록된 모든 리스너를 호출합니다.

## 사용 예시

```typescript
const observer = createObserver();

const listener = () => {
  console.log("변경됨!");
};

const unsubscribe = observer.subscribe(listener);
observer.notify(); // '변경됨!' 출력
unsubscribe(); // listener 해제
```

## 활용

- React의 `useSyncExternalStore`와 같은 외부 상태 구독에 적합
- 여러 컴포넌트가 특정 이벤트나 상태 변화를 감지해야 할 때 사용

## 코드 구조

- 내부적으로 `Set`을 사용해 중복 없이 리스너를 관리
- subscribe/unsubscribe/notify 메서드 제공

---

> 이 파일은 간단한 옵저버 패턴을 구현하여, 여러 구독자에게 상태 변화를 알릴 수 있도록 돕습니다.
