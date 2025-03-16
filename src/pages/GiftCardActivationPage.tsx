import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import GiftCardActivation from '../components/GiftCardActivation';

const GiftCardActivationPage: React.FC = () => {
  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Хлебные крошки */}
          <div className="text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRightIcon className="h-3 w-3 inline mx-1" />
            <Link to="/gift-cards" className="hover:text-primary transition-colors">
              Подарочные карты
            </Link>
            <ChevronRightIcon className="h-3 w-3 inline mx-1" />
            <span>Активация карты</span>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-center">Активация подарочной карты</h1>
          
          <GiftCardActivation />
          
          <div className="mt-8 max-w-xl mx-auto bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Как использовать подарочную карту?</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Введите код подарочной карты в форму выше</li>
              <li>После активации средства будут доступны в вашем личном кабинете</li>
              <li>При оформлении заказа вы сможете использовать баланс подарочной карты</li>
              <li>Если сумма заказа превышает баланс карты, вы можете доплатить другим способом</li>
            </ol>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Примечание:</strong> Срок действия подарочной карты – 1 год с момента активации. 
                Подарочные карты не подлежат возврату или обмену.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GiftCardActivationPage; 