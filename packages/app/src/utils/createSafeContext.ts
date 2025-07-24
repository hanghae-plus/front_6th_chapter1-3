import { createContext, createElement, useContext, useMemo } from "react";

export function createSafeContext<ContextValue extends object | null>(
  rootComponentName: string,
  defaultValue?: ContextValue,
) {
  const Context = createContext<ContextValue | undefined>(defaultValue);

  const Provider = ({ children, ...rest }: ContextValue & { children?: React.ReactNode }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = useMemo(() => rest, Object.values(rest)) as ContextValue;

    return createElement(Context, { value }, children);
  };

  const useSafeContext = (consumerName: string) => {
    const ctx = useContext(Context);
    if (ctx) return ctx;
    if (defaultValue) return defaultValue;

    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  };

  Provider.displayName = rootComponentName + "Provider";

  return [Provider, useSafeContext] as const;
}
