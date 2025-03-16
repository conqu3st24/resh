import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/outline';

// Типы данных
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  slug: string;
}

// Выносим SVG в отдельные компоненты для улучшения читаемости
const ArrowLeft = () => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L1 7L7 13" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 13L7 7L1 1" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightSmall = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
    <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Выносим данные в верхний уровень файла для оптимизации повторных рендеров
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Как быстро стать крутым",
    excerpt: "Расскажем за 5 минут, что и как для этого делать!",
    image: "https://maxgaming.com/img/cms/Pulsar/Pulsar_X2_Mini_Wireless_Red_1.jpg",
    category: "Карьера",
    readTime: "5-7 минут",
    slug: "how-to-become-cool"
  },
  {
    id: 2,
    title: "Как ухаживать за клавиатурой",
    excerpt: "Расскажем в небольшой статье о лайфхаках",
    image: "https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg",
    category: "Клавиатуры",
    readTime: "5-7 минут",
    slug: "keyboard-maintenance-tips"
  },
  {
    id: 3,
    title: "Тест нового игрового монитора",
    excerpt: "Обзор новинки рынка: характеристики и впечатления",
    image: "https://maxgaming.com/img/cms/NuPhy/NuPhy_Air75_V2_Mint_1.jpg",
    category: "Мониторы",
    readTime: "7-10 минут",
    slug: "new-gaming-monitor-test"
  },
  {
    id: 4,
    title: "Выбираем мышь для работы",
    excerpt: "Советы и рекомендации для длительного комфорта",
    image: "https://maxgaming.com/img/cms/Mouse/Roccat/Roccat_Kain_120_AIMO_White_1.jpg",
    category: "Периферия",
    readTime: "5-7 минут",
    slug: "choosing-work-mouse"
  }
];

// Создаем отдельный компонент для карточки блога
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block w-full lg:w-[475px] group">
      <div className="flex flex-col gap-2">
        {/* Изображение */}
        <div className="h-[150px] sm:h-[180px] md:h-[200px] lg:h-[275px] w-full mb-2">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover rounded-lg"
            loading="lazy" // Добавляем ленивую загрузку для оптимизации
          />
        </div>
        
        {/* Информация о статье */}
        <div className="flex flex-col gap-3 md:gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 md:gap-2">
              <h3 className="font-century font-bold text-lg md:text-xl lg:text-2xl text-secondary tracking-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <ArrowRightSmall />
            </div>
            <p className="font-roboto text-xs md:text-sm lg:text-base text-secondary">
              {post.excerpt}
            </p>
          </div>
          
          {/* Метки */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-2 md:px-3 py-1 md:py-1.5 border border-[#2D2D2E] md:border-2 rounded-lg">
              <span className="font-roboto font-medium text-xs lg:text-sm text-secondary">{post.category}</span>
            </div>
            <div className="px-2 md:px-2.5 py-1 md:py-1.5 border border-[#2D2D2E] md:border-2 rounded-lg flex items-center gap-1">
              <ClockIcon className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
              <span className="font-inter font-semibold text-xs lg:text-sm text-secondary">{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Мемоизируем видимые посты для предотвращения ненужных вычислений при ререндерах
  const visiblePosts = useMemo(() => 
    blogPosts.slice(currentIndex, currentIndex + 2), 
    [currentIndex]
  );
  
  // Мемоизируем обработчики для предотвращения создания новых функций при ререндерах
  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);
  
  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(blogPosts.length - 2, prev + 1));
  }, []);

  // Определяем состояние кнопок с помощью useMemo
  const isPrevDisabled = useMemo(() => currentIndex === 0, [currentIndex]);
  const isNextDisabled = useMemo(() => currentIndex >= blogPosts.length - 2, [currentIndex]);

  return (
    <section className="relative py-6 md:py-10 lg:py-16 bg-[#E3E7F0]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Левая часть: заголовок, ссылка и навигация */}
          <div className="w-full lg:w-[355px] mb-6 md:mb-8 lg:mb-0 lg:mr-20">
            <div className="flex flex-col gap-2 md:gap-4 mb-6 md:mb-10 lg:mb-16">
              <h2 className="font-century font-bold text-2xl md:text-3xl lg:text-4xl text-primary tracking-tight">
                Блог
              </h2>
              <Link to="/blog" className="font-roboto font-medium text-sm md:text-base underline text-secondary">
                Перейти ко всем статьям
              </Link>
            </div>
            
            {/* Кнопки навигации */}
            <div className="flex gap-2 md:gap-2.5">
              <button 
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className={`flex justify-center items-center w-[36px] h-[36px] md:w-[46px] md:h-[46px] rounded-full border md:border-2 border-black transition-opacity ${isPrevDisabled ? 'opacity-50' : 'hover:opacity-80'}`}
                aria-label="Предыдущая статья"
              >
                <ArrowLeft />
              </button>
              <button 
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`flex justify-center items-center w-[36px] h-[36px] md:w-[46px] md:h-[46px] rounded-full border md:border-2 border-black transition-opacity ${isNextDisabled ? 'opacity-50' : 'hover:opacity-80'}`}
                aria-label="Следующая статья"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
          
          {/* Правая часть: карточки блога */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 flex-1">
            {visiblePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BlogSection); 