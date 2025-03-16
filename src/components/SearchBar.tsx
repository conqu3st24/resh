import React, { useState, useRef, useEffect, FC } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { ClockIcon, FireIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// Интерфейс для истории просмотра
interface HistoryItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Популярные категории
  const popularCategories = [
    { title: 'Клавиатуры', path: '/catalog/keyboards' },
    { title: 'Мышки', path: '/catalog/mice' },
    { title: 'Коврики', path: '/catalog/mousepads' },
    { title: 'Мышки', path: '/catalog/mice' },
    { title: 'Клавиатуры', path: '/catalog/keyboards' },
    { title: 'Мышки', path: '/catalog/mice' },
    { title: 'Клавиатуры', path: '/catalog/keyboards' },
  ];
  
  // История просмотров
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: 1,
      title: 'Ergohaven Planeta V2 Galaxy Blac..',
      price: 8200,
      image: 'https://via.placeholder.com/300/E5E7EB/096DFF?text=Reship'
    },
    {
      id: 2,
      title: 'Hana Glass Mousepad',
      price: 8200,
      image: 'https://via.placeholder.com/300/E5E7EB/096DFF?text=Reship'
    },
    {
      id: 3,
      title: 'Varmilo Koi — Overshadow the Flo..',
      price: 8200,
      image: 'https://via.placeholder.com/300/E5E7EB/096DFF?text=Reship'
    }
  ]);
  
  // Хиты продаж
  const popularProducts = [
    {
      id: 1,
      title: 'HS80 RGB USB Gaming Headset 7.1 - Carbon',
      price: 8200,
      brand: 'Corsair',
      image: 'https://via.placeholder.com/300/E5E7EB/096DFF?text=Reship'
    },
    {
      id: 2,
      title: 'HS80 RGB USB Gaming Carbon',
      price: 8200,
      brand: 'Corsair',
      image: 'https://via.placeholder.com/300/E5E7EB/096DFF?text=Reship'
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
  
  const clearHistory = () => {
    setHistoryItems([]);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="box-sizing-border flex flex-col items-start p-[9px_13px] gap-[10px] w-[549px] h-[43px] bg-white border-2 border-[#646464] rounded-[10px]">
        <div className="flex flex-row justify-between items-center w-full">
          <input
            type="text"
            placeholder="Я ищу.."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full border-none outline-none text-[16px] font-medium text-[#5F5F5F] bg-transparent"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center w-[24px] h-[24px]"
          >
            <MagnifyingGlassIcon className="text-[#646464] w-[24px] h-[24px]" />
          </button>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-[#E3E7F0] z-50 w-[600px]">
          {/* Популярные разделы */}
          <div className="p-4 border-b border-[#E3E7F0]">
            <div className="flex items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#E3E7F0] p-2 rounded-md">
                  <StarIcon className="h-5 w-5 text-[#096DFF]" />
                </div>
                <span className="font-medium text-[#5F5F5F] text-lg">Популярные разделы</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category, index) => (
                <Link 
                  key={index} 
                  to={category.path}
                  className="px-4 py-2 border border-gray-300 rounded-full text-[#212121] text-sm hover:bg-[#E3E7F0] transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          {/* История */}
          {historyItems.length > 0 && (
            <div className="p-4 border-b border-[#E3E7F0]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#E3E7F0] p-2 rounded-md">
                    <ClockIcon className="h-5 w-5 text-[#096DFF]" />
                  </div>
                  <span className="font-medium text-[#5F5F5F] text-lg">История</span>
                </div>
                <button 
                  className="text-[#096DFF] flex items-center gap-1"
                  onClick={clearHistory}
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>Очистить</span>
                </button>
              </div>
              <div className="space-y-3">
                {historyItems.map((item) => (
                  <Link key={item.id} to={`/product/${item.id}`} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
                        <span className="text-[#212121]">{item.title}</span>
                      </div>
                    </div>
                    <span className="font-medium text-[#212121]">{item.price.toLocaleString()} ₽</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Хиты */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#E3E7F0] p-2 rounded-md">
                  <FireIcon className="h-5 w-5 text-[#096DFF]" />
                </div>
                <span className="font-medium text-[#5F5F5F] text-lg">Хиты</span>
              </div>
              <div className="bg-gray-700 h-2 w-24 rounded-full overflow-hidden">
                <div className="bg-gray-200 h-full w-1/3"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {popularProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="block">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center">
                      <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                      <div className="ml-3">
                        <div className="text-sm text-gray-500">{product.brand}</div>
                        <div className="text-sm font-medium">{product.title}</div>
                        <div className="font-medium mt-1">{product.price.toLocaleString()} ₽</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;