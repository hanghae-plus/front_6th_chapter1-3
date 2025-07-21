# useRef 를 사용해 useMemo 구현하기

### useMemo 는 무엇인가?

리렌더링이 발생할 때 계산 결과를 캐싱할 수 있도록 해주는 훅이다.

```js
const cachedValue = useMemo(calculateValue, dependencies);
```

#### calculateValue

인자를 받지 않는 순수 함수여야 한다. 이 함수는 초기 렌더링에서 실행되고, 마지막 렌더링에서 dependencies 값이 바뀌지 않았다면 캐싱된 값을 리턴한다. dependencies 값이 바뀌었다면 다시 계산한다.

#### dependencies

calculateValue 코드 내에서 참조된 모든 반응형 값들의 목록이다. 반응형 값에는 props, state와 컴포넌트 바디에 직접 선언된 모든 변수와 함수가 포함된다. 

>[React useMemo](https://ko.react.dev/reference/react/useMemo)

### useRef 로 구현하기

useMemo 의 경우 결과 값을 캐싱하고, 의존성 배열이 변경되지 않았다면 캐싱된 값을 다시 사용하는 특성을 가지고 있다. useRef 는 리렌더링이 발생해도 같은 값을 참조하는 특성이 있기 때문에 useMemo 에서 필요한 캐싱 기능을 구현할 수 있다.

```js
function useMemo(calculateValue, dependencies) {
  const cachedValue = useRef(null);
  const prevDependencies = useRef(null);

  if (prevDependencies === null) {
    // 초기 렌더링 시 계산
    cachedValue.current = calculateValue();
    // 디펜던시 저장
    prevDependencies.current = dependencies;
    return cachedValue.current;
  }

  // 배열 각 요소를 Object.is 로 비교
  if (dependencies 값이 달라졌으면..) {
    // 다시 계산
    cachedValue.current = calculateValue();
    prevDependencies.current = dependencies;
    return cachedValue.current;
  }

  // dependencies 값이 같으면 캐싱된 결과 사용
  return cachedValue.current;
}
```