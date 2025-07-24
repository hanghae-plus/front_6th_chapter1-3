# createElement

createElement를 사용하면 React 엘리먼트를 생성할 수 있다. JSX를 작성하는 대신 사용할 수 있다.

```js
const element = createElement(type, props, ...children);
```

> 2주차에서 구현한 JSX 를 변환하는 것을 생각해보면 된다.

주의할 점은 createElement, JSX 를 사용하지 않은 컴포넌트는 컴포넌트로 동작하지 않는다.
단순 함수 호출이기 때문에 커스텀 훅을 사용하는 것과 같게 동작한다.

> createElement 는 레거시 API 로 새로 작성하는 코드에서 권장하지 않는다. JSX 를 사용하는 것이 좋다.
> [React createElement](https://ko.react.dev/reference/react/createElement#creating-an-element-without-jsx)