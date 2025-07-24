// TypeScript에서 리스너 함수의 타입을 정의하는 코드
type Listener = () => void;

// - subscribe 함수가 useSyncExternalStore 에서 잘 쓰일 수 있도록 수정해야됩니다.
// - 다른곳에서 useSyncExternalStore 호출할 때 createObserver를 사용하는거지 이 안에 두면 안 되는거다..;;
// - 공식문서를 참고해서 수정해주세요!

export const createObserver = () => {
  const listeners = new Set<Listener>();

  const unsubscribe = (fn: Listener) => {
    listeners.delete(fn);
  };
  // 구독 등록
  // subscribe: 저장소 변경을 구독하는 함수, store를 구독하고 구독을 취소하는 함수를 반환
  // store가 변경될 때, 제공된 callback이 호출되어 React가 getSnapshot을 다시 호출하고 (필요한 경우) 컴포넌트를 다시 렌더링하도록 해야 합니다.
  const subscribe = (fn: Listener) => {
    listeners.add(fn); // 리스너 등록
    // 구독 취소 함수 반환
    return () => {
      unsubscribe(fn);
    };
  };

  // 상태 변경 시 알림
  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
