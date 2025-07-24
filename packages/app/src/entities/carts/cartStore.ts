import { createStore } from "@hanghae-plus/lib";
import type { Cart } from "./types";

export const CART_ACTIONS = {
  // 기본 CRUD
  ADD_ITEM: "cart/addItem",
  REMOVE_ITEM: "cart/removeItem",
  UPDATE_QUANTITY: "cart/updateQuantity",
  CLEAR_CART: "cart/clearCart",

  // 선택 관리
  TOGGLE_SELECT: "cart/toggleSelect",
  SELECT_ALL: "cart/selectAll",
  DESELECT_ALL: "cart/deselectAll",
  REMOVE_SELECTED: "cart/removeSelected",

  // 상태 동기화
  LOAD_FROM_STORAGE: "cart/loadFromStorage",
  SYNC_TO_STORAGE: "cart/syncToStorage",
} as const;

const initialState = {
  items: [] as Cart[],
  selectedAll: false,
};

const findCartItem = (items: Cart[], productId: string) => {
  return items.find((item) => item.id === productId);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cartReducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = findCartItem(state.items, product.productId);

      if (existingItem) {
        // 기존 아이템 수량 증가
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.productId ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        };
      } else {
        // 새 아이템 추가
        const newItem = {
          id: product.productId,
          title: product.title,
          image: product.image,
          price: parseInt(product.lprice),
          quantity,
          selected: false,
        };
        return {
          ...state,
          items: [...state.items, newItem],
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        selectedAll: false,
      };
    case CART_ACTIONS.TOGGLE_SELECT: {
      const productId = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === productId ? { ...item, selected: !item.selected } : item,
      );

      // 전체 선택 상태 업데이트
      const allSelected = updatedItems.length > 0 && updatedItems.every((item) => item.selected);

      return {
        ...state,
        items: updatedItems,
        selectedAll: allSelected,
      };
    }

    case CART_ACTIONS.SELECT_ALL: {
      const updatedItems = state.items.map((item) => ({
        ...item,
        selected: true,
      }));

      return {
        ...state,
        items: updatedItems,
        selectedAll: true,
      };
    }

    case CART_ACTIONS.DESELECT_ALL: {
      const updatedItems = state.items.map((item) => ({
        ...item,
        selected: false,
      }));

      return {
        ...state,
        items: updatedItems,
        selectedAll: false,
      };
    }

    case CART_ACTIONS.REMOVE_SELECTED:
      return {
        ...state,
        items: state.items.filter((item) => !item.selected),
        selectedAll: false,
      };

    case CART_ACTIONS.LOAD_FROM_STORAGE:
      return {
        ...state,
        ...(action.payload || {}),
      };

    default:
      return state;
  }
};
/**
 * 장바구니 스토어 생성
 */
export const cartStore = createStore(cartReducer, initialState);
