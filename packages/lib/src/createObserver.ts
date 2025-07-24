type Listener = () => void;

export const createObserver = () => {
  const listeners = new Set<Listener>();

  const subscribe = (fn: Listener) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  const notify = () => listeners.forEach((listener) => listener());

  return { subscribe, notify };
};
