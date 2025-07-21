import { createObserver } from "./createObserver.ts";

// 스토어 키의 싱글톤 세트
const storageKeys = new Set<string>();

/**
 * 저장소를 생성하는 함수 (저장소 핸들러)
 *
 * @param key - 저장할 데이터의 키
 * @param storage - 데이터를 저장할 저장소 (기본값: window.localStorage)
 * @returns 저장소 관련 함수들을 포함하는 객체
 */
export const createStorage = <T>(key: string, storage = window.localStorage) => {
  // 이미 사용 중인 키인지 확인
  if (storageKeys.has(key)) {
    throw new Error(`${key}가 이미 사용 중입니다.`);
  }

  storageKeys.add(key);

  let data: T | null = JSON.parse(storage.getItem(key) ?? "null");
  const { subscribe, notify } = createObserver();

  const get = () => data;

  const set = (value: T) => {
    try {
      data = value;
      storage.setItem(key, JSON.stringify(data));
      notify();
    } catch (error) {
      console.error(`${key} 저장 중 오류가 발생했습니다.`, error);
    }
  };

  const reset = () => {
    try {
      data = null;
      storage.removeItem(key);
      storageKeys.delete(key);
      notify();
    } catch (error) {
      console.error(`${key} 삭제 중 오류가 발생했습니다.`, error);
    }
  };

  return { get, set, reset, subscribe };
};
