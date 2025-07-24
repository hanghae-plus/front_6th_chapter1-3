type Condition<T> = (param: T) => boolean;
type Handler<T, R> = (param: T) => R;
type ConditionHandlerPair<T, R> = [condition: Condition<T>, handler: Handler<T, R>];

export function dispatchWithCondition<T, R>(...args: [...ConditionHandlerPair<T, R>[], Handler<T, R>]) {
  const pairs = args.slice(0, -1) as ConditionHandlerPair<T, R>[];
  const defaultHandler = args[args.length - 1] as Handler<T, R>;

  return (param: T) => {
    for (const [condition, handler] of pairs) {
      if (condition(param)) {
        return handler(param);
      }
    }

    return defaultHandler(param);
  };
}
