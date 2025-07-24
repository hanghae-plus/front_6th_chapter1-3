# useSyncExternalStore

외부 스토어를 구독할 수 있도록 해주는 훅이다.

```js
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

#### subscribe

스토어를 구독하는 함수이다. 리턴 값으로 구독을 해제하는 함수를 반환해야 한다.
useEffect 에서 구독/구독해제 하는 부분을 subscribe 에서 담당한다고 생각하면 이해하기 쉬울 것 같다.
```js
useEffect(() => {
 // 스토어 구독
 return () => {
    // 스토어 구독 해제
 }
}, [])

useSyncExternalStore(() => {
 // 스토어 구독
 return () => {
    // 스토어 구독 해제  
 }
}, ...)
```

#### getSnapshot

getSnapshot 가 반환하는 값이 snapshot 에 해당하는 값이다. 필요한 값을 반환하는 함수를 넣어 주면 된다.

#### getServerSnapshot?

SSR 을 할 때 필요한 값이다. 서버에서 렌더링 할 때 필요한 값을 반환하는 함수를 넣어 준다.

#### 주의사항
- getSnapshot 이 반환하는 값은 불변이어야 한다. (useState 를 사용할 때와 동일)
- 리렌더링을 할 때 `subscribe` 함수의 참조가 바뀌지 않도록 한다.

>[React useSyncExternalStore](https://ko.react.dev/reference/react/useSyncExternalStore)
>[useSyncExternalStore 예제 유튜브 영상](https://youtu.be/GMeQ51MCegI?list=PLNqp92_EXZBJs6rKouX5U8-tWJgTLaeKv)
