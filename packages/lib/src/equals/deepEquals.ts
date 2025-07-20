export const deepEquals = (a: unknown, b: unknown) => {
  // 1. 기본 타입이거나 null인 경우 처리
  
  if (a === b) { return true; }
  
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }
  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (Array.isArray(a) && Array.isArray(b)) { 
    for (let i = 0; i < a.length; i ++) {
      if (!deepEquals(a[i], b[i])) { return false; }
    }
    return true;
  } else {
    // Object.keys(), Object.entries() 등으로 키를 순회
    if (Object.keys(a).length !== Object.keys(b).length) { return false; }
   
    return Object.keys(a).every(key => deepEquals(a[key], b[key]));
  }
};
