import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, ArrowTrendingUpIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface MouseStats {
  id: number;
  name: string;
  brand: string;
  image: string;
  usagePercentage: number;
  proPlayers: number;
  avgRating: number;
  price: number;
  weight: number;
  shape: 'Ergonomic' | 'Ambidextrous';
  connection: 'Wired' | 'Wireless' | 'Both';
}

interface Game {
  id: string;
  name: string;
  icon: string;
}

// Моковые данные для игр
const games: Game[] = [
  { id: 'cs2', name: 'Counter-Strike 2', icon: '🎯' },
  { id: 'valorant', name: 'Valorant', icon: '🔫' },
  { id: 'apex', name: 'Apex Legends', icon: '🛡️' },
  { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
  { id: 'overwatch', name: 'Overwatch 2', icon: '🦸' }
];

// Моковые данные для мышек
const mockMouseStats: MouseStats[] = [
  {
    id: 1,
    name: 'G Pro X Superlight',
    brand: 'Logitech',
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
    usagePercentage: 38.5,
    proPlayers: 385,
    avgRating: 4.8,
    price: 11900,
    weight: 63,
    shape: 'Ambidextrous',
    connection: 'Wireless'
  },
  {
    id: 2,
    name: 'Viper V2 Pro',
    brand: 'Razer',
    image: 'https://maxgaming.com/img/cms/Razer/Viper%20V2%20Pro/Razer_Viper_V2_Pro_White_1.jpg',
    usagePercentage: 21.2,
    proPlayers: 212,
    avgRating: 4.7,
    price: 13900,
    weight: 58,
    shape: 'Ambidextrous',
    connection: 'Wireless'
  },
  {
    id: 3,
    name: 'DeathAdder V3 Pro',
    brand: 'Razer',
    image: 'https://maxgaming.com/img/cms/Razer/DeathAdder%20V3%20Pro/Razer_DeathAdder_V3_Pro_White_1.jpg',
    usagePercentage: 12.8,
    proPlayers: 128,
    avgRating: 4.6,
    price: 12900,
    weight: 63,
    shape: 'Ergonomic',
    connection: 'Wireless'
  },
  {
    id: 4,
    name: 'Pulsar X2',
    brand: 'Pulsar',
    image: 'https://maxgaming.com/img/cms/Pulsar/Pulsar_X2_Wireless_Red_1.jpg',
    usagePercentage: 8.5,
    proPlayers: 85,
    avgRating: 4.5,
    price: 10900,
    weight: 59,
    shape: 'Ambidextrous',
    connection: 'Wireless'
  },
  {
    id: 5,
    name: 'Zowie EC2-C',
    brand: 'Zowie',
    image: 'https://maxgaming.com/img/cms/Zowie/EC2-C/Zowie_EC2-C_1.jpg',
    usagePercentage: 5.2,
    proPlayers: 52,
    avgRating: 4.4,
    price: 7900,
    weight: 73,
    shape: 'Ergonomic',
    connection: 'Wired'
  },
  {
    id: 6,
    name: 'Starlight-12 TenZ',
    brand: 'Finalmouse',
    image: 'https://maxgaming.com/img/cms/Finalmouse/Starlight-12/Finalmouse_Starlight-12_Phantom_Medium_1.jpg',
    usagePercentage: 4.8,
    proPlayers: 48,
    avgRating: 4.3,
    price: 19900,
    weight: 47,
    shape: 'Ambidextrous',
    connection: 'Wireless'
  },
  {
    id: 7,
    name: 'XM1r',
    brand: 'Endgame Gear',
    image: 'https://maxgaming.com/img/cms/EndGameGear/XM1r/EndGameGear_XM1r_Gaming_Mouse_Dark_Reflex_1.jpg',
    usagePercentage: 3.2,
    proPlayers: 32,
    avgRating: 4.5,
    price: 6900,
    weight: 70,
    shape: 'Ambidextrous',
    connection: 'Wired'
  },
  {
    id: 8,
    name: 'Model O Wireless',
    brand: 'Glorious',
    image: 'https://maxgaming.com/img/cms/Glorious/Model%20O%20Wireless/Glorious_Model_O_Wireless_Gaming_Mouse_Matte_Black_1.jpg',
    usagePercentage: 2.8,
    proPlayers: 28,
    avgRating: 4.2,
    price: 8900,
    weight: 69,
    shape: 'Ambidextrous',
    connection: 'Wireless'
  }
];

const MouseStatsPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>('cs2');
  const [sortBy, setSortBy] = useState<'usagePercentage' | 'price' | 'weight'>('usagePercentage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Сортировка мышек
  const sortedMice = [...mockMouseStats].sort((a, b) => {
    const factor = sortOrder === 'asc' ? 1 : -1;
    return (a[sortBy] - b[sortBy]) * factor;
  });

  // Переключение сортировки
  const toggleSort = (field: 'usagePercentage' | 'price' | 'weight') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Статистика использования мышек</h1>
          <div className="flex items-center text-textGray">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">›</span>
            <Link to="/tools" className="hover:text-primary">Инструменты</Link>
            <span className="mx-2">›</span>
            <span>Статистика</span>
          </div>
        </div>

        {/* Описание инструмента */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-start">
            <ChartBarIcon className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Статистика использования мышек профессионалами</h2>
              <p className="text-gray-600">
                Узнайте, какие мышки наиболее популярны среди профессиональных игроков в различных киберспортивных дисциплинах.
                Данные собраны на основе анализа сетапов более 1000 профессиональных игроков.
              </p>
            </div>
          </div>
        </div>

        {/* Фильтры и сортировка */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Выберите игру</h3>
              <div className="flex flex-wrap gap-2">
                {games.map(game => (
                  <button
                    key={game.id}
                    className={`px-4 py-2 rounded-full border ${
                      selectedGame === game.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                    onClick={() => setSelectedGame(game.id)}
                  >
                    <span className="mr-2">{game.icon}</span>
                    {game.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Сортировка</h3>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg border ${
                    sortBy === 'usagePercentage'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                  onClick={() => toggleSort('usagePercentage')}
                >
                  По популярности {sortBy === 'usagePercentage' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  className={`px-4 py-2 rounded-lg border ${
                    sortBy === 'price'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                  onClick={() => toggleSort('price')}
                >
                  По цене {sortBy === 'price' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  className={`px-4 py-2 rounded-lg border ${
                    sortBy === 'weight'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                  onClick={() => toggleSort('weight')}
                >
                  По весу {sortBy === 'weight' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Рейтинг</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Мышка</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500">Популярность</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500">Игроков</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500">Вес</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500">Форма</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500">Подключение</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500">Цена</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {sortedMice.map((mouse, index) => (
                  <tr key={mouse.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-bold text-gray-900">{index + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img src={mouse.image} alt={mouse.name} className="w-12 h-12 object-contain mr-3" />
                        <div>
                          <div className="font-bold text-gray-900">{mouse.brand}</div>
                          <div>{mouse.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="font-bold text-primary">{mouse.usagePercentage}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${mouse.usagePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <UserGroupIcon className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{mouse.proPlayers}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">{mouse.weight} г</td>
                    <td className="py-4 px-4 text-center">
                      {mouse.shape === 'Ergonomic' ? 'Эргономичная' : 'Амбидекстр'}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {mouse.connection === 'Wireless' ? 'Беспроводная' : 'Проводная'}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-primary">{mouse.price.toLocaleString()} ₽</td>
                    <td className="py-4 px-4 text-center">
                      <Link 
                        to={`/product/${mouse.id}`}
                        className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                      >
                        Купить
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Тренды и инсайты */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-start mb-4">
            <ArrowTrendingUpIcon className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
            <h3 className="text-lg font-bold text-gray-900">Тренды и инсайты</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Беспроводные мышки доминируют</h4>
              <p className="text-gray-600">
                Более 85% профессиональных игроков в {games.find(g => g.id === selectedGame)?.name} 
                используют беспроводные мышки. Современные технологии устранили задержки, 
                которые раньше были проблемой для беспроводных устройств.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Легкий вес в приоритете</h4>
              <p className="text-gray-600">
                Средний вес мышки среди топ-10 моделей составляет всего 62 грамма. 
                Более легкие мышки позволяют игрокам быстрее перемещать курсор и меньше уставать 
                во время длительных игровых сессий.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Форма имеет значение</h4>
              <p className="text-gray-600">
                Амбидекстерные мышки (симметричной формы) более популярны среди профессионалов, 
                особенно в шутерах от первого лица. Они составляют около 70% от всех используемых моделей.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Сенсоры высокого класса</h4>
              <p className="text-gray-600">
                Все топовые мышки оснащены сенсорами высокого класса с разрешением от 16000 DPI и выше, 
                хотя большинство профессионалов играют на гораздо более низких настройках DPI, 
                обычно в диапазоне 400-1600.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MouseStatsPage; 