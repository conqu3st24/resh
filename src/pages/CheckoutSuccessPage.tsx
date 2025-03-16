import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const CheckoutSuccessPage: React.FC = () => {
  // Форматирование текущей даты для отображения
  const formattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Генерация номера заказа
  const orderNumber = () => {
    return `№${Math.floor(10000 + Math.random() * 90000)}`;
  };

  return (
    <main className="py-8 md:py-12 bg-[#FAF7F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Спасибо за заказ!</h1>
          <p className="text-gray-600 mb-6">
            Ваш заказ {orderNumber()} успешно оформлен. Мы отправили подтверждение на ваш email.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2">Информация о заказе</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-gray-500">Дата заказа:</p>
                <p>{formattedDate()}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-500">Способ оплаты:</p>
                <p>Банковская карта</p>
              </div>
              <div className="text-left">
                <p className="text-gray-500">Способ доставки:</p>
                <p>СДЭК</p>
              </div>
              <div className="text-left">
                <p className="text-gray-500">Статус:</p>
                <p className="text-green-600">Оплачен</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-primary hover:bg-lightBlue text-white px-6 py-3 rounded-md font-medium"
            >
              Продолжить покупки
            </Link>

            <Link 
              to="/account/orders" 
              className="border border-gray-300 px-6 py-3 rounded-md font-medium"
            >
              Мои заказы
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage; 