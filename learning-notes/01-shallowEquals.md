# shallowEquals 함수 정리

## 주요 논의 및 구현 과정

- shallowEquals 함수는 두 객체의 얕은 비교를 수행한다.
- 반복문 내 return 위치 오류를 수정하여 모든 키를 올바르게 비교하도록 개선함.
- 타입 캐스팅을 반복하지 않고, objA/objB로 변수 선언하여 가독성 향상.
- any 타입 대신 Record<string, unknown> 타입을 사용하여 타입 안정성 및 lint 경고 해결.
- 함수 시그니처를 개선하여 더 직관적으로 작성.

## Record<string, unknown>란?

- TypeScript의 유틸리티 타입
- 모든 키가 문자열이고, 값의 타입은 알 수 없음(unknown)인 객체를 의미
- 예시: `{ [key: string]: any값 }` 형태
- 타입 안정성을 위해 `unknown`을 사용

## 기타 질문 및 답변
