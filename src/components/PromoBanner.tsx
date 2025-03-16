import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  productImage?: string;
  productName?: string;
  productLink?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  productImage,
  productName,
  productLink
}) => {
  return (
    <div 
      className="relative rounded-2xl overflow-hidden w-full mb-8" 
      style={{ height: '460px' }}
    >
      {/* Фоновое изображение */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Затемнение для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Контент баннера */}
      <div className="relative h-full flex flex-col justify-center px-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: '"Century Gothic Bold", "Century Gothic", sans-serif' }}>{title}</h1>
        <p className="text-xl text-white/90 mb-8">{subtitle}</p>
        <Link 
          to={buttonLink}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors duration-200 w-fit"
        >
          {buttonText}
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Карточка товара (если указана) */}
      {productImage && productName && productLink && (
        <Link 
          to={productLink}
          className="absolute top-10 right-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 w-64 group"
        >
          <div className="flex items-center mb-2">
            <img 
              src={productImage} 
              alt={productName}
              className="w-20 h-20 object-contain mr-4"
            />
            <div className="flex-grow">
              <div className="text-sm text-gray-500">Новинка</div>
              <div className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                {productName}
              </div>
            </div>
          </div>
          <div className="text-primary text-sm flex items-center gap-1">
            <span>Подробнее</span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default PromoBanner; 