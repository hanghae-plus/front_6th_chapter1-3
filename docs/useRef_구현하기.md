# useState 를 사용해 useRef 구현하기

### useRef 는 무엇인가?

useRef 는 참조가 변하지 않는 자바스크립트 객체를 생성한다. 이 객체의 current 프로퍼티를 이용해 값을 읽고 쓸 수 있다. useState 와 다르게 값이 변할 때 렌더링을 발생시키지 않는다.

```js
const ref = useRef(initialValue);

console.log(ref) // { current: initialValue }
```

#### initialValue

ref 객체의 current 프로퍼티 초기 설정값이다. 여기에는 어떤 유형의 값이든 지정할 수 있다. 이 인자는 초기 렌더링 이후부터는 무시된다.

#### 주의사항

- current 값이 바뀌어도 state 처럼 렌더링을 발생시키지 않는다.
- 초기화를 제외하고 렌더링 중에 읽거나 쓰는 것이 권장되지 않는다. 읽거나 쓰는 작업은 useEffect, useLayoutEffect, 이벤트 핸들러에서 수행되어야 한다.

> 리액트는 같은 props, state, contenxt 에 대해 순수합수로 동작하길 기대한다. useRef 의 값에 의해 렌더링 결과가 달라진다면 문제가 발생할 수 있다.
> 18 버전부터 동시성이 추가 되었는데, 렌더링이 중간에 중단될 수 있다. 이때 렌더링 중 useRef 의 값이 변경 되었다면 예상하지 못한 동작이 발생할 수 있다.

>[React useRef](https://ko.react.dev/reference/react/useRef)

### useState 로 구현하기

useRef 와 useState 는 공통점이 있는데, 초기값을 할당한 이후 의도적으로 값을 변경하지 않는다면 값이 유지된다는 점이다.

useState 를 사용하고 set 함수를 사용하지 않는다면, 처음 설정된 객체를 계속 유지할 수 있다.

```
const [ref] = useState({ current: initialValue });
```