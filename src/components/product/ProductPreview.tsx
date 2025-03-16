import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavorite, removeFromFavorite, selectIsFavorite } from '../../store/slices/favoriteSlice';
import { Product } from '../../types/product';
import { toast } from 'react-hot-toast';
import classNames from 'classnames';

interface ProductPreviewProps {
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
  colors?: Array<{ id: number | string, name: string, hex: string }>;
}

/**
 * Компонент предварительного просмотра товара
 * Добавляет интерактивное модальное окно для быстрого просмотра товара
 */
export const ProductPreview: React.FC<ProductPreviewProps> = ({ 
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
  inStock = true,
  isPreorder,
  colors = []
}) => {
  const [selectedColor, setSelectedColor] = useState<string | number | null>(
    colors.length > 0 ? colors[0].id : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, id));
  
  // Используем локальную заглушку для отсутствующих изображений
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
  
  // Блокируем прокрутку страницы когда открыто модальное окно
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Обработчик закрытия модального окна
  const handleClose = () => {
    setIsOpen(false);
  };
  
  // Функция для увеличения количества
  const increaseQuantity = () => {
    if (quantity < 99) setQuantity(quantity + 1);
  };
  
  // Функция для уменьшения количества
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  // Обработчик изменения количества из инпута
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };
  
  // Функция для добавления товара в корзину
  const handleAddToCart = () => {
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
      quantity,
      selectedColor: selectedColorName
    }));
    
    // Показываем уведомление и закрываем окно
    toast.success(`${title} добавлен в корзину`);
    handleClose();
  };
  
  // Функция для управления избранными товарами
  const handleToggleFavorite = () => {
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
    return (
      <div className="flex items-center">
        <div className="flex space-x-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 15.934l-6.18 3.25.944-6.752L.766 6.49l6.696-.975L10 0l2.537 5.516 6.696.975-4.998 4.942.944 6.752z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500">
          ({reviewCount} отзывов)
        </span>
      </div>
    );
  };
  
  // Если модальное окно закрыто, не рендерим ничего
  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay для модального окна */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={handleClose}
      >
        {/* Контейнер модального окна */}
        <div 
          className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Кнопка закрытия */}
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Изображение товара */}
            <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center p-4 relative">
              <img
                src={getImageUrl()}
                alt={title}
                className="w-full h-auto object-contain max-h-[400px]"
                onError={handleImageError}
              />
              
              {/* Метки скидки/новинки/предзаказа */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                {discount && (
                  <span className="bg-blue-600 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                )}
                
                {isNew && !discount && (
                  <span className="bg-green-500 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                    Новинка
                  </span>
                )}
              </div>
              
              {isPreorder && (
                <div className="absolute top-2 left-2">
                  <span className="bg-orange-500 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                    Предзаказ
                  </span>
                </div>
              )}
            </div>
            
            {/* Информация о товаре */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  <span className="text-gray-500 font-normal mr-1">{brand}</span>
                  {title.startsWith(brand) ? title.substring(brand.length).trim() : title}
                </h2>
                
                {renderRating()}
                
                <div className="mt-6 space-y-4">
                  {/* Цена */}
                  <div className="flex items-end">
                    {oldPrice && (
                      <p className="text-lg text-gray-500 line-through mr-3">
                        {oldPrice.toLocaleString()} ₽
                      </p>
                    )}
                    <p className="text-3xl font-bold text-gray-900">
                      {price.toLocaleString()} ₽
                    </p>
                  </div>
                  
                  {/* Статус наличия */}
                  <div>
                    {inStock ? (
                      <span className="text-green-600 font-medium flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        В наличии
                      </span>
                    ) : (
                      <span className="text-gray-600 font-medium">
                        Нет в наличии
                      </span>
                    )}
                  </div>
                  
                  {/* Цветовые варианты */}
                  {colors.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Цвет: {colors.find(c => c.id === selectedColor)?.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className={classNames(
                              "w-10 h-10 rounded-lg border-2", 
                              {
                                "border-blue-500": selectedColor === color.id,
                                "border-white": selectedColor !== color.id
                              }
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Краткое описание */}
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <p className="text-gray-700">
                      Краткое описание товара. Здесь будет отображаться основная информация о товаре.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Блок добавления в корзину */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700 mr-4">
                    Количество:
                  </label>
                  <div className="flex rounded-md">
                    <button
                      type="button"
                      className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="py-1 px-2 w-12 text-center border-y border-gray-300"
                    />
                    <button
                      type="button"
                      className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50"
                      onClick={increaseQuantity}
                      disabled={quantity >= 99}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                      inStock
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Добавить в корзину
                  </button>
                  
                  <button
                    onClick={handleToggleFavorite}
                    className="px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                    aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                  >
                    {isFavorite ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};