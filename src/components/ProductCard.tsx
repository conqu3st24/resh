import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import CartIcon from './icons/CartIcon';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorite, removeFromFavorite, selectIsFavorite } from '../store/slices/favoriteSlice';
import { toast } from 'react-hot-toast';
import { Product } from '../types/product';
import { RootState } from '../store';
import { ProductPreview } from './product';

interface ProductCardProps {
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
  isPreorder?: boolean;
  inStock?: boolean;
  colors?: Array<{ id: number | string, name: string, hex: string }>;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  brand,
  price,
  oldPrice,
  rating,
  reviewCount,
  image,
  discount,
  isNew,
  isPreorder,
  inStock = true,
  colors = [],
  className = ''
}) => {
  const [selectedColor, setSelectedColor] = useState(colors.length > 0 ? colors[0].id : null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, id));

  // Используем локальную заглушку
  const defaultImage = '/images/products/fallback.svg';

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true);
  };

  // Получаем финальный URL изображения
  const getImageUrl = () => {
    if (imageError) return defaultImage;
    return image || defaultImage;
  };

  // Функция для добавления товара в корзину
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inStock) return;
    
    const selectedColorObj = colors.find(color => color.id === selectedColor);
    const selectedColorName = selectedColorObj ? selectedColorObj.name : undefined;
    
    // Создаем полноценный объект продукта согласно интерфейсу Product
    const productData: Product = {
      id,
      title,
      brand,
      price,
      oldPrice,
      rating,
      reviewCount,
      image,
      discount,
      isNew,
      inStock,
      colors,
      isPreorder
    };
    
    dispatch(addToCart({
      product: productData,
      quantity: 1,
      selectedColor: selectedColorName
    }));
    
    // Показываем уведомление об успешном добавлении
    toast.success(`${title} добавлен в корзину`);
  };

  // Функция для управления избранными товарами
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Создаем полноценный объект продукта согласно интерфейсу Product
    const productData: Product = {
      id,
      title,
      brand,
      price,
      oldPrice,
      rating,
      reviewCount,
      image,
      discount,
      isNew,
      inStock,
      colors,
      isPreorder
    };
    
    if (isFavorite) {
      dispatch(removeFromFavorite(id));
      toast.success(`${title} удален из избранного`);
    } else {
      dispatch(addToFavorite(productData));
      toast.success(`${title} добавлен в избранное`);
    }
  };

  // Функция для отображения рейтинга в виде звезд
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-blue-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-blue-500" />);
      } else {
        stars.push(<StarOutlineIcon key={i} className="h-4 w-4 text-blue-500" />);
      }
    }

    return (
      <div className="flex items-center">
        <div className="flex mr-1">{stars}</div>
        <span className="text-blue-500 text-xs hover:underline">{reviewCount}</span>
      </div>
    );
  };

  // Подготовка данных для ProductPreview
  const productData = {
    id,
    title,
    brand,
    price,
    oldPrice,
    rating,
    reviewCount,
    image,
    discount,
    isNew,
    inStock,
    colors,
    isPreorder
  };

  return (
    <div className={`h-full ${className}`}>
      <Link 
        to={`/product/${id}`} 
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Desktop version */}
        <div className="rounded-lg overflow-hidden h-full flex flex-col md:block">
          {/* Изображение товара с белым фоном - Десктоп версия */}
          <div className="relative aspect-square bg-white flex items-center justify-center p-4 md:block hidden">
            <img 
              src={getImageUrl()} 
              alt={title} 
              className="w-full h-full object-contain transition-transform duration-300"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              onError={handleImageError}
            />
            
            {/* Кнопка быстрого просмотра */}
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPreview(true);
                  }}
                  className="bg-white hover:bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm"
                >
                  Быстрый просмотр
                </button>
              </div>
            )}
            
            {/* Цветовые варианты на фото - десктоп */}
            {colors.length > 0 && (
              <div className="absolute bottom-3 left-3 flex gap-1">
                {colors.slice(0, Math.min(colors.length, 3)).map((color) => (
                  <button
                    key={color.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColor(color.id);
                    }}
                    className={classNames(
                      "w-6 h-6 rounded-lg border-2", 
                      {
                        "border-blue-500": selectedColor === color.id,
                        "border-white": selectedColor !== color.id
                      }
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                
                {colors.length > 3 && (
                  <div className="w-6 h-6 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-xs font-medium">
                    +{colors.length - 3}
                  </div>
                )}
              </div>
            )}
            
            {/* Метки для десктопа */}
            {discount && (
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-blue-600 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                  -{discount}%
                </span>
              </div>
            )}
            
            {isNew && !discount && (
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-green-500 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                  Новинка
                </span>
              </div>
            )}
            
            {isPreorder && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-orange-500 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                  Предзаказ
                </span>
              </div>
            )}
          </div>
          
          {/* Информация о товаре - Десктоп */}
          <div className="flex flex-col justify-between flex-grow p-3 relative md:block hidden">
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
                <span 
                  className="text-gray-500 hover:text-blue-500 transition-colors inline mr-1 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/catalog/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`;
                  }}
                >
                  {brand}
                </span>
                {/* Проверяем, начинается ли название с бренда, чтобы избежать дублирования */}
                {title.startsWith(brand) ? title.substring(brand.length).trim() : title}
              </h3>
              {renderRating()}
            </div>
            
            <div className="mt-3 flex justify-between items-end">
              <div className="flex flex-col">
                {oldPrice && (
                  <span className="text-sm text-gray-500 line-through">{oldPrice.toLocaleString()} ₽</span>
                )}
                <span className="text-lg font-bold text-gray-900">{price.toLocaleString()} ₽</span>
              </div>
              
              {/* Кнопки действий - десктоп */}
              <div className="flex gap-2">
                {/* Кнопка добавления в избранное */}
                <button
                  onClick={handleToggleFavorite}
                  className={classNames(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-gray-100 hover:bg-gray-200",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                  aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                
                {/* Кнопка добавления в корзину - появляется только при наведении */}
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={classNames(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    {
                      "bg-blue-600 hover:bg-blue-700 shadow-md": inStock,
                      "bg-gray-300 cursor-not-allowed": !inStock
                    },
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                  aria-label="Добавить в корзину"
                >
                  <CartIcon className={`h-5 w-5 ${inStock ? 'text-white' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Мобильная версия - горизонтальная карточка товара */}
          <div className="md:hidden flex bg-white rounded-lg overflow-hidden w-full">
            {/* Левая часть - изображение */}
            <div className="relative bg-white w-1/3 flex-shrink-0 p-2">
              <img 
                src={getImageUrl()} 
                alt={title} 
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
              
              {/* Метки для мобильной версии */}
              <div className="absolute top-1 left-1 flex flex-col gap-1">
                {discount && (
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full text-center" style={{fontSize: '10px'}}>
                    -{discount}%
                  </span>
                )}
                
                {isNew && !discount && (
                  <span className="bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-full text-center" style={{fontSize: '10px'}}>
                    Новинка
                  </span>
                )}
                
                {isPreorder && (
                  <span className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-full text-center" style={{fontSize: '10px'}}>
                    Предзаказ
                  </span>
                )}
              </div>
            </div>
            
            {/* Правая часть - информация о товаре */}
            <div className="flex flex-col justify-between p-2 w-2/3">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  <span className="text-gray-600 mr-1">{brand}</span>
                  {title.startsWith(brand) ? title.substring(brand.length).trim() : title}
                </h3>
                {renderRating()}
              </div>
              
              <div className="mt-1 flex justify-between items-end">
                <div className="flex flex-col">
                  {oldPrice && (
                    <span className="text-xs text-gray-500 line-through">{oldPrice.toLocaleString()} ₽</span>
                  )}
                  <span className="text-base font-bold text-gray-900">{price.toLocaleString()} ₽</span>
                </div>
                
                {/* Цветовые варианты и корзина для мобильной версии */}
                <div className="flex items-center gap-1">
                  {/* Цветовые варианты на мобильной */}
                  {colors.length > 0 && (
                    <div className="flex gap-1">
                      {colors.slice(0, Math.min(colors.length, 2)).map((color) => (
                        <button
                          key={color.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedColor(color.id);
                          }}
                          className={classNames(
                            "w-5 h-5 rounded-full border", 
                            {
                              "border-blue-500 border-2": selectedColor === color.id,
                              "border-gray-300": selectedColor !== color.id
                            }
                          )}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                      
                      {colors.length > 2 && (
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                          +{colors.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Кнопка в корзину для мобильной */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={classNames(
                      "w-8 h-8 rounded-full flex items-center justify-center ml-2",
                      {
                        "bg-blue-600": inStock,
                        "bg-gray-300 cursor-not-allowed": !inStock
                      }
                    )}
                    aria-label="Добавить в корзину"
                  >
                    <CartIcon className={`h-4 w-4 ${inStock ? 'text-white' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Компонент быстрого просмотра */}
      {showPreview && (
        <ProductPreview
          id={id}
          title={title}
          brand={brand}
          price={price}
          oldPrice={oldPrice}
          rating={rating}
          reviewCount={reviewCount}
          image={image}
          discount={discount}
          isNew={isNew}
          inStock={inStock}
          isPreorder={isPreorder}
          colors={colors}
        />
      )}
    </div>
  );
};

export default ProductCard;