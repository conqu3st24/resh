import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  inStock?: boolean;
  isPreorder?: boolean;
  colors?: Array<{ id: number, name: string, hex: string }>;
}

const RecentlyViewed: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Моковые данные для недавно просмотренных товаров
  const recentProducts: Product[] = [
    {
      id: 1,
      title: 'Hana Glass Mousepad',
      brand: 'Varmilo',
      price: 10299,
      rating: 4.2,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Mousepad_1.jpg',
      inStock: true,
      colors: [
        { id: 1, name: 'Black', hex: '#000000' },
        { id: 2, name: 'White', hex: '#FFFFFF' }
      ]
    },
    {
      id: 2,
      title: 'WLmouse Beast X Max 8K',
      brand: 'WLmouse',
      price: 10299,
      rating: 4.5,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg',
      inStock: true,
      isNew: true
    },
    {
      id: 3,
      title: 'Varmilo Koi — Overshadow the Flowers',
      brand: 'Varmilo',
      price: 8000,
      oldPrice: 15000,
      rating: 4.3,
      reviewCount: 60,
      image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
      discount: 47,
      inStock: true
    },
    {
      id: 4,
      title: 'HyperX Cloud Alpha S',
      brand: 'HyperX',
      price: 12499,
      rating: 4.7,
      reviewCount: 32,
      image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
      inStock: false,
      isPreorder: true
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === Math.max(0, Math.ceil(recentProducts.length / 4) - 1) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.max(0, Math.ceil(recentProducts.length / 4) - 1) : prev - 1
    );
  };

  return (
    <section className="py-12 md:py-16 bg-[#E3E7F0]">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-century tracking-tighter">Вы уже смотрели</h2>
          <Link to="/viewed" className="text-primary hover:text-lightBlue flex items-center text-sm font-medium transition-colors">
            Смотреть все
            <ChevronRightIcon className="h-5 w-5 ml-1" />
          </Link>
        </div>
        
        {/* Индикаторы */}
        <div className="flex space-x-2 mb-8">
          <div className="w-24 h-1 bg-primary rounded-full"></div>
          <div className="w-12 h-1 bg-lightGray rounded-full"></div>
          <div className="w-12 h-1 bg-lightGray rounded-full"></div>
        </div>
        
        <div className="relative">
          {/* Карусель */}
          <div className="overflow-hidden">
            <div 
              className="flex -mx-3 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {recentProducts.map((product) => (
                <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 flex-shrink-0 h-full">
                  <ProductCard
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
                    className="h-full"
                  />
                </div>
              ))}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 flex-shrink-0">
                <div className="flex items-center justify-center h-full rounded-lg p-8 border border-lightGray shadow-sm hover:shadow-md transition-shadow bg-white min-h-[400px]">
                  <Link to="/viewed" className="text-primary hover:text-lightBlue font-medium text-center flex flex-col items-center">
                    <ChevronRightIcon className="h-10 w-10 mb-2 border-2 border-primary rounded-full p-1" />
                    <span>Смотреть все</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Кнопки навигации */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Предыдущие товары"
          >
            <ChevronLeftIcon className="h-6 w-6 text-secondary" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Следующие товары"
          >
            <ChevronRightIcon className="h-6 w-6 text-secondary" />
          </button>
        </div>
        
        {/* Индикаторы слайдов */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(recentProducts.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? 'w-8 bg-primary' : 'w-2 bg-lightGray'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed; 