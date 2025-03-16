import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { 
  ArrowLeft,
  ShoppingCart,
  Share2,
  Gauge,
  Zap,
  Award,
  Plus
} from 'lucide-react';
import type { SetupFinderParams, PlayerLevel, SetupRecommendation } from '../types/tools';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { SetupItemCard } from '../components/SetupItemCard';

// Временные моковые данные для рекомендаций
const mockRecommendation: SetupRecommendation = {
  mouse: {
    id: 1,
    name: 'Razer DeathAdder V3 Pro',
    image: '/images/products/deathadder.jpg',
    price: 12900
  },
  keyboard: {
    id: 2,
    name: 'Keychron Q1 Pro',
    image: '/images/products/keychron.jpg',
    price: 15900
  },
  mousepad: {
    id: 3,
    name: 'Artisan Hien FX XSOFT',
    image: '/images/products/artisan.jpg',
    price: 6900
  },
  headset: {
    id: 4,
    name: 'HyperX Cloud Alpha Wireless',
    image: '/images/products/hyperx.jpg',
    price: 14900
  },
  microphone: {
    id: 5,
    name: 'HyperX QuadCast S',
    image: '/images/products/quadcast.jpg',
    price: 12900
  },
  totalPrice: 63500
};

const popularGames = [
  { id: 'cs', name: 'Counter Strike', image: '/images/games/cs.svg' },
  { id: 'valorant', name: 'Valorant', image: '/images/games/valorant.svg' },
  { id: 'fortnite', name: 'Fortnite', image: '/images/games/fortnite.svg' },
  { id: 'apex', name: 'Apex Legends', image: '/images/games/apex.svg' },
  { id: 'deadlock', name: 'Deadlock', image: '/images/games/deadlock.svg' }
];

const SetupFinderPage: React.FC = () => {
  const [params, setParams] = useState<SetupFinderParams>({
    game: '',
    playerLevel: 'amateur',
    budget: 50000,
    setupType: '',
    selectedGames: []
  });

  const [recommendation, setRecommendation] = useState<SetupRecommendation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы API запрос
    setRecommendation(mockRecommendation);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetForm = useCallback(() => {
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Рассчитываем процент использования бюджета
  const budgetUsagePercent = recommendation ? Math.round((recommendation.totalPrice / params.budget) * 100) : 0;

  // Создаем массив объектов для рекомендованного сетапа
  const recommendedSetup = recommendation
    ? {
        totalPrice: recommendation.totalPrice,
        games: params.selectedGames || ['Counter Strike'],
        items: Object.entries(recommendation)
          .filter(([key]) => key !== 'totalPrice')
          .map(([key, item]) => ({
            id: item.id,
            type: key,
            name: item.name,
            image: item.image,
            price: item.price,
            matchPercent: 98,
            description:
              key === 'mouse'
                ? 'Ультралегкая беспроводная игровая мышь'
                : key === 'keyboard'
                ? 'Механическая игровая клавиатура'
                : key === 'mousepad'
                ? 'Профессиональный игровой коврик'
                : key === 'headset'
                ? 'Беспроводная игровая гарнитура'
                : 'Высококачественный игровой аксессуар',
            specs:
              key === 'mouse'
                ? ['Вес: 63г', 'DPI: 25,600', 'Беспроводная', '5 кнопок']
                : key === 'keyboard'
                ? ['Механические свитчи', 'TKL формат', 'RGB подсветка']
                : key === 'mousepad'
                ? ['Размер: XL', 'Покрытие: Speed', 'Толщина: 4мм']
                : key === 'headset'
                ? ['Время работы: 300ч', '7.1 звук', 'Вес: 278г']
                : ['Высокое качество', 'Долговечность', 'Гарантия'],
          })),
      }
    : null;

  return (
    <div className="min-h-screen bg-[#E3E7F0]">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-[#E3E7F0]/50 -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-96 opacity-20 -z-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-primary hover:text-primary/80 group">
            <ArrowLeftIcon className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Назад на главную
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
            Подбор игрового сетапа
          </h1>
          <p className="text-blue-700/70">
            {!showResults
              ? "Создайте идеальный игровой сетап, соответствующий вашим предпочтениям и бюджету"
              : "Мы подобрали для вас оптимальный набор устройств на основе ваших предпочтений"}
          </p>
        </div>

        {!showResults ? (
          /* Форма */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid gap-8">
              {/* Тип сетапа */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-medium mb-4">
                  <span>Выберите тип сетапа</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      value: 'gaming', 
                      label: 'Игровой', 
                      description: 'Оптимизирован для игр с высокой производительностью',
                      image: '/images/placeholder.svg'
                    },
                    { 
                      value: 'streaming', 
                      label: 'Стриминг', 
                      description: 'Для игр и стриминга одновременно',
                      image: '/images/placeholder.svg'
                    },
                    { 
                      value: 'esports', 
                      label: 'Киберспорт', 
                      description: 'Профессиональное оборудование для соревновательных игр',
                      image: '/images/placeholder.svg'
                    }
                  ].map(setupType => (
                    <button
                      key={setupType.value}
                      type="button"
                      onClick={() => setParams({...params, setupType: setupType.value})}
                      className={`p-6 rounded-xl border flex flex-col items-center text-center transition-all duration-200
                        ${params.setupType === setupType.value 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-gray-200 hover:border-primary/50 hover:bg-blue-50'}`}
                    >
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <img 
                          src={setupType.image} 
                          alt={setupType.label}
                          className="w-12 h-12 object-contain opacity-80"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="font-medium mb-1">{setupType.label}</div>
                      <div className="text-sm text-gray-500">{setupType.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Игра */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-medium mb-4">
                  <PlayIcon className="w-5 h-5 text-primary" />
                  <span>В какие игры вы играете?</span>
                </h2>
                <div className="text-sm text-gray-500 mb-4">Выберите одну или несколько игр</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'cs', name: 'Counter Strike', image: '/images/games/cs.svg' },
                    { id: 'valorant', name: 'Valorant', image: '/images/games/valorant.svg' },
                    { id: 'fortnite', name: 'Fortnite', image: '/images/games/fortnite.svg' },
                    { id: 'apex', name: 'Apex Legends', image: '/images/games/apex.svg' },
                    { id: 'deadlock', name: 'Deadlock', image: '/images/games/deadlock.svg' }
                  ].map(game => {
                    const isSelected = params.selectedGames?.includes(game.id) || false;
                    return (
                      <div
                        key={game.id}
                        className={`p-4 rounded-xl border flex items-center transition-all duration-200
                          ${isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50 hover:bg-blue-50'}`}
                      >
                        <div className="w-12 h-12 mr-3 flex items-center justify-center">
                          <img 
                            src={game.image} 
                            alt={game.name}
                            className="w-10 h-10 object-contain opacity-80"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{game.name}</div>
                          <div className="text-sm text-blue-600">
                            {isSelected ? 'Выбрано' : 'Выбрать'}
                          </div>
                        </div>
                        <div className="flex items-center justify-center ml-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              const currentGames = params.selectedGames || [];
                              const newGames = isSelected
                                ? currentGames.filter(id => id !== game.id)
                                : [...currentGames, game.id];
                              setParams({...params, selectedGames: newGames});
                            }}
                            className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Уровень игры */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-medium mb-4">
                  <UserGroupIcon className="w-5 h-5 text-primary" />
                  <span>Ваш уровень</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      value: 'professional', 
                      label: 'Профессионал', 
                      description: 'Играю на турнирах',
                      image: '/images/setup/pro-player.svg'
                    },
                    { 
                      value: 'amateur', 
                      label: 'Любитель', 
                      description: 'Играю регулярно',
                      image: '/images/setup/casual-player.svg'
                    },
                    { 
                      value: 'beginner', 
                      label: 'Новичок', 
                      description: 'Только начинаю',
                      image: '/images/setup/beginner-player.svg'
                    }
                  ].map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setParams({...params, playerLevel: level.value as PlayerLevel})}
                      className={`p-6 rounded-xl border flex flex-col items-center text-center transition-all duration-200
                        ${params.playerLevel === level.value 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-gray-200 hover:border-primary/50 hover:bg-blue-50'}`}
                    >
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <img 
                          src={level.image} 
                          alt={level.label}
                          className="w-12 h-12 object-contain opacity-80"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="font-medium mb-1">{level.label}</div>
                      <div className="text-sm text-gray-500">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Бюджет */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-medium mb-4">
                  <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                  <span>Ваш бюджет</span>
                </h2>
                <div className="grid gap-4">
                  <input
                    type="range"
                    min="20000"
                    max="100000"
                    step="1000"
                    value={params.budget}
                    onChange={e => setParams({...params, budget: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                  <div className="text-center font-medium text-lg">
                    {params.budget.toLocaleString()} ₽
                  </div>
                </div>
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full h-14 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors duration-200"
              >
                Подобрать сетап
              </button>
            </div>
          </div>
        ) : (
          /* Результаты */
          <div className="space-y-8">
            {/* Карточка результата */}
            <Card className="border-blue-100">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Ваш идеальный сетап</h2>
                <p className="text-blue-700/80 mb-6">Подобран специально для вас на основе ваших предпочтений</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 mb-1">Тип сетапа</div>
                    <div className="font-semibold text-blue-900">{params.setupType === 'streaming' ? 'Стриминг' : params.setupType === 'gaming' ? 'Игровой' : 'Киберспорт'}</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 mb-1">Качество</div>
                    <div className="font-semibold text-blue-900">Высокое</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 mb-1">Стоимость сетапа</div>
                    <div className="font-semibold text-blue-900 text-xl">{recommendedSetup?.totalPrice.toLocaleString()} ₽</div>
                    <div className="text-sm text-blue-600 mt-1">Ваш бюджет: {params.budget.toLocaleString()} ₽</div>
                    
                    <Progress value={budgetUsagePercent} className="h-2 mt-2" />
                    
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-blue-600">Использовано</span>
                      <span className={`font-medium ${budgetUsagePercent > 95 ? "text-red-500" : "text-blue-900"}`}>
                        {budgetUsagePercent}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-blue-600 mb-1">Игры</div>
                  <div className="flex flex-wrap gap-2">
                    {params.selectedGames?.map((game) => {
                      const gameName = 
                        game === 'cs' ? 'Counter Strike' :
                        game === 'valorant' ? 'Valorant' :
                        game === 'fortnite' ? 'Fortnite' :
                        game === 'apex' ? 'Apex Legends' :
                        game === 'deadlock' ? 'Deadlock' : game;
                      return (
                        <div key={game} className="bg-white rounded-full px-3 py-1 text-sm border border-blue-100">
                          {gameName}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button onClick={resetForm} variant="outline" className="border-blue-200 text-blue-700 hover:border-blue-400">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Изменить параметры
                  </Button>

                  <Button className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Купить весь сетап
                  </Button>

                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:border-blue-400">
                    <Share2 className="h-4 w-4 mr-2" />
                    Поделиться
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Устройства сетапа */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900">Рекомендованные устройства</h2>

              {recommendedSetup?.items.map((item) => (
                <SetupItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Рекомендации */}
            <Card className="border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Почему мы рекомендуем этот сетап</h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Gauge className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Оптимальная производительность</h4>
                      <p className="text-blue-700">
                        Этот сетап обеспечивает идеальный баланс между производительностью и стоимостью для выбранных вами игр.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Совместимость компонентов</h4>
                      <p className="text-blue-700">
                        Все устройства в этом сетапе идеально сочетаются друг с другом, обеспечивая максимальную эффективность и комфорт.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Проверено профессионалами</h4>
                      <p className="text-blue-700">
                        Этот сетап основан на предпочтениях профессиональных игроков в {recommendedSetup?.games.map(game => 
                          game === 'cs' ? 'Counter Strike' :
                          game === 'valorant' ? 'Valorant' :
                          game === 'fortnite' ? 'Fortnite' :
                          game === 'apex' ? 'Apex Legends' :
                          game === 'deadlock' ? 'Deadlock' : game
                        ).join(", ")}.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupFinderPage;