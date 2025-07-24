type Listener = () => void;

/**
 * createObserver - 상태 변경을 감지하고 알림을 전달하는 Observer 패턴을 구현합니다.
 *
 * 특징:
 * - useSyncExternalStore와 호환되는 subscribe 함수 제공
 * - 여러 listener를 등록하고 일괄 알림 가능
 * - 자동으로 cleanup 함수를 반환하여 메모리 누수 방지
 *
 * @returns {subscribe, notify} - subscribe: listener 등록, notify: 모든 listener에게 알림
 */

export const createObserver = () => {
  const listeners = new Set<Listener>();

  const subscribe = (fn: Listener) => {
    listeners.add(fn);

    return () => {
      listeners.delete(fn);
    };
  };

  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
