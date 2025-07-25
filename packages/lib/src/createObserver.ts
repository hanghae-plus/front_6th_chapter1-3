type Listener = () => void;

/**
 * 옵저버 패턴을 사용하여 상태 변경을 관리하는 함수
 * @returns 옵저버 객체
 */
export const createObserver = () => {
  const listeners = new Set<Listener>();

  const subscribe = (fn: Listener) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  };

  const unsubscribe = (fn: Listener) => {
    listeners.delete(fn);
  };

  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
