/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, useCallback, useContext, useReducer, useMemo } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

//action context 설정
const ToastActionsContext = createContext<{
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

//커스텀 훅 : 자주 사용하는 로직을 커스텀 훅으로 묶음(외부에서도 사용 가능)
export const useToastCommand = () => {
  const { show, hide } = useContext(ToastActionsContext);
  return { show, hide };
};

export const useToastState = () => {
  const { message, type } = useContext(ToastStateContext);
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";

  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide: ShowToast = useCallback(
    (...args) => {
      show(...args);
      hideAfter();
    },
    [show, hideAfter],
  ); //의존성 배열에 show와 hideAfter를 추가하여 변경 시에만 실행되도록 함

  const context = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]); //showWithHide와 hide가 변하지 않으므로 변하지 않음

  return (
    <ToastActionsContext value={context}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastActionsContext>
  );
});
