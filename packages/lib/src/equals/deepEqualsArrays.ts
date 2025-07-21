import { deepEquals } from "./deepEquals.ts";

type ArrayValue = unknown[];

export const deepEqualsArrays = (arrayA: ArrayValue, arrayB: ArrayValue) => {
  // 참조가 같으면 true
  if (arrayA === arrayB) {
    return true;
  }

  // 둘 중 하나라도 null 또는 undefined면 false
  if (!arrayA || !arrayB) {
    return false;
  }

  const arrayALength = arrayA.length;
  const arrayBLength = arrayB.length;

  if (arrayALength !== arrayBLength) {
    return false;
  }

  for (let i = 0; i < arrayALength; i++) {
    if (!deepEquals(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};
