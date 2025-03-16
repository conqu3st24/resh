import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useReducedMotion } from 'framer-motion';

// Определяем типы данных для стримеров и их оборудования
interface EquipmentItem {
  id: number;
  name: string;
  brand: string;
  image?: string;
}

interface Streamer {
  id: number;
  name: string;
  nickname: string;
  bgColor: string;
  image?: string;
  equipment: {
    keyboard?: EquipmentItem;
    mousepad?: EquipmentItem;
  };
}

// Моковые данные для стримеров
const streamers: Streamer[] = [
  {
    id: 1,
    name: 'Алексей Патёкин',
    nickname: 'Братишкин (тутуттуу)',
    bgColor: 'from-[#FF4D8E] to-[#B759FF]',
    image: 'https://liquipedia.net/commons/images/thumb/1/1f/TenZ_2021_VALO.png/600px-TenZ_2021_VALO.png',
    equipment: {
      keyboard: {
        id: 101,
        name: 'Logitech G PRO X',
        brand: 'Logitech',
        image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png'
      },
      mousepad: {
        id: 102,
        name: 'Logitech G PRO X',
        brand: 'Logitech',
        image: 'https://www.hyperxgaming.com/unitedkingdom/microsite/mousepad/img/furys.webp'
      }
    }
  },
  {
    id: 2,
    name: 'Evelone (Вадим)',
    nickname: 'Братишкин (тутуттуу)',
    bgColor: 'from-[#4D95FF] to-[#5959FF]',
    image: 'https://liquipedia.net/commons/images/thumb/2/2c/S1mple_Berlin_Minor_2019.jpg/600px-S1mple_Berlin_Minor_2019.jpg',
    equipment: {
      keyboard: {
        id: 103,
        name: 'SteelSeries Sensei Ten',
        brand: 'SteelSeries',
        image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01345-sensei-ten/f0cf7dd20d6744fe96a8cd7f5c359d56.png.500x400_q100_crop-fit_optimize.png'
      },
      mousepad: {
        id: 104,
        name: 'SteelSeries QcK Edge XL',
        brand: 'SteelSeries',
        image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01501-qck-edge-xl/c45afe0143d3432b99d1cace25f3918f.png.500x400_q100_crop-fit_optimize.png'
      }
    }
  },
  {
    id: 3,
    name: 'Tenderlybae',
    nickname: 'TenderlyBae (тутуттуу)',
    bgColor: 'from-[#4DFFB8] to-[#59DAFF]',
    image: 'https://liquipedia.net/commons/images/thumb/3/31/M0NESY_at_IEM_Cologne_2022.jpg/600px-M0NESY_at_IEM_Cologne_2022.jpg',
    equipment: {
      keyboard: {
        id: 105,
        name: 'Logitech G PRO X',
        brand: 'Logitech',
        image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png'
      },
      mousepad: {
        id: 106,
        name: 'Logitech G840',
        brand: 'Logitech',
        image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/non-gaming/mice-mousepads/g840-cloth-gaming-mousepad/g840-cloth-gaming-mousepad-gallery-1.png'
      }
    }
  }
];

// Компонент карточки стримера
const StreamerCard: React.FC<{ streamer: Streamer }> = ({ streamer }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300"
    >
      {/* Фон/изображение стримера */}
      <div 
        className={`relative w-full h-[280px] md:h-[320px] lg:h-[375px] bg-gradient-to-r ${streamer.bgColor} transition-all duration-300`}
        style={streamer.image ? { backgroundImage: `url(${streamer.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        data-component-name="StreamerCard"
      >
        {/* Декоративные элементы */}
        <div 
          className="absolute top-1/4 left-1/3 w-[60px] md:w-[80px] lg:w-[100px] h-[60px] md:h-[80px] lg:h-[100px] rounded-full bg-white opacity-10 blur-md"
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-[100px] md:w-[120px] lg:w-[150px] h-[100px] md:h-[120px] lg:h-[150px] rounded-full bg-white opacity-10 blur-md"
        />
        
        {/* Накладка с именем стримера */}
        <div 
          className="absolute bottom-[10px] left-[10px] py-2 md:py-3 px-3 md:px-4 w-[200px] md:w-[240px] lg:w-[270px] bg-black/20 backdrop-blur-md rounded-[10px] border border-white/10 transition-all duration-300"
        >
          <div className="flex flex-col gap-1">
            <h3 className="font-century font-bold text-lg md:text-xl lg:text-2xl text-white tracking-tight" data-component-name="StreamerCard">{streamer.name}</h3>
            <p className="font-roboto text-xs md:text-sm lg:text-base text-white">{streamer.nickname}</p>
          </div>
        </div>
        
        {/* Карточки оборудования */}
        <div className="absolute top-[10px] md:top-[14px] lg:top-[17px] right-[10px] md:right-[14px] flex flex-col gap-[8px] md:gap-[10px] lg:gap-[13px]">
          {streamer.equipment.keyboard && (
            <div>
              <Link to={`/product/${streamer.equipment.keyboard.id}`} className="block">
                <div 
                  className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[250px] h-[90px] sm:h-[110px] md:h-[120px] lg:h-[140px] bg-white/10 backdrop-blur-md rounded-lg p-[6px] md:p-[8px] lg:p-[10px] hover:bg-white/15 transition-colors border border-white/10 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <h4 className="font-century font-bold text-xs md:text-sm lg:text-base text-white tracking-tight line-clamp-1">
                          {streamer.equipment.keyboard.name}
                        </h4>
                        <span className="text-[10px] md:text-xs text-white/50 font-inter font-medium">
                          {streamer.equipment.keyboard.brand}
                        </span>
                      </div>
                      <div>
                        <ArrowRightIcon className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px] text-white -rotate-45" />
                      </div>
                    </div>
                    <div className="w-full h-[50px] sm:h-[65px] md:h-[75px] lg:h-[87px] rounded overflow-hidden bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                      {streamer.equipment.keyboard.image ? (
                        <img 
                          src={streamer.equipment.keyboard.image} 
                          alt={streamer.equipment.keyboard.name} 
                          className="w-full h-full object-contain p-1 md:p-2"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-white/40 text-[10px] md:text-xs">Keyboard Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
          
          {streamer.equipment.mousepad && (
            <div>
              <Link to={`/product/${streamer.equipment.mousepad.id}`} className="block">
                <div 
                  className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[250px] h-[90px] sm:h-[110px] md:h-[120px] lg:h-[140px] bg-white/10 backdrop-blur-md rounded-lg p-[6px] md:p-[8px] lg:p-[10px] hover:bg-white/15 transition-colors border border-white/10 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <h4 className="font-century font-bold text-xs md:text-sm lg:text-base text-white tracking-tight line-clamp-1">
                          {streamer.equipment.mousepad.name}
                        </h4>
                        <span className="text-[10px] md:text-xs text-white/50 font-inter font-medium">
                          {streamer.equipment.mousepad.brand}
                        </span>
                      </div>
                      <div>
                        <ArrowRightIcon className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px] text-white -rotate-45" />
                      </div>
                    </div>
                    <div className="w-full h-[50px] sm:h-[65px] md:h-[75px] lg:h-[87px] rounded overflow-hidden bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                      {streamer.equipment.mousepad.image ? (
                        <img 
                          src={streamer.equipment.mousepad.image} 
                          alt={streamer.equipment.mousepad.name} 
                          className="w-full h-full object-contain p-1 md:p-2"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-white/40 text-[10px] md:text-xs">Mousepad Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
          
          {/* Кнопка "Посмотреть все товары" */}
          <div>
            <Link 
              to={`/player/${streamer.id}`}
              className="block"
            >
              <div 
                className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[250px] h-[40px] md:h-[50px] lg:h-[57px] bg-white rounded-lg md:rounded-xl flex items-center justify-between px-[10px] md:px-[14px] lg:px-[18px] hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
              >
                <span className="font-roboto font-medium text-xs md:text-sm text-[#212121]">
                  <span className="hidden md:inline">Посмотреть</span> все товары
                </span>
                <div>
                  <ArrowRightIcon className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px] text-[#212121]" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Основной компонент секции стримеров
const StreamerSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  
  // Показываем максимум 2 стримеров одновременно на больших экранах
  const visibleStreamers = streamers.slice(currentIndex, currentIndex + 2);
  
  // Обработчики кнопок навигации
  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);
  
  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(streamers.length - 2, prev + 1));
  }, []);
  
  // Проверка состояния кнопок
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= streamers.length - 2;

  return (
    <section className="w-full bg-[#E3E7F0] pt-6 md:pt-8 lg:pt-10 pb-10 md:pb-12 lg:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className="flex flex-col lg:flex-row gap-6 md:gap-8 opacity-100 transition-opacity duration-300" 
          data-component-name="StreamerSection"
        >
          {/* Левая часть с заголовком и навигацией */}
          <div className="w-full lg:w-[355px]" data-component-name="StreamerSection">
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
              {/* Заголовок */}
              <div>
                <h2 
                  className="font-century font-bold text-2xl md:text-3xl lg:text-4xl text-primary tracking-tight"
                >
                  Выбор стримеров
                </h2>
                <p 
                  className="text-sm md:text-base text-gray-600 mt-1 md:mt-2"
                >
                  Здесь собраны крутые сетапы
                </p>
              </div>
              
              {/* Кнопки навигации */}
              <div 
                className="flex gap-2.5"
              >
                <button 
                  onClick={handlePrev}
                  disabled={isPrevDisabled}
                  className={`flex justify-center items-center w-[40px] h-[40px] md:w-[46px] md:h-[46px] rounded-full border-2 border-black transition-all duration-200 ${isPrevDisabled ? 'opacity-50' : 'hover:opacity-80 hover:bg-gray-100 hover:scale-105 active:scale-95'}`}
                  aria-label="Предыдущий стример"
                >
                  <svg width="7" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 7L7 13" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  className={`flex justify-center items-center w-[40px] h-[40px] md:w-[46px] md:h-[46px] rounded-full border-2 border-black transition-all duration-200 ${isNextDisabled ? 'opacity-50' : 'hover:opacity-80 hover:bg-gray-100 hover:scale-105 active:scale-95'}`}
                  aria-label="Следующий стример"
                >
                  <svg width="7" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L7 7L1 1" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Правая часть с карточками стримеров */}
          <div className="flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              {visibleStreamers.map(streamer => (
                <div 
                  key={streamer.id} 
                  className="w-full xl:max-w-[600px] transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <StreamerCard streamer={streamer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreamerSection; 