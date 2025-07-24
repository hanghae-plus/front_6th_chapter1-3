# useRef 훅 구현 및 질문 정리

## 핵심 개념

- useRef는 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성하는 훅이다.
- 컴포넌트가 리렌더링되어도 같은 객체를 반환하며, 값이 바뀌어도 리렌더링되지 않는다.
- 반환 객체는 `{ current: T }` 형태이며, current 속성에 원하는 값을 저장한다.

## 주요 구현 포인트

- useState를 이용해 최초 한 번만 `{ current: initialValue }` 객체를 생성
- 이후 리렌더링이 되어도 같은 객체를 반환
- 값이 바뀌어도 컴포넌트가 리렌더링되지 않음
- 타입 단언은 `as { current: T }` 형태로 작성하는 것이 lint 경고 없이 안전함

## 주요 질문 및 답변

- initialValue는 ref의 초기값, current는 실제 값을 저장하는 속성
- 타입 단언 `<{ current: T }>`와 `as { current: T }`의 차이: 설정에 따라 `as`만 허용될 수 있음
- useRef는 useState와 달리 값 변경 시 리렌더링이 발생하지 않음
