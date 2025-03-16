import React from 'react';
import { Link } from 'react-router-dom';

// Временный компонент без загрузки внешних изображений
const ToolPromoSection: React.FC = () => {
  return (
    <section className="relative py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4">
        {/* Контейнер для инструмента подбора с градиентным фоном вместо изображения */}
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[494px] rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
          {/* Градиентное наложение для текста */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-20% via-transparent via-50% to-black/92 to-100%"></div>
          
          {/* Контент - передвинут выше как на фото */}
          <div className="absolute inset-0 p-4 sm:p-5 md:p-7 lg:p-8">
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-1 sm:gap-2 md:gap-4 mt-2 md:mt-4">
                {/* Поднимаем блок текста выше */}
                <span className="font-inter font-medium text-xs sm:text-sm md:text-base text-[#BBBBBB]">
                  Инструменты
                </span>
                <h2 className="font-century font-bold text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-[120%] text-white tracking-tight max-w-full md:max-w-[651px]">
                  Инструмент для подбора
                </h2>
              </div>
              
              <div className="flex flex-col mt-auto">
                {/* Текст описания остается внизу */}
                <p className="font-roboto font-normal text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-full md:max-w-[651px] leading-[130%] mb-4 md:mb-6 lg:mb-8">
                  О выбранный нами инновационный путь требует от нас анализа форм воздействия. Являясь всего лишь частью общей картины.
                </p>
                
                {/* Кнопка теперь ведет на подбор сетапа */}
                <Link 
                  to="/tools/setup-finder" 
                  className="flex justify-center items-center bg-white hover:bg-gray-100 text-[#212121] font-inter font-semibold text-sm md:text-base rounded-lg md:rounded-xl py-3 sm:py-4 md:py-[19px] px-6 sm:px-8 md:px-10 w-fit transition-colors"
                >
                  Подобрать
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolPromoSection; 