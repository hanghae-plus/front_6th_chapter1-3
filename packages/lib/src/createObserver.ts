type Listener = () => void;

/**
 * 옵저버를 생성하는 함수
 *
 * @returns 옵저버 관련 함수들을 포함하는 객체
 */
export const createObserver = () => {
  const listeners = new Set<Listener>();

  /**
   * 옵저버를 추가하는 함수
   * useSyncExternalStore에서 활용하려면 unsubscribe 함수를 반환해야 함
   *
   * @param fn - notify 감지 시 실행할 함수
   * @returns 옵저버를 제거하는 함수
   */
  const subscribe = (fn: Listener) => {
    listeners.add(fn);

    return unsubscribe;
  };

  /**
   * 옵저버를 제거하는 함수
   *
   * @param fn - 제거할 옵저버 함수
   */
  const unsubscribe = (fn: Listener) => {
    listeners.delete(fn);
  };

  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
