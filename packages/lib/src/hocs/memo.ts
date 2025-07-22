import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";

// HoC (High Order Component) : 고차 컴포넌트
// 함수가 컴포넌트를 받아서 새로운 컴포넌트를 반환하는 패턴 / 컴포넌트를 "감싸는" 함수라고 생각하면 됩니다
// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
// 3-2. React 메모이제이션 발제자료 참고 중
// P = Props의 줄임말, 제네릭 타입 매개변수
// 컴포넌트가 받는 props의 타입을 나타냄
// <P extends object>는 "P는 object를 확장하는 타입"이라는 제약
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 1. 이전 props를 저장할 ref 생성
  let prevProps: P | null = null; // 클로저로 상태 저장

  // 2. 메모이제이션된 컴포넌트 생성
  // React.ReactElement : React 컴포넌트가 렌더링한 결과의 타입 / JSX 요소의 타입을 나타냄 / <div>Hello</div>, <MyComponent /> 등의 타입
  let memoizedResult: React.ReactElement | null = null;

  return function (props: P) {
    // 3. equals 함수를 사용하여 props 비교
    // equals을 사용하여 이전 props와 현재 props를 비교
    if (prevProps === null || !equals(prevProps, props)) {
      console.log("Props changed, re-rendering");
      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      memoizedResult = Component(props) as React.ReactElement; // 타입 단언 추가
    } else {
      console.log("Props unchanged, using memoized result");
    }

    prevProps = props;
    return memoizedResult;
  } as FunctionComponent<P>;
}
