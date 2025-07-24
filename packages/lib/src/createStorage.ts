import { createObserver } from "./createObserver.ts";

export const createStorage = <T>(key: string, storage = window.localStorage) => {
  let data: T | null;
  try {
    const storedValue = storage.getItem(key);
    if (storedValue === null) {
      console.log(`[createStorage] No stored value for ${key}, initializing as null`);
      data = null;
    } else {
      data = JSON.parse(storedValue);
      console.log(`[createStorage] Successfully loaded ${key}:`, data);
    }
  } catch (error) {
    console.error(`[createStorage] Error parsing data for ${key}:`, error);
    data = null;
  }

  const { subscribe, notify } = createObserver();

  const get = () => {
    return data;
  };

  const set = (value: T) => {
    try {
      data = value;
      const serialized = JSON.stringify(data);
      storage.setItem(key, serialized);
      console.log(`[createStorage] Successfully stored ${key}`);
      notify();
    } catch (error) {
      console.error(`Error setting storage item for key "${key}":`, error);
    }
  };

  const reset = () => {
    try {
      data = null;
      storage.removeItem(key);
      console.log(`[createStorage] Successfully removed ${key} from storage`);
      notify();
    } catch (error) {
      console.error(`Error removing storage item for key "${key}":`, error);
    }
  };

  return { get, set, reset, subscribe };
};
