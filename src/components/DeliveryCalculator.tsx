import React, { useState } from 'react';
import { CalculatorIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  deliveryDays: string;
  company: string;
}

const DeliveryCalculator: React.FC = () => {
  const [city, setCity] = useState('');
  const [weight, setWeight] = useState<number>(1);
  const [calculating, setCalculating] = useState(false);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [error, setError] = useState('');

  const popularCities = [
    'Москва', 'Санкт-Петербург', 'Екатеринбург', 
    'Новосибирск', 'Казань', 'Нижний Новгород'
  ];

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!city) {
      setError('Пожалуйста, укажите город доставки');
      return;
    }

    setCalculating(true);

    // Имитация запроса к API для расчета доставки
    setTimeout(() => {
      // Для демонстрации используем моковые данные
      const mockDeliveryOptions: DeliveryOption[] = [
        {
          id: 'cdek-courier',
          name: 'СДЭК Курьер',
          price: 350,
          deliveryDays: '1-3',
          company: 'СДЭК'
        },
        {
          id: 'cdek-pickup',
          name: 'СДЭК Пункт выдачи',
          price: 250,
          deliveryDays: '1-3',
          company: 'СДЭК'
        },
        {
          id: 'boxberry-pickup',
          name: 'Boxberry Пункт выдачи',
          price: 230,
          deliveryDays: '2-4',
          company: 'Boxberry'
        },
        {
          id: 'russian-post',
          name: 'Почта России',
          price: 300,
          deliveryDays: '5-7',
          company: 'Почта России'
        }
      ];

      setDeliveryOptions(mockDeliveryOptions);
      setCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <CalculatorIcon className="w-6 h-6 text-primary mr-3" />
        <h2 className="text-xl font-semibold">Рассчитать стоимость доставки</h2>
      </div>

      <form onSubmit={handleCalculate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Город доставки
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Введите город"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {popularCities.map(popularCity => (
                <button
                  key={popularCity}
                  type="button"
                  onClick={() => handleCitySelect(popularCity)}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  {popularCity}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Вес заказа (кг)
            </label>
            <input
              type="number"
              id="weight"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={e => setWeight(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
          disabled={calculating}
        >
          {calculating ? (
            <>
              <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
              Расчет...
            </>
          ) : (
            'Рассчитать'
          )}
        </button>
      </form>

      {!calculating && deliveryOptions.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-4">Доступные варианты доставки в {city}</h3>
          <div className="space-y-4">
            {deliveryOptions.map(option => (
              <div key={option.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-gray-500">{option.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{option.price} ₽</div>
                    <div className="text-sm text-gray-500">{option.deliveryDays} дн.</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            * Точная стоимость доставки будет рассчитана при оформлении заказа
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryCalculator; 