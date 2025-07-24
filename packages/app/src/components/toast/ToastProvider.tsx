/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useContext, useReducer, useMemo } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";
import { useAutoCallback } from "@hanghae-plus/lib";
type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

//action context 설정
const ToastCommandContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});
//state context 설정
const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const DEFAULT_DELAY = 3000;

// 자주 사용하는 로직을 커스텀 훅으로 묶음(외부에서도 사용 가능)
export const useToastCommand = () => {
  const { show, hide } = useContext(ToastCommandContext);
  return { show, hide };
};
export const useToastState = () => {
  const { message, type } = useContext(ToastStateContext);
  return { message, type };
};

// ContextContext를 분리해도, value로 넘기는 함수의 참조가 바뀌면 하위 컴포넌트가 리렌더링됨.
// console를 통해서 리렌더링이 어디서 발생하는지 확인해 수정해야 함
// show, hide, showWithHide, hideAfter 모두 useCallback/useMemo로 감싸서 참조 고정
// Context value에 바로 객체 리터럴 넘기지 말고, useMemo로 만든 값 넘기기
export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  // dispatch가 변경될 때만 되도록
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  // useAutoCallback으로 함수 고정
  const showWithHide: ShowToast = useAutoCallback((...args) => {
    show(...args);
    hideAfter();
  });

  const commandValue = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  const stateValue = useMemo(() => ({ message: state.message, type: state.type }), [state.message, state.type]);

  return (
    <ToastCommandContext value={commandValue}>
      <ToastStateContext value={stateValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastCommandContext>
  );
});
