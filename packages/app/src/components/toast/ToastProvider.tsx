/**
 * Context API는:
 * Provider의 value가 변경될 때 해당 Context를 사용하는 컴포넌트와 그 자식 컴포넌트들만 리렌더함.
 * 따라서,
 * - CommandContext: 고정적인 액션 함수만 제공
 * - StateContext: 자주 변경되는 상태(message, type) 제공
 * 위와 같이 역할을 분리하여 불필요한 리렌더링을 방지함.
 * -> 기존 토스트가 뜰때마다 모든 컴포넌트가 리렌더되었던 문제는 메시지와 타입이 변경될때만 리렌더되도록 최적화됨.
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { Actions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// Command 전용 컨텍스트: show / hide 함수 제공 (값이 변하지 않음)
const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

// State 전용 컨텍스트: message / type 값 제공 (값이 비교적 자주 변함)
const ToastStateContext = createContext<{ message: string; type: ToastType }>(initialState);

const DEFAULT_DELAY = 3000;

// 외부 컴포넌트에서 토스트 명령만 사용할 수 있도록 커맨드 훅 제공
export const useToastCommand = () => useContext(ToastCommandContext);

// 토스트 UI 전용: 상태만 구독
export const useToastState = () => useContext(ToastStateContext);

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  // show/hide 함수를 useCallback으로 메모이제이션
  const show = useCallback((message: string, type: ToastType) => {
    dispatch({ type: Actions.SHOW, payload: { message, type } });
  }, []);

  const hide = useCallback(() => {
    dispatch({ type: Actions.HIDE });
  }, []);

  // hide 함수에 debounce 적용 (지속성 위한 useMemo)
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  // show 함수는 토스트 띄우고 자동 숨김까지 처리 (useCallback으로 참조 고정)
  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  );

  // Provider value 객체도 참조 고정을 위해 useMemo
  const commandValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  const visible = state.message !== "";

  return (
    <ToastCommandContext.Provider value={commandValue}>
      {children}
      <ToastStateContext.Provider value={state}>
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastCommandContext.Provider>
  );
});
