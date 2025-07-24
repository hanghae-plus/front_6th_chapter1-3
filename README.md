## 과제 체크포인트

### 배포 링크

<!--
배포 링크를 적어주세요
예시: https://<username>.github.io/front-6th-chapter1-3/

배포가 완료되지 않으면 과제를 통과할 수 없습니다.
배포 후에 정상 작동하는지 확인해주세요.
-->
[https://hanghae-plus.github.io/front_6th_chapter1-3/](https://hanghae-plus.github.io/front_6th_chapter1-3/)

### 기본과제

#### equalities

- [x] shallowEquals 구현 완료
- [x] deepEquals 구현 완료

#### hooks

- [x] useRef 구현 완료
- [x] useMemo 구현 완료
- [x] useCallback 구현 완료
- [x] useDeepMemo 구현 완료
- [x] useShallowState 구현 완료
- [x] useAutoCallback 구현 완료

#### High Order Components

- [x] memo 구현 완료
- [x] deepMemo 구현 완료

### 심화 과제

#### hooks

- [x] createObserver를 useSyncExternalStore에 사용하기 적합한 코드로 개선
- [x] useShallowSelector 구현
- [x] useStore 구현
- [x] useRouter 구현
- [x] useStorage 구현

### context

- [x] ToastContext, ModalContext 개선

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

이번 주차 과제를 진행한 방식이다.
1. 빠르게 구현하기
2. 리팩토링/학습
3. 과제 이외의 부분 생각해보기

1주차의 경우엔 학습을 하면서 코드를 갈아엎는 경우가 많았고, 코드를 갈아엎는데 시간을 많이 소비한 나머지 제출 마지막 날까지 기능을 구현에만 집중을 했다.

2주차의 경우엔 매일 학습을 한 내용을 정리했다. 글을 정리하는 과정에서 시간을 많이 사용했고 시간 안에 과제를 다 할 수 있을까? 라는 생각이 들기도 했다.

빠르게 구현 -> 리팩토링 및 학습 -> 과제 이외의 부분을 생각해보는 플로우는 빠르게 구현하기 때문에 과제 제출에 대한 부담감이 적을 것 같았고, 과제 전체 내용을 경험 한 뒤이기 때문에 좀 더 큰 그림을 그리며 학습이 가능할 것 이라 생각했다.

> 3주차 과제 진행 방식은 7팀 박의근님의 2주차 회고글을 보고 아이디어를 얻었다.
>![의근님 글 캡쳐](https://velog.velcdn.com/images/jihoon0330/post/2c74bf9c-9531-4dfd-a3e2-7b7baa707d56/image.png)
> [7팀 박의근님 2주차 회고글](https://velog.io/@bug_y_not/%EC%96%B4%EB%95%A0%EC%96%B4-7%EC%9B%94-%EC%85%8B%EC%A7%B8-%EC%A3%BC)


덕분에 이번 주차는 월요일에 기능 구현을 모두 끝낼 수 있었다.
![빠르게 구현하기](https://velog.velcdn.com/images/jihoon0330/post/02ecb358-94a6-4fa0-a559-5376a1e93232/image.png)

그동안 리액트를 써왔기 때문에 막히는 부분이 없을 거라 생각했는데, 생각보다 막히는 부분이 많이 있었다. 테스트 코드를 통과했지만 잘못 알고있는 부분도 있었다. 이런 과정을 겪으면서 잘못 알고 있는 부분을 최소화 하기 위해 꾸준한 공부가 필요하다고 느꼈다.

___

<!-- ### 기술적 성장 -->

<!-- 예시
- 새로 학습한 개념
- 기존 지식의 재발견/심화
- 구현 과정에서의 기술적 도전과 해결
-->
### 새로 학습한 개념

#### '===' 와 'Object.is' 의 차이점과 리액트에서 'Object.is' 를 사용하는 이유

리액트에서 값이 변경되었는지 비교할 때 `Object.is` 를 사용하는 것은 모르고 있었다. 문서를 살펴보니 문서상에 `Object.is` 를 사용한다고 명시되어 있어서 알게 되었다. 두 비교 연산자의 차이점은 숫자를 비교하는 부분에서 차이가 있었다.

|| `Object.is(value1, value2)`| `value1 === value2`|
| :- | :- | :- |
| `NaN` | `Object.is(NaN, NaN)`은 `true`를 반환한다.| `NaN === NaN`은 `false`를 반환한다.|
| `+0`/`-0` | `Object.is(+0, -0)`은 `false`를 반환한다.| `+0 === -0`은 `true`를 반환한다.|
| 사용 목적 | `NaN`과 부호 있는 0을 정확히 구분하여 완전한 값 동등성을 판단할 때 사용된다. | 타입과 값이 동일한지 판단하는 일반적인 비교 연산자다.|
---

#### 비교 표를 기준으로 Object.is 가 더 알맞은 이유:
- NaN 이 NaN 으로 바뀐 경우 UI 나 계산 로직이 달라지는 부분은 없기 때문에 값이 바뀌었다 판단하는건 불필요하다.
- 0 이라는 숫자도 부호에 따라 다른 계산 값을 가진다. 결과 값 업데이트가 필요하다.
```js
1 / 0 // Infinity
1 / -0  // -Infinity
(0).toLocaleString() // "0"
(-0).toLocaleString() // "-0"
Intl.NumberFormat().format(0) // "0"
Intl.NumberFormat().format(-0) // "-0"
```

> 메이저 버전이 업데이트 될 때 마다 문서 다시 한 번 읽어보기!
> `===` 연산자의 경우 수학적인 개념에 초점이 맞춰져 있다고 한다.
> `Object.is` 연산자의 경우 값 자체를 비교하는 것에 초점이 맞춰져 있다고 한다.

___

### 기존 지식의 재발견

#### useDeepMemo, useAutoCallback

useMemo, useCallback, memo 화 같은 것들을 왜 필요한 경우에만 사용하길 권장하는지 이해할 수 있었다. 값을 비교하는 과정이 추가되는데 이게 오히려 더 비싼 작업일 수 있다.
useMemo, useCallback 과 같은 훅을 이용할 때 커스텀하게 값일 비교하는 훅을 만드는 것은 생각해보지 못한 것 같다. 리액트에서 제공하는 훅들을 그대로 사용하지 않고 상황에 알맞게 변형해서 사용할 수 있을 것 같다.


#### setState

setState 를 사용할 때 이전 값을 그대로 리턴하는 경우 참조가 유지되어 리렌더링이 발생하지 않는 것을 알게 되었다.

```js
setState((prev) => {
  if( ... ) {
    // 참조가 유지됨
    return prev
  }

  return ...
})
```

#### createElement

memo.ts 파일에서 JSX 작성하는 대신 리액트 엘리먼트를 생성해야 했다.
처음엔 함수를 그대로 호출하는 형태로 작성을 했다.
테스트를 통과해서 잘못된 줄 모르고 있다가 다른 사람들의 코드를 보고 잘못된 걸 깨달았다.

우선 올바른 방법은 createElement 를 사용해줘야 JSX 를 사용한 것과 동일하게 실행할 수 있다.

```js
Component(props) // x
createElement(Component, props) // o
```

2주차 과제에서 진행한 JSX 를 변환하는 과정을 생각해 보면 이해하기 쉽다.

createElement 사용하는 것이 올바른 방법인 것은 알았지만, 함수를 호출하는 방식도 테스트는 통과 했기에 어떻게 다른지 궁금했다.

리액트 프로젝트를 하나 생성해 테스트를 진행했다.

1) UI 만 렌더링 하는 경우
UI 만 렌더링 하는 경우는 테스트 코드와 동일한 환경이다. 이 때는 JSX 를 사용한 것과 동일하게 동작하는 것 처럼 보인다.

2) 테스트 컴포넌트 내부에서 훅을 사용하는 경우
상위 컴포넌트에서, 테스트 컴포넌트 내부에 선언한 훅을 사용중인 것으로 인식이 된다. 이때 조건부로 함수를 호출하면 이전 렌더링과 훅 개수가 다르다는 오류 메세지가 나온다.
![훅 개수가 다름](https://velog.velcdn.com/images/jihoon0330/post/aeb62192-8670-4192-bb0b-d287b8bade06/image.png)

함수를 호출하는 것은 컴포넌트로 동작하지 않기 때문에 컴포넌트 생명주기와 관련된 부분에서 오류가 발생한다.
테스트를 통과할 수 있었던 이유는 단순히 JSX 만 리턴하는 역할이었기 때문이다.

관련된 내용은 공식 문서에서도 자세하게 나와있다. [React 컴포넌트 함수를 직접 호출하지 마세요](https://ko.react.dev/reference/rules/react-calls-components-and-hooks#never-call-component-functions-directly)

```js
function Person() {
  // useState 훅은 Person 을 함수로 호출했기 때문에 부모 컴포넌트인 App 컴포넌트에서 선언한 것처럼 동작한다.
	const [name, setName] = useState("");

	return (
    <div>...</div>
  );
}

function App() {
	const [count, setCount] = useState(0);

	const handleClick = () => {
		setCount((prev) => prev + 1);
	};

	return (
		<div>
      {/* Person 함수를 호출하면 컴포넌트로 인식되지 않는다. JSX 를 변환하는 과정이 없기 때문 */}
      {/* Person 함수를 호출하면서 함수 내부가 실행된다. 이때 App 컴포넌트에서 Person 내부에 선언한 훅을 실행하는 것으로 인식이 된다. */}
			{count > 0 ? Person() : null}
			<button type="button" onClick={handleClick}>
				+
			</button>
		</div>
	);
}
```

<!-- ### 자랑하고 싶은 코드 -->

<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

___

### 코드를 작성하면서 고민한 부분들

#### useRef 구현

useRef 를 구현하면서 일반적인 초기화 방식을 사용했다. useRef 함수에서 이미 계산된 값을 인자로 받기 때문에 지연 초기화가 필요 없다고 생각을 했다. 다른 분들의 코드를 살펴보니 지연 초기화를 하신 분들이 많아서 나도 지연 초기화를 해야 하나 생각이 들었다.

useState 에서 지연 초기화가 등장한 이유를 다시 생각해 봤다.
> createInitialTodos()의 결과는 초기 렌더링에만 사용되지만, 여전히 모든 렌더링에서 이 함수를 호출합니다. 이는 큰 배열을 생성하거나 값비싼 계산을 수행하는 경우 낭비일 수 있습니다.

리액트에서 지연 초기화는 값비싼 계산을 수행하는 경우와, 큰 배열을 생성하는 경우 권장된다.
useRef 함수에서는 initialValue 값을 그대로 할당하고 있기 때문에 작은 객체를 생성한다고 판단이 되었다. 만약 initialValue 라는 값에 매우 큰 배열이 들어오더라도 자바스크립트에서는 참조를 전달하기 때문에 useRef 함수 내에서 매우 큰 배열이 생성되지는 않기 때문에 지연 초기화를 쓰지 않기로 결정했다.

```js
export function useRef(initialValue) {
  const [value] = useState({ current: initialValue });
  return value;
}
```

#### useShallowState 구현하기

기존 set 함수의 형태를 만족하기 위해 인자로 값과 함수 모두 받을 수 있도록 만들었다.
useState 의 set 함수는 같은 참조를 반환하기 때문에 useAutoCallback 을 사용했다.
구현을 하면서 타입추론이 가능한 코드를 작성하기 위한 고민을 했습니다.

```ts
export const useShallowState = <T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.
  const [value, _setValue] = useState(initialValue);
  const setValue = useAutoCallback((value: SetStateAction<T>) => {
    _setValue((prev) => {
      const next = isFunction(value) ? value(prev) : value;
      return shallowEquals(prev, next) ? prev : next;
    });
  });

  return [value, setValue];
};

function isFunction<T>(value: SetStateAction<T>): value is (prev: T) => T {
  return typeof value === "function";
}
```

#### zustand 와 비교해보기

직접 작성한 useShallowSelector 코드와 zustand 의 [useShallow](https://github.com/pmndrs/zustand/blob/main/src/react/shallow.ts#L4C17-L4C27) 코드를 비교했다.

```tsx
// zustand
const prev = React.useRef<U>(undefined);

// 내 코드
const prevState = useRef<S | null>(null);
```

zustand 의 경우 초기값을 undefined 로 설정했고 나는 null 로 설정했다.
자바스크립트에서 undefined 는 변수가 선언 되었지만 아직 값이 할당되지 않은 상태를 나타낸다. null 의 경우 null 이라는 값이 할당된 상태이다. 이전 상태를 저장하는 prev 의 초기값으로 아직 값이 할당되지 않은 상태를 나타낸다면 undefined 를 사용하는 것이 알맞아 보였다.

```js
// zustand
return (state) => {
    const next = selector(state)
    return shallow(prev.current, next)
      ? (prev.current as U)
      : (prev.current = next)
  }

// 내 코드
return (state: T): S => {
  const currentState = selector(state);

  if (prevState.current === null) {
    // 초기 값 설정 의도
    prevState.current = currentState;
    return prevState.current;
  }

  if (!shallowEquals(prevState.current, currentState)) {
    prevState.current = currentState;
    return prevState.current;
  }

  return prevState.current;
}
```

zustand 에서는 이전 값과 새로운 값을 비교하는 과정만 존재한다. 내 코드에서는 초기값 설정과 비교하는 과정이 분리되어 있다. 입력 받은 state 값이 null 일수도 있기 때문에 사실상 초기 값 설정이라는 부분이 의미가 없다는 걸 알게 되었다. zustand 에서 값을 할당하면서 return 을 하는 방식으로 코드를 작성했는데, 주관적으로 할당과 리턴을 분리하는게 이해하기 쉽다고 생각한다.

최종적으로는 아래와 같이 코드를 수정했다.

```js
export const useShallowSelector = <T, S = T>(selector: Selector<T, S>) => {
  // 이전 상태를 저장하고, shallowEquals를 사용하여 상태가 변경되었는지 확인하는 훅을 구현합니다.
  const prevState = useRef<S>(undefined);

  return (state: T): S => {
    const currentState = selector(state);

    if (shallowEquals(prevState.current, currentState)) {
      return prevState.current as S;
    }

    prevState.current = currentState;
    return prevState.current;
  };
};
```

#### Context 사용할 때 리렌더링 최소화 하기

value 값이 참조를 유지할 수 있도록 useMemo 를 사용해 `{ show: showWithHide, hide, ...state }` 값을 캐싱한다. 의존성 배열에 showWithHide, hide, state 값을 넣어줘야 한다.

```tsx
useMemo(() => {
   show: showWithHide,
   hide,
   ...state,
}, [showWithHide, hide, state.message, state.type]);
```

showWithHide, hide 는 함수이기 때문에 useCallback 을 이용해 따로 최적화가 필요하다. 최적화를 위해 아래와 같이 계속 의존성 배열에 값을 넣고, 의존성 배열에서 비교를 위해 참조를 유지하도록 만드는 작업을 반복해야 한다. 
```tsx
// show, hideAfter 참조를 유지하기 위해 또 다른 작업 ..

const showWithHide: ShowToast = useCallback((...args) => {
  show(...args);
  hideAfter();
}, [show, hideAfter]);
```

과제를 진행하면서 만든 useAutoCallback 훅을 사용하면 의존성 배열 없이 최신 상태의 함수를 사용하면서 참조를 유지할 수 있어 간단하게 작성이 가능하다.

```tsx
const showWithHide: ShowToast = useAutoCallback((...args) => {
  show(...args);
  hideAfter();
});
```

이렇게 참조를 유지하도록 만들어도 장바구니 담기를 누르면 불필요한 리렌더링이 발생한다. 문제는 show, hide 를 호출하는 과정에서 state 값이 바뀌기 때문이다. 장바구니 추가 모달을 띄울 때 useCartAddCommand 훅을 사용하는 컴포넌트에서 state 의 값을 사용하지 않기 때문에, state 값과, 액션 함수들을 별개의 컨텍스트로 분리해 최적화를 진행할 수 있다.

최종적으로 아래와 같은 형태로 최적화를 진행했다.
```tsx
// 컨텍스트를 분리
const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>(initialState);
const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  ...

  // 참조 유지
  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  // 액션 객체의 참조를 유지
  const memorizedCommand = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastCommandContext value={memorizedCommand}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastCommandContext>
  );
}
```

> [객체와 함수를 전달할 때 리렌더링 최적화하기](https://ko.react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions)
> zustand 를 사용하는 경우 하나의 컨텍스트를 사용하면서 리렌더링 최적화가 되는 걸로 알고 있는데, 하나의 컨텍스트를 최적화 하는 방법도 찾아보면 도움이 될 것 같다.

___

<!-- ### 개선이 필요하다고 생각하는 코드 -->

<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

### 학습 효과 분석

<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->
- 컴포넌트를 함수로 호출하는 실수는 앞으로 하지 않을 것 같다.
- useMemo, useCallback 과 같은 훅은 제공하는 형태로만 사용을 해왔는데, 이번 과제에서 만든 useDeepMemo, useAutoCallback 과 같은 훅들을 만들면 코드를 더 단순하게 만들 수 있을 것 같다.
- setState 를 사용할 때 
- 이번에 구현해본 훅 이외에 다른 훅들도 어떻게 구현할 수 있을지 학습하면 좋을 것 같다.
- 추천 도서 읽어보기
  - 오프 코치님 추천: [전문가를 위한 리액트](https://product.kyobobook.co.kr/detail/S000214977649), [리액트 훅을 활용한 마이크로 상태 관리](https://product.kyobobook.co.kr/detail/S000212233308)
  - 8팀 유열님 추천: [모던 리액트 Deep Dive](https://product.kyobobook.co.kr/detail/S000210725203)

___

### 과제 피드백

<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->
- 어떤 훅을 이용해 해당 기능을 구현하세요 라는 힌트가 있는 부분은 구현이 상대적으로 쉬웠습니다.
- memo 를 ts 파일로 다루는 부분에서 createElement 를 사용하라는 힌트가 없어서 학습에 도움이 된 것 같습니다.
- 토스트 context 를 최적화 하는 부분도 과제에서 정해진 방법이 없어서 최적화를 위한 다양한 방법을 찾아볼 수 있었습니다.

___

## 학습 갈무리

<!-- ### 리액트의 렌더링이 어떻게 이루어지는지 정리해주세요. -->

<!-- 예시
- 리액트의 렌더링 과정
- 리액트의 렌더링 최적화 방법
- 리액트의 렌더링과 관련된 개념들 (예: Virtual DOM, Reconciliation 등)
- 리액트의 렌더링과 관련된 라이프사이클 메서드
- 리액트의 렌더링과 관련된 Hooks (예: useMemo, useCallback 등)
-->
### 리액트 렌더링 과정

리액트는 컴포넌트를 화면에 그릴 때 트리거 -> 렌더링 -> 커밋 과정을 거친다.

### 1. 트리거

트리거는 2가지가 존재한다.
1. 초기 렌더링
2. 상태 변화에 대한 렌더링

#### 초기 렌더링

```jsx
const root = createRoot(document.getElementById('root'));
root.render(<Image />);
```

createRoot 함수를 사용해 브라우저 DOM 노드 안에 React 컴포넌트를 표시하는 루트를 생성한다. 루트를 생성한 후 root.render 를 호출해 초기 렌더링을 트리거 할 수 있다.

#### 상태 변화에 대한 렌더링

state 를 업데이트 하면 자동으로 렌더링이 트리거 된다.

### 2. 렌더링

리액트에서 렌더링은 컴포넌트를 호출하는 것을 의미한다.
초기 렌더링은 루트 컴포넌트를 호출하게 되고, 이후 상태 변화에 대한 렌더링은 state 가 바뀌어 렌더링을 트리거한 컴포넌트를 호출한다. 컴포넌트가 다른 컴포넌트를 반환하면 해당 컴포넌트도 다시 호출된다. 이것이 부모 컴포넌트가 렌더링 될 때 자식 컴포넌트도 렌더링 되는 이유다.

렌더링 과정을 좀 더 구체적으로 표현하면
JSX 문법 -> 컴파일러를 통한 변환 -> ReactElement 생성 -> FiberNode 로 확장 -> 재조정 -> 변경사항 적용을 위한 스케쥴러 실행 과정을 거친다.

> JSX 문법은 컴파일러를 통해 ReactElement 를 생성하는 자바스크립트 코드로 변환된다. ReactElement 는 type, key, props, ref 등 컴포넌트에 필요한 정보를 담고 있다. 
> FiberNode는 ReactElement의 정보를 바탕으로, 트리 구조(부모, 자식, 형제 노드 참조), 컴포넌트의 상태, 훅, 라이프사이클 정보, 렌더링 작업에 필요한 다양한 메타데이터를 추가적으로 포함하는 가상 DOM 노드이다.
> 효율적인 재조정을 위해 useMemo, useCallback, memo 를 사용할 수 있다.

### 3. 커밋

렌더링 이후 실제 DOM 을 수정하는 것을 커밋이라고 부른다.
초기 렌더링의 경우 Node.appendChild() 매서드를 사용해 생성한 모든 DOM 노드를 화면에 표시한다. 리렌더링의 경우 차이가 발생한 부분만 DOM 에 적용된다.

페인트 이전에 useLayoutEffect 가 동기적으로 실행된다.
페인트 이후 useEffect 가 실행된다.

>[렌더링 그리고 커밋](https://ko.react.dev/learn/render-and-commit)
>[React 톺아보기](https://goidle.github.io/)

### 컴포넌트 라이프사이클 훅

#### 마운트
useState 초기화
페인트 전 useLayoutEffect 동기적 실행
페인트 이후 useEffect 실행

#### 업데이트
의존성 배열에 따라 useLayoutEffect, useEffect 실행

#### 언마운트
useLayoutEffect, useEffect 클린업 실행

___

### 메모이제이션에 대한 나의 생각을 적어주세요.

<!-- 예시
- 메모이제이션이 언제 필요할까?
- 메모이제이션을 사용하지 않으면 어떤 문제가 발생할까?
- 메모이제이션을 사용했을 때의 장점과 단점은 무엇일까?
- 메모이제이션을 사용하지 않고도 해결할 수 있는 방법은 무엇일까?
-->

리액트는 가상 DOM 비교를 통해 변화된 부분만 DOM 을 업데이트 한다. 변화를 확인하는 방법으로 Object.is 매서드를 사용해 값을 비교한다. 이 과정에서 객체, 배열, 함수 등은 참조 값을 비교하게 되는데 컴포넌트가 리렌더링 되는 과정에서 새로운 참조가 생성되고, 값이 달라졌다 판단하게 된다. 이때 참조를 유지시키기 위해 메모이제이션이 필요하다.

메모이제이션을 사용했을 때 장점은 참초를 유지할 수 있다는 점이다. 참조를 유지하게 되면 의존성 배열, memo 등 값을 비교하는 과정에서 값이 변하지 않도록 판단하게 만들 수 있다. 단점으로는 참조를 유지시키는 useMemo, useCallback과 같은 훅들도 의존하는 값이 변했는지 비교하는 과정을 거치게 되는데, 불필요하게 사용할 경우 불필요한 비교 연산이 발생하게 된다.

메모이제이션을 사용하지 않고, 비교에 필요한 값을 개별로 넣는 방법을 사용할 수 있다.

```jsx
const [state, setState] = useState({name:"", age:0});
const memoization = useMemo(()=> state, [state.name, state.age]);

useEffect(()=>{
  ...
  // 객체를 메모이제이션
}, [memoization]);
```

```jsx
const [state, setState] = useState({name:"", age:0});

useEffect(()=>{
  ...
  // 객체를 메모이제이션 하지 않고, 필요한 값을 개별로 넣는다.
}, [state.name, state.age]);
```

컨텍스트를 사용해 리렌더링이 발생하는 경우 컨텍스트 분리, 메모이제이션을 통한 최적화를 진행할 수 있다. 만약 상태를 더 좁은 범위로 격리할 수 있다면, 컴포넌트 내부 상태로 분리 -> 필요한 시점에 컨텍스트 업데이트 와 같은 방법으로 최적화를 할 수 있다.
___

### 컨텍스트와 상태관리에 대한 나의 생각을 적어주세요.

<!-- 예시
- 컨텍스트와 상태관리가 필요한 이유는 무엇일까?
- 컨텍스트와 상태관리를 사용하지 않으면 어떤 문제가 발생할까?
- 컨텍스트와 상태관리를 사용했을 때의 장점과 단점은 무엇일까?
- 컨텍스트와 상태관리를 사용하지 않고도 해결할 수 있는 방법은 무엇일까?
- 컨텍스트와 상태관리를 사용할 때 주의해야 할 점은 무엇일까?
-->

> 컨텍스트 + useState 사용하는 것을 가정한다.

컨텍스트는 props 로 값을 전달하지 않아도, 값을 읽을 수 있게 해준다. props 를 전달하는 방식은 컴포넌트에 필요한 정보를 명시할 수 있는 점에서 좋은 방식이지만, 때론 해당 컴포넌트에서 불필요한 값도 전달을 목적으로 받아야 하는 경우가 발생한다. 이런 경우 컴포넌트 추가/삭제가 어려워 질 수 있고, 재사용성이 떨어진다. 또한 props 만 전달하는 중간 컴포넌트들이 불필요한 리렌더링을 해야할 수 있다. 컨텍스트는 이런 상황에서 대안이 될 수 있다.

> 불필요한 props 전달의 경우 컴포넌트를 children 으로 전달하는 방법으로도 개선할 수 있다. 리액트 공식 문서에서는 컨텍스트를 사용하기 전 JSX 를 children 으로 전달하는 것을 고려하도록 권장한다.
> [Context를 사용하기 전에 고려할 것](https://ko.react.dev/learn/passing-data-deeply-with-context#before-you-use-context)

컨텍스트를 사용할 때 컨텍스트 값이 변경되면 값을 구독중인 컴포넌트들이 모두 리렌더링 되기 때문에 불필요한 리렌더링이 발생하지 않도록 주의해야 한다. 메모이제이션을 사용해 참조를 유지하도록 최적화를 할 수 있고, 자주 변경되는 값과, 자주 변경되지 않는 값을 별도의 컨텍스트로 분리하는 방법으로 최적화를 진행할 수 있다.

___

## 리뷰 받고 싶은 내용

<!--
피드백 받고 싶은 내용을 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 질문의 예시)
- 무엇을 질문해야 할지 몰라서 코치님이 보시기에 고쳐야할것들 전반적으로 피드백 부탁드립니다.
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 질문의 예시)
- 파일A의 함수B와 그 안의 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수 이름을 더 명확하게 지을 방법에 대해 조언해 주실 수 있나요?
- 현재 파일 단위로 코드를 분리했지만, 이번 주차 발제를 기준으로 봤을 때 모듈화나 계층화에서 부족함이 있는 것 같습니다. 특히 A와 B 부분에서 모듈화를 더 진행할지 그대로 둘지 고민하였습니다. (...구체적인 고민 사항 적기...). 코치님의 의견이 궁금한다.
- 옵저버 패턴을 사용해 상태 관리 로직을 구현해 보려 했습니다. 제가 구현한 코드가 옵저버 패턴에 맞게 잘 구성되었는지 검토해 주시고, 보완할 부분을 제안해 주실 수 있을까요?
- 컴포넌트 A를 테스트 할 때 B와의 의존성 때문에 테스트 코드를 작성하려다 포기했습니다. A와 B의 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?

과제에서 디테일한 피드백을 받기 위해선 여러분의 생각을 디테일하게 표현해주셔야 한답니다.

가령, "전반적으로 이 라우터 구조가 규모가 커졌을 때 유지보수나 기능 확장에 유리한지, 아니면 리팩토링이 필요할지 조언을 받고 싶습니다" 라는 질문이 있을 때, 답변드리기가 어려워요. 
이럴 때는 "기능 확장" 상황을 먼저 가정해봐야한다. 테스트의 엣지케이스를 작성하는 것 처럼요! 그리고 그 상황에 대해 내가 작성한 코드가 이러저러한 이유 때문에 대응가능할 것 같은데 혹시 더 고려해야할 부분이 있을지를 물어보는거죠.

이건 코치에게 이야기할 때 뿐만 아니라 팀원에게 이야기할 때에도 동일해요. 여러분의 컨텍스트를 명확하게 전달하지 않으면 여러분과 이야기할 때 시간이 무척 오래 걸린답니다.

특히 멘토링 처럼 동기적으로 이루어지는 커뮤니케이션에서는 위와 같은 질문을 던져도, 상호 피드백으로 질문을 함께 만들어갈 수 있지만, 과제 피드백 처럼 비동기 방식 + 1회용 질문일 때에는 좋은 답변을 드리기가 어려운점 인지 부탁드립니다 ㅠㅠ
-->

1. 자주 사용하는 커스텀훅이 있는지 궁금합니다. useAutoCallback 처럼 기존 훅을 더 쉽게 사용할 수 있도록 만든 훅들이 있을까요?

2. 메모이제이션을 사용하다 보면 결국 모든 값을 메모이제이션 해야 하는 상황들이 발생하는 것 같은데, 모든 컴포넌트와 값들에 메모이제이션을 적용하는건 어떻게 생각하시나요?