import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CartIcon from './icons/CartIcon';
import SearchBar from './SearchBar';
import ToolsDropdown from './ToolsDropdown';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Мышки', path: '/catalog/mice' },
    { title: 'Коврики', path: '/catalog/mousepads' },
    { title: 'Клавиатуры', path: '/catalog/keyboards' },
    { title: 'Гайды/Грипсы', path: '/catalog/grips' },
    { title: 'Наушники', path: '/catalog/headsets' },
    { title: 'Микрофоны', path: '/catalog/microphones' },
    { title: 'Аксессуары', path: '/catalog/accessories' },
    { title: 'Медиа советуют', path: '/players', isSpecial: true },
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="bg-white z-40 relative">
      {/* Верхняя полоса */}
      <div className="bg-[#212121] text-white py-2">
        <div className="container flex justify-between items-center">
          <div className="flex flex-wrap items-center space-x-6">
            <Link to="/delivery" className="text-sm hover:text-gray-300">Доставка и оплата</Link>
            <Link to="/gift-cards" className="text-sm hover:text-gray-300">Подарочные карты</Link>
            <Link to="/help" className="text-sm hover:text-gray-300">Помощь в подборе</Link>
            <Link to="/contacts" className="text-sm hover:text-gray-300">Контакты</Link>
          </div>
          <div className="text-sm flex items-center">
            <span className="text-gray-400 mr-2">Есть вопросы? Звоните:</span>
            <a href="tel:+79213330701" className="font-medium hover:text-gray-300">+7 921 333 07 01</a>
          </div>
        </div>
      </div>
      
      {/* Основной заголовок */}
      <div className="container py-3">
        <div className="flex items-center gap-6">
          {/* Логотип */}
          <Link to="/" className="inline-block mr-8">
            <img src="/images/new-reship-logo.svg" alt="RESHIP" className="h-12" />
          </Link>

          {/* Поиск */}
          <div className="flex-grow">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Навигация справа */}
          <div className="flex items-center gap-[24px]">
            <Link to="/discount" className="text-[#212121] text-[16px] font-normal">Уцененные</Link>
            <Link to="/blog" className="text-[#212121] text-[16px] font-normal">Блог</Link>
            
            <div className="relative">
              <button 
                className="flex items-center py-[7px] px-[14px] border-2 border-[#4993FF] rounded-[10px] text-[#4993FF] font-semibold text-[14px]"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
              >
                <span>Инструменты</span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              
              {isToolsOpen && (
                <ToolsDropdown onClose={() => setIsToolsOpen(false)} />
              )}
            </div>
            
            {/* Корзина с счетчиком */}
            <Link to="/cart" className="relative">
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <CartIcon className="h-[29px] w-[29px] text-[#096DFF]" />
                <span className="absolute -top-[2px] -right-[2px] w-[17px] h-[17px] bg-[#096DFF] text-white text-[10px] rounded-full flex items-center justify-center font-normal">9+</span>
              </div>
            </Link>
            
            {/* Профиль */}
            <div className="relative">
              <Link to={isLoggedIn ? "/account" : "/login"}>
                <div className="w-[30px] h-[30px] flex items-center justify-center">
                  <UserIcon className="h-[25px] w-[29px] text-[#096DFF]" />
                </div>
              </Link>
            </div>
            
            {/* Мобильное меню */}
            <button 
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-secondary" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Навигация по категориям */}
      <div className="bg-[#E3E7F0] py-[12px]">
        <div className="container">
          <nav>
            <div className="flex items-start justify-start space-x-8 w-full overflow-x-auto hide-scrollbar">
              <Link to="/catalog/mice" className="relative">
                <div className="font-bold text-[16px] text-[#212121] whitespace-nowrap">
                  Мышки
                </div>
              </Link>
              
              <Link to="/catalog/mousepads" className="relative">
                <div className="font-bold text-[16px] text-[#212121] whitespace-nowrap">
                  Коврики
                </div>
              </Link>
              
              <Link to="/catalog/keyboards" className="relative">
                <div className="font-bold text-[16px] text-[#212121] whitespace-nowrap">
                  Клавиатуры
                </div>
              </Link>
              
              <Link to="/catalog/grips" className="relative">
                <div className="font-bold text-[16px] text-[#212121] whitespace-nowrap">
                  Глайды/Грипсы
                </div>
              </Link>
              
              <Link to="/catalog/headsets" className="relative">
                <div className="font-bold text-[16px] text-[#212121] whitespace-nowrap">
                  Наушники
                </div>
              </Link>
              
              <Link to="/catalog/microphones" className="relative">
                <div className="font-bold text-[16px] text-[#212121] whitespace-nowrap">
                  Микрофоны
                </div>
              </Link>
              
              <Link to="/catalog/accessories" className="relative">
                <div className="font-bold text-[16px] text-[#212121] whitespace-nowrap">
                  Аксессуары
                </div>
              </Link>
              
              <Link to="/players" className="relative">
                <div className="font-bold text-[16px] text-[#096DFF] whitespace-nowrap">
                  Медиа советуют
                </div>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 border-t border-gray-200">
          <div className="container">
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  className={`block py-2 ${item.isSpecial ? 'text-[#096DFF]' : 'text-[#212121]'} hover:opacity-80 transition-opacity`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;