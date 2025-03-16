import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScaleIcon, PlusIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface MouseSpec {
  id: number;
  name: string;
  brand: string;
  image: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  sensor: string;
  dpi: number;
  pollingRate: number;
  buttons: number;
  connection: 'Wired' | 'Wireless' | 'Both';
  battery?: string;
  price: number;
}

// Моковые данные для мышек
const mockMice: MouseSpec[] = [
  {
    id: 1,
    name: 'DeathAdder V3 Pro',
    brand: 'Razer',
    image: 'https://maxgaming.com/img/cms/Razer/DeathAdder%20V3%20Pro/Razer_DeathAdder_V3_Pro_White_1.jpg',
    weight: 63,
    dimensions: {
      length: 128,
      width: 68,
      height: 44
    },
    sensor: 'Focus Pro 30K',
    dpi: 30000,
    pollingRate: 1000,
    buttons: 5,
    connection: 'Wireless',
    battery: '90 часов',
    price: 12900
  },
  {
    id: 2,
    name: 'G Pro X Superlight',
    brand: 'Logitech',
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
    weight: 63,
    dimensions: {
      length: 125,
      width: 63.5,
      height: 40
    },
    sensor: 'HERO 25K',
    dpi: 25600,
    pollingRate: 1000,
    buttons: 5,
    connection: 'Wireless',
    battery: '70 часов',
    price: 11900
  },
  {
    id: 3,
    name: 'Viper V2 Pro',
    brand: 'Razer',
    image: 'https://maxgaming.com/img/cms/Razer/Viper%20V2%20Pro/Razer_Viper_V2_Pro_White_1.jpg',
    weight: 58,
    dimensions: {
      length: 126.8,
      width: 57.6,
      height: 37.8
    },
    sensor: 'Focus Pro 30K',
    dpi: 30000,
    pollingRate: 1000,
    buttons: 5,
    connection: 'Wireless',
    battery: '80 часов',
    price: 13900
  },
  {
    id: 4,
    name: 'Pulsar X2 Mini',
    brand: 'Pulsar',
    image: 'https://maxgaming.com/img/cms/Pulsar/Pulsar_X2_Mini_Wireless_Red_1.jpg',
    weight: 55,
    dimensions: {
      length: 114,
      width: 59,
      height: 38
    },
    sensor: 'PAW3395',
    dpi: 26000,
    pollingRate: 1000,
    buttons: 5,
    connection: 'Wireless',
    battery: '70 часов',
    price: 9900
  },
  {
    id: 5,
    name: 'Zowie EC2-C',
    brand: 'Zowie',
    image: 'https://maxgaming.com/img/cms/Zowie/EC2-C/Zowie_EC2-C_1.jpg',
    weight: 73,
    dimensions: {
      length: 120,
      width: 64,
      height: 40
    },
    sensor: '3360',
    dpi: 3200,
    pollingRate: 1000,
    buttons: 5,
    connection: 'Wired',
    price: 7900
  }
];

const MouseComparisonPage: React.FC = () => {
  const [selectedMice, setSelectedMice] = useState<MouseSpec[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const handleAddMouse = (mouse: MouseSpec) => {
    if (selectedMice.length < 4 && !selectedMice.some(m => m.id === mouse.id)) {
      setSelectedMice([...selectedMice, mouse]);
    }
    setShowSelector(false);
  };

  const handleRemoveMouse = (mouseId: number) => {
    setSelectedMice(selectedMice.filter(mouse => mouse.id !== mouseId));
  };

  const handleClearAll = () => {
    setSelectedMice([]);
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Сравнение мышек</h1>
          <div className="flex items-center text-textGray">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">›</span>
            <Link to="/tools" className="hover:text-primary">Инструменты</Link>
            <span className="mx-2">›</span>
            <span>Сравнение</span>
          </div>
        </div>

        {/* Описание инструмента */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-start">
            <ScaleIcon className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Сравните характеристики мышек</h2>
              <p className="text-gray-600">
                Выберите до 4 мышек для детального сравнения их технических характеристик, размеров, веса и других параметров.
                Это поможет вам сделать правильный выбор при покупке.
              </p>
            </div>
          </div>
        </div>

        {/* Панель выбора мышек */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Выбранные мышки</h3>
            <div className="flex space-x-4">
              <button 
                onClick={handleClearAll}
                className="text-primary hover:text-primary/80 text-sm flex items-center"
                disabled={selectedMice.length === 0}
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Очистить все
              </button>
              <button 
                onClick={() => setShowSelector(!showSelector)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Добавить мышку
              </button>
            </div>
          </div>

          {/* Селектор мышек */}
          {showSelector && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockMice.filter(mouse => !selectedMice.some(m => m.id === mouse.id)).map(mouse => (
                  <div 
                    key={mouse.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary cursor-pointer"
                    onClick={() => handleAddMouse(mouse)}
                  >
                    <img src={mouse.image} alt={mouse.name} className="w-16 h-16 object-contain mr-3" />
                    <div>
                      <div className="font-medium">{mouse.brand} {mouse.name}</div>
                      <div className="text-sm text-gray-500">{mouse.weight}г • {mouse.connection}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Выбранные мышки */}
          {selectedMice.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Выберите мышки для сравнения</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left font-medium text-gray-500 w-1/5">Характеристика</th>
                    {selectedMice.map(mouse => (
                      <th key={mouse.id} className="py-3 px-4 text-center relative">
                        <button 
                          onClick={() => handleRemoveMouse(mouse.id)}
                          className="absolute top-0 right-0 text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                        <img src={mouse.image} alt={mouse.name} className="h-24 mx-auto object-contain mb-2" />
                        <div className="font-bold text-gray-900">{mouse.brand}</div>
                        <div className="font-medium">{mouse.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Вес</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">{mouse.weight} г</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Размеры (Д×Ш×В)</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">
                        {mouse.dimensions.length} × {mouse.dimensions.width} × {mouse.dimensions.height} мм
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Сенсор</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">{mouse.sensor}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">DPI</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">{mouse.dpi.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Частота опроса</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">{mouse.pollingRate} Гц</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Кнопки</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">{mouse.buttons}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Подключение</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">{mouse.connection}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Батарея</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">{mouse.battery || '—'}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-500">Цена</td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center font-bold text-primary">{mouse.price.toLocaleString()} ₽</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4"></td>
                    {selectedMice.map(mouse => (
                      <td key={mouse.id} className="py-3 px-4 text-center">
                        <Link 
                          to={`/product/${mouse.id}`}
                          className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                        >
                          Купить
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MouseComparisonPage; 