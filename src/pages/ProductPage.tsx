import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRightIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite, selectIsFavorite } from '../store/slices/favoriteSlice';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import { RootState } from '../store';
import { Product } from '../types/product';
import CartIcon from '../components/icons/CartIcon';
import ReviewsSection from '../components/ReviewsSection';
import type { Review as ReviewType, ReviewsStats } from '../types/reviews';

// Моковые данные для продукта
const productData = {
  id: 1,
  title: 'Leopold FC750R BT Light Pink',
  brand: 'Leopold',
  price: 10299,
  oldPrice: 12200,
  discount: 17,
  rating: 4.7,
  reviewCount: 125,
  availability: 'В наличии',
  description: 'Механическая клавиатура Leopold FC750R BT Light Pink с переключателями Cherry MX Red. Беспроводное и проводное подключение, компактный формат без цифрового блока, розовый цвет корпуса.',
  features: [
    { name: 'Интерфейс', value: 'USB-C, Bluetooth 5.0' },
    { name: 'Переключатели', value: 'Cherry MX Red' },
    { name: 'Формат', value: 'TKL (без цифрового блока)' },
    { name: 'Цвет', value: 'Розовый' },
    { name: 'Материал корпуса', value: 'ABS-пластик' },
    { name: 'Тип подсветки', value: 'Нет' }
  ],
  images: [
    '/images/products/keyboards/leopold-fc750r/1.svg',
    '/images/products/keyboards/leopold-fc750r/2.svg',
    '/images/products/keyboards/leopold-fc750r/3.svg',
    '/images/products/keyboards/leopold-fc750r/4.svg'
  ],
  imageDescriptions: [
    'Leopold FC750R BT Light Pink (вид сверху)',
    'Leopold FC750R BT Light Pink (вид сбоку)',
    'Leopold FC750R BT Light Pink (вид с разъемами)',
    'Leopold FC750R BT Light Pink (с упаковкой)'
  ],
  switchOptions: [
    { id: 'brown', name: 'Cherry MX Brown', color: 'bg-amber-800' },
    { id: 'red', name: 'Cherry MX Silent Red', color: 'bg-red-600' },
    { id: 'black', name: 'Cherry MX Black', color: 'bg-black' }
  ],
  colorOptions: [
    { id: 'white', name: 'Белый', color: 'bg-white border border-gray-200' },
    { id: 'black', name: 'Черный', color: 'bg-black' },
    { id: 'pink', name: 'Розовый', color: 'bg-pink-300' }
  ],
  reviews: [
    {
      id: 1,
      author: 'Александр С.',
      date: '15.03.2023',
      rating: 5,
      text: 'Отличная клавиатура! Приятный звук переключателей, хорошее качество сборки. Рекомендую!'
    },
    {
      id: 2,
      author: 'Мария П.',
      date: '02.02.2023',
      rating: 4,
      text: 'Клавиатура понравилась, но к цвету надо привыкнуть. Немного ярче, чем на фото.'
    },
    {
      id: 3,
      author: 'Дмитрий К.',
      date: '20.01.2023',
      rating: 5,
      text: 'Топовая клава, звук приятный, тактильные ощущения на высоте. За эти деньги - лучшее, что можно найти.'
    }
  ]
};

// Моковые данные для похожих товаров
const similarProducts = [
  {
    id: 2,
    title: 'Varmilo VA88M Sakura',
    brand: 'Varmilo',
    price: 12000,
    rating: 4.5,
    reviewCount: 42,
    image: '/images/products/keyboards/leopold-fc750r/2.svg',
    inStock: true
  },
  {
    id: 3,
    title: 'Ducky One 3 Daybreak',
    brand: 'Ducky',
    price: 13500,
    rating: 4.8,
    reviewCount: 36,
    image: '/images/products/keyboards/leopold-fc750r/1.svg',
    inStock: true
  },
  {
    id: 4,
    title: 'Keychron K8 Pro',
    brand: 'Keychron',
    price: 9000,
    rating: 4.6,
    reviewCount: 28,
    image: '/images/products/keyboards/leopold-fc750r/3.svg',
    inStock: true
  },
  {
    id: 5,
    title: 'GMMK Pro',
    brand: 'Glorious',
    price: 16000,
    rating: 4.7,
    reviewCount: 52,
    image: '/images/products/keyboards/leopold-fc750r/4.svg',
    inStock: true
  }
];

// Преобразование простых отзывов в формат для ReviewsSection
const transformedReviews: ReviewType[] = productData.reviews.map(review => ({
  id: review.id.toString(),
  productId: productData.id,
  author: {
    id: `author-${review.id}`,
    name: review.author,
    avatar: undefined
  },
  rating: review.rating as 1 | 2 | 3 | 4 | 5,
  date: review.date,
  content: review.text,
  photos: [],
  isVerifiedPurchase: true,
  helpfulCount: 0,
  unhelpfulCount: 0
}));

// Статистика отзывов
const reviewsStats: ReviewsStats = {
  averageRating: productData.rating,
  totalCount: productData.reviewCount,
  ratingCounts: {
    1: productData.reviews.filter(r => r.rating === 1).length,
    2: productData.reviews.filter(r => r.rating === 2).length,
    3: productData.reviews.filter(r => r.rating === 3).length,
    4: productData.reviews.filter(r => r.rating === 4).length,
    5: productData.reviews.filter(r => r.rating === 5).length
  },
  withPhotosCount: 0,
  positiveCount: productData.reviews.filter(r => r.rating >= 4).length,
  negativeCount: productData.reviews.filter(r => r.rating <= 2).length
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>('description');
  const [activeImage, setActiveImage] = useState<number>(0);
  const [selectedSwitch, setSelectedSwitch] = useState<string>(productData.switchOptions[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(productData.colorOptions[2].id);
  const [selectedLayout, setSelectedLayout] = useState<string>('en');
  const [quantity, setQuantity] = useState<number>(1);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const productId = parseInt(id || '1');
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, productId));

  // Функция для отображения рейтинга в виде звезд
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-300" />);
      }
    }

    return <div className="flex">{stars}</div>;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(productId));
      toast.success('Товар удален из избранного');
    } else {
      dispatch(addToFavorite({
        id: productData.id,
        title: productData.title,
        brand: productData.brand,
        price: productData.price,
        oldPrice: productData.oldPrice,
        discount: productData.discount,
        rating: productData.rating,
        reviewCount: productData.reviewCount,
        image: productData.images[0],
        inStock: productData.availability === 'В наличии'
      }));
      toast.success('Товар добавлен в избранное');
    }
  };

  const handleAddToCart = () => {
    // В реальном приложении здесь был бы код для добавления товара в корзину
    alert('Товар добавлен в корзину');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы код для отправки отзыва на сервер
    alert('Ваш отзыв отправлен! Он будет опубликован после модерации.');
    setIsReviewFormOpen(false);
  };

  return (
    <main className="product-page bg-[#E3E7F0]">
      <div className="container py-6">
        {/* Хлебные крошки */}
        <div className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          <ChevronRightIcon className="h-3 w-3 inline mx-1" />
          <Link to="/catalog/keyboards" className="hover:text-primary transition-colors">Клавиатуры</Link>
          <ChevronRightIcon className="h-3 w-3 inline mx-1" />
          <span className="text-gray-800">{productData.title}</span>
        </div>

        {/* Основной контент */}
        <div className="bg-[#E3E7F0] rounded-lg mb-8">
          <div className="flex flex-col">
            {/* Общий контейнер товара - адаптивный для мобильных */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* Вертикальная галерея миниатюр - скрыта на мобильных устройствах */}
              <div className="hidden md:flex md:col-span-1 flex-col justify-between items-center h-full bg-[#E3E7F0]">
                {/* Стрелка вверх */}
                <button 
                  className="text-gray-800 hover:text-gray-600 mt-3"
                  onClick={() => setActiveImage(activeImage === 0 ? productData.images.length - 1 : activeImage - 1)}
                  aria-label="Предыдущее изображение"
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z" fill="#212121" transform="rotate(180 6 4)"/>
                  </svg>
                </button>
                
                {/* Контейнер для миниатюр - с flex-grow для растягивания */}
                <div className="flex flex-col gap-3 flex-grow justify-center py-3">
                  {productData.images.map((image, index) => (
                    <button 
                      key={index}
                      className={`w-[80px] h-[90px] bg-white rounded-md overflow-hidden shadow-sm ${
                        activeImage === index 
                          ? 'border-2 border-black' 
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={image} 
                          alt={productData.imageDescriptions[index]} 
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Стрелка вниз */}
                <button 
                  className="text-gray-800 hover:text-gray-600 mb-3"
                  onClick={() => setActiveImage((activeImage + 1) % productData.images.length)}
                  aria-label="Следующее изображение"
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z" fill="#212121"/>
                  </svg>
                </button>
              </div>
              
              {/* Основное изображение */}
              <div className="md:col-span-6 p-4 flex items-center justify-center bg-white rounded-lg relative">
                <button 
                  className="md:hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm"
                  onClick={() => setActiveImage(activeImage === 0 ? productData.images.length - 1 : activeImage - 1)}
                >
                  <ChevronRightIcon className="h-6 w-6 rotate-180 text-gray-600" />
                </button>
                
                <div className="w-full px-4 py-8 md:-mx-8 lg:-mx-12 xl:-mx-16">
                  <img 
                    src={productData.images[activeImage]} 
                    alt={productData.imageDescriptions[activeImage]} 
                    className="w-full h-auto max-h-[420px] object-contain mx-auto"
                    style={{ width: 'calc(100% + 32px)' }}
                  />
                  <p className="text-center text-xs text-gray-500 mt-4">
                    {productData.imageDescriptions[activeImage]}
                  </p>
                </div>
                
                <button 
                  className="md:hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm"
                  onClick={() => setActiveImage((activeImage + 1) % productData.images.length)}
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Информация о товаре */}
              <div className="md:col-span-5 p-6 flex flex-col bg-[#E3E7F0]">
                {/* Категория товара */}
                <div className="mb-1">
                  <Link to="/catalog/keyboards" className="text-[#5F5F5F] text-sm hover:text-[#096DFF] transition-colors">
                    Клавиатуры
                  </Link>
                </div>
                
                {/* Название товара */}
                <h1 
                  className="text-[32px] text-[#212121] mb-2 break-words" 
                  style={{
                    fontFamily: '"Century Gothic", sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    letterSpacing: '-0.478px'
                  }}
                >
                  Leopold FC750R BT Light Pink
                </h1>
                
                {/* Рейтинг и отзывы */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <svg 
                        key={index} 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={index < 4 ? "#096DFF" : "none"} 
                        stroke="#096DFF"
                        strokeWidth="1.5"
                        className="mr-0.5"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[#383838] text-sm">
                    125 отзывов
                  </span>
                </div>
                
                {/* Блоки цвета и раскладки в одной строке */}
                <div className="flex flex-wrap gap-6 mb-5">
                  {/* Цвет */}
                  <div className="min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#292929] text-sm font-medium">Цвет</span>
                      <div className="inline-flex w-4 h-4 items-center justify-center bg-gray-200 rounded-full text-xs text-gray-600">?</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className={`w-[30px] h-[30px] rounded-md ${selectedColor === 'white' ? 'ring-2 ring-black' : ''}`}
                        style={{ backgroundColor: 'white', border: '1px solid #ddd' }}
                        onClick={() => setSelectedColor('white')}
                        aria-label="Белый"
                      ></button>
                      <button 
                        className={`w-[30px] h-[30px] bg-black rounded-md ${selectedColor === 'black' ? 'ring-2 ring-black' : ''}`}
                        onClick={() => setSelectedColor('black')}
                        aria-label="Черный"
                      ></button>
                      <button 
                        className={`w-[30px] h-[30px] rounded-md ${selectedColor === 'pink' ? 'ring-2 ring-black' : ''}`}
                        style={{ backgroundColor: '#FF8297' }}
                        onClick={() => setSelectedColor('pink')}
                        aria-label="Розовый"
                      ></button>
                    </div>
                  </div>
                  
                  {/* Раскладка */}
                  <div className="min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#292929] text-sm font-medium">Раскладка</span>
                      <div className="inline-flex w-4 h-4 items-center justify-center bg-gray-200 rounded-full text-xs text-gray-600">?</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className={`py-1 px-3 rounded-md text-sm ${
                          selectedLayout === 'en' 
                            ? 'bg-white border-2 border-black' 
                            : 'bg-white border border-gray-300'
                        }`}
                        onClick={() => setSelectedLayout('en')}
                      >
                        EN
                      </button>
                      <button 
                        className={`py-1 px-3 rounded-md text-sm ${
                          selectedLayout === 'ru' 
                            ? 'bg-white border-2 border-black' 
                            : 'bg-white border border-gray-300'
                        }`}
                        onClick={() => setSelectedLayout('ru')}
                      >
                        RU
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Переключатели */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#292929] text-sm font-medium">Переключатели</span>
                    <div className="inline-flex w-4 h-4 items-center justify-center bg-gray-200 rounded-full text-xs text-gray-600">?</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className={`py-1.5 px-3 rounded-md text-sm flex items-center justify-center ${
                        selectedSwitch === 'brown' 
                          ? 'bg-amber-800 text-white' 
                          : 'bg-white border border-gray-300 text-gray-800'
                      }`}
                      onClick={() => setSelectedSwitch('brown')}
                    >
                      Cherry MX Brown
                    </button>
                    <button 
                      className={`py-1.5 px-3 rounded-md text-sm flex items-center justify-center ${
                        selectedSwitch === 'red' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-white border border-gray-300 text-gray-800'
                      }`}
                      onClick={() => setSelectedSwitch('red')}
                    >
                      Cherry MX Silent Red
                    </button>
                    <button 
                      className={`py-1.5 px-3 rounded-md text-sm flex items-center justify-center ${
                        selectedSwitch === 'black' 
                          ? 'bg-black text-white' 
                          : 'bg-white border border-gray-300 text-gray-800'
                      }`}
                      onClick={() => setSelectedSwitch('black')}
                    >
                      Cherry MX Black
                    </button>
                  </div>
                </div>
                
                {/* Цена и скидка */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#096DFF] text-white px-2 py-0.5 rounded text-sm">-17%</div>
                  <div className="text-2xl font-bold">10 299 ₽</div>
                  <div className="text-lg text-gray-500 line-through">12 200 ₽</div>
                </div>

                {/* Кнопка Добавить в корзину */}
                <div className="flex gap-3 mb-5">
                  <button
                    className="flex-grow bg-[#212121] hover:bg-black text-white py-3 px-6 rounded-md text-base font-medium transition-colors flex items-center justify-center"
                    onClick={() => {
                      dispatch(addToCart({
                        product: {
                          id: productData.id,
                          title: productData.title,
                          brand: productData.brand,
                          price: productData.price,
                          oldPrice: productData.oldPrice,
                          rating: productData.rating,
                          reviewCount: productData.reviewCount,
                          image: productData.images[0],
                          discount: productData.discount,
                          inStock: productData.availability === 'В наличии'
                        },
                        quantity: quantity,
                        selectedColor: selectedColor,
                        selectedSwitch: selectedSwitch
                      }));
                      toast.success('Товар добавлен в корзину');
                    }}
                  >
                    Добавить в корзину
                  </button>
                  
                  <button
                    onClick={handleToggleFavorite}
                    className={`h-12 w-12 border rounded-md flex items-center justify-center transition-all duration-300 ${
                      isFavorite ? 'bg-red-500 border-red-500' : 'bg-white border-gray-300'
                    }`}
                    title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                  >
                    {isFavorite ? (
                      <HeartSolidIcon className="h-5 w-5 text-white animate-pulse" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white">
                    <button
                      className="px-3 py-3 text-gray-600 hover:text-gray-800 bg-white"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      className="w-10 text-center border-x border-gray-300 py-2"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                    <button
                      className="px-3 py-3 text-gray-600 hover:text-gray-800 bg-white"
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Доставка */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6L7 2L6.3 1.3L3 4.6L1.7 3.3L1 4L3 6Z" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-sm">Количество товара: 2 шт.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5H2V13H14V5ZM15 2H1C0.45 2 0 2.45 0 3V14C0 14.55 0.45 15 1 15H15C15.55 15 16 14.55 16 14V3C16 2.45 15.55 2 15 2ZM11 4C11.55 4 12 3.55 12 3C12 2.45 11.55 2 11 2C10.45 2 10 2.45 10 3C10 3.55 10.45 4 11 4ZM14 3C14 2.45 13.55 2 13 2C12.45 2 12 2.45 12 3C12 3.55 12.45 4 13 4C13.55 4 14 3.55 14 3Z" fill="#555555"/>
                  </svg>
                  <span className="text-sm">Доставка по всей РФ</span>
                  <a href="#" className="text-[#096DFF] text-sm hover:underline">Подробнее</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Табы описания */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="border-b border-gray-200 flex">
            <button 
              className={`pb-4 px-4 text-sm font-medium border-b-2 -mb-px ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('description')}
            >
              Описание
            </button>
            <button 
              className={`pb-4 px-4 text-sm font-medium border-b-2 -mb-px ${activeTab === 'features' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('features')}
            >
              Характеристики
            </button>
            <button 
              className={`pb-4 px-4 text-sm font-medium border-b-2 -mb-px ${activeTab === 'questions' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('questions')}
            >
              Вопрос/ответ
            </button>
            <button 
              className={`pb-4 px-4 text-sm font-medium border-b-2 -mb-px ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Отзывы
            </button>
          </div>
          
          {/* Содержимое вкладок */}
          <div className="py-6">
            {/* Вкладка "Описание" */}
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 mb-8">
                  FC750R BT – беспроводная клавиатура 65% формата с низкопрофильными double-shot PBT колпачками и заводской шумоизоляцией. USB Type-C спрятан в центре под корпусом, а на самой клавиатуре имеются центральная и две боковые канавки под кабель.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {/* Карточка 1 - Bluetooth */}
                  <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="w-1/3 bg-pink-100 p-4 flex items-center justify-center">
                      <img src="/images/products/keyboards/leopold-fc750r/3.svg" alt="Bluetooth" className="w-full h-auto object-contain" />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium text-base mb-1">Поддержка Bluetooth 5.1</h3>
                      <p className="text-xs text-gray-600">
                        Мультидевайс режим поддерживает подключение до 4-х устройств. Работает от двух батареек типа AAA. Если пользоваться клавиатурой 6 часов в день, то одного комплекта батареек хватит на полгода.
                      </p>
                    </div>
                  </div>
                  
                  {/* Карточка 2 - Bluetooth */}
                  <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="w-1/3 bg-pink-100 p-4 flex items-center justify-center">
                      <img src="/images/products/keyboards/leopold-fc750r/1.svg" alt="Bluetooth" className="w-full h-auto object-contain" />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium text-base mb-1">Поддержка Bluetooth 5.1</h3>
                      <p className="text-xs text-gray-600">
                        Мультидевайс режим поддерживает подключение до 4-х устройств. Работает от двух батареек типа AAA. Если пользоваться клавиатурой 6 часов в день, то одного комплекта батареек хватит на полгода.
                      </p>
                    </div>
                  </div>
                  
                  {/* Карточка 3 - Type-C */}
                  <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="w-1/3 bg-pink-100 p-4 flex items-center justify-center">
                      <img src="/images/products/keyboards/leopold-fc750r/3.svg" alt="Type-C" className="w-full h-auto object-contain" />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium text-base mb-1">Разъём Type-C</h3>
                      <p className="text-xs text-gray-600">
                        Более универсальный и современный, по сравнению с традиционным mini-USB разъёмом. Обратите внимание, что клавиатура не будет работать с кабелем USB Type-C -- USB Type-C.
                      </p>
                    </div>
                  </div>
                  
                  {/* Карточка 4 - Bluetooth */}
                  <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="w-1/3 bg-pink-100 p-4 flex items-center justify-center">
                      <img src="/images/products/keyboards/leopold-fc750r/2.svg" alt="Bluetooth" className="w-full h-auto object-contain" />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium text-base mb-1">Поддержка Bluetooth 5.1</h3>
                      <p className="text-xs text-gray-600">
                        Мультидевайс режим поддерживает подключение до 4-х устройств. Работает от двух батареек типа AAA. Если пользоваться клавиатурой 6 часов в день, то одного комплекта батареек хватит на полгода.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Вкладка "Характеристики" */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Технические характеристики</h3>
                <ul className="space-y-4">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="grid grid-cols-1 md:grid-cols-3 py-3 border-b border-gray-100">
                      <span className="text-gray-600">{feature.name}</span>
                      <span className="md:col-span-2 font-medium">{feature.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Вкладка "Вопрос/ответ" */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-medium mb-2">Часто задаваемые вопросы</h3>
                  <p className="text-gray-600 text-sm">Здесь вы найдете ответы на самые распространенные вопросы о клавиатуре Leopold FC750R BT</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-100 rounded-lg">
                    <h4 className="font-medium mb-2">Можно ли использовать клавиатуру во время зарядки?</h4>
                    <p className="text-gray-600">Да, клавиатура Leopold FC750R BT может использоваться в проводном режиме через USB-C кабель.</p>
                  </div>
                  
                  <div className="p-4 border border-gray-100 rounded-lg">
                    <h4 className="font-medium mb-2">Поддерживает ли клавиатура макросы?</h4>
                    <p className="text-gray-600">Leopold FC750R BT не имеет встроенной поддержки макросов, но вы можете использовать программное обеспечение на вашем компьютере для этой функции.</p>
                  </div>
                  
                  <div className="p-4 border border-gray-100 rounded-lg">
                    <h4 className="font-medium mb-2">Как сбросить Bluetooth-подключение?</h4>
                    <p className="text-gray-600">Для сброса Bluetooth-подключения удерживайте кнопку Fn + соответствующую кнопку Bluetooth (1-4) в течение 3 секунд.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Вкладка "Отзывы" */}
            {activeTab === 'reviews' && (
              <div id="reviews-section" className="scroll-mt-24">
                <ReviewsSection 
                  productId={productId}
                  reviews={transformedReviews}
                  stats={reviewsStats}
                  onWriteReview={() => setIsReviewFormOpen(true)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Похожие товары */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Похожие клавиатуры</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                title={product.title}
                brand={product.brand}
                price={product.price}
                rating={product.rating}
                reviewCount={product.reviewCount}
                image={product.image}
                inStock={product.inStock}
              />
            ))}
          </div>
        </div>

        {/* Модальное окно с формой отзыва */}
        {isReviewFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsReviewFormOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-xl font-bold mb-6">Оставить отзыв о товаре</h2>
              
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      return (
                        <button 
                          key={star} 
                          type="button"
                          className="text-yellow-400 focus:outline-none"
                        >
                          <svg className="-ml-1 mr-2 h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="advantages" className="block text-sm font-medium text-gray-700 mb-1">Преимущества</label>
                  <textarea
                    id="advantages"
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="disadvantages" className="block text-sm font-medium text-gray-700 mb-1">Недостатки</label>
                  <textarea
                    id="disadvantages"
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                  <textarea
                    id="comment"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
                  <div className="mt-1 flex items-center">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      Загрузить фото
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => setIsReviewFormOpen(false)}
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Отправить
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductPage;