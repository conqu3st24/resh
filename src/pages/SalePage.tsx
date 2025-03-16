import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Squares2X2Icon, ListBulletIcon, ChevronRightIcon, TagIcon } from '@heroicons/react/24/outline';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';
import { getBannerByCategory } from '../data/promoBanners';

interface SaleProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice: number;
  popularity: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount: number;
  inStock: boolean;
  condition: 'opened' | 'display' | 'refurbished' | 'damaged';
  conditionDescription?: string;
}

const SalePage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortValue, setSortValue] = useState<'discount' | 'price-asc' | 'price-desc'>('discount');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [conditionFilter, setConditionFilter] = useState<string[]>([]);

  // Моковые данные товаров
  const products: SaleProduct[] = [
    {
      id: 1,
      title: 'Sora v2 Superlight Wireless Gaming Mouse',
      brand: 'Sora',
      price: 10500,
      oldPrice: 15000,
      popularity: 80,
      rating: 4.0,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
      discount: 30,
      inStock: true,
      condition: 'opened',
      conditionDescription: 'Товар из открытой упаковки. Полностью рабочий, незначительные следы использования.'
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
      inStock: true,
      condition: 'display',
      conditionDescription: 'Витринный образец. Полностью рабочий, минимальные признаки использования.'
    },
    {
      id: 3,
      title: 'Logitech G Pro X Superlight',
      brand: 'Logitech',
      price: 9000,
      oldPrice: 15000,
      popularity: 75,
      rating: 4.0,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
      discount: 40,
      inStock: true,
      condition: 'refurbished',
      conditionDescription: 'Восстановленный товар. Заменена боковая панель, полностью рабочий.'
    },
    {
      id: 4,
      title: 'WLmouse Beast X Max 8K Pink',
      brand: 'WLmouse',
      price: 6999,
      oldPrice: 10299,
      popularity: 65,
      rating: 4.5,
      reviewCount: 60,
      image: 'https://images.maxgaming.com/data/product/RGB2f/finalmouse_starlight-12_phantom_small1.jpg',
      discount: 32,
      inStock: true,
      condition: 'opened',
      conditionDescription: 'Возврат покупателя. Полностью рабочий, без следов использования.'
    },
    {
      id: 5,
      title: 'Keychron Q1 Pro',
      brand: 'Keychron',
      price: 9999,
      oldPrice: 15999,
      popularity: 92,
      rating: 4.3,
      reviewCount: 60,
      image: 'https://keychron.com/cdn/shop/files/Keychron-Q1-Pro-hot-swappable-knob-keyboard-navy-blue-with-keycaps_600x600.jpg',
      discount: 37,
      inStock: true,
      condition: 'display',
      conditionDescription: 'Витринный образец. Полностью рабочий, незначительные потертости на корпусе.'
    },
    {
      id: 6,
      title: 'HyperX Cloud Alpha Wireless',
      brand: 'HyperX',
      price: 8900,
      oldPrice: 14900,
      popularity: 68,
      rating: 4.5,
      reviewCount: 60,
      image: 'https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/cloud-alpha-wireless/cloud-alpha-wireless-gallery-1.png',
      discount: 40,
      inStock: true,
      condition: 'damaged',
      conditionDescription: 'Небольшие царапины на корпусе. Полностью рабочий.'
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
      return copy.sort((a, b) => b.discount - a.discount);
    }
  }, [sortValue, products]);

  // Фильтрация по состоянию товара
  const filteredProducts = useMemo(() => {
    if (conditionFilter.length === 0) return sortedProducts;
    return sortedProducts.filter(product => conditionFilter.includes(product.condition));
  }, [sortedProducts, conditionFilter]);

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    setIsFilterOpen(false);
    // Здесь будет логика фильтрации товаров
    if (filters.condition) {
      setConditionFilter(filters.condition);
    }
  };

  const handleClearFilters = () => {
    console.log('Filters cleared');
    setConditionFilter([]);
  };

  return (
    <main className="catalog-page" style={{ backgroundColor: '#E3E7F0' }}>
      <div className="container py-6">
        {/* Хлебные крошки */}
        <div className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link> 
          <ChevronRightIcon className="h-3 w-3 inline mx-1" />
          <span>Уцененные товары</span>
        </div>

        {/* Заголовок и количество товаров */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Уцененные товары</h1>
          <span className="text-gray-600 text-sm font-medium">{products.length} единиц товара</span>
        </div>
        
        {/* Рекламный баннер */}
        <PromoBanner 
          {...getBannerByCategory('sale')}
        />
        
        {/* Панель управления (фильтры, сортировка, вид отображения) */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center gap-4">
          {/* Кнопка открытия фильтров */}
          <button 
            onClick={() => setIsFilterOpen(true)} 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Фильтры
          </button>
          
          {/* Быстрые фильтры состояния */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'opened', label: 'Открытая упаковка' },
              { value: 'display', label: 'Витринный образец' },
              { value: 'refurbished', label: 'Восстановленный' },
              { value: 'damaged', label: 'С дефектами' }
            ].map(condition => (
              <button
                key={condition.value}
                onClick={() => {
                  if (conditionFilter.includes(condition.value)) {
                    setConditionFilter(conditionFilter.filter(c => c !== condition.value));
                  } else {
                    setConditionFilter([...conditionFilter, condition.value]);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition-colors
                  ${conditionFilter.includes(condition.value)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <TagIcon className="h-4 w-4" />
                {condition.label}
              </button>
            ))}
          </div>
          
          {/* Переключатель вида */}
          <div className="ml-auto flex items-center">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden mr-4">
              <button 
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Squares2X2Icon className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <ListBulletIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Сортировка */}
            <div className="flex items-center">
              <select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="discount">По размеру скидки</option>
                <option value="price-asc">По цене (возр.)</option>
                <option value="price-desc">По цене (убыв.)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Сетка товаров */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 ${viewMode === 'list' ? 'lg:grid-cols-3' : ''}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-shadow duration-200">
              {/* Бейдж со скидкой */}
              <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}%
              </div>
              
              {/* Бейдж с состоянием товара */}
              <div className="absolute top-3 right-3 z-10 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                {{
                  'opened': 'Открытая упаковка',
                  'display': 'Витринный образец',
                  'refurbished': 'Восстановленный',
                  'damaged': 'С дефектами'
                }[product.condition]}
              </div>
              
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-48 relative">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors font-roboto">
                    {product.title}
                  </h3>
                  
                  {/* Рейтинг */}
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">{product.reviewCount}</span>
                  </div>
                  
                  {/* Цена */}
                  <div className="flex items-end gap-2">
                    <div className="font-bold current-price text-lg">{product.price.toLocaleString()} ₽</div>
                    <div className="old-price text-sm">{product.oldPrice.toLocaleString()} ₽</div>
                  </div>
                  
                  {/* Описание состояния */}
                  {product.conditionDescription && (
                    <div className="mt-2 text-xs text-gray-500">
                      {product.conditionDescription}
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-4 border-t border-gray-100">
                <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Пагинация */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <ChevronRightIcon className="h-5 w-5 text-gray-600 transform rotate-180" />
            </button>
            <button className="px-3 py-1 border border-primary rounded-md bg-primary text-white">1</button>
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

export default SalePage; 