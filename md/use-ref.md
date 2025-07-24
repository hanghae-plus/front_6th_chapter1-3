# useRef 직접 구현하기

useRef란 일단 reference를 참조하는 react hook이다.

return 값은 {current: ...} 방식으로 사용하는 것인데,
실제 값을 변경해줄 때도 current에다가 직접 바인드 해주는 방식이다.

실제 내부 구현을 하고자 하면 React 컴포넌트에서 hook 상태를 관리하는 코드와 연결지어야한다.

https://jser.dev/react/2021/12/05/how-does-useRef-work
