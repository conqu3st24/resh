import React, { useState } from 'react';

interface QuantityCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

/**
 * Компонент счетчика количества с кнопками плюс и минус
 * 
 * @param initialValue - начальное значение счетчика (по умолчанию 1)
 * @param min - минимальное значение счетчика (по умолчанию 1)
 * @param max - максимальное значение счетчика (по умолчанию 99)
 * @param onChange - функция обратного вызова при изменении значения
 * @param className - дополнительные классы для контейнера
 */
const QuantityCounter: React.FC<QuantityCounterProps> = ({
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(initialValue);

  // Увеличение количества
  const increment = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  // Уменьшение количества
  const decrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-md overflow-hidden ${className}`}>
      {/* Кнопка минус */}
      <button
        type="button"
        onClick={decrement}
        disabled={quantity <= min}
        className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Уменьшить количество"
      >
        <span className="text-lg font-medium">-</span>
      </button>
      
      {/* Поле с текущим значением */}
      <div className="w-8 h-8 flex items-center justify-center text-center bg-white">
        <span className="text-sm font-medium text-gray-900">{quantity}</span>
      </div>
      
      {/* Кнопка плюс */}
      <button
        type="button"
        onClick={increment}
        disabled={quantity >= max}
        className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Увеличить количество"
      >
        <span className="text-lg font-medium">+</span>
      </button>
    </div>
  );
};

export default QuantityCounter; 