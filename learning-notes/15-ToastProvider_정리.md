# ToastProvider 리팩토링 및 최적화 정리

## 1. 문제 상황

- ToastProvider의 상태 변경(토스트 show/hide) 시 상품 데이터 등 children까지 불필요하게 리렌더링되는 현상 발생
- show/hide 함수의 참조가 매번 바뀌어 e2e 테스트에서 토스트 동작이 불안정하게 나타남

## 2. 주요 개선점 및 적용 내용

### 2.1 Context 구조 분리

- ToastProvider에서 ToastStateContext(상태)와 ToastCommandContext(명령)를 분리하여 각각 필요한 곳에서만 구독하도록 설계
- children은 Context의 영향을 받지 않고, Toast 컴포넌트만 Context를 구독하도록 구조 변경

### 2.2 show/hide 함수의 메모이제이션

- 기존에는 createActions(dispatch)로부터 매번 새로운 show/hide 함수가 생성되어 참조가 바뀜
- useAutoCallback(또는 useCallback)으로 show/hide를 감싸 항상 동일한 참조를 유지하도록 개선
- 필요하다면 커스텀 훅(useToastActions)으로 추상화하여 재사용성 및 가독성 향상

### 2.3 useMemo/useCallback 의존성 관리

- useMemo, useCallback의 의존성 배열에 들어가는 값들도 메모이제이션하여 불필요한 재생성을 방지
- 의존성 관리가 번거로운 경우 useAutoCallback 등 커스텀 훅을 활용해 자동화

### 2.4 코드 예시

```tsx
const show = useAutoCallback((message: string, type: ToastType) => createActions(dispatch).show(message, type));
const hide = useAutoCallback(() => createActions(dispatch).hide());
const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);
const showWithHide: ShowToast = useAutoCallback((...args) => {
  show(...args);
  hideAfter();
});
```

### 2.5 e2e 테스트 신뢰성 향상

- show/hide 함수가 항상 동일한 참조를 유지하므로, 토스트의 show/hide 타이밍이 예측 가능해지고 테스트가 안정적으로 통과함

## 3. 결론

- Context 구조 분리, 함수 메모이제이션, 의존성 관리 최적화로 불필요한 리렌더링과 테스트 불안정성 해결
- 실무에서는 커스텀 훅으로 추상화하여 재사용성과 유지보수성을 높이는 것이 권장됨
