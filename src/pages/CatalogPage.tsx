import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Squares2X2Icon, ListBulletIcon, ChevronRightIcon, ChevronDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';
import { getBannerByCategory } from '../data/promoBanners';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  popularity: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  inStock?: boolean;
  colors?: Array<{ id: number | string, name: string, hex: string }>;
  isPreorder?: boolean;
}

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortValue, setSortValue] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Получение текста для сортировки
  const getSortText = () => {
    switch (sortValue) {
      case 'popularity':
        return 'По популярности';
      case 'price-asc':
        return 'По цене (возр.)';
      case 'price-desc':
        return 'По цене (убыв.)';
      default:
        return 'По популярности';
    }
  };

  // Моковые данные товаров
  const products: Product[] = [
    {
      id: 1,
      title: 'Sora v2 Superlight Wireless Gaming Mouse',
      brand: 'Sora',
      price: 15000,
      popularity: 80,
      rating: 4.0,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
      inStock: true
    },
    {
      id: 2,
      title: 'Varmilo Koi — Overshadow the Flowers',
      brand: 'Varmilo',
      price: 8000,
      oldPrice: 15000,
      popularity: 95,
      rating: 4.3,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
      discount: 47,
      inStock: true
    },
    {
      id: 3,
      title: 'Sora v2 Superlight Wireless Gaming Mouse',
      brand: 'Sora',
      price: 15000,
      popularity: 75,
      rating: 4.0,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
      inStock: true
    },
    {
      id: 4,
      title: 'WLmouse Beast X Max 8K',
      brand: 'WLmouse',
      price: 10299,
      popularity: 65,
      rating: 4.5,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg',
      isNew: true,
      inStock: true
    },
    {
      id: 5,
      title: 'Varmilo Koi — Overshadow the Flowers',
      brand: 'Varmilo',
      price: 8000,
      oldPrice: 15000,
      popularity: 92,
      rating: 4.3,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
      discount: 47,
      inStock: true
    },
    {
      id: 6,
      title: 'WLmouse Beast X Max 8K',
      brand: 'WLmouse',
      price: 10299,
      popularity: 68,
      rating: 4.5,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg',
      isNew: true,
      inStock: true
    },
    {
      id: 7,
      title: 'Sora v2 Superlight Wireless Gaming Mouse',
      brand: 'Sora',
      price: 15000,
      popularity: 78,
      rating: 4.0,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
      inStock: true
    },
    {
      id: 8,
      title: 'Varmilo Koi — Overshadow the Flowers',
      brand: 'Varmilo',
      price: 8000,
      oldPrice: 15000,
      popularity: 90,
      rating: 4.3,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
      discount: 47,
      inStock: true
    }
  ];

  // Сортировка товаров
  const sortedProducts = useMemo(() => {
    const copy = [...products];
    if (sortValue === 'price-asc') {
      return copy.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
      return copy.sort((a, b) => b.price - a.price);
    } else {
      return copy.sort((a, b) => b.popularity - a.popularity);
    }
  }, [sortValue, products]);

  // Определение заголовка в зависимости от категории
  const getCategoryTitle = () => {
    switch (category) {
      case 'mice':
        return 'Мыши';
      case 'keyboards':
        return 'Клавиатуры';
      case 'headsets':
        return 'Наушники';
      default:
        return 'Все товары';
    }
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    setIsFilterOpen(false);
    // Здесь будет логика фильтрации товаров
  };

  const handleClearFilters = () => {
    console.log('Filters cleared');
    // Здесь будет логика сброса фильтров
  };

  return (
    <main className="catalog-page bg-[#E3E7F0]">
      <div className="container py-6">
        {/* Хлебные крошки */}
        <div className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Главная</Link> 
          <ChevronRightIcon className="h-3 w-3 inline mx-1" />
          <span>{getCategoryTitle()}</span>
        </div>

        {/* Заголовок и количество товаров */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">{getCategoryTitle()}</h1>
          <span className="text-gray-600 text-sm font-medium">111 единиц товара</span>
        </div>
        
        {/* Рекламный баннер */}
        {category && (
          <PromoBanner 
            {...getBannerByCategory(category)}
          />
        )}
        
        {/* Панель управления (фильтры, сортировка, вид отображения) */}
        <div className="flex justify-between items-center mb-6">
          {/* Левая часть - количество товаров и фильтры */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 text-sm">111 единиц товара</span>
            </button>
          </div>
          
          {/* Правая часть - переключатель вида и сортировка */}
          <div className="flex items-center gap-4">
            {/* Переключатель вида */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Squares2X2Icon className={`h-5 w-5 ${viewMode === 'grid' ? 'text-white' : 'text-gray-600'}`} />
              </button>
              <button 
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <ListBulletIcon className={`h-5 w-5 ${viewMode === 'list' ? 'text-white' : 'text-gray-600'}`} />
              </button>
            </div>
            
            {/* Сортировка */}
            <div className="relative" ref={sortRef}>
              <button 
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-gray-50"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span className="text-gray-700">{getSortText()}</span>
                <ChevronDownIcon className={`h-4 w-4 text-gray-600 transition-transform ${isSortOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {/* Выпадающее меню сортировки */}
              {isSortOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${sortValue === 'popularity' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                    onClick={() => {
                      setSortValue('popularity');
                      setIsSortOpen(false);
                    }}
                  >
                    По популярности
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${sortValue === 'price-asc' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                    onClick={() => {
                      setSortValue('price-asc');
                      setIsSortOpen(false);
                    }}
                  >
                    По цене (возр.)
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${sortValue === 'price-desc' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                    onClick={() => {
                      setSortValue('price-desc');
                      setIsSortOpen(false);
                    }}
                  >
                    По цене (убыв.)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Сетка товаров - автоматически адаптируется для мобильных устройств */}
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${viewMode === 'list' ? '3' : '4'} gap-4 mb-8`}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              brand={product.brand}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              reviewCount={product.reviewCount}
              image={product.image}
              discount={product.discount}
              isNew={product.isNew}
              inStock={product.inStock}
              isPreorder={product.isPreorder}
              colors={product.colors}
            />
          ))}
        </div>
        
        {/* Пагинация */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <ChevronRightIcon className="h-5 w-5 text-gray-600 transform rotate-180" />
            </button>
            <button className="px-3 py-1 border border-blue-600 rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Панель фильтров */}
      {isFilterOpen && (
        <FilterPanel
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      )}
    </main>
  );
};

export default CatalogPage; 