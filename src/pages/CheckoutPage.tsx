import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import { CartItem } from '../types/product';

// Иконки
import {
  CreditCardIcon,
  TruckIcon,
  MapPinIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart);
  const [step, setStep] = useState(1);
  
  // Данные формы оформления заказа
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'cdek',
    paymentMethod: 'card',
  });

  // Если корзина пуста, перенаправляем на страницу корзины
  if (items.length === 0) {
    return (
      <main className="py-8 md:py-12 bg-[#E3E7F0]">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-secondary mb-4">Корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте товары в корзину, чтобы оформить заказ</p>
            <Link
              to="/catalog/all"
              className="bg-primary hover:bg-lightBlue text-white font-medium px-6 py-3 rounded-lg transition-colors inline-block"
            >
              Перейти к каталогу
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Оформление заказа завершено
      toast.success('Заказ успешно оформлен!');
      dispatch(clearCart());
      navigate('/checkout/success');
    }
  };

  // Переход к предыдущему шагу
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/cart');
    }
  };

  // Стоимость доставки
  const deliveryCost = formData.deliveryMethod === 'cdek' ? 300 : 0;

  // Итоговая сумма
  const total = totalPrice + deliveryCost;

  return (
    <main className="py-8 md:py-12 bg-[#E3E7F0]">
      <div className="container mx-auto px-4">
        {/* Хлебные крошки */}
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-primary">
            Главная
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/cart" className="text-gray-500 hover:text-primary">
            Корзина
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">Оформление заказа</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Оформление заказа</h1>

        {/* Шаги оформления заказа */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 1 ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              <span>1</span>
            </div>
            <span className="text-sm">Данные</span>
          </div>

          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 2 ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              <span>2</span>
            </div>
            <span className="text-sm">Доставка</span>
          </div>

          <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 3 ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              <span>3</span>
            </div>
            <span className="text-sm">Оплата</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Форма оформления заказа */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <form onSubmit={handleSubmit}>
                {/* Шаг 1: Личные данные */}
                {step === 1 && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Личные данные</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Имя *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Фамилия *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-primary hover:bg-lightBlue text-white px-6 py-2 rounded-md font-medium"
                      >
                        Продолжить
                      </button>
                    </div>
                  </div>
                )}

                {/* Шаг 2: Доставка */}
                {step === 2 && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Способ доставки</h2>

                    <div className="space-y-4 mb-6">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${
                          formData.deliveryMethod === "cdek"
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value="cdek"
                            checked={formData.deliveryMethod === "cdek"}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <TruckIcon className="w-5 h-5 mr-2" />
                              <span className="font-medium">СДЭК</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Доставка курьером СДЭК до двери
                            </p>
                            <p className="text-sm font-medium mt-1">300 ₽</p>
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${
                          formData.deliveryMethod === "pickup"
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value="pickup"
                            checked={formData.deliveryMethod === "pickup"}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <MapPinIcon className="w-5 h-5 mr-2" />
                              <span className="font-medium">Самовывоз</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Самовывоз из пункта выдачи
                            </p>
                            <p className="text-sm font-medium mt-1">Бесплатно</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {formData.deliveryMethod === "cdek" && (
                      <div className="mb-6">
                        <h3 className="font-medium mb-3">Адрес доставки</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Адрес *
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Город *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Индекс *
                            </label>
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={goBack}
                        className="border border-gray-300 px-6 py-2 rounded-md font-medium"
                      >
                        Назад
                      </button>

                      <button
                        type="submit"
                        className="bg-primary hover:bg-lightBlue text-white px-6 py-2 rounded-md font-medium"
                      >
                        Продолжить
                      </button>
                    </div>
                  </div>
                )}

                {/* Шаг 3: Оплата */}
                {step === 3 && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Способ оплаты</h2>

                    <div className="space-y-4 mb-6">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${
                          formData.paymentMethod === "card"
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === "card"}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <CreditCardIcon className="w-5 h-5 mr-2" />
                              <span className="font-medium">Банковская карта</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Visa, MasterCard, МИР
                            </p>
                          </div>
                        </label>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${
                          formData.paymentMethod === "cash"
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={formData.paymentMethod === "cash"}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <span className="font-medium">Наличными при получении</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Оплата при получении заказа
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={goBack}
                        className="border border-gray-300 px-6 py-2 rounded-md font-medium"
                      >
                        Назад
                      </button>

                      <button
                        type="submit"
                        className="bg-primary hover:bg-lightBlue text-white px-6 py-2 rounded-md font-medium"
                      >
                        Оформить заказ
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Сводка заказа */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold mb-4">Ваш заказ</h2>

              <div className="space-y-3 mb-4">
                {items.map((item: CartItem, index: number) => (
                  <div key={`${item.product.id}-${index}`} className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="object-contain w-full h-full p-1"
                      />
                    </div>

                    <div className="ml-3 flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × {item.product.price.toLocaleString()} ₽
                      </p>
                    </div>

                    <div className="font-medium text-sm">
                      {(item.product.price * item.quantity).toLocaleString()} ₽
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Сумма товаров</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span>
                    {deliveryCost > 0
                      ? `${deliveryCost.toLocaleString()} ₽`
                      : "Бесплатно"}
                  </span>
                </div>

                <div className="pt-2 border-t flex justify-between font-bold">
                  <span>Итого</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage; 