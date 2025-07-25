import { type ChangeEvent, memo } from "react";
import { CartItem as OriginCartItem } from "./CartItem";
import { deselectAllCart, selectAllCart } from "../cartUseCase";
import { Modal, PublicImage, useToastAction } from "../../../components";
import type { Cart } from "../types";
import { useCartRemoveCommands, useCartStoreSelector } from "../hooks";

const CartItem = memo(OriginCartItem);

interface State {
  items: Cart[];
  selectedAll: boolean;
}

const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.checked) {
    selectAllCart();
  } else {
    deselectAllCart();
  }
};

const computeAmount = (items: Cart[]) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const filterSelectedItems = (items: Cart[]) => items.filter((item) => item.selected);
const selectCartIds = ({ items }: State) => items.map((item) => item.id);
const selectTotalAmount = ({ items }: State) => computeAmount(items);
const selectSelectedAmount = ({ items }: State) => computeAmount(filterSelectedItems(items));
const selectSelectedCount = ({ items }: State) => filterSelectedItems(items).length;
const selectSelectedAll = ({ selectedAll }: State) => selectedAll;

export function CartModal() {
  const cartIds = useCartStoreSelector(selectCartIds);
  const totalAmount = useCartStoreSelector(selectTotalAmount);
  const selectedCount = useCartStoreSelector(selectSelectedCount);
  const selectedAmount = useCartStoreSelector(selectSelectedAmount);
  const selectedAll = useCartStoreSelector(selectSelectedAll);
  const toast = useToastAction();
  const commands = useCartRemoveCommands();
  const checkout = () => toast.show("구매 기능은 추후 구현 예정입니다.", "info");

  return (
    <Modal.Container>
      <Modal.Header>
        <PublicImage src="/cart-icon.svg" alt="장바구니" className="w-5 h-5 mr-2" />
        장바구니
        {cartIds.length > 0 && <span className="text-sm font-normal text-gray-600 ml-1">({cartIds.length})</span>}
      </Modal.Header>

      {/* 컨텐츠 */}
      {cartIds.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <PublicImage src="/empty-cart-icon.svg" alt="빈 장바구니" className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
            <p className="text-gray-600">원하는 상품을 담아보세요!</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-h-[calc(90vh-120px)]">
          {/* 전체 선택 섹션 */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                id="cart-modal-select-all-checkbox"
                checked={selectedAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                onChange={handleSelectAllChange}
              />
              전체선택 ({cartIds.length}개)
            </label>
          </div>

          {/* 아이템 목록 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {cartIds.map((id) => (
                <CartItem key={id} id={id} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 하단 액션 */}
      {cartIds.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          {/* 선택된 아이템 정보 */}
          {selectedCount > 0 && (
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-gray-600">선택한 상품 ({selectedCount}개)</span>
              <span className="font-medium">{selectedAmount.toLocaleString()}원</span>
            </div>
          )}

          {/* 총 금액 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-900">총 금액</span>
            <span className="text-xl font-bold text-blue-600">{totalAmount.toLocaleString()}원</span>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-2">
            {selectedCount > 0 && (
              <button
                id="cart-modal-remove-selected-btn"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md
                                 hover:bg-red-700 transition-colors text-sm"
                onClick={commands.removeSelected}
              >
                선택한 상품 삭제 ({selectedCount}개)
              </button>
            )}

            <div className="flex gap-2">
              <button
                id="cart-modal-clear-cart-btn"
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md
                                 hover:bg-gray-700 transition-colors text-sm"
                onClick={commands.clear}
              >
                전체 비우기
              </button>
              <button
                id="cart-modal-checkout-btn"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md
                                 hover:bg-blue-700 transition-colors text-sm"
                onClick={checkout}
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal.Container>
  );
}
