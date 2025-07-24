import type { AnyFunction } from "../types";
import { useCallback } from "./useCallback";
import { useRef } from "./useRef";

export const useAutoCallback = <T extends AnyFunction>(fn: T): T => {
  // 매 렌더링마다 latestFnRef.current 값이 업데이트됩니다.
  const latestFnRef = useRef(fn);
  latestFnRef.current = fn;

  // dispatcherRef: "latestFnRef을 여는 행위"를 하는 함수를 담을겁니다. 해당 함수는 자체는 변하지 않음.
  const dispatcherRef = useRef<(...args: any[]) => any>();

  // "latestFnRef을 여는 행위"를 정의합니다.
  // 이 함수는 매 렌더링마다 새로 생성됩니다.
  // 따라서 항상 최신 스코프의 `latestFnRef`를 참조합니다.
  const dispatcher = (...args: any[]) => {
    return latestFnRef.current(...args);
  };

  // 새로 생성된 dispatcher 함수를 dispatcherRef의 내용물로 업데이트.
  dispatcherRef.current = dispatcher;

  // autoCallback: 이 함수의 참조는 절대 변하면 안 됩니다.
  // autoCallback은 오직 "dispatcherRef를 열어서 그 안의 dispatcher를 실행"하는 것입니다.
  const autoCallback = useCallback((...args: any[]) => {
    // 이 함수가 호출될 때, 그 시점의 dispatcherRef를 열고,
    // 그 안에 있는 최신 dispatcher를 실행합니다.
    return dispatcherRef.current?.(...args);
  }, []); // 참조 고정

  return autoCallback as T;
};
