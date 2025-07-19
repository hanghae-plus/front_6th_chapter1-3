import { useState } from "react";
// import { shallowEquals } from "../equals";

// initValue의 타입(T | (() => T)은 임의로 지은 것이므로 이후 수정 필요할지도
export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  return useState(initialValue);
};
