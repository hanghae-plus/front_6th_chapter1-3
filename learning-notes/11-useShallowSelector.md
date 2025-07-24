# useShallowSelector.ts 설명

`useShallowSelector`는 React에서 상태(state)의 일부를 선택(selector)할 때, 선택된 값이 얕은 비교(shallowEquals)로 변경되었는지 확인하여 불필요한 값 변경을 막아주는 커스텀 훅입니다.

## 주요 기능

- selector 함수로 상태에서 원하는 값만 선택
- 이전 선택값을 `useRef`로 저장
- shallowEquals로 이전 값과 새 값을 비교
- 값이 같으면 이전 값을 그대로 반환하여 불필요한 변경 방지
- 값이 다르면 새로운 값을 반환하고, 이전 값 갱신

## 사용 예시

```typescript
const selector = (state) => state.user;
const getUser = useShallowSelector(selector);

const user = getUser(storeState); // user 정보만 선택
```

## 코드 구조

- `Selector<T, S>`: 상태에서 원하는 값을 선택하는 함수 타입
- `useRef`로 이전 선택값 저장
- 3항 연산자로 값 비교 및 반환 최적화

## 코드 분해 (11번째 줄)

```typescript
const selectedValue = selector(state);
```

- `selector(state)`는 현재 상태에서 원하는 값만 골라내는 함수 호출
- 그 결과를 `selectedValue`라는 변수에 저장
- 즉, 전체 상태에서 필요한 부분만 추출해서 이후 shallowEquals 비교에 사용

예시:
만약 `state`가 `{ user: { name: "홍길동" }, theme: "dark" }`이고
`selector`가 `(state) => state.user`라면
`selectedValue`에는 `{ name: "홍길동" }`이 저장됨

## 활용

- 외부 상태 관리 라이브러리와 연동 시, 값이 얕은 비교로 바뀌었을 때만 컴포넌트가 리렌더링되도록 최적화
- 복잡한 상태에서 필요한 부분만 효율적으로 선택

---

> 이 훅은 상태의 일부만 선택해서, 그 값이 얕은 비교로 바뀌었을 때만 새로운 값을 반환하도록 만들어진 최적화용 커스텀 훅입니다.
