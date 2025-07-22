import React, { type FunctionComponent, type JSX } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// memo의 역할은
// 인자로 들어간 props가 어떤건지를 확인하고,
// 값이 바뀌지 않으면, 실행은 건너 뛴다.
// 바뀐 경우에는 실행된다.

// 하이 오더 컴퍼넌트

//
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // if(equals())
  const MemoizedComponent = (props: P) => {
    const prevPropsRef = useRef<{ props: P; result: JSX.Element } | null>(null);

    // 이전 데이터가 존재할시
    const oldProps = prevPropsRef.current && prevPropsRef.current.props;

    // const oldResult =React.createElement(Component,props)
    // React.createElement를 또 호출하는 행위 -> 렌더링을 하는 행동"
    // 이전껄 그대로 쓰는게 핵심인데 그냥 무조건적으로 또 만들어서 ref에 저장해야하는줄 알았음.
    // 코드도 더러워지고 효율적이지 못함
    if (prevPropsRef.current && equals(oldProps, props)) return prevPropsRef.current.result;
    // console.log(oldResult);
    else {
      const newResult = React.createElement(Component, props);
      prevPropsRef.current = { props, result: newResult };
      return prevPropsRef.current.result;
    }
  };

  return MemoizedComponent;
}
