import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}

// useState를 이용해서 만들어보세요.
// 이 부분을 적절히 수정하세요. useRef를 구현하지 않으면 다른 hook을 구현할 수 없습니다.
// useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.

// useRef 는

// useRef는

// 1. 리렌더링 없이 참조 값(current)을 유지할 때 사용한다.
// 2. current 값이 바뀌어도 컴포넌트는 리렌더링되지 않는다.
// 3. 내부적으로 React가 메모리에 저장하지만, 얕은 비교로 인해 UI에는 영향을 주지 않는다.
// 4. DOM에 접근하거나 setInterval 같은 외부 객체를 저장할 때 유용하다.

// fireEvent는 리액트 테스팅 라이브러리 시뮬레이션

// refs 는 Set으로 만들고
// UseMyRefTest 라벨 매개변수 받고
// [,rerender] = useState({}) 로 담아주고
// ref는 만들어놓은 useRef안에다가 HTMLDivElemt넣어준다 뭐고? 아 useRef에다가 일단 null 넣는다구나
// 그리고 그 null 안에는 HTMLDivElemnt가 들어가ㅗ

// refs Seㅅ에다가 ref넣어주고 기본 null
//  <div ref={ref}>
//    <button onClick={() => rerender({})}>{label}</button>
//  </div>

// 이거 리턴해주고

// import { render } from '@testing-library/react';
//이거는 DOM에 렌더링 하는 함수
// getByText는 해당 텍스트를 가진 dom요소를 가지고옴
