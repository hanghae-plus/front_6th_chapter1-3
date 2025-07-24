## JSX 문법 변환

JSX 문법은 컴파일러를 통해 자바스크립트 코드로 변환된다.
![jsx 변환](https://velog.velcdn.com/images/jihoon0330/post/89400702-3254-40a6-a3e7-85855cede275/image.png)

바벨에서 변환된 JSX 코드를 보면 `react/jsx-runtime` 라는 곳에서 jsx 를 가져오는 것을 알 수 있다.

> 과거엔 React.createElement 를 통해 변환이 이루어 졌지만, 성능 최적화와 개념 간소화를 위해 변경 되었다. [RFC create element changes](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md)
> key 가 스프레드 된 객체 뒤에 있으면 구버전으로 변환된다. `<div {...{"key":"2"}} key="1" />` -> `_createElement("div", {"key": "2", key: "1"});`

react/jsx-runtime 에서 사용중인 jsx 함수는 React 패키지의 ReactJSXElement.js 파일에 선언되어 있다.

> [ReactJSXElement.js - jsxProd()](https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L303)


## jsxProd 함수의 역할

코드를 살펴보면 jsxProd 함수는 2가지 역할을 하고 있다.

### key 처리

key 값을 별도로 분리하고, props 에 key 가 있다면 제거한다.

### ReactElement 를 생성: 

prod 에서 사용되는 코드만 남기면, ReactElement 는 `REACT_ELEMENT_TYPE` 이라는 값을 가지는 React 컴포넌트의 정보를 담은 객체라고 볼 수 있다.

```js
function ReactElement(type, key, props) {
	// Ignore whatever was passed as the ref argument and treat `props.ref` as
	// the source of truth. The only thing we use this for is `element.ref`,
	// which will log a deprecation warning on access. In the next release, we
	// can remove `element.ref` as well as the `ref` argument.
	const refProp = props.ref;

	// An undefined `element.ref` is coerced to `null` for
	// backwards compatibility.
	const ref = refProp !== undefined ? refProp : null;

	let element;

	// In prod, `ref` is a regular property and _owner doesn't exist.
	element = {
		// This tag allows us to uniquely identify this as a React Element
		$$typeof: REACT_ELEMENT_TYPE,

		// Built-in properties that belong on the element
		type,
		key,
		ref,

		props,
	};

	return element;
}
```