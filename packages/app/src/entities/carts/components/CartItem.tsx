import { removeFromCart, toggleCartSelect, updateCartQuantity } from "../cartUseCase";
import { PublicImage } from "../../../components";
import type { Cart } from "../types";
import { useCartStoreSelector } from "../hooks";
import { useMemo } from "@hanghae-plus/lib";

export function CartItem({ id }: Readonly<Pick<Cart, "id">>) {
  const selector = useMemo(
    () =>
      ({ items }: { items: Cart[] }) =>
        items.find((v) => v.id === id)!,
    [id],
  );
  const item = useCartStoreSelector(({ items }) => items.find((v) => v.id === id)!);

  const { price, quantity, selected, image, title } = item;
  const subtotal = price * quantity;

  const increment = () => updateCartQuantity(id, quantity + 1);
  const decrement = () => updateCartQuantity(id, Math.max(1, quantity - 1));
  const change = (value: number) => updateCartQuantity(id, Math.max(1, value));

  return (
    <div className="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id={id}>
      <label className="flex items-center mr-3">
        <input
          type="checkbox"
          checked={selected}
          className="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded
                      focus:ring-blue-500"
          data-product-id={id}
          onChange={() => toggleCartSelect(id)}
        />
      </label>

      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover cursor-pointer cart-item-image"
          data-product-id={id}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id={id}>
          {title}
        </h4>
        <p className="text-sm text-gray-600 mt-1">{price.toLocaleString()}원</p>

        <div className="flex items-center mt-2">
          <button
            className="quantity-decrease-btn w-7 h-7 flex items-center justify-center
                         border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
            data-product-id={id}
            onClick={decrement}
          >
            <PublicImage src="/minus-icon.svg" alt="감소" className="w-3 h-3" />
          </button>

          <input
            type="number"
            value={quantity}
            min="1"
            className="quantity-input w-12 h-7 text-center text-sm border-t border-b
                        border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            disabled
            data-product-id={id}
            onChange={(e) => change(Number(e.target.value))}
          />

          <button
            className="quantity-increase-btn w-7 h-7 flex items-center justify-center
                         border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
            data-product-id={id}
            onClick={increment}
          >
            <PublicImage src="/plus-icon.svg" alt="증가" className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="text-right ml-3">
        <p className="text-sm font-medium text-gray-900">{subtotal.toLocaleString()}원</p>
        <button
          className="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
          data-product-id={id}
          onClick={() => removeFromCart(id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
