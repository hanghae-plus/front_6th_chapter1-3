# ToastContext 리팩토링

## ToastProvider

현재 show, hide할때마다 상품 컴포넌트들이 리렌더링 된다.
Provider에서 상태값들이 업데이트 됨에 따라 App내부의 내부 컴포넌트도 함께 리렌더링되기 때문이다.
토스트 동작시에만 내부 컴포넌트가 리렌더링 되는거면 show, hide를 전달할때 메모이징 처리 하면 되지 않을까?

```ts
export const useToastCommand = () => {
  const { show, hide } = useToastContext();
  return { show: useAutoCallback(show), hide: useAutoCallback(hide) };
};
```

기존 useToastCommand에 show와 hide를 useAuthCallback처리해줬다. 결과는 **FAIL**. UI가 매번 업데이트된다.
다시 코드를 살펴보니 useReducer에서 provider로 전달해주는 상태가 state, dipatch 두 가지로 보인다. dispatch는 show, hide로 사용중이고, state는 show, hide와 함께 state를 전달중이다.
show, hide 는 토스트가 보여질때, 사라질때의 동작 액션이고 state는 토스트에 보여주는 문구와 타입을 갖고있는 상태 값이다. 각각의 상태가 리렌더를 유도하고있다.
useToastContext와 useToastStateContext로 컨텍스트를 분리하였다. 각각 dispatch action과 state를 추적할 것이다.
컨텍스트를 분리하고나니 ProductCard가 더 이상 리렌더되지 않는 것을 확인 할 수 있다.

```ts
const hideAfter = debounce(hide, DEFAULT_DELAY);
```

hideAfter부분을 useCallback을 사용할지 useMemo를 사용할지 고민이었다. debounce는 함수인데 useCallback을 사용하는게 맞지 않을까..?
useMemo와 useCallback을 비교해봤다. useMemo는 계산 비용이 큰 값을 캐싱한다. useCallback은 이미 존재하는 함수를 캐싱한다.
정확히는 함수 생성을 메모이제이션하는가 vs 함수 호출 자체(참조)를 메모이제이션하는가 이다. 전자는 `useMemo(() => debounce(),[])`와 같은 형태로 사용하고 후자는 `useCallback(debounce(),[])`와 같이 사용한다. 실제로 두 코드는 기능상 같은 동작을 한다.
그래서 굳이 사용하자면 useMemo를 사용하는데 그 이유는 **함수 생성 과정의 결과**를 메모이제이션하는 것에 초점을 두기 때문이다.

```js
...
  return (...args: Parameters<T>) => { // 함수 생성 결과
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };

```

debounce 유틸 함수를 보면 다음과 같이 함수를 return 한다. 이러이러한 계산으로 만들어진 숫자, 이러이러한 계산으로 만들어진 배열, 이러이러한 계산으로 만들어진 객체, 그리고 여기에 함수도 포함된다.
이전에는 **값**이면 useMemo로 당연하게 생각했던 부분을 정확히 집고 넘어가는 부분이 되었다.
