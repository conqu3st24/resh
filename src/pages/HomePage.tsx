import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, FireIcon, ClockIcon, ChevronLeftIcon, PlayIcon, ShieldCheckIcon, TruckIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { fetchPlayers } from '../store/slices/playerSlice';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import BrandSlider from '../components/BrandSlider';
import BlogSection from '../components/BlogSection';
import RecentlyViewed from '../components/RecentlyViewed';
import StreamerSection from '../components/StreamerSection';
import ToolPromoSection from '../components/ToolPromoSection';
import CategoryMenu from '../components/CategoryMenu';
import { categoryImages } from '../assets/imageData';

// Моковые данные для категорий
const categories = [
  {
    id: 1,
    name: 'Мышки',
    image: 'https://images.unsplash.com/photo-1613141411244-0e4ac259d217',
    slug: 'mice'
  },
  {
    id: 2,
    name: 'Коврики',
    image: 'https://images.unsplash.com/photo-1629429407756-446d68174e27',
    slug: 'mousepads'
  },
  {
    id: 3,
    name: 'Клавиатуры',
    image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d35a',
    slug: 'keyboards'
  },
  {
    id: 4,
    name: 'Гайды/Трипсы',
    image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d35a',
    slug: 'guides'
  },
  {
    id: 5,
    name: 'Наушники',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    slug: 'headphones'
  },
  {
    id: 6,
    name: 'Микрофоны',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc',
    slug: 'microphones'
  },
  {
    id: 7,
    name: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e4',
    slug: 'accessories'
  }
];

// Моковые данные для истории просмотров
const viewHistory = [
  {
    id: 101,
    title: 'Ergohaven Planeta V2 Galaxy Black',
    image: 'https://maxgaming.com/img/cms/Glorious/Glorious_PC_Gaming_Race_GMMK_Pro_Black_Slate_ISO_1.jpg',
    price: 8200,
    date: '2 часа назад',
    category: 'Клавиатуры'
  },
  {
    id: 102,
    title: 'Hana Glass Mousepad',
    image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Mousepad_1.jpg',
    price: 3400,
    date: 'сегодня',
    category: 'Коврики'
  },
  {
    id: 103,
    title: 'Varmilo Koi — Overshadow the Flow',
    image: 'https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Deskmat_1.jpg',
    price: 12900,
    date: 'вчера',
    category: 'Клавиатуры'
  }
];

// Моковые данные для хитов продаж
const hotProducts = [
  {
    id: 5,
    title: 'Razer DeathAdder V3 Pro',
    brand: 'Razer',
    price: 9000,
    oldPrice: 12000,
    rating: 4.8,
    reviewCount: 230,
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg',
    discount: 25,
    inStock: true,
    colors: [
      { id: 1, name: 'Черный', hex: '#000000' },
      { id: 2, name: 'Белый', hex: '#FFFFFF' }
    ]
  },
  {
    id: 6,
    title: 'SteelSeries Arctis Pro',
    brand: 'SteelSeries',
    price: 14000,
    rating: 4.6,
    reviewCount: 180,
    image: 'https://maxgaming.com/img/cms/SteelSeries/Arctis/SteelSeries_Arctis_Pro_Wireless_1.jpg',
    inStock: true,
    colors: [
      { id: 1, name: 'Черный', hex: '#000000' },
      { id: 2, name: 'Белый', hex: '#FFFFFF' },
      { id: 3, name: 'Зеленый', hex: '#00FF00' }
    ]
  },
  {
    id: 7,
    title: 'Logitech G Pro X',
    brand: 'Logitech',
    price: 7500,
    rating: 4.4,
    reviewCount: 150,
    image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X/Logitech_G_PRO_X_Gaming_Headset_1.jpg',
    inStock: true,
    colors: [
      { id: 1, name: 'Черный', hex: '#000000' }
    ]
  },
  {
    id: 8,
    title: 'Ducky One 3',
    brand: 'Ducky',
    price: 11000,
    rating: 4.7,
    reviewCount: 90,
    image: 'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_3.jpg',
    inStock: true,
    colors: [
      { id: 1, name: 'Белый', hex: '#FFFFFF' },
      { id: 2, name: 'Синий', hex: '#0000FF' }
    ]
  },
  {
    id: 9,
    title: 'Razer BlackWidow Lite',
    brand: 'Razer',
    price: 10000,
    rating: 4.5,
    reviewCount: 120,
    image: 'https://maxgaming.com/img/cms/Razer/BlackWidow%20Lite/Razer_BlackWidow_Lite_Mechanical_Gaming_Keyboard_1.jpg',
    inStock: true,
    colors: [
      { id: 1, name: 'Черный', hex: '#000000' }
    ]
  },
  {
    id: 10,
    title: 'HyperX Cloud II',
    brand: 'HyperX',
    price: 8000,
    rating: 4.3,
    reviewCount: 100,
    image: 'https://maxgaming.com/img/cms/HyperX/Cloud%20II/HyperX_Cloud_II_Gaming_Headset_1.jpg',
    inStock: true,
    colors: [
      { id: 1, name: 'Черный', hex: '#000000' }
    ]
  },
  {
    id: 11,
    title: 'Logitech G502 Lightspeed',
    brand: 'Logitech',
    price: 9000,
    rating: 4.6,
    reviewCount: 200,
    image: 'https://maxgaming.com/img/cms/Logitech/G502%20Lightspeed/Logitech_G502_Lightspeed_Wireless_Gaming_Mouse_1.jpg',
    inStock: true,
    colors: [
      { id: 1, name: 'Черный', hex: '#000000' }
    ]
  },
  {
    id: 12,
    title: 'SteelSeries Rival 600',
    brand: 'SteelSeries',
    price: 10000,
    rating: 4.5,
    reviewCount: 150,
    image: 'https://maxgaming.com/img/cms/SteelSeries/Rival%20600/SteelSeries_Rival_600_Wireless_Gaming_Mouse_1.jpg',
    inStock: true,
    colors: [
      { id: 1, name: 'Черный', hex: '#000000' }
    ]
  }
];

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [currentHotSlide, setCurrentHotSlide] = useState(0);
  const totalHotSlides = 3; // Определяем общее количество слайдов
  
  // Функция для перехода к следующему слайду
  const nextHotSlide = () => {
    setCurrentHotSlide((prev) => (prev === totalHotSlides - 1 ? 0 : prev + 1));
  };
  
  // Функция для перехода к предыдущему слайду
  const prevHotSlide = () => {
    setCurrentHotSlide((prev) => (prev === 0 ? totalHotSlides - 1 : prev - 1));
  };

  // Загружаем данные стримеров при монтировании компонента
  useEffect(() => {
    dispatch(fetchPlayers() as any);
  }, [dispatch]);

  // Выбор стримеров
  const streamerPicks = [
    {
      id: 1,
      name: 'Братишкин (тутутуу)',
      image: '/images/streamers/bratishkin.jpg',
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
          image: 'https://maxgaming.com/img/cms/HyperX/Cloud%20Alpha/HyperX_Cloud_Alpha_Gaming_Headset_1.jpg'
        }
      ]
    },
    {
      id: 2,
      name: 'Evelone192',
      image: '/images/streamers/evelone.jpg',
      products: [
        {
          id: 201,
          name: 'Logitech G PRO X Keyboard',
          brand: 'Logitech',
          image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X/Logitech_G_PRO_X_Mechanical_Gaming_Keyboard_1.jpg'
        },
        {
          id: 202,
          name: 'SteelSeries Arctis Pro',
          brand: 'SteelSeries',
          image: 'https://maxgaming.com/img/cms/SteelSeries/Arctis/SteelSeries_Arctis_Pro_Wireless_1.jpg'
        }
      ]
    }
  ];

  // Данные для блога
  const blogPosts = [
    {
      id: 1,
      title: 'Как выбрать идеальную игровую мышь: полное руководство 2024',
      description: 'Выбор игровой мыши может оказаться сложной задачей из-за огромного количества...',
      image: 'https://images.unsplash.com/photo-1613141411244-0e4ac259d217',
      category: 'Обзор',
      date: '15 марта 2024',
      readTime: '10 мин чтения',
      slug: 'kak-vybrat-idealnuyu-igrovuyu-mysh-2024',
      author: {
        name: 'Алексей Петров',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: 2,
      title: 'Как выбрать клавиатуру за 10 минут',
      description: 'Простой гайд по выбору механической клавиатуры без лишних сложностей',
      image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d35a',
      category: 'Гайд',
      date: '10 марта 2024',
      readTime: '5 мин чтения',
      slug: 'kak-vybrat-klaviaturu-za-10-minut',
      author: {
        name: 'Алексей Петров',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: 3,
      title: 'NuPhy: механика в стиле Apple',
      description: 'Из гаража до собственного бренда: история и обзор популярных моделей',
      image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d35a',
      category: 'Обзор',
      date: '5 марта 2024',
      readTime: '8 мин чтения',
      slug: 'nuphy-mehanika-v-stile-apple',
      author: {
        name: 'Мария Иванова',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    }
  ];

  return (
    <main className="home-page bg-[#E3E7F0]">
      {/* Главный слайдер */}
      <Hero />
      
      {/* Блок преимуществ */}
      <Features />
      
      {/* Категории товаров */}
      <CategoryMenu categories={categories} />
      
      {/* Хиты продаж */}
      <section className="py-6 md:py-10 lg:py-16 bg-[#E3E7F0]">
        <motion.div 
          className="container px-4 md:px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex justify-between items-center mb-4 md:mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FireIcon className="h-5 w-5 md:h-6 md:w-6 text-primary mr-2" />
              </motion.div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary font-century">Хиты продаж</h2>
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/catalog/hot" className="text-primary hover:text-primary/80 flex items-center text-xs md:text-sm font-medium transition-colors group">
                <span className="group-hover:mr-1 transition-all">Смотреть все</span>
                <ChevronRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Индикаторы */}
          <motion.div 
            className="flex space-x-2 mb-4 md:mb-8"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "auto", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {Array.from({ length: totalHotSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHotSlide(index)}
                className={`h-1 rounded-full transition-all ${
                  currentHotSlide === index ? 'w-16 md:w-24 bg-primary' : 'w-8 md:w-12 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </motion.div>
          
          <div className="relative">
            {/* Мобильные навигационные кнопки - видны только на мобильных */}
            <div className="flex justify-between mb-4 sm:hidden">
              <button 
                onClick={prevHotSlide}
                className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Предыдущие товары"
              >
                <ChevronLeftIcon className="h-4 w-4 text-secondary" />
              </button>
              
              <button 
                onClick={nextHotSlide}
                className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Следующие товары"
              >
                <ChevronRightIcon className="h-4 w-4 text-secondary" />
              </button>
            </div>
            
            {/* Десктопные навигационные кнопки - видны только на десктопе */}
            <button 
              onClick={prevHotSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary hidden sm:block"
              aria-label="Предыдущие товары"
            >
              <ChevronLeftIcon className="h-6 w-6 text-secondary" />
            </button>
            
            <button 
              onClick={nextHotSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary hidden sm:block"
              aria-label="Следующие товары"
            >
              <ChevronRightIcon className="h-6 w-6 text-secondary" />
            </button>
            
            {/* Карусель товаров */}
            <div className="overflow-hidden">
              <motion.div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentHotSlide * 100}%)` }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Первый слайд */}
                <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {hotProducts.slice(0, 4).map((product, index) => (
                    <motion.div
                      key={`slide1-${product.id}`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            type: "spring",
                            damping: 15,
                            stiffness: 100
                          }
                        }
                      }}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.2 }
                      }}
                      custom={index}
                    >
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
                        inStock={product.inStock}
                        colors={product.colors}
                        className="h-full"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Второй слайд */}
                <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {hotProducts.slice(4, 8).map((product, index) => (
                    <motion.div
                      key={`slide2-${product.id}`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            type: "spring",
                            damping: 15,
                            stiffness: 100
                          }
                        }
                      }}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.2 }
                      }}
                      custom={index}
                    >
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
                        inStock={product.inStock}
                        colors={product.colors}
                        className="h-full"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Третий слайд */}
                <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {hotProducts.slice(8, 12).map((product, index) => (
                    <motion.div
                      key={`slide3-${product.id}`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            type: "spring",
                            damping: 15,
                            stiffness: 100
                          }
                        }
                      }}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.2 }
                      }}
                      custom={index}
                    >
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
                        inStock={product.inStock}
                        colors={product.colors}
                        className="h-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Мобильные навигационные кнопки (отображаются только на мобильных устройствах) */}
            <div className="flex justify-center mt-4 sm:hidden">
              <button 
                onClick={prevHotSlide}
                className="mx-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Предыдущие товары"
              >
                <ChevronLeftIcon className="h-5 w-5 text-secondary" />
              </button>
              
              <button 
                onClick={nextHotSlide}
                className="mx-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Следующие товары"
              >
                <ChevronRightIcon className="h-5 w-5 text-secondary" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Секция со стримерами */}
      <StreamerSection />
      
      {/* Секция с инструментом для подбора */}
      <ToolPromoSection />
      
      {/* Блог */}
      <BlogSection />

      <BrandSlider />
    </main>
  );
};

export default HomePage; 
