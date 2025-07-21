import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";

export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  return (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsref = useRef<P | null>(null);
    // 2. 메모이제이션된 컴포넌트 생성
    const prevResultRef = useRef<ReturnType<FunctionComponent<P>> | null>(null);

    // 3. equals 함수를 사용하여 props 비교
    if (!equals(prevPropsref.current, props)) {
      prevPropsref.current = props;
      prevResultRef.current = Component(props);
    }
    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    return prevResultRef.current;
  };
}
