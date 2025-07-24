# useShallowState 커스텀 훅 설명

## 목적

`useShallowState`는 상태값이 얕은 비교(shallowEquals)로 동일할 때는 리렌더링을 방지하는 커스텀 훅입니다. 객체, 배열 등 참조형 데이터의 불필요한 리렌더링을 줄여 성능을 최적화할 수 있습니다.

## 구현 원리

- 내부적으로 `useState`를 사용해 상태를 관리합니다.
- setState를 커스텀하여, 새 값과 기존 값을 `shallowEquals`로 비교합니다.
- 값이 얕게 같으면 상태를 변경하지 않고, 다를 때만 상태를 변경합니다.

## 코드 예시

### 이전 코드

```typescript
const setShallowState = (next: T) => {
  if (!shallowEquals(state, next)) {
    setState(next);
  }
};
```

### 현재 코드 (테스트 통과)

```typescript
const setShallowState = useCallback((next: T) => {
  setState((prev) => (shallowEquals(prev, next) ? prev : next));
}, []);
```

## 코드 변경점 및 테스트 통과 이유

- **이전 코드**에서는 setShallowState 함수가 렌더링마다 새로 생성되어, 참조가 계속 바뀌었습니다.
- **현재 코드**는 useCallback을 사용하고, 의존성 배열을 빈 배열([])로 설정하여 setShallowState 함수의 참조가 항상 동일하게 유지됩니다.
- 또한, setState의 함수형 업데이트를 사용해 항상 최신 상태(prev)와 새 값(next)를 비교합니다.
- 이로 인해 "setState는 언제나 같은 함수를 반환해야 한다" 테스트가 통과하게 됩니다.

## 사용 예시

```typescript
const [value, setValue] = useShallowState({ a: 1, b: 2 });
setValue({ a: 1, b: 2 }); // shallowEquals로 같으므로 리렌더링 없음
setValue({ a: 1, b: 3 }); // 값이 달라지면 리렌더링 발생
```

## 요약

- 상태값이 얕게 같을 때 리렌더링을 방지
- 참조형 데이터(객체, 배열) 최적화에 유용
- setState 함수의 참조를 유지하려면 useCallback을 추가로 사용할 수 있음
