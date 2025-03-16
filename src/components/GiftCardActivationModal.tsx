import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface GiftCardActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: (code: string) => void;
}

const GiftCardActivationModal: React.FC<GiftCardActivationModalProps> = ({ isOpen, onClose, onActivate }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Очищаем поля при закрытии модального окна
  const handleClose = () => {
    setCode('');
    setError('');
    onClose();
  };

  // Форматирование ввода кода в формат XXXX-XXXX-XXXX-XXXX
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9A-Za-z]/g, '');
    
    let formattedValue = '';
    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += '-';
      }
      formattedValue += value[i];
    }
    
    setCode(formattedValue);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Простая валидация: проверка длины (должно быть 19 символов включая дефисы)
    if (code.replace(/-/g, '').length !== 16) {
      setError('Введите полный код подарочной карты');
      return;
    }
    
    onActivate(code);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        {/* Кнопка закрытия */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Активация подарочной карты</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="card-code" className="block text-sm font-medium text-gray-700 mb-1">
                Код карты
              </label>
              <input
                type="text"
                id="card-code"
                value={code}
                onChange={handleCodeChange}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                maxLength={19}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <p className="text-sm text-gray-500 mt-2">
                Код находится на обратной стороне подарочной карты или в письме, которое было отправлено на ваш email.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Активировать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiftCardActivationModal; 