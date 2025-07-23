/* eslint-disable react-refresh/only-export-components */
import { createContext, memo, type PropsWithChildren, type ReactNode, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";
import { useAutoCallback } from "@hanghae-plus/lib/src/hooks";

export const ModalContext = createContext<{
  open: (content: ReactNode) => void;
  close: () => void;
}>({
  open: () => null,
  close: () => null,
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = memo(({ children }: PropsWithChildren) => {
  const [content, setContent] = useState<ReactNode>(null);

  const open = useAutoCallback((newContent: ReactNode) => setContent(newContent));

  const close = useAutoCallback(() => setContent(null));

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext value={contextValue}>
      {children}
      {content && createPortal(<Modal>{content}</Modal>, document.body)}
    </ModalContext>
  );
});
