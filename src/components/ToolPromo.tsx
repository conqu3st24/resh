import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ToolPromo: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-lg">
          {/* Фоновое изображение */}
          <img 
            src="https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_3.jpg" 
            alt="Инструмент для подбора" 
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          
          {/* Градиентное наложение */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          
          {/* Контент */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
            <div className="max-w-md">
              <div className="text-primary text-sm uppercase font-medium mb-2 font-roboto">Инструменты</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-century tracking-tighter">Инструмент для подбора мышки</h3>
              <p className="text-white/90 mb-6 md:mb-8 font-roboto">
                О выбранный нами инновационный путь требует от нас анализа форм воздействия. Являясь всего лишь частью общей картины.
              </p>
              <Link 
                to="/tool" 
                className="inline-flex items-center bg-primary hover:bg-lightBlue text-white font-medium px-6 py-3 rounded transition-colors"
              >
                Подобрать
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
          
          {/* Декоративные элементы */}
          <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-primary"></div>
          <div className="absolute bottom-2 right-0 w-1/4 h-1 bg-lightBlue"></div>
        </div>
      </div>
    </section>
  );
};

export default ToolPromo; 