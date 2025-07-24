import { useMemo } from "react";
import { debounce } from "../utils";
import { createActions } from "../components/toast/toastReducer";
import { useAutoCallback } from "@hanghae-plus/lib";

const DEFAULT_DELAY = 3000;

type ToastAction =
  | { type: "show"; payload: { message: string; type?: "info" | "success" | "warning" | "error" } }
  | { type: "hide" };

type Dispatch = (action: ToastAction) => void;

export function useToastActions({ dispatch }: { dispatch: Dispatch }) {
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const hideAfter = useMemo(() => debounce(hide, DEFAULT_DELAY), [hide]);

  const showWithHide = useAutoCallback((...args: Parameters<typeof show>) => {
    show(...args);
    hideAfter();
  });

  const actions = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  return actions;
}
