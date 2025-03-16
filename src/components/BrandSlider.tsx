import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const BrandSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Моковые данные для брендов
  const brands = [
    { id: 1, name: 'Logitech', logo: 'https://maxgaming.com/img/cms/Logitech/Logitech_Logo.jpg' },
    { id: 2, name: 'Varmilo', logo: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Logo.jpg' },
    { id: 3, name: 'Ducky', logo: 'https://maxgaming.com/img/cms/Ducky/Ducky_Logo.jpg' },
    { id: 4, name: 'Glorious', logo: 'https://maxgaming.com/img/cms/Glorious/Glorious_Logo.jpg' },
    { id: 5, name: 'Artisan', logo: 'https://maxgaming.com/img/cms/Artisan/Artisan_Logo.jpg' },
    { id: 6, name: 'Finalmouse', logo: 'https://maxgaming.com/img/cms/Finalmouse/Finalmouse_Logo.jpg' }
  ];
  
  // Вычисляем количество брендов на слайде в зависимости от размера экрана
  const getBrandsPerSlide = useCallback(() => {
    // Используем window.innerWidth, но предоставляем запасной вариант для SSR
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    if (width < 640) return 2; // мобильный - 2 бренда в ряду
    if (width < 768) return 3; // маленький планшет - 3 бренда
    if (width < 1024) return 4; // планшет - 4 бренда
    return 6; // десктоп - 6 брендов
  }, []);
  
  const [brandsPerSlide, setBrandsPerSlide] = useState(getBrandsPerSlide());
  const [totalSlides, setTotalSlides] = useState(Math.ceil(brands.length / brandsPerSlide));
  
  // Обновляем количество брендов при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      const newBrandsPerSlide = getBrandsPerSlide();
      setBrandsPerSlide(newBrandsPerSlide);
      setTotalSlides(Math.ceil(brands.length / newBrandsPerSlide));
      
      // Корректируем текущий слайд, если выходит за границы нового количества слайдов
      if (currentSlide >= Math.ceil(brands.length / newBrandsPerSlide)) {
        setCurrentSlide(Math.ceil(brands.length / newBrandsPerSlide) - 1);
      }
    };
    
    // Добавляем слушатель при монтировании
    window.addEventListener('resize', handleResize);
    
    // Удаляем слушатель при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getBrandsPerSlide, brands.length, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-secondary font-century">Популярные бренды</h2>
        
        <div className="relative">
          {/* Карусель */}
          <div className="overflow-hidden">
            <div 
              className="flex space-x-3 md:space-x-4 lg:space-x-6 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {brands.map((brand) => (
                <div 
                  key={brand.id} 
                  className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 flex-shrink-0 px-1 sm:px-2"
                >
                  <Link to={`/brands/${brand.name.toLowerCase()}`} className="block">
                    <div className="border border-lightGray rounded-lg p-3 sm:p-4 md:p-6 text-center hover:border-primary hover:shadow-md transition-all group">
                      <div className="h-10 sm:h-12 md:h-16 flex items-center justify-center mb-2 md:mb-3">
                        <img 
                          src={brand.logo} 
                          alt={brand.name} 
                          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-textGray group-hover:text-primary transition-colors">бренды</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* Кнопки навигации */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 md:-translate-x-4 bg-white rounded-full p-1 md:p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous brands"
          >
            <ChevronLeftIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-secondary" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 md:translate-x-4 bg-white rounded-full p-1 md:p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next brands"
          >
            <ChevronRightIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-secondary" />
          </button>
        </div>
        
        {/* Индикаторы слайдов */}
        <div className="flex justify-center mt-4 md:mt-6 lg:mt-8 space-x-1.5 md:space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all ${
                currentSlide === index ? 'w-6 md:w-8 bg-primary' : 'w-1.5 md:w-2 bg-lightGray'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider; 