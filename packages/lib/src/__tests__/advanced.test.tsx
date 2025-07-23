import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useRouter, useStorage, useStore } from "../hooks";
import { createStorage } from "../createStorage";
import { createStore } from "../createStore";
import { counterReducer, createMockRouter, dataReducer } from "./dummies";

describe("Chapter 1-3 심화과제: 고급 hooks 구현하기 > ", () => {
  describe("useStorage 훅 테스트", () => {
    beforeEach(() => {
      // localStorage 초기화
      localStorage.clear();
    });

    it("초기값이 정확히 로드되어야 한다", () => {
      // localStorage에 미리 값 설정
      localStorage.setItem("test-key", JSON.stringify({ count: 5 }));

      const storage = createStorage<{ count: number }>("test-key");
      const { result } = renderHook(() => useStorage(storage));

      expect(result.current).toEqual({ count: 5 });
    });

    it("초기값이 없을 때 null을 반환해야 한다", () => {
      const storage = createStorage<string>("empty-key");
      const { result } = renderHook(() => useStorage(storage));

      expect(result.current).toBe(null);
    });

    it("값 변경 시 컴포넌트가 리렌더링되어야 한다", () => {
      const storage = createStorage<number>("counter");
      const { result } = renderHook(() => useStorage(storage));

      expect(result.current).toBe(null);

      act(() => storage.set(10));

      expect(result.current).toBe(10);

      act(() => storage.set(20));

      expect(result.current).toBe(20);
    });

    it("복잡한 객체 타입도 정상적으로 처리되어야 한다", () => {
      const storage = createStorage<{ user: { name: string; age: number }; items: string[] }>("complex");
      const { result } = renderHook(() => useStorage(storage));

      expect(result.current).toBe(null);

      const complexData = { user: { name: "John", age: 25 }, items: ["a", "b"] };

      act(() => storage.set(complexData));

      expect(result.current).toEqual(complexData);
    });

    it("multiple 컴포넌트가 같은 storage를 구독할 때 동기화되어야 한다", () => {
      const storage = createStorage("shared");

      const { result: result1 } = renderHook(() => useStorage(storage));
      const { result: result2 } = renderHook(() => useStorage(storage));

      expect(result1.current).toBe(null);
      expect(result2.current).toBe(result1.current);

      act(() => storage.set("shared-value"));

      expect(result1.current).toBe("shared-value");
      expect(result1.current).toBe(result2.current);

      act(() => storage.set({ a: 1, b: 2 }));

      expect(result1.current).toEqual({ a: 1, b: 2 });
      expect(result1.current).toBe(result2.current);
    });

    it("localStorage에 실제로 값이 저장되고 불러와져야 한다", () => {
      const storage = createStorage<{ count: number }>("persistent-test");
      const { result } = renderHook(() => useStorage(storage));

      expect(result.current).toBe(null);

      const testData = { count: 42 };

      act(() => storage.set(testData));

      // localStorage에 실제로 저장되었는지 확인
      expect(localStorage.getItem("persistent-test")).toBe(JSON.stringify(testData));
      expect(result.current).toEqual(testData);
    });

    it("reset 기능이 정상적으로 동작해야 한다", () => {
      const storage = createStorage<string>("reset-test");
      const { result } = renderHook(() => useStorage(storage));

      expect(result.current).toBe(null);

      act(() => storage.set("initial-value"));

      expect(result.current).toBe("initial-value");

      act(() => storage.reset());

      expect(result.current).toBe(null);
    });
  });

  describe("useStore 훅 테스트", () => {
    it("초기 상태를 정확히 반환해야 한다", () => {
      const store = createStore(counterReducer, { count: 0, name: "test" });
      const { result } = renderHook(() => useStore(store));

      expect(result.current).toEqual({ count: 0, name: "test" });
    });

    it("액션 디스패치 시 상태가 업데이트되고 컴포넌트가 리렌더링되어야 한다", () => {
      const store = createStore(counterReducer, { count: 0, name: "test" });
      const { result } = renderHook(() => useStore(store));

      expect(result.current).toEqual({ count: 0, name: "test" });

      act(() => store.dispatch({ type: "increment" }));

      expect(result.current).toEqual({ count: 1, name: "test" });

      act(() => store.dispatch({ type: "set", payload: 10 }));

      expect(result.current).toEqual({ count: 10, name: "test" });
    });

    it("selector를 사용하여 상태의 일부만 구독할 수 있어야 한다", () => {
      const store = createStore(counterReducer, { count: 0, name: "test" });
      const { result } = renderHook(() => useStore(store, (state) => state.count));

      expect(result.current).toBe(0);

      act(() => store.dispatch({ type: "increment" }));

      expect(result.current).toBe(1);

      // name 변경은 selector가 구독하는 count에 영향을 주지 않으므로 값이 변경되지 않음
      act(() => store.dispatch({ type: "setName", payload: "updated" }));

      expect(result.current).toBe(1); // count는 여전히 1
    });

    it("동일한 상태로 디스패치할 때 리렌더링이 방지되어야 한다", () => {
      const store = createStore(counterReducer, { count: 5, name: "test" });
      let renderCount = 0;
      const { result } = renderHook(() => {
        renderCount += 1;
        return useStore(store);
      });

      expect(renderCount).toBe(1);
      expect(result.current).toEqual({ count: 5, name: "test" });

      // 동일한 값으로 설정해도 상태는 동일하게 유지
      act(() => store.dispatch({ type: "set", payload: 5 }));

      expect(renderCount).toBe(1);
      expect(result.current).toEqual({ count: 5, name: "test" });

      act(() => store.dispatch({ type: "increment" }));

      expect(renderCount).toBe(2);
      expect(result.current).toEqual({ count: 6, name: "test" });
    });

    it("multiple 컴포넌트가 같은 store를 구독할 때 동기화되어야 한다", () => {
      const store = createStore(counterReducer, { count: 0, name: "test" });

      const { result: result1 } = renderHook(() => useStore(store));
      const { result: result2 } = renderHook(() => useStore(store));

      expect(result1.current).toEqual({ count: 0, name: "test" });
      expect(result2.current).toBe(result1.current);

      act(() => store.dispatch({ type: "increment" }));

      expect(result1.current).toEqual({ count: 1, name: "test" });
      expect(result2.current).toBe(result1.current);
    });

    it("shallow equals에 의한 최적화가 동작해야 한다 (1)", () => {
      const store = createStore(counterReducer, { count: 0, name: "test" });
      const counts = [0, 0, 0];
      const set = (count: number, name: string) => store.dispatch({ type: "reset", payload: { count, name } });
      const get = () => store.getState();

      renderHook(() => {
        counts[0] += 1;
        return useStore(store, () => true);
      });

      renderHook(() => {
        counts[1] += 1;
        return useStore(store, (state) => state.count);
      });

      renderHook(() => {
        counts[2] += 1;
        return useStore(store, (state) => state.name);
      });

      expect(counts).toEqual([1, 1, 1]);
      expect(store.getState()).toEqual({ count: 0, name: "test" });

      act(() => set(0, "changed name 1"));
      expect(get()).toEqual({ count: 0, name: "changed name 1" });
      expect(counts).toEqual([1, 1, 2]);

      act(() => set(1, "changed name 1"));
      expect(get()).toEqual({ count: 1, name: "changed name 1" });
      expect(counts).toEqual([1, 2, 2]);

      act(() => set(1, "changed name 1"));
      expect(get()).toEqual({ count: 1, name: "changed name 1" });
      expect(counts).toEqual([1, 2, 2]);

      act(() => set(2, "changed name 1"));
      expect(get()).toEqual({ count: 2, name: "changed name 1" });
      expect(counts).toEqual([1, 3, 2]);

      act(() => set(1, "changed name 2"));
      expect(get()).toEqual({ count: 1, name: "changed name 2" });
      expect(counts).toEqual([1, 4, 3]);
    });

    it("shallow equals에 의한 최적화가 동작해야 한다 (2)", () => {
      const initialState = {
        items: [],
        error: "",
        pending: false,
      };

      const store = createStore(dataReducer, initialState);
      const counts = [0, 0, 0, 0];

      const set = (items: { a: number; b: number }[], error: string, pending: boolean) => {
        store.dispatch({ type: "set", payload: { items, error, pending } });
      };

      const get = () => store.getState();

      renderHook(() => {
        counts[0] += 1;
        return useStore(store, () => true);
      });
      renderHook(() => {
        counts[1] += 1;
        return useStore(store, (state) => state.items);
      });
      renderHook(() => {
        counts[2] += 1;
        return useStore(store, (state) => state.error);
      });
      renderHook(() => {
        counts[3] += 1;
        return useStore(store, (state) => state.pending);
      });

      expect(counts).toEqual([1, 1, 1, 1]);
      expect(get()).toEqual(initialState);
      const item1 = { a: 1, b: 2 };
      const item2 = { a: 3, b: 4 };

      act(() => set([item1], "Error 1", true));
      expect(counts).toEqual([1, 2, 2, 2]);

      act(() => set([item1], "Error 1", false));
      expect(counts).toEqual([1, 2, 2, 3]);

      act(() => set([item2], "Error 2", false));
      expect(counts).toEqual([1, 3, 3, 3]);

      act(() => set([item2], "Error 2", true));
      expect(counts).toEqual([1, 3, 3, 4]);

      act(() => set([{ ...item2 }], "Error 2", true));
      expect(counts).toEqual([1, 4, 3, 4]);
    });
  });

  describe("useRouterSelector 훅 테스트", () => {
    const router = createMockRouter();

    beforeEach(() => {
      // URL 초기화
      window.history.replaceState(null, "", "/");
    });

    it("router의 현재 상태를 정확히 반환해야 한다", () => {
      router.start();
      const { result } = renderHook(() => useRouter(router, (r) => r.route));

      expect(result.current?.path).toBe("/");
    });

    it("router 상태 변경 시 컴포넌트가 리렌더링되어야 한다", () => {
      router.start();
      const { result } = renderHook(() => useRouter(router, (r) => r.route));

      expect(result.current?.path).toBe("/");

      act(() => router.push("/users/123"));

      expect(result.current?.path).toBe("/users/:id");

      act(() => router.push("/products/electronics/456"));

      expect(result.current?.path).toBe("/products/:category/:id");
    });

    it("selector를 사용하여 router 상태의 일부만 구독할 수 있어야 한다", () => {
      router.start();

      act(() => router.push("/users/123"));

      const { result } = renderHook(() => useRouter(router, (r) => r.params));

      expect(result.current).toEqual({ id: "123" });

      act(() => router.push("/users/456"));

      expect(result.current).toEqual({ id: "456" });
    });

    it("multiple 컴포넌트가 같은 router를 구독할 때 동기화되어야 한다", () => {
      router.start();

      const { result: result1 } = renderHook(() => useRouter(router, (r) => r.route?.path || "none"));
      const { result: result2 } = renderHook(() => useRouter(router, (r) => r.route?.path || "none"));

      expect(result1.current).toBe("/");
      expect(result2.current).toBe("/");

      act(() => router.push("/users/123"));

      expect(result1.current).toBe("/users/:id");
      expect(result2.current).toBe("/users/:id");
    });

    it("복잡한 selector를 사용한 라우터 정보 추출", () => {
      router.start();

      act(() => router.push("/products/electronics/laptop123"));

      const { result } = renderHook(() =>
        useRouter(router, (r) => {
          if (r.route?.path === "/products/:category/:id") {
            return {
              category: r.params.category,
              productId: r.params.id,
              isProduct: true,
            };
          }
          return { category: null, productId: null, isProduct: false };
        }),
      );

      expect(result.current).toEqual({
        category: "electronics",
        productId: "laptop123",
        isProduct: true,
      });

      act(() => router.push("/"));

      expect(result.current).toEqual({
        category: null,
        productId: null,
        isProduct: false,
      });

      act(() => router.push("/products/books/novel456"));

      expect(result.current).toEqual({
        category: "books",
        productId: "novel456",
        isProduct: true,
      });
    });

    it("실제 브라우저 히스토리와 동기화되어야 한다", () => {
      router.start();
      const { result } = renderHook(() => useRouter(router, (r) => r.route?.path || "/"));

      expect(result.current).toBe("/");
      expect(window.location.pathname).toBe("/");

      act(() => router.push("/users/789"));

      expect(result.current).toBe("/users/:id");
      expect(window.location.pathname).toBe("/users/789");
    });
  });
});
