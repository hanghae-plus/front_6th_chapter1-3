import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals): FunctionComponent<P> {
  // 메모이제이션된 컴포넌트 생성
  const MemoizedComponent: FunctionComponent<P> = (props) => {
    // 1. 이전 props를 저장할 ref 생성
    const memoizedRef = useRef<{
      prevProps: P | null;
      rendered: ReturnType<FunctionComponent<P>> | null;
    }>({
      // 이전 props 저장
      prevProps: null,
      // 이전 JSX 저장
      rendered: null,
    });

    // 3. eqauls 함수를 사용하여 props 비교 - 새롭게 컴포넌트 렌더링X
    if (memoizedRef.current.prevProps !== null && equals(memoizedRef.current.prevProps, props)) {
      return memoizedRef.current.rendered!;
    }

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    memoizedRef.current.prevProps = props;
    memoizedRef.current.rendered = Component(props);

    return memoizedRef.current.rendered;
  };

  return MemoizedComponent;
}
