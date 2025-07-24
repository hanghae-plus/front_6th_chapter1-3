type ObjectValue = Record<string, unknown>;

export default function shallowEqualsObjects(objectA: ObjectValue, objectB: ObjectValue): boolean {
  // 참조가 같으면 true
  if (objectA === objectB) {
    return true;
  }

  // 둘 중 하나라도 null 또는 undefined면 false
  if (!objectA || !objectB) {
    return false;
  }

  const objectAKeys = Object.keys(objectA);
  const objectBKeys = Object.keys(objectB);
  const objectALength = objectAKeys.length;
  const objectBLength = objectBKeys.length;

  // 키가 개수가 다르면 false
  if (objectALength !== objectBLength) {
    return false;
  }

  for (let i = 0; i < objectALength; i++) {
    const key = objectAKeys[i];

    // 값이 다르거나, B에 해당 key가 없으면 다름
    if (objectA[key] !== objectB[key] || !Object.hasOwn(objectB, key)) {
      return false;
    }
  }

  return true;
}
