import React, { useState } from 'react';
import { KeyIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const GiftCardActivation: React.FC = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!code.trim()) {
      setStatus('error');
      setMessage('Введите код подарочной карты');
      return;
    }
    
    // Проверка формата (для примера)
    const codePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (!codePattern.test(code)) {
      setStatus('error');
      setMessage('Неверный формат кода. Пример: ABCD-1234-EFGH-5678');
      return;
    }
    
    // Имитация активации
    setTimeout(() => {
      // Для демонстрации: успешная активация для кода GIFT-CARD-TEST-1234
      if (code === 'GIFT-CARD-TEST-1234') {
        setStatus('success');
        setMessage('Подарочная карта активирована! Баланс: 5000 ₽');
      } else {
        setStatus('error');
        setMessage('Неверный код или карта уже активирована');
      }
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <KeyIcon className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-2xl font-semibold">Активация подарочной карты</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Введите код подарочной карты, чтобы активировать её и добавить средства на свой счёт
        </p>
        
        <form onSubmit={handleActivate}>
          <div className="mb-4">
            <label htmlFor="giftCardCode" className="block text-sm font-medium text-gray-700 mb-1">
              Код подарочной карты
            </label>
            <input
              id="giftCardCode"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setStatus('idle');
              }}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                status === 'error' ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={19}
            />
            <p className="text-xs text-gray-500 mt-1">
              Код состоит из 16 символов, разделенных дефисами
            </p>
          </div>
          
          {status === 'error' && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start">
              <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{message}</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-start">
              <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{message}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Активировать карту
          </button>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Для тестирования используйте код: GIFT-CARD-TEST-1234</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiftCardActivation; 