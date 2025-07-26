# Hooks 만들기

## useRef

처음에 어떤걸 구현해야할지 당황했다.
useRef를 먼저 구현 후에 `initialValue`를 받아서 `{ current: T }` 형태로 반환할 수 있는 방법을 살펴보았다.
useState를 활용해야하니 react useState의 타입을 살펴보았다.

```ts
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

제네릭 타입으로 변수를 받는데 해당 변수는 일반적인 제네릭 S타입과 함수형태의 S를 반환하는 타입을 받는다. 그리고 `[S, Dispatch<SetStateAction<S>>]`를 반환한다.
고민해 보았다. useRef자체는 어떻게 구현하는지 잘 모르겠으나, setState를 보니 `initialValue`가 T타입이며, 우리가 원하는 반환값은 `{ current : T }`이다.
useState에서 두 번째 반환값은 Dispatcher함수 라서 필요 없고, S를 `{ current : T }` 형태로 변환하면 될 것 같다.
그래서 useState에 인자로 `{ current: initialValue }`를 전달했다. 그리고 반환 값을 배열로 받아 useState의 첫번째 인자인 S, 즉 우리가 원하던 `{ current: T }`를 반환할 수 있게 되었다.

```ts
export function useRef<T>(initialValue: T): { current: T } {
  // 우리가 흔히 쓰던 방식
  // const [isLoading, setIsLoading] = useState(false)
  // 여기서 isLoading은 ref, false는 { current: initialValue }가 된다.
  const [ref] = useState({ current: initialValue });
  return ref;
}
```

## useMemo

이전 설계 방식은 아래와 같았다. 1번 부터 4번까지 제시된 내용대로 구현했는데 무엇이 문제일까?
들어온 값을 무조건 memoRef에 할당하여 변경이 되든 안되든 반환하고 있었다. 게다가 변경되었을 경우에 또 `factory`함수를 실행하여 불필요한 함수 요청이 과하게 진행된다.

```ts
// AS-IS
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const memoRef = useRef<T>(factory());
  const depsRef = useRef<DependencyList>(_deps);
  // 2. _equals를 사용하여 현재 의존성과 이전 의존성 비교
  if (!_equals(depsRef.current, _deps)) {
    // 의존성이 변경되었나요?
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    memoRef.current = factory();
    depsRef.current = _deps; // 현재 _deps에 들어온 _deps 저장
  }
  return memoRef.current;
}
```

그래서 아래와 같이 변경하였다! 첫 초기 값을 지정한 후, 의존성을 비교하여 업데이트 해준다.
생각해보니 우리가 흔히 사용하고 있는 hooks의 의존성 배열에 빈 배열 처리도 필요해보인다. `ex. useMemo(() => {},[])` 자주 사용하고 있는 구문인데 직접 구현하려다보니 망각하고 있던 부분이었다.

```ts
// TO-BE
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  const memoRef = useRef<T | null>(null);
  const depsRef = useRef<DependencyList>([]);
  if (!_equals(depsRef.current, _deps) || memoRef.current === null) {
    memoRef.current = factory();
    depsRef.current = _deps;
  }
  return memoRef.current;
}
```

## useDeepMemo

````

## useCallback

useMemo를 통해 구현했다.
useMemo가 기본적으로 `_equals`를 인자로 받으니, useCallback함수에도 `_equals`를 인자로 지정해주었다.

```ts
export function useCallback<T extends Function>(factory: T, _deps: DependencyList, _equals = shallowEquals) {
  return useMemo<T>(() => factory, _deps, _equals);
}
````

## useShallowState

useShallowState는 커스텀 훅이다. 해당 훅을 만들려면 useState로 상태를 저장하는 로직과 shallowEquals로 들어온 값과 훅 함수로 들어온 값이 같은지 확인할 수 있어야한다.
먼저 useState로 받은 인자 값을 저장한다. 그리고 내부에서 callback 함수를 추가한다. 해당 함수는 value값이 변경되었다면 새로운 값을 저장한다.
그리고 `[value, callbackFunction]`형태의 커스텀 훅을 반환한다.

구현까지 잘 진행되었는데 한 가지 문제가 생겼다. 타입 에러가 계속 유지되고 있었다.
기존의 `(initialValue: Parameters<typeof useState<T>>[0])` 부분은 useState가 튜플을 반환하기 때문에 배열처럼 사용해서 에러가 발생됐다. useShallowState 테스트 코드를 보니 반환하는 함수를 useState처럼 `Dispatch<SetStateAction<T>>` 형태로 명시하는게 좋겠다고 생각되었다.

```ts
export const useShallowState = <T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  ...
  const useCallbackShallowEqualsValue = useCallback((newValue: SetStateAction<T>) => {
    ...
```

useCallback 함수에 의존성 배열 린트 에러가 발생 중이었다.
shallowEquals에서 value과 newValue를 비교하는데 외부 값인 value를 참고하고 있어서 의존성 배열에 value를 추가해줘야하는지 고민이었다.
의존성 배열에 value를 추가하게 되면 어떻게 될까? value가 바뀔 때마다 이전 함수를 기억하지 않고 새 함수를 생성 됨. -> useCallback을 사용하는 의미가 없음.
테스트코드에서도 동일한 함수를 재사용해야하는데 매번 새로운 함수를 참조하게 되어 출력 값이 1번이 아닌 6번이 출력된다. 불필요한 리렌더링과 메모이제이션 효과도 없고 메모리 이슈도 있다.

내부에서 value를 사용하지 않는 방법으로 하려고 했으나 `setState((prev // 여기) => {})` prev 타입 에러를 해결하려니 리소스가 많이 들어 과감히 포기하고 의존성 배열을 비워놓는 방식으로 결정하였다.

```ts
// 포기했지만 시도해본 내부 의존성 제거 방식
export const useShallowState = <T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);
  const setShallowValue = useCallback((newValue: SetStateAction<T>) => {
    setValue((prev) => {
      const resolved =
        typeof newValue === "function"
          ? newValue(prev) // newValue 타입 지정이 복잡함
          : newValue;

      return shallowEquals(prev, resolved) ? prev : resolved;
    });
  }, []);
  return [value, setShallowValue];
};
```

## useAutoCallback

useAutoCallback 훅은 렌더링 되는 시점에 전달받은 함수를 항상 최신화해야하며, useCallback으로 해당 함수를 기억하여 참조를 유지하고 받은 인자들로 내부 값을 업데이트해준다.

useCallback 함수가 있는데 왜 굳이 useAutoCallback을 사용해야하는가? 궁금해서 chatGpt에게 물어봤다.

```
// useAutoCallback이 useCallback보다 나은 이유
1. 의존성 관리 불필요. 의존성 배열의 값이 변경될때마다 useCallback은 새로운 함수를 생성한다.
2. useCallback은 새로운 함수가 재생성되므로 불필요한 컴포넌트 리렌더링이 발생되지 않는다.
3. 그러므로 useAutoCallback을 사용한다!
```

## createObserver

useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?) 에서 subscribe로 사용하는 함수가 createObserver이다

```ts
...
  const isOnline = useSyncExternalStore(
    // subscribe: 저장소 변경을 구독하는 함수
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // getSnapshot: 현재 상태를 반환하는 함수
    () => navigator.onLine,
    // getServerSnapshot: 서버 렌더링 시 초기값 (선택사항)
    () => true
  );
...
```

발제 자료 중에 위와 같은 useSyncExternalStore을 사용할 때 구독 함수에 addEventListener이후에 return 하면서 removeEventListenr하는 부분을 확인할 수 있다. createObserver에서도 동일하게 구독하는 코드와 구독 해제 하는 코드를 구현해주면 되는 부분이었다.

**Listener가 뭐야? 왜 new Set에 () => void타입을 명시해준거지?**

말 그대로 이벤트 리스너! 동작하는 함수들을 subscript하기 위해 Listener로 등록. 대신 이벤트 위임에서 많이 보았던 new Set을 사용하여 이벤트 중복 구독을 방지한다.
옵저버 패턴에서 new Set을 많이 사용한다고 한다.

**옵저버 패턴이란?**

1:N 의존성을 특징으로 하며 발행(Publishing) 상태를 변경하면 해당 상태를 구독(Subscribing)하고 있는 구독자들에게 관찰자(Obserber)가 상태가 변경되었다고 통지(Notify)하는 소프트웨어 디자인 패턴 중 하나이다.

**listener를 add하고 delete하는 이유는?**

메모리 누수 때문이다. 역시나 이벤트 위임때 경험했던 이벤트가 무수히 많이 등록됐는데 언마운트시 삭제해주지 않으면 동일한 함수들이 계속 쌓이기 때문에 컴포넌트가 언마운트되거나 필요없는 경우에 자동 정리되도록 delete해주는 것이다.

## useShallowSelector

zustand에서 shallow함수를 참고하여 useShallowSelector를 구현했다.
다른 훅들과 동일하게 useRef로 초기 설정을 해주고 변경된 값이 있는지 비교한 후 동일한 selector에 변경된 값만 업데이트하여 반환해준다.

## useStore

**1차 고민**

useStore 내부에서 useSyncExternalStore와 useShallowSelector를 사용하여 store의 구독 상태를 확인하는 로직이 필요하다. 우선 useSyncExternalStore와 useShallowSelector를 사용해서 변수를 하나 만들어줬다.

useStore의 발제 자료에서 useStore의 사용처를 확인해보니 createStore로 만들어진 친구를 인자로 받고 있었다. 그리고 해당 인자는 useStore내부에서 initialState와 subscribe를 사용해야할 것 같았다. useSyncExternalStore에서 구독 함수, 현재 상태를 반환하는 함수, 초기값(선택)을 받아야하기 때문에 store에서 getState와 subscribe함수를 가져와야겠다고 판단되었다.

그리고 useShallowSelector는 selector함수를 인자로 받는다.
음.. 근데 뭔가 이상하다 그리고 이 코드들로 뭘 반환해주고 뭘 확인해야하는 걸까?

```ts
const { getState, subscribe } = store;
const syncExternal = useSyncExternalStore(subscribe, getState);
const shallowSelector = useShallowSelector(selector);
```

**2차 고민**

팀원에게 물어보고 react 라이브러리에 `useSyncExternalStoreWithSelector.tsx`가 있다는 것을 찾았다. 거기서 확인한 내용은 다음과 같다.

```ts
export function useSyncExternalStoreWithSelector<Snapshot, Selection>(
  // useStore로 받는 subscribe
  subscribe: (() => void) => () => void,
   // useStore로 받는 getState
  getSnapshot: () => Snapshot,
   // 서버 렌더링 시 초기 값
  getServerSnapshot: void | null | (() => Snapshot),
   // useStore로 받는 selector
  selector: (snapshot: Snapshot) => Selection,
   // equals는 useShallowSelector 내부에서 사용 중
  isEqual?: (a: Selection, b: Selection) => boolean,
): Selection {
  ...
  // getSelection = getSnapshotWithSelector
  const [getSelection, getServerSelection] = useMemo(() => {
    // 우리가 만든 useShallowSelector
    const memoizedSelector = (nextSnapshot: Snapshot) => {
      ...
    };
    const getSnapshotWithSelector = () => memoizedSelector(getSnapshot());
    const getServerSnapshotWithSelector = () => memoizedSelector(getServerSnapshot());
    return [getSnapshotWithSelector, getServerSnapshotWithSelector];
  }
  const value = useSyncExternalStore(
    subscribe,
    getSelection,
    getServerSelection,
  );
  ...

  return value;
}
```

로직이 동일하다! 우리가 구현해야할 부분은 마지막의 `return value`부분이며, `value`는 useSyncExternalStore에 미리 인자로 받은 subscribe와 selector를 전달하고 useShallowSelector를 활용하여 스냅샷을 전달한다.
여기서 서버로 전달받는 초기 값도 스냅샷 전달 중이므로 동일하게 useShallowSelector를 활용한다.

```ts
const { getState, subscribe } = store;
const value = useSyncExternalStore(
  subscribe,
  () => shallowSelector(getState()),
  () => shallowSelector(getState()),
);
return value;
```
