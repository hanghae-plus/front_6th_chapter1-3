import type { ReactNode } from "react";
import { useToastAction, useToastState } from "./ToastProvider";
import { PublicImage } from "../PublicImage";
import type { ToastType } from "./toastReducer";

const Colors = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-600",
  info: "bg-blue-600",
};
const Icons: Record<ToastType, ReactNode> = {
  success: <PublicImage src="/success-icon.svg" alt="성공" className="w-5 h-5" />,
  error: <PublicImage src="/error-icon.svg" alt="오류" className="w-5 h-5" />,
  warning: <PublicImage src="/warning-icon.svg" alt="경고" className="w-5 h-5" />,
  info: <PublicImage src="/info-icon.svg" alt="정보" className="w-5 h-5" />,
};

export function Toast() {
  const { type, message } = useToastState();
  const { hide } = useToastAction();

  const bg = Colors[type];
  const icon = Icons[type];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 toast-container">
      <div className={`${bg} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm`}>
        <div className="flex-shrink-0">{icon}</div>
        <p className="text-sm font-medium">{message}</p>
        <button id="toast-close-btn" className="flex-shrink-0 ml-2 text-white hover:text-gray-200" onClick={hide}>
          <PublicImage src="/close-icon-white.svg" alt="닫기" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
