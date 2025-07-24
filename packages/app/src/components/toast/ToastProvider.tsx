/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  memo,
  type PropsWithChildren,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

// 상태 전용 Context
const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

// 액션 전용 Context
const ToastActionContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const DEFAULT_DELAY = 3000;

const useToastStateContext = () => useContext(ToastStateContext);
const useToastActionContext = () => useContext(ToastActionContext);

export const useToastCommand = () => {
  const { show, hide } = useToastActionContext();
  return { show, hide };
};

export const useToastState = () => {
  const { message, type } = useToastStateContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { show, hide } = createActions(dispatch);
  const visible = state.message !== "";

  // debounce 함수를 useRef로 안정화
  const hideAfterRef = useRef<ReturnType<typeof debounce> | null>(null);

  if (!hideAfterRef.current) {
    hideAfterRef.current = debounce(hide, DEFAULT_DELAY);
  }

  // show와 hide 함수를 useCallback으로 안정화
  const stableShow = useCallback(show, []);
  const stableHide = useCallback(hide, []);

  const showWithHide = useCallback<ShowToast>(
    (...args) => {
      stableShow(...args);
      hideAfterRef.current?.();
    },
    [stableShow],
  );

  // 액션 Context value - 안정화된 함수들만 포함
  const actionValue = useMemo(
    () => ({
      show: showWithHide,
      hide: stableHide,
    }),
    [showWithHide, stableHide],
  );

  // 상태 Context value - 상태만 포함
  const stateValue = useMemo(
    () => ({
      message: state.message,
      type: state.type,
    }),
    [state.message, state.type],
  );

  return (
    <ToastActionContext.Provider value={actionValue}>
      <ToastStateContext.Provider value={stateValue}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext.Provider>
    </ToastActionContext.Provider>
  );
});
