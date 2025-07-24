# Context

컨텍스트는 부모 컴포넌트가 트리 아래에 있는 모든 컴포넌트에 props 를 통해 전달하지 않은 정보를 사용할 수 있도록 한다.

## createContext

컴포넌트 외부에서 컨텍스트를 생성한다.

```js
const SomeContext = createContext(defaultValue);
```

#### defaultValue

컴포넌트가 컨텍스트를 읽을 때 일치하는 컨텍스트 제공자가 없는 경우 사용할 값이다. 이 값은 변경되지 않는다.

#### SomeContext (반환값)

상위 컴포넌트에서 컨텍스트 값을 지정하기 위해 사용

```js
<SomeContext value={...}>
   // 컨텍스트 값을 공유한다.
   ...
</SomeContext>
```

하위 컴포넌트에서는 컨텍스트 값을 읽기 위해 `useContext(SomeContext)` 를 사용한다.

value 를 통해 전달된 컨텍스트 값이 변경되면 컨텍스트를 읽는 하위 컴포넌트들을 리렌더링 한다.

## useContext

컨텍스트 값을 읽고 구독할 수 있는 훅

```js
const value = useContext(SomeContext);
```

### 최적화 하기

value 에 넘기는 값 참조를 유지해야 한다.
이때 useMemo, useCallback 같은 훅을 활용할 수 있다.

만약 참조를 유지하기 어렵다면 변경이 자주 발생하는 값과 아닌 값을 분리하는 방법을 사용하면 효율적이다.