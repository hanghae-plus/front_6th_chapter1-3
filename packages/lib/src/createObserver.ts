type Listener = () => void;

export const createObserver = () => {
  const listeners = new Set<Listener>();

  const subscribe = (callback: Listener) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  };

  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
