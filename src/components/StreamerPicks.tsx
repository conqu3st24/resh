import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface StreamerProduct {
  id: number;
  name: string;
  brand: string;
  image: string;
}

interface Streamer {
  id: number;
  name: string;
  nickname: string;
  image: string;
  products: StreamerProduct[];
}

const StreamerPicks: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Моковые данные для стримеров
  const streamers: Streamer[] = [
    {
      id: 1,
      name: 'Владимир Братишкин',
      nickname: 'Братишкин (тутутуу)',
      image: 'https://via.placeholder.com/400x500?text=Bratishkin',
      products: [
        {
          id: 101,
          name: 'Logitech G PRO X SUPERLIGHT',
          brand: 'Logitech',
          image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg'
        },
        {
          id: 102,
          name: 'HyperX Cloud Alpha',
          brand: 'HyperX',
          image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg'
        }
      ]
    },
    {
      id: 2,
      name: 'Evelone',
      nickname: 'Evelone192',
      image: 'https://via.placeholder.com/400x500?text=Evelone',
      products: [
        {
          id: 201,
          name: 'Logitech G PRO X Keyboard',
          brand: 'Logitech',
          image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg'
        },
        {
          id: 202,
          name: 'SteelSeries Arctis Pro',
          brand: 'SteelSeries',
          image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_White_1.jpg'
        }
      ]
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === streamers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? streamers.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary font-century tracking-tighter">Выбор стримеров</h2>
        </div>
        
        {/* Индикаторы */}
        <div className="flex space-x-2 mb-8">
          <div className="w-24 h-1 bg-primary rounded-full"></div>
          <div className="w-12 h-1 bg-lightGray rounded-full"></div>
          <div className="w-12 h-1 bg-lightGray rounded-full"></div>
        </div>
        
        <div className="relative">
          {/* Слайдер */}
          <div className="overflow-hidden">
            <div 
              className="flex -mx-4 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {streamers.map((streamer) => (
                <div key={streamer.id} className="w-full lg:w-1/2 px-4 flex-shrink-0">
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-primary to-lightBlue h-[340px]">
                    {/* Фоновое изображение - затемненное */}
                    <div className="absolute inset-0 opacity-30">
                      <img src={streamer.image} alt={streamer.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Контент */}
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white font-century">{streamer.name}</h3>
                        <p className="text-white/80 font-roboto">{streamer.nickname}</p>
                      </div>
                      
                      <div className="space-y-3 flex-grow">
                        {streamer.products.map((product) => (
                          <Link 
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="bg-white/10 p-3 rounded flex items-center hover:bg-white/20 transition-colors"
                          >
                            <div className="rounded bg-white shadow-sm p-1 w-14 h-14 flex items-center justify-center">
                              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-white font-medium font-roboto">{product.name}</h4>
                              <div className="text-white/70 text-sm font-roboto">{product.brand}</div>
                            </div>
                            <ChevronRightIcon className="h-5 w-5 text-white/50 ml-auto" />
                          </Link>
                        ))}
                      </div>
                      
                      <Link 
                        to={`/streamers/${streamer.id}`}
                        className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded text-center transition-colors text-white font-medium"
                      >
                        Посмотреть все товары <ChevronRightIcon className="h-5 w-5 inline-block ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Кнопки навигации */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Предыдущий стример"
          >
            <ChevronLeftIcon className="h-6 w-6 text-secondary" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Следующий стример"
          >
            <ChevronRightIcon className="h-6 w-6 text-secondary" />
          </button>
        </div>
        
        {/* Индикаторы слайдов */}
        <div className="flex justify-center mt-8 space-x-2">
          {streamers.map((_, index) => (
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

export default StreamerPicks; 