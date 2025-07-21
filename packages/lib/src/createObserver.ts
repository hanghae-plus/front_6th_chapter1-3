// 학습포인트: 왜 useSyncExternalStore를 써야했는지, 컨커런트모드와 기존 방식이 호환이 어려웠던 배경과 이 훅은 어떻게 그것을 해결했는지에 대해 정리해보기

type Listener = () => void;

export const createObserver = () => {
  //listener: 상태 변화가 발생했을때 구독하는 컴포넌트가 실행할 함수
  const listeners = new Set<Listener>();

  // useSyncExternalStore 에서 활용할 수 있도록 subscribe 함수를 수정합니다.
  const subscribe = (fn: Listener) => {
    listeners.add(fn);
    return () => unsubscribe(fn);
  };

  const unsubscribe = (fn: Listener) => {
    listeners.delete(fn);
  };

  // 상태를 구독한 모든 컴포넌트에 상태 변경 알림을 전달합니다.
  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
