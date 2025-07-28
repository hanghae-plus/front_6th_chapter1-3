# React 규칙

### 컴포넌트와 Hook은 순수해야 한다.

#### 순수함수란?

같은 입력 값에 대해 항상 같은 출력 값을 내는 것.
리액트에선 같은 props, state, context 에 대해 같은 출력 값을 내야 한다.

#### 순수성이 중요한 이유

- 코드 이해, 디버깅이 용이해진다.
- 렌더링을 일시 중지하고 다시 렌더링 할 수 있다.

> 렌더링 중 useRef 의 값을 읽거나 변경하지 않아야 하는 이유

### React가 컴포넌트와 Hook을 호출하는 방식

사용자경험 최적화를 위해 필요할 때 마다 컴포넌트와 훅을 렌더링한다.
리액트는 선언적인 라이브러리이기 때문에, 무엇을 렌더링 할지 작성하면 최적화는 알아서 처리한다.

#### 주의사항
- 컴포넌트 함수를 직접 호출하지 않는다. 직접 호출하는 경우 훅 규칙을 위반하기 쉽고, 아래와 같은 이점을 얻을 수 없다.
  - 컴포넌트가 함수 이상의 역할을 하게 됩니다. React는 Hook을 사용해 컴포넌트에 지역 State와 같은 기능을 추가하여, 컴포넌트가 트리 내에서 고유한 정체성을 갖도록 할 수 있습니다.
  - 컴포넌트 타입이 재조정 과정에 참여합니다. React가 컴포넌트를 호출하도록 하면 트리의 개념적 구조에 대해 더 많은 정보를 제공하게 됩니다. 예를 들어 <Feed>에서 <Profile> 페이지로 전환될 때 React는 이를 재사용하려고 하지 않습니다.
  - React가 사용자 경험을 향상할 수 있습니다. 예를 들어 React는 컴포넌트를 호출하는 사이에 브라우저가 일부 작업을 수행할 수 있도록 하여, 큰 컴포넌트 트리를 다시 렌더링하는 것이 메인 스레드를 차단하지 않도록 할 수 있습니다.
  - 더 나은 디버깅 경험을 제공합니다. 컴포넌트가 라이브러리에서 일급 객체로 취급되면, 개발 중에 분석할 수 있는 풍부한 개발 도구를 제공할 수 있습니다.
  - 재조정 과정이 더 효율적입니다. React는 트리에서 정확히 어떤 컴포넌트가 다시 렌더링이 필요한지 결정하고, 필요 없는 컴포넌트는 건너뛸 수 있습니다. 이는 앱을 더 빠르고 민첩하게 만듭니다.
  > [컴포넌트 함수를 직접 호출하지 마세요](https://ko.react.dev/reference/rules/react-calls-components-and-hooks#never-call-component-functions-directly)
- 훅을 일반 값으로 전달하지 않는다. 훅은 컴포넌트 내부나, 훅 내부에서만 실행 되어야 한다.
  > [Hook을 일반 값처럼 전달하지 마세요](https://ko.react.dev/reference/rules/react-calls-components-and-hooks#never-pass-around-hooks-as-regular-values)

### Hook의 규칙

훅은 자바스크립트 함수로 정의하지만, 호출 위치에 제약이 있다.

- 최상위 레벨에서만 호출한다.
  - 조건문이나 반복문 내부에서 Hook을 호출하지 마세요.
  - 조건부 return문 이후에 Hook을 호출하지 마세요.
  - 이벤트 핸들러에서 Hook을 호출하지 마세요.
  - 클래스 컴포넌트에서 Hook을 호출하지 마세요.
  - useMemo, useReducer, useEffect에 전달된 함수 내부에서 Hook을 호출하지 마세요.
  - try/catch/finally 블록 내부에서 Hook을 호출하지 마세요.
  >[Hook을 최상위 레벨에서만 호출하세요](https://ko.react.dev/reference/rules/rules-of-hooks#only-call-hooks-at-the-top-level)
- React 함수에서만 호출한다.
  - Hook을 React 함수 컴포넌트에서 호출하세요.
  - Hook을 커스텀 Hook에서 호출하세요.
  >[Hook을 React 함수에서만 호출하세요](https://ko.react.dev/reference/rules/rules-of-hooks#only-call-hooks-from-react-functions)

>[React rules](https://ko.react.dev/reference/rules)