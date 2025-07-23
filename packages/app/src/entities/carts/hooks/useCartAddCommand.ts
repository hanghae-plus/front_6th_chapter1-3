import { useMemo } from "react";
import { useToastCommand } from "../../../components";
import type { Product } from "../../products";
import { addToCart } from "../cartUseCase";

export const useCartAddCommand = () => {
  const toast = useToastCommand();

  return useMemo(() => {
    return (product: Product, quantity = 1) => {
      addToCart(product, quantity);
      toast.show("장바구니에 추가되었습니다", "success");
    };
  }, [toast.show]);
};
