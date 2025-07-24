import { isObject } from "../utils/typeGuards";

export const deepEquals = (a: unknown, b: unknown): boolean => {
  const isAObject = isObject(a);
  const isBObject = isObject(b);

  // 둘다 오브젝트 타입 아니면 값비교
  if (!isAObject && !isBObject) return Object.is(a, b);

  // 한쪽만 어레이일 경우도 동일하지 않음
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // 배열끼리 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEquals(b[index], item));
  }

  // isObject 타입 가드를 통해 a, b를 객체 타입으로 좁혀 안전하게 다루기 위해 if문 추가
  if (isAObject && isBObject) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
      if (!deepEquals(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
};
