# useState 초기화

useState 초기화에 대해 알아보기

값을 초기화 할 때 첫번째 인자로 초기화 할 값을 넣어준다.

```js
const [value, setValue] = useState("초기화 할 값");
```

리렌더링이 발생하는 경우 `const [value, setValue] = useState("초기화 할 값");` 이 코드는 실행이 되지만, 첫번째 인자로 전달한 값으로 다시 초기화 되지 않는다.

여기서 주의해야 할 점은 리렌더링이 발생할 때 마다 코드가 다시 실행된다는 점이다.
만약 초기화 값을 생성하기 위해 비싼 작업이 실행 되어야 한다면, 리렌더링이 발생할 때 마다 해당 작업이 실행이 됩니다.

이런 문제를 해결하기 위해 useState 는 초기값을 할당하는 경우에만 코드가 실행이 되도록 보장하는 방법이 존재한다. 첫번째 인자로 함수를 넘기는 경우 해당 함수는 초기값을 설정할 때만 실행이 된다.

```js
const [value, setValue] = useState(() => {
   // 이 함수는 초기값을 설정할 때만 실행이 된다.
   // 함수가 리턴한 값이 초기값으로 설정이 된다.
   return "초기화 할 값"
});
```

>[React useState](https://ko.react.dev/reference/react/useState)
>[React 초기 state 다시 생성하지 않기](https://ko.react.dev/reference/react/useState#avoiding-recreating-the-initial-state)