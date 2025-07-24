// TODO : 왜 이렇게 작성하는지에 대한 공부가 필요한 코드 / 화살표 함수로 던졌는데 왜?
// https://ui.toast.com/weekly-pick/ko_20201022 < 참고
// https://ko.react.dev/reference/react/useState#avoiding-recreating-the-initial-state < 참고
// export function useRef<T>(initialValue: T): { current: T } {
//   const [ref] = useState(() => ({ current: initialValue }));

//   return ref;
// }

import { useState } from "react";

// useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
export function useRef<T>(initialValue: T): { current: T } {
  // 이 부분을 적절히 수정하세요. useRef를 구현하지 않으면 다른 hook을 구현할 수 없습니다.
  // useState를 이용해서 만들어보세요.
  const [state] = useState({ current: initialValue });
  return state;
}
