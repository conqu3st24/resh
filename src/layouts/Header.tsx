import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ClockIcon, FireIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

// Import logo 
// Путь к новому логотипу
const logoPath = '/images/new-reship-logo.svg';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentHotSlide, setCurrentHotSlide] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Мышки', path: '/catalog/mice' },
    { title: 'Коврики', path: '/catalog/mousepads' },
    { title: 'Клавиатуры', path: '/catalog/keyboards' },
    { title: 'Гайды/Грипсы', path: '/catalog/grips' },
    { title: 'Наушники', path: '/catalog/headsets' },
    { title: 'Микрофоны', path: '/catalog/microphones' },
    { title: 'Аксессуары', path: '/catalog/accessories' },
    { title: 'Медиа советуют', path: '/players' },
  ];

  // Mock data for search history
  const searchHistory = [
    { id: 1, text: 'Ergohaven Planeta V2 Galaxy Black', price: 8200 },
    { id: 2, text: 'Hana Glass Mousepad', price: 8200 },
    { id: 3, text: 'Varmilo Koi — Overshadow the Flowers', price: 8200 },
  ];
  
  // Mock data for popular categories
  const popularCategories = [
    { id: 1, name: 'Клавиатуры' },
    { id: 2, name: 'Мышки' },
    { id: 3, name: 'Коврики' },
    { id: 4, name: 'Мышки' },
    { id: 5, name: 'Клавиатуры' },
    { id: 6, name: 'Мышки' },
  ];
  
  // Mock data for hot products - adding more products for multiple slides
  const hotProducts = [
    { 
      id: 1, 
      name: 'Corsair HS80 RGB USB Gaming Headset 7.1 - Carbon', 
      price: 8200,
      image: 'https://maxgaming.com/img/cms/Corsair/hs80/Corsair_HS80_Carbon_1.jpg'
    },
    { 
      id: 2, 
      name: 'Corsair HS80 RGB Carbon', 
      price: 8200,
      image: 'https://maxgaming.com/img/cms/Corsair/hs80/Corsair_HS80_Carbon_1.jpg'
    },
    { 
      id: 3, 
      name: 'Logitech G Pro X Superlight', 
      price: 9400,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20Pro%20X%20Superlight/Logitech_G_Pro_X_Superlight_Wireless_Mouse_1.jpg'
    },
    { 
      id: 4, 
      name: 'Artisan Ninja FX Zero XSoft XL', 
      price: 5800,
      image: 'https://maxgaming.com/img/cms/Artisan/Zero/Artisan_Zero_Soft_XL_Black_1.jpg'
    },
    { 
      id: 5, 
      name: 'Varmilo VA88M Sakura', 
      price: 12200,
      image: 'https://maxgaming.com/img/cms/Varmilo/VA88M/Varmilo_VA88M_Sakura_1.jpg'
    },
    { 
      id: 6, 
      name: 'Ducky One 3 Mini', 
      price: 10800,
      image: 'https://maxgaming.com/img/cms/Ducky/One%203%20Mini/Ducky_One_3_Mini_Daybreak_1.jpg'
    },
  ];

  // Calculate total number of slides (2 products per slide)
  const productsPerSlide = 2;
  const totalHotSlides = Math.ceil(hotProducts.length / productsPerSlide);

  // Functions to navigate between slides
  const nextHotSlide = () => {
    setCurrentHotSlide((prev) => (prev === totalHotSlides - 1 ? 0 : prev + 1));
  };

  const prevHotSlide = () => {
    setCurrentHotSlide((prev) => (prev === 0 ? totalHotSlides - 1 : prev - 1));
  };

  // Get current products to display
  const getCurrentProducts = () => {
    const startIndex = currentHotSlide * productsPerSlide;
    return hotProducts.slice(startIndex, startIndex + productsPerSlide);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchActive(false);
    console.log('Search for:', searchQuery);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Верхняя полоса с контактами */}
      <div className="bg-secondary text-white py-2">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex overflow-x-auto pb-1 md:pb-0 md:overflow-visible w-full md:w-auto space-x-4 md:space-x-6 text-center md:text-left">
            <Link to="/delivery" className="text-xs md:text-sm whitespace-nowrap hover:text-gray-300 font-roboto">Доставка и оплата</Link>
            <Link to="/gift-cards" className="text-xs md:text-sm whitespace-nowrap hover:text-gray-300 font-roboto">Подарочные карты</Link>
            <Link to="/help" className="text-xs md:text-sm whitespace-nowrap hover:text-gray-300 font-roboto">Помощь в подборе</Link>
            <Link to="/contacts" className="text-xs md:text-sm whitespace-nowrap hover:text-gray-300 font-roboto">Контакты</Link>
          </div>
          <div className="text-xs md:text-sm font-roboto mt-1 md:mt-0">
            Есть вопросы? Звоните: <a href="tel:+79213330701" className="font-medium">+7 921 333 07 01</a>
          </div>
        </div>
      </div>
      
      {/* Основная часть шапки */}
      <div className="container py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <Link to="/" className="flex items-center">
            <img src={logoPath} alt="RESHIP" className="h-8 md:h-10" />
          </Link>

          {/* Мобильная кнопка поиска */}
          <button 
            className="md:hidden mr-2 p-2" 
            onClick={() => setIsSearchActive(!isSearchActive)}
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-secondary" />
          </button>

          {/* Поиск - десктоп */}
          <div className="relative w-1/3 hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Я ищу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </button>
            </form>
            
            {/* Search dropdown */}
            {isSearchActive && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                {/* Popular categories */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center text-primary font-medium mb-3">
                    <span className="mr-2">Популярные разделы</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {popularCategories.map(category => (
                      <Link 
                        key={category.id}
                        to={`/catalog/${category.name.toLowerCase()}`}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Search history */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-primary font-medium">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>История</span>
                    </div>
                    <button className="text-xs text-blue-500 hover:underline">Очистить</button>
                  </div>
                  <div className="space-y-3">
                    {searchHistory.map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm">{item.text}</span>
                        </div>
                        <span className="text-sm font-inter font-semibold">{item.price} ₽</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hot products with interactive slider */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-primary font-medium">
                      <FireIcon className="h-5 w-5 mr-2" />
                      <span>Хиты</span>
                    </div>
                    
                    {/* Interactive progress bar */}
                    <div className="flex items-center">
                      <button 
                        onClick={prevHotSlide}
                        className="mr-2 text-gray-500 hover:text-primary transition-colors focus:outline-none"
                        aria-label="Previous hot products"
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </button>
                      
                      <div className="w-24 h-2 bg-gray-200 rounded-full flex overflow-hidden">
                        {Array.from({ length: totalHotSlides }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentHotSlide(index)}
                            className={`h-full transition-all ${
                              currentHotSlide === index 
                                ? 'bg-primary flex-grow' 
                                : 'bg-gray-300 flex-grow-0 w-4 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                      
                      <button 
                        onClick={nextHotSlide}
                        className="ml-2 text-gray-500 hover:text-primary transition-colors focus:outline-none"
                        aria-label="Next hot products"
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Products container with transition */}
                  <div className="grid grid-cols-2 gap-4 relative">
                    {getCurrentProducts().map(product => (
                      <div 
                        key={product.id} 
                        className="flex items-center space-x-2 transition-all duration-300 ease-in-out"
                      >
                        <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded" />
                        <div>
                          <div className="text-xs line-clamp-2">{product.name}</div>
                          <div className="text-sm font-inter font-semibold">{product.price} ₽</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Правая часть шапки */}
          {/* Навигация справа */}
          <div className="flex items-center space-x-6">
            <Link to="/sale" className="text-secondary hover:text-primary hidden md:inline font-roboto">Уцененные</Link>
            <Link to="/blog" className="text-secondary hover:text-primary hidden md:inline font-roboto">Блог</Link>
            
            {/* Инструменты */}
            <div className="relative group hidden md:block">
              <button className="flex items-center text-primary hover:text-lightBlue font-roboto">
                <span>Инструменты</span>
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            {/* Иконки */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <img src="/images/shopping-basket.svg" alt="Корзина" className="h-6 w-6 text-secondary hover:text-primary" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              
              {isLoggedIn ? (
                <div className="relative group">
                  <Link to="/account">
                    <UserIcon className="h-6 w-6 text-secondary hover:text-primary" />
                  </Link>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                      <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Мой аккаунт
                      </Link>
                      <Link to="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Заказы
                      </Link>
                      <Link to="/account/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Избранное
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Выйти
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <UserIcon className="h-6 w-6 text-secondary hover:text-primary" />
                </Link>
              )}
              
              {/* Burger menu for mobile */}
              <button
                className="md:hidden focus:outline-none"
                onClick={toggleMenu}
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
        
        {/* Main menu */}
        <nav className="hidden md:block mt-4">
          <style>
            {`
              .header-nav-menu {
                display: flex;
                justify-content: center;
                flex-wrap: nowrap;
                width: 100%;
              }
              .header-nav-item {
                margin: 0;
                padding: 0;
                display: inline-block;
              }
              .header-nav-link {
                font-size: 14px;
                white-space: nowrap;
                padding: 2px 1px !important;
                margin: 0 !important;
                letter-spacing: -0.02em;
              }
            `}
          </style>
          <div className="header-nav-menu" style={{columnGap: '8px'}}>
            {menuItems.map((item, index) => (
              <div key={index} className="header-nav-item">
                <Link
                  to={item.path}
                  className={classNames(
                    "text-secondary hover:text-primary header-nav-link",
                    { "border-b-2 border-primary text-primary": index === 0 }
                  )}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
      
      {/* Mobile search panel */}
      {isSearchActive && !isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 border-t border-gray-200">
          <div className="container">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Я ищу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full"
                  autoFocus
                />
                <button 
                  type="button" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsSearchActive(false)}
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
                </button>
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
            
            {/* Popular categories */}
            <div className="mb-4">
              <div className="font-medium text-sm mb-2">Популярные разделы</div>
              <div className="flex flex-wrap gap-1">
                {popularCategories.slice(0, 4).map(category => (
                  <Link 
                    key={category.id}
                    to={`/catalog/${category.name.toLowerCase()}`}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-50"
                    onClick={() => setIsSearchActive(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Hot products */}
            <div>
              <div className="font-medium text-sm mb-2 flex items-center">
                <FireIcon className="h-4 w-4 mr-1 text-red-500" />
                <span>Хиты</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {hotProducts.slice(0, 2).map(product => (
                  <Link 
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-start space-x-1"
                    onClick={() => setIsSearchActive(false)}
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <div className="text-xs line-clamp-2">{product.name}</div>
                      <div className="text-xs font-semibold">{product.price} ₽</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 border-t border-gray-200">
          <div className="container">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Я ищу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
            
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="block py-2 text-secondary hover:text-primary font-medium text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/sale"
                  className="block py-2 text-secondary hover:text-primary font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Уцененные
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="block py-2 text-secondary hover:text-primary font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="block py-2 text-primary font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Инструменты
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 