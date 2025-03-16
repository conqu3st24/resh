import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import { 
  HandRaisedIcon, 
  ArrowsPointingOutIcon,
  HandThumbUpIcon,
  ScaleIcon,
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import type { MouseFinderParams, GripType, MouseWeight, GameGenre, MouseRecommendation } from '../types/tools';

// Временные моковые данные для рекомендаций
const mockRecommendations: MouseRecommendation[] = [
  {
    id: 1,
    name: 'Razer DeathAdder V3 Pro',
    image: '/images/products/deathadder.jpg',
    price: 12900,
    weight: 63,
    dimensions: { length: 128, width: 68, height: 44 },
    recommendationScore: 95,
    matchingFeatures: [
      'Идеально для ладонного хвата',
      'Подходит для больших рук',
      'Лёгкий вес для FPS игр'
    ]
  },
  {
    id: 2,
    name: 'Logitech G Pro X Superlight',
    image: '/images/products/superlight.jpg',
    price: 11900,
    weight: 63,
    dimensions: { length: 125, width: 63.5, height: 40 },
    recommendationScore: 90,
    matchingFeatures: [
      'Универсальная форма',
      'Сверхлёгкий вес',
      'Отличный сенсор для шутеров'
    ]
  }
];

// Типы хвата мыши с описаниями
const GRIP_TYPES = [
  { 
    value: 'palm', 
    label: 'Ладонный хват', 
    description: 'Вся ладонь лежит на мыши',
    image: '/images/grip-palm.svg'
  },
  { 
    value: 'claw', 
    label: 'Коготь', 
    description: 'Пальцы изогнуты, как когти',
    image: '/images/grip-claw.svg'
  },
  { 
    value: 'fingertip', 
    label: 'Пальцевой', 
    description: 'Только кончики пальцев',
    image: '/images/grip-fingertip.svg'
  }
];

// Варианты веса мыши
const WEIGHT_OPTIONS = [
  { value: 'light', label: 'Лёгкая', description: 'До 45 грамм' },
  { value: 'medium', label: 'Средняя', description: 'До 65 грамм' },
  { value: 'heavy', label: 'Тяжёлая', description: 'Более 65 грамм' }
];

const MouseFinderPage: React.FC = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState<MouseFinderParams>({
    handLength: 0,
    handWidth: 0,
    gripType: 'palm',
    preferredWeight: 'medium',
    gameGenre: 'fps'
  });

  const [recommendations, setRecommendations] = useState<MouseRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Оптимизированные обработчики
  const handleGripTypeChange = useCallback((gripType: GripType) => {
    setParams(prev => ({ ...prev, gripType }));
  }, []);

  const handleWeightChange = useCallback((preferredWeight: MouseWeight) => {
    setParams(prev => ({ ...prev, preferredWeight }));
  }, []);

  const handleAddToCart = useCallback((mouse: MouseRecommendation) => {
    dispatch(addToCart({
      product: {
        id: mouse.id,
        title: mouse.name,
        price: mouse.price,
        image: mouse.image,
        description: `Игровая мышь ${mouse.weight}г`,
        category: 'mouse',
        brand: '',
        inStock: true,
        rating: 5,
        reviewCount: 0
      },
      quantity: 1
    }));
    toast.success(`${mouse.name} добавлен в корзину`);
  }, [dispatch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы API запрос
    setRecommendations(mockRecommendations);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetForm = useCallback(() => {
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#E3E7F0]">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-white opacity-5 -z-10"></div>

      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-blue-500 hover:text-blue-800 group">
            <ArrowRightIcon className="h-4 w-4 mr-1 rotate-180 transition-transform group-hover:-translate-x-1" />
            Назад к инструментам
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-2 text-blue-900">
            Подбор игровой мышки
          </h1>
          <p className="text-blue-700/70">
            {!showResults
              ? "Ответьте на несколько вопросов, и мы подберем мышку, которая идеально подойдет именно вам"
              : "Мы подобрали для вас оптимальные мышки на основе ваших предпочтений"}
          </p>
        </div>

        {!showResults ? (
          /* Форма */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
            <div className="grid gap-10">
              {/* Размеры руки */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-medium mb-4">
                  <HandRaisedIcon className="w-5 h-5 text-primary" />
                  <span>Размеры вашей руки</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Длина ладони (см)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={params.handLength || ''}
                      onChange={e => setParams({...params, handLength: parseFloat(e.target.value)})}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Например: 18.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ширина ладони (см)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={params.handWidth || ''}
                      onChange={e => setParams({...params, handWidth: parseFloat(e.target.value)})}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Например: 9.5"
                    />
                  </div>
                </div>
              </div>

              {/* Как вы держите мышь? */}
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-900">
                  <HandThumbUpIcon className="w-6 h-6 text-blue-500" />
                  <span>Как вы держите мышь?</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {GRIP_TYPES.map(grip => (
                    <div
                      key={grip.value}
                      onClick={() => handleGripTypeChange(grip.value as GripType)}
                      className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 ${
                        params.gripType === grip.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-blue-100 hover:border-blue-300'
                      }`}
                    >
                      <div className="relative">
                        <div className={`absolute -inset-1 rounded-md ${params.gripType === grip.value ? 'bg-blue-100 animate-pulse' : ''}`}></div>
                        <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative">
                          <img 
                            src={grip.image} 
                            alt={grip.label} 
                            className="max-h-24 max-w-full object-contain transition-transform hover:scale-105 duration-300" 
                          />
                        </div>
                      </div>
                      <div className="font-medium text-lg mb-1 text-blue-900">{grip.label}</div>
                      <div className="text-sm text-blue-600">{grip.description}</div>
                      <div className="flex items-center mt-3 justify-center">
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            params.gripType === grip.value ? 'bg-blue-500 border-blue-500 flex items-center justify-center' : 'border-gray-300'
                          }`}
                        >
                          {params.gripType === grip.value && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              className="w-3 h-3 text-white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-blue-600 ml-2">{params.gripType === grip.value ? "Выбрано" : "Выбрать"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Предпочтительный вес */}
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-900">
                  <ScaleIcon className="w-6 h-6 text-blue-500" />
                  <span>Предпочтительный вес</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {WEIGHT_OPTIONS.map(weight => (
                    <div
                      key={weight.value}
                      onClick={() => handleWeightChange(weight.value as MouseWeight)}
                      className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all duration-200 ${
                        params.preferredWeight === weight.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-blue-100 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-medium text-lg mb-1 text-blue-900">{weight.label}</div>
                      <div className="text-sm text-blue-600">{weight.description}</div>
                      <div className="flex items-center mt-3 justify-center">
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            params.preferredWeight === weight.value ? 'bg-blue-500 border-blue-500 flex items-center justify-center' : 'border-gray-300'
                          }`}
                        >
                          {params.preferredWeight === weight.value && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              className="w-3 h-3 text-white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-blue-600 ml-2">{params.preferredWeight === weight.value ? "Выбрано" : "Выбрать"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                className="w-full h-14 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Подобрать мышку</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </form>
        ) : (
          /* Результаты */
          <div className="grid gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900">Рекомендованные мышки</h2>
              <button
                onClick={resetForm}
                className="text-blue-500 font-medium hover:text-blue-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M2.5 2v6h6M21.5 22v-6h-6"></path>
                  <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"></path>
                </svg>
                Изменить параметры
              </button>
            </div>

            <div className="grid gap-6">
              {recommendations.map(mouse => (
                <div 
                  key={mouse.id}
                  className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:shadow-blue-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Изображение */}
                    <div className="w-full md:w-48 h-48 shrink-0 bg-blue-50 rounded-xl p-4 flex items-center justify-center">
                      <img 
                        src={mouse.image} 
                        alt={mouse.name}
                        className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    
                    {/* Информация */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-blue-900 mb-2">{mouse.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              Совпадение: {mouse.recommendationScore}%
                            </div>
                            <div className="text-blue-600">
                              {mouse.weight} г • {mouse.dimensions.length}×{mouse.dimensions.width}×{mouse.dimensions.height} мм
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold mt-2 md:mt-0 text-blue-900">{mouse.price.toLocaleString()} ₽</div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-blue-900 mb-2">Почему подходит вам:</h4>
                        <ul className="grid gap-1">
                          {mouse.matchingFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-blue-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Link 
                          to={`/product/${mouse.id}`}
                          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                        >
                          Подробнее
                        </Link>
                        <button 
                          onClick={() => handleAddToCart(mouse)}
                          className="flex-1 px-4 py-2 border border-blue-200 text-blue-700 rounded-lg hover:border-blue-400 transition-colors flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                          </svg>
                          В корзину
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MouseFinderPage;