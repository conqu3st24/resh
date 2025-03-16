import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { CartItem } from '../types/product';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart);

  // Обработчик удаления товара из корзины
  const handleRemoveItem = (index: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
      dispatch(removeFromCart({ itemIndex: index }));
    }
  };

  // Обработчик изменения количества товара
  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      dispatch(updateQuantity({ itemIndex: index, quantity: newQuantity }));
    }
  };

  // Обработчик очистки корзины
  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      dispatch(clearCart());
    }
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2 font-century">Корзина</h1>
          <div className="flex items-center text-textGray">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">›</span>
            <span>Корзина</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-secondary mb-4">Ваша корзина пуста</h2>
            <p className="text-textGray mb-6">Добавьте товары в корзину, чтобы продолжить покупки</p>
            <Link
              to="/catalog/all"
              className="inline-block bg-primary hover:bg-lightBlue text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Перейти к каталогу
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список товаров */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-secondary">Товары ({totalItems})</h2>
                    <button
                      onClick={handleClearCart}
                      className="text-red-500 text-sm font-medium hover:text-red-700 flex items-center"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Очистить корзину
                    </button>
                  </div>
                </div>

                {/* Товары */}
                <div className="divide-y divide-gray-200">
                  {items.map((item: CartItem, index: number) => (
                    <div key={`${item.product.id}-${item.selectedColor || ''}`} className="p-4 flex flex-col md:flex-row">
                      {/* Изображение */}
                      <div className="md:w-24 h-24 flex-shrink-0 mb-4 md:mb-0">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Информация о товаре */}
                      <div className="md:ml-4 flex-grow">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="text-sm text-textGray mb-1">{item.product.brand}</div>
                            <Link to={`/product/${item.product.id}`} className="font-medium text-secondary hover:text-primary mb-2 block">
                              {item.product.title}
                            </Link>
                            
                            {/* Опции товара */}
                            {item.selectedColor && (
                              <div className="text-sm text-textGray mb-1">
                                Цвет: {typeof item.selectedColor === 'string' ? item.selectedColor : `#${item.selectedColor}`}
                              </div>
                            )}
                            {item.selectedSwitch && (
                              <div className="text-sm text-textGray mb-1">
                                Переключатель: {item.selectedSwitch}
                              </div>
                            )}
                          </div>

                          {/* Цена и удаление */}
                          <div className="mt-4 md:mt-0 flex flex-col items-end">
                            <div className={`text-lg font-bold ${item.product.oldPrice ? 'current-price' : 'text-secondary'}`}>
                              {item.product.price * item.quantity} ₽
                            </div>
                            {item.product.oldPrice && (
                              <div className="text-sm old-price">
                                {item.product.oldPrice * item.quantity} ₽
                              </div>
                            )}
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500 text-sm mt-2 hover:text-red-700"
                            >
                              Удалить
                            </button>
                          </div>
                        </div>

                        {/* Количество */}
                        <div className="mt-4 flex items-center">
                          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleQuantityChange(index, item.quantity - 1)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
                              disabled={item.quantity <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="99"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                              className="w-12 text-center border-x border-gray-300"
                            />
                            <button
                              onClick={() => handleQuantityChange(index, item.quantity + 1)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
                              disabled={item.quantity >= 99}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Информация о заказе */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-secondary mb-4">Ваш заказ</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-textGray">Товары ({totalItems})</span>
                    <span>{totalPrice} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textGray">Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-lg">
                    <span>Итого</span>
                    <span>{totalPrice} ₽</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-primary hover:bg-lightBlue text-white font-medium px-6 py-3 rounded-lg transition-colors text-center block"
                >
                  Оформить заказ
                </Link>

                <p className="text-sm text-textGray mt-4 text-center">
                  Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных и публичной офертой
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage; 