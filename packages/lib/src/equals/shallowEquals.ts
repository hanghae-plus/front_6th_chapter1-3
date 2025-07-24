import shallowEqualsArrays from "./shallowEqualsArrays.ts";
import shallowEqualsObjects from "./shallowEqualsObjects.ts";
import { typeUtils } from "../utils/typeUtil.ts";

export const shallowEquals = (a: unknown, b: unknown) => {
  // 원시 타입인 경우
  if (typeUtils.isPrimitive(a) || typeUtils.isPrimitive(b)) {
    return a === b;
  }

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  // 비교하려는 값의 타입이 다르면 false
  if (aIsArray !== bIsArray) {
    return false;
  }

  // 배열인 경우
  if (aIsArray && bIsArray) {
    return shallowEqualsArrays(a, b);
  }

  // 객체인 경우
  if (typeUtils.isObject(a) && typeUtils.isObject(b)) {
    return shallowEqualsObjects(a, b);
  }
};
