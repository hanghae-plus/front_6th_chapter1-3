import { createObserver } from "./createObserver.ts";

interface StorageInstance<T> {
  get(): T | null;
  set(value: T): void;
  reset(): void;
  subscribe(listener: () => void): () => void;
}

const storageInstances = new Map<string, StorageInstance<unknown>>();

export const createStorage = <T>(key: string, storage = window.localStorage): StorageInstance<T> => {
  if (storageInstances.has(key)) {
    return storageInstances.get(key) as StorageInstance<T>;
  }

  const { subscribe, notify } = createObserver();

  let cachedValue: T | null = null;
  let isInitialized = false;

  const get = (): T | null => {
    if (!isInitialized) {
      try {
        const item = storage.getItem(key);
        cachedValue = item ? JSON.parse(item) : null;
        isInitialized = true;
      } catch (error) {
        console.error(`Error parsing storage item for key "${key}":`, error);
        cachedValue = null;
        isInitialized = true;
      }
    }
    return cachedValue;
  };

  const set = (value: T) => {
    try {
      storage.setItem(key, JSON.stringify(value));

      cachedValue = value;

      notify();
    } catch (error) {
      console.error(`Error setting storage item for key "${key}":`, error);
    }
  };

  const reset = () => {
    try {
      storage.removeItem(key);

      cachedValue = null;

      notify();
    } catch (error) {
      console.error(`Error removing storage item for key "${key}":`, error);
    }
  };

  const instance = { get, set, reset, subscribe };

  storageInstances.set(key, instance);

  return instance;
};
