import { type FunctionComponent } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "../hooks";
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 이전 props를 저장할 ref 생성

  const useMemoComponent = (props: P) => {
    const prevProps = useRef<P | null>(null);
    const prevComponent = useRef<ReturnType<typeof Component> | null>(null);

    if (!equals(prevProps.current, props)) {
      prevProps.current = props;
      prevComponent.current = Component(props);
    }

    return prevComponent.current;
  };
  return useMemoComponent;
}

// function withLoadingIndicator(Component) {
//   return function EnhancedComponent({ isLoading, ...props }) {
//     if (isLoading) {
//       return <div>Loading...</div>;
//     }

//     return <Component {...props} />;
//   }
// }

// const DataComponentWithLoading = withLoadingIndicator(DataComponent);

// export function memo(Component,equals=shallowEquals){
// 여기서 들어오는 Component의 props는 어떻게 알 수 있을까?
// Component -> Component(props,children) -> <div {props}> {children}</div>
//
// }

// function withLogger(WrappedComponent) {
//   return function(props) {
//     console.log('Component rendered:', WrappedComponent.name);
//     return React.createElement(WrappedComponent, props);
//   };
// }
