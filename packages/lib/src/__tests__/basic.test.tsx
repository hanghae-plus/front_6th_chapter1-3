/* eslint-disable react-hooks/exhaustive-deps */
import { beforeEach, describe, expect, it, vi } from "vitest";
import React, { type ComponentProps, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { useCallback, useDeepMemo, useMemo, useRef, useShallowState } from "../hooks";
import { deepEquals, shallowEquals } from "../equals";
import { deepMemo, memo } from "../hocs";
import { useAutoCallback } from "../hooks/useAutoCallback.ts";

describe("Chapter 1-3 기본과제: hooks 구현하기 > ", () => {
  describe("비교 함수 구현하기 > ", () => {
    describe("shallowEquals 함수", () => {
      it("기본 타입 값들을 정확히 비교해야 한다", () => {
        expect(shallowEquals(1, 1)).toBe(true);
        expect(shallowEquals("안녕", "안녕")).toBe(true);
        expect(shallowEquals(true, true)).toBe(true);
        expect(shallowEquals(null, null)).toBe(true);
        expect(shallowEquals(undefined, undefined)).toBe(true);
        expect(shallowEquals(1, 2)).toBe(false);
        expect(shallowEquals("안녕", "잘가")).toBe(false);
        expect(shallowEquals(true, false)).toBe(false);
        expect(shallowEquals(null, undefined)).toBe(false);
      });

      it("배열을 얕게 비교해야 한다", () => {
        expect(shallowEquals([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(shallowEquals([1, 2, 3], [1, 2, 4])).toBe(false);
        const arr1 = [1, {}];
        const arr2 = [1, {}];
        expect(shallowEquals(arr1, arr2)).toBe(false); // 다른 객체 참조
      });

      it("객체를 얕게 비교해야 한다", () => {
        expect(shallowEquals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
        expect(shallowEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
        expect(shallowEquals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
        const obj1 = { a: {} };
        const obj2 = { a: {} };
        expect(shallowEquals(obj1, obj2)).toBe(false); // 다른 객체 참조
      });

      it("중첩된 구조를 깊게 비교하지 않아야 한다", () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { a: 1, b: { c: 2 } };
        expect(shallowEquals(obj1, obj2)).toBe(false); // 중첩된 객체의 참조가 다름
      });
    });

    describe("deepEquals 함수", () => {
      it("기본 타입 값들을 정확히 비교해야 한다", () => {
        expect(deepEquals(1, 1)).toBe(true);
        expect(deepEquals("안녕", "안녕")).toBe(true);
        expect(deepEquals(true, true)).toBe(true);
        expect(deepEquals(null, null)).toBe(true);
        expect(deepEquals(undefined, undefined)).toBe(true);
        expect(deepEquals(1, 2)).toBe(false);
        expect(deepEquals("안녕", "잘가")).toBe(false);
        expect(deepEquals(true, false)).toBe(false);
        expect(deepEquals(null, undefined)).toBe(false);
      });

      it("배열을 정확히 비교해야 한다", () => {
        expect(deepEquals([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(deepEquals([1, 2, 3], [1, 2, 4])).toBe(false);
        expect(deepEquals([1, [2, 3]], [1, [2, 3]])).toBe(true);
        expect(deepEquals([1, [2, 3]], [1, [2, 4]])).toBe(false);
      });

      it("객체를 정확히 비교해야 한다", () => {
        expect(deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
        expect(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
        expect(deepEquals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
        expect(deepEquals({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
        expect(deepEquals({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
      });

      it("중첩된 구조를 정확히 비교해야 한다", () => {
        const obj1 = { a: 1, b: { c: 2, d: [3, 4, { e: 5 }] } };
        const obj2 = { a: 1, b: { c: 2, d: [3, 4, { e: 5 }] } };
        const obj3 = { a: 1, b: { c: 2, d: [3, 4, { e: 6 }] } };
        expect(deepEquals(obj1, obj2)).toBe(true);
        expect(deepEquals(obj1, obj3)).toBe(false);
      });
    });
  });

  describe.each([
    // 직접 구현한 hook들
    { spec: "직접 구현한 hooks", useState, useRef, useCallback, useMemo },

    // React에서 만들어진 훅들
    {
      spec: "React에서 제공하는 hooks",
      useState: React.useState,
      useRef: React.useRef,
      useCallback: React.useCallback,
      useMemo: React.useMemo,
    },
  ])("$spec > ", ({ useRef, useCallback, useMemo }) => {
    describe("useRef 훅", () => {
      it("리렌더링이 되어도 useRef의 참조값이 유지된다. ", () => {
        const refs = new Set();

        const UseMyRefTest = ({ label }: { label: string }) => {
          const [, rerender] = useState({});
          // useRef로 변경해서 테스트하면 통과됩니다. useMyRef를 useRef와 똑같이 동작하도록 구현해보세요.
          const ref = useRef<HTMLDivElement | null>(null);
          refs.add(ref);

          return (
            <div ref={ref}>
              <button onClick={() => rerender({})}>{label}</button>
            </div>
          );
        };

        const { getByText } = render(
          <>
            <UseMyRefTest label="rerender1" />
            <UseMyRefTest label="rerender2" />
          </>,
        );

        act(() => {
          fireEvent.click(getByText("rerender1"));
          fireEvent.click(getByText("rerender2"));
        });

        expect(refs.size).toBe(2);
      });

      it("렌더링 간에 ref 값을 유지하고, 값 변경 시 리렌더링을 트리거하지 않아야 한다", () => {
        let renderCount = 0;

        function TestComponent() {
          const [, setForceUpdate] = useState({});
          const ref = useRef(0);
          renderCount++;

          return (
            <>
              <div data-testid="render-count">Render Count: {renderCount}</div>
              <div data-testid="ref-value">Ref Value: {ref.current}</div>
              <button
                onClick={() => {
                  ref.current += 1;
                  // ref 값만 변경하고 리렌더링하지 않음
                }}
              >
                Increment Ref
              </button>
              <button
                onClick={() => {
                  setForceUpdate({});
                  // 강제로 리렌더링
                }}
              >
                Force Update
              </button>
            </>
          );
        }

        const { getByText, getByTestId } = render(<TestComponent />);

        // 초기 상태 확인
        expect(getByTestId("render-count").textContent).toBe("Render Count: 1");
        expect(getByTestId("ref-value").textContent).toBe("Ref Value: 0");

        // ref 값 변경
        fireEvent.click(getByText("Increment Ref"));

        // ref 값이 변경되었지만 리렌더링은 발생하지 않음
        expect(getByTestId("render-count").textContent).toBe("Render Count: 1");
        expect(getByTestId("ref-value").textContent).toBe("Ref Value: 0");

        // 강제 리렌더링
        fireEvent.click(getByText("Force Update"));

        // 리렌더링 발생, 변경된 ref 값 반영
        expect(getByTestId("render-count").textContent).toBe("Render Count: 2");
        expect(getByTestId("ref-value").textContent).toBe("Ref Value: 1");
      });
    });

    describe("useMemo 훅", () => {
      const mockFactory = vi.fn();

      const TestComponent = forwardRef<
        { updateDeps: (newDeps: unknown[]) => void },
        {
          initialDeps: unknown[];
        }
      >(({ initialDeps }, ref) => {
        const [deps, setDeps] = useState(initialDeps);
        const [, setRenderCount] = useState(0);

        useMemo(() => mockFactory(), deps);

        useImperativeHandle(ref, () => ({
          updateDeps: (newDeps: unknown[]) => setDeps(newDeps),
        }));

        return (
          <div>
            <button onClick={() => setRenderCount((prev) => prev + 1)}>Force Render</button>
          </div>
        );
      });

      beforeEach(() => {
        mockFactory.mockClear();
      });

      it("useMemo 메모이제이션 테스트: 의존성의 값들이 변경될 때 재계산", () => {
        const ref: ComponentProps<typeof TestComponent>["ref"] = {
          current: null,
        };

        // 의존성: [42]
        render(<TestComponent ref={ref} initialDeps={[42]} />);
        expect(mockFactory).toHaveBeenCalledTimes(1);

        // 의존성을 다시 [42] 로 변경 -> 재계산 되지 않아야 함
        act(() => {
          ref.current?.updateDeps([42]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(1);

        // 의존성을 [43]으로 변경 -> 재계산
        act(() => {
          ref.current?.updateDeps([43]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(2);

        // 의존성을 [42, 43]으로 변경 -> 재계산
        act(() => {
          ref.current?.updateDeps([42, 43]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(3);

        // 의존성을 [42, 43]으로 다시 변경 -> 재계산 하지 않음
        act(() => {
          ref.current?.updateDeps([42, 43]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(3);

        const emptyObject = {};
        // 의존성을 [ {} ]으로 변경 -> 재계산
        act(() => {
          ref.current?.updateDeps([emptyObject]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(4);

        // 의존성에 동일한 참조값 사용 -> 재계산 하지 않음
        act(() => {
          ref.current?.updateDeps([emptyObject]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(4);

        Object.assign(emptyObject, { a: 10 });
        act(() => {
          ref.current?.updateDeps([emptyObject]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(4);

        act(() => {
          ref.current?.updateDeps([{ a: 10 }]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(5);

        const emptyArray: number[] = [];
        act(() => {
          ref.current?.updateDeps([emptyArray]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(6);

        emptyArray.push(10);
        act(() => {
          ref.current?.updateDeps([emptyArray]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(6);

        act(() => {
          ref.current?.updateDeps([[]]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(7);
      });
    });

    describe("useCallback 훅", () => {
      const mockCallback = vi.fn((x: number) => x * 2);

      const TestComponent = forwardRef<
        {
          updateDeps: (newDeps: unknown[]) => void;
          getMemoizedCallback: () => () => unknown;
        },
        {
          initialDeps: unknown[];
        }
      >(({ initialDeps }, ref) => {
        const [deps, setDeps] = useState(initialDeps);
        const [, setRenderCount] = useState(0);

        const memoizedCallback = useCallback(() => mockCallback(42), deps);

        useImperativeHandle(ref, () => ({
          updateDeps: (newDeps: unknown[]) => setDeps(newDeps),
          getMemoizedCallback: () => memoizedCallback,
        }));

        return (
          <div>
            <button onClick={() => setRenderCount((prev) => prev + 1)}>Force Render</button>
          </div>
        );
      });

      beforeEach(() => {
        mockCallback.mockClear();
      });

      it("useCallback 메모이제이션 테스트: 의존성의 값들이 변경될 때 재생성", () => {
        const ref: ComponentProps<typeof TestComponent>["ref"] = {
          current: null,
        };

        // 의존성: [42]
        render(<TestComponent ref={ref} initialDeps={[42]} />);
        const initialCallback = ref.current?.getMemoizedCallback();
        expect(initialCallback).toBeDefined();

        // 의존성을 다시 [42]로 변경 -> 재생성 되지 않아야 함
        act(() => {
          ref.current?.updateDeps([42]);
        });
        expect(ref.current?.getMemoizedCallback()).toBe(initialCallback);

        // 의존성을 [43]으로 변경 -> 재생성
        act(() => {
          ref.current?.updateDeps([43]);
        });
        expect(ref.current?.getMemoizedCallback()).not.toBe(initialCallback);

        // 의존성을 [42, 43]으로 변경 -> 재생성
        act(() => {
          ref.current?.updateDeps([42, 43]);
        });
        const newCallback = ref.current?.getMemoizedCallback();
        expect(newCallback).not.toBe(initialCallback);

        // 의존성을 [42, 43]으로 다시 변경 -> 재생성 하지 않음
        act(() => {
          ref.current?.updateDeps([42, 43]);
        });
        expect(ref.current?.getMemoizedCallback()).toBe(newCallback);

        const emptyObject = {};
        // 의존성을 [{}]으로 변경 -> 재생성
        act(() => {
          ref.current?.updateDeps([emptyObject]);
        });
        const objectCallback = ref.current?.getMemoizedCallback();
        expect(objectCallback).not.toBe(newCallback);

        // 의존성에 동일한 참조값 사용 -> 재생성 하지 않음
        act(() => {
          ref.current?.updateDeps([emptyObject]);
        });
        expect(ref.current?.getMemoizedCallback()).toBe(objectCallback);

        Object.assign(emptyObject, { a: 10 });
        act(() => {
          ref.current?.updateDeps([emptyObject]);
        });
        expect(ref.current?.getMemoizedCallback()).toBe(objectCallback);

        act(() => {
          ref.current?.updateDeps([{ a: 10 }]);
        });
        expect(ref.current?.getMemoizedCallback()).not.toBe(objectCallback);

        const emptyArray: number[] = [];
        act(() => {
          ref.current?.updateDeps([emptyArray]);
        });
        const arrayCallback = ref.current?.getMemoizedCallback();
        expect(arrayCallback).not.toBe(objectCallback);

        emptyArray.push(10);
        act(() => {
          ref.current?.updateDeps([emptyArray]);
        });
        expect(ref.current?.getMemoizedCallback()).toBe(arrayCallback);

        act(() => {
          ref.current?.updateDeps([[]]);
        });
        expect(ref.current?.getMemoizedCallback()).not.toBe(arrayCallback);
      });

      it("메모이제이션된 콜백 함수가 올바르게 동작하는지 확인", () => {
        const ref: ComponentProps<typeof TestComponent>["ref"] = {
          current: null,
        };

        render(<TestComponent ref={ref} initialDeps={[]} />);
        const memoizedCallback = ref.current?.getMemoizedCallback();

        memoizedCallback?.();
        expect(mockCallback).toHaveBeenCalledWith(42);
        expect(mockCallback).toHaveBeenCalledTimes(1);

        memoizedCallback?.();
        expect(mockCallback).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("custom hook 만들어보기", () => {
    describe("useShallowState 훅 테스트", () => {
      it.each([
        {
          type: "primitive number",
          initial: 5,
          sameValue: 5,
          differentValue: 10,
          shouldPreventRerenderOnSame: true,
        },
        {
          type: "primitive string",
          initial: "test",
          sameValue: "test",
          differentValue: "updated",
          shouldPreventRerenderOnSame: true,
        },
        {
          type: "shallow equal object",
          initial: { a: 1, b: 2 },
          sameValue: { a: 1, b: 2 },
          differentValue: { a: 1, b: 3 },
          shouldPreventRerenderOnSame: true,
        },
        {
          type: "shallow equal array",
          initial: [1, 2, 3],
          sameValue: [1, 2, 3],
          differentValue: [1, 2, 4],
          shouldPreventRerenderOnSame: true,
        },
        {
          type: "nested object",
          initial: { a: { b: 1 } },
          sameValue: { a: { b: 1 } },
          differentValue: { a: { b: 2 } },
          shouldPreventRerenderOnSame: false, // 중첩된 객체는 참조가 다르므로 리렌더링 발생
        },
      ])("$type: 얕은 비교 최적화 테스트", ({ initial, sameValue, differentValue, shouldPreventRerenderOnSame }) => {
        let renderCount = 0;

        const TestComponent = () => {
          const [value, setValue] = useShallowState(initial);
          renderCount++;

          return (
            <div>
              <span data-testid="value">{JSON.stringify(value)}</span>
              <span data-testid="renders">{renderCount}</span>
              <button onClick={() => setValue(sameValue)}>Set Same</button>
              <button onClick={() => setValue(differentValue)}>Set Different</button>
            </div>
          );
        };

        const { getByTestId, getByText } = render(<TestComponent />);

        expect(getByTestId("renders").textContent).toBe("1");

        // 동일한 값으로 업데이트
        fireEvent.click(getByText("Set Same"));
        if (shouldPreventRerenderOnSame) {
          expect(getByTestId("renders").textContent).toBe("1"); // 리렌더링 방지
        } else {
          expect(getByTestId("renders").textContent).toBe("2"); // 리렌더링 발생
        }

        // 다른 값으로 업데이트
        fireEvent.click(getByText("Set Different"));
        const expectedRenders = shouldPreventRerenderOnSame ? "2" : "3";
        expect(getByTestId("renders").textContent).toBe(expectedRenders);
      });

      it("객체 속성 순서가 다른 경우 얕은 동등성을 유지한다", () => {
        let renderCount = 0;

        const TestComponent = () => {
          const setObj = useShallowState({ a: 1, b: 2, c: 3 })[1];
          renderCount++;

          return (
            <div>
              <span data-testid="renders">{renderCount}</span>
              <button onClick={() => setObj({ c: 3, a: 1, b: 2 })}>Different Order</button>
            </div>
          );
        };

        const { getByTestId, getByText } = render(<TestComponent />);

        expect(getByTestId("renders").textContent).toBe("1");

        fireEvent.click(getByText("Different Order"));
        expect(getByTestId("renders").textContent).toBe("1"); // 리렌더링 방지
      });

      it("setState는 언제나 같은 함수를 반환해야 한다", () => {
        let renderCount = 0;
        const { result } = renderHook(() => {
          const [, setState] = useShallowState(0);
          useEffect(() => {
            renderCount += 1;
          }, [setState]);
          return setState;
        });

        expect(renderCount).toBe(1);
        act(() => result.current(1));
        act(() => result.current(2));
        act(() => result.current(3));
        act(() => result.current(4));
        act(() => result.current(6));
        expect(renderCount).toBe(1);
      });
    });

    describe("useMemo의 deps 비교 함수를 주입받아서 사용할 수 있다.", () => {
      const mockFactory = vi.fn();

      const TestComponent = forwardRef<
        { updateDeps: (newDeps: unknown[]) => void },
        {
          initialDeps: unknown[];
          equals?: typeof Object.is;
        }
      >(({ initialDeps, equals }, ref) => {
        const [deps, setDeps] = useState(initialDeps);
        const [, setRenderCount] = useState(0);

        useMemo(() => mockFactory(), deps, equals);

        useImperativeHandle(ref, () => ({
          updateDeps: (newDeps: unknown[]) => setDeps(newDeps),
        }));

        return (
          <div>
            <button onClick={() => setRenderCount((prev) => prev + 1)}>Force Render</button>
          </div>
        );
      });

      beforeEach(() => {
        mockFactory.mockClear();
      });

      it("useMemo의 deps 비교 함수를 주입받아서 사용할 수 있다.", () => {
        const ref: ComponentProps<typeof TestComponent>["ref"] = {
          current: null,
        };

        // 배열의 첫 번째 인자에 대해서만 값이 같은지 검사하는 equals 주입
        const equals = (a: unknown[], b: unknown[]) => a[0] === b[0];
        render(<TestComponent ref={ref} initialDeps={[42]} equals={equals} />);
        expect(mockFactory).toHaveBeenCalledTimes(1);

        // 첫 번째 의존성을 다시 [42] 로 변경 -> 재계산 되지 않아야 함
        act(() => {
          ref.current?.updateDeps([42]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(1);

        // 첫 번째 의존성을 [43]으로 변경 -> 재계산
        act(() => {
          ref.current?.updateDeps([43]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(2);

        // 두 번째 의존성 추가 -> 재계산 하지 않음
        act(() => {
          ref.current?.updateDeps([43, 44]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(2);

        // 첫 번째 의존성 수정 -> 재계산
        act(() => {
          ref.current?.updateDeps([41, 44]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(3);
      });
    });

    describe("useDeepMemo 훅", () => {
      const mockFactory = vi.fn();

      const TestComponent = forwardRef<
        { updateDeps: (newDeps: unknown[]) => void },
        {
          initialDeps: unknown[];
        }
      >(({ initialDeps }, ref) => {
        const [deps, setDeps] = useState(initialDeps);
        const [, setRenderCount] = useState(0);

        useDeepMemo(() => mockFactory(), deps);

        useImperativeHandle(ref, () => ({
          updateDeps: (newDeps: unknown[]) => setDeps(newDeps),
        }));

        return (
          <div>
            <button onClick={() => setRenderCount((prev) => prev + 1)}>Force Render</button>
          </div>
        );
      });

      beforeEach(() => {
        mockFactory.mockClear();
      });

      it("useDeepMemo를 사용할 경우, dependencies의 값에 대해 깊은비교를 하여 메모이제이션 한다.", () => {
        const ref: ComponentProps<typeof TestComponent>["ref"] = {
          current: null,
        };

        // 배열의 첫 번째 인자에 대해서만 값이 같은지 검사하는 equals 주입
        render(<TestComponent ref={ref} initialDeps={[{}]} />);
        expect(mockFactory).toHaveBeenCalledTimes(1);

        act(() => {
          ref.current?.updateDeps([{}]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(1);

        act(() => {
          ref.current?.updateDeps([{ a: 1 }]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(2);

        act(() => {
          ref.current?.updateDeps([{ a: 1 }]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(2);

        act(() => {
          ref.current?.updateDeps([[1, 2]]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(3);

        act(() => {
          ref.current?.updateDeps([[1, 2]]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(3);

        act(() => {
          ref.current?.updateDeps([[1, 2, 3]]);
        });
        expect(mockFactory).toHaveBeenCalledTimes(4);
      });
    });

    describe("useAutoCallback 훅", () => {
      it("useAutoCallback으로 만들어진 함수는, 참조가 변경되지 않으면서 항상 새로운 값을 참조한다.", () => {
        const fn = (x: number) => x * 2;
        const mockCallback1 = vi.fn(fn);
        const mockCallback2 = vi.fn(fn);
        const mockCallback3 = vi.fn(fn);
        const renderCounts = [0, 0, 0];

        const TestComponent = () => {
          const [count, setCount] = useState(0);

          const callback1 = useAutoCallback(() => mockCallback1(count));
          const callback2 = useCallback(() => mockCallback2(count), []);
          const callback3 = useCallback(() => mockCallback3(count), [count]);

          useEffect(() => {
            renderCounts[0] += 1;
          }, [callback1]);

          useEffect(() => {
            renderCounts[1] += 1;
          }, [callback2]);

          useEffect(() => {
            renderCounts[2] += 1;
          }, [callback3]);

          return (
            <div>
              <ul>
                <li data-testid="callback1">{callback1()}</li>
                <li data-testid="callback2">{callback2()}</li>
                <li data-testid="callback3">{callback3()}</li>
              </ul>
              <button onClick={() => setCount(count + 1)}>increment</button>
            </div>
          );
        };

        const { getByText, getByTestId } = render(<TestComponent />);
        expect(renderCounts).toEqual([1, 1, 1]);

        const getElements = () => [getByTestId("callback1"), getByTestId("callback2"), getByTestId("callback3")];

        act(() => fireEvent.click(getByText("increment")));

        expect(getElements().map((el) => Number(el.textContent))).toEqual([2, 0, 2]);
        expect(renderCounts).toEqual([1, 1, 2]);

        act(() => fireEvent.click(getByText("increment")));
        expect(getElements().map((el) => Number(el.textContent))).toEqual([4, 0, 4]);
        expect(renderCounts).toEqual([1, 1, 3]);
      });
    });

    describe("hoc 만들어보기", () => {
      // 테스트용 컴포넌트
      const TestComponent = vi.fn(({ value, ...props }) => {
        return (
          <div data-testid="test-component" {...props}>
            {JSON.stringify(value)}
          </div>
        );
      });

      beforeEach(() => {
        TestComponent.mockClear();
      });

      describe.each([
        { spec: "직접 만든 memo", memo },
        { spec: "React에서 제공하는 memo", memo: React.memo as typeof memo },
      ])("$spec", ({ memo }) => {
        it("props로 전달하는 값이 변경되어야 리렌더링 된다.", () => {
          const MemoizedComponent = memo(TestComponent);
          const { rerender } = render(<MemoizedComponent value={1} />);

          expect(TestComponent).toHaveBeenCalledTimes(1);

          rerender(<MemoizedComponent value={1} />);
          expect(TestComponent).toHaveBeenCalledTimes(1);

          rerender(<MemoizedComponent value={2} />);
          expect(TestComponent).toHaveBeenCalledTimes(2);

          rerender(<MemoizedComponent value={2} />);
          expect(TestComponent).toHaveBeenCalledTimes(2);

          rerender(<MemoizedComponent value={2} style={{ color: "#09F" }} />);
          expect(TestComponent).toHaveBeenCalledTimes(3);

          rerender(<MemoizedComponent value={2} style={{ color: "#09F" }} />);
          expect(TestComponent).toHaveBeenCalledTimes(4);

          const DEFAULT_STYLE = { color: "#09F" };
          rerender(<MemoizedComponent value={2} style={DEFAULT_STYLE} />);
          expect(TestComponent).toHaveBeenCalledTimes(5);

          rerender(<MemoizedComponent value={2} style={DEFAULT_STYLE} />);
          expect(TestComponent).toHaveBeenCalledTimes(5);
        });
      });

      describe("deepMemo HOC", () => {
        it("props로 전달하는 값이 모두 변경되어야 리렌더링 된다.", () => {
          const DeepMemoizedComponent = deepMemo(TestComponent);
          const { rerender } = render(<DeepMemoizedComponent value={1} />);

          expect(TestComponent).toHaveBeenCalledTimes(1);

          rerender(<DeepMemoizedComponent value={1} />);
          expect(TestComponent).toHaveBeenCalledTimes(1);

          rerender(<DeepMemoizedComponent value={2} />);
          expect(TestComponent).toHaveBeenCalledTimes(2);

          rerender(<DeepMemoizedComponent value={2} />);
          expect(TestComponent).toHaveBeenCalledTimes(2);

          const DEFAULT_STYLE = { color: "#09F" };
          rerender(<DeepMemoizedComponent value={2} style={DEFAULT_STYLE} />);
          expect(TestComponent).toHaveBeenCalledTimes(3);

          rerender(<DeepMemoizedComponent value={2} style={{ color: "#09F" }} />);
          expect(TestComponent).toHaveBeenCalledTimes(3);

          rerender(<DeepMemoizedComponent style={{ color: "#09F" }} value={2} />);
          expect(TestComponent).toHaveBeenCalledTimes(3);
        });

        it("깊은 객체 비교를 수행해야 한다", () => {
          const DeepMemoizedComponent = deepMemo(TestComponent);
          const { rerender } = render(<DeepMemoizedComponent value={{ a: { b: 1 } }} />);

          expect(TestComponent).toHaveBeenCalledTimes(1);

          rerender(<DeepMemoizedComponent value={{ a: { b: 1 } }} />);
          expect(TestComponent).toHaveBeenCalledTimes(1); // 깊은 비교로 인해 리렌더링하지 않음

          rerender(<DeepMemoizedComponent value={{ a: { b: 2 } }} />);
          expect(TestComponent).toHaveBeenCalledTimes(2); // 값이 변경되어 리렌더링
        });

        it("깊은 배열 비교를 수행해야 한다", () => {
          const DeepMemoizedComponent = deepMemo(TestComponent);
          const { rerender } = render(<DeepMemoizedComponent value={[1, [2, 3]]} />);

          expect(TestComponent).toHaveBeenCalledTimes(1);

          rerender(<DeepMemoizedComponent value={[1, [2, 3]]} />);
          expect(TestComponent).toHaveBeenCalledTimes(1); // 깊은 비교로 인해 리렌더링하지 않음

          rerender(<DeepMemoizedComponent value={[1, [2, 4]]} />);
          expect(TestComponent).toHaveBeenCalledTimes(2); // 값이 변경되어 리렌더링
        });
      });
    });
  });
});
