import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  ClockIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { blogPosts } from '../data/blogPosts';
import { BlogPost, BlogCategory, BlogFilter } from '../types/blog';

// Обновляем данные для соответствия скриншоту
const updatedBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Как выбрать идеальную игровую мышь: полное руководство 2024",
    excerpt: "Выбор игровой мыши может оказаться сложной задачей из-за огромного количества вариантов на рынке. В этом руководстве мы рассмотрим все важные аспекты: от сенсоров и DPI до формы и веса, чтобы помочь вам найти идеальную мышь для вашего стиля игры.",
    content: "Полный текст статьи о выборе игровой мыши...",
    image: "https://maxgaming.com/img/cms/Pulsar/Pulsar_X2_Mini_Wireless_Red_1.jpg",
    publishDate: "15 марта 2024",
    readTime: "10 мин чтения",
    category: "Обзор",
    slug: "how-to-choose-gaming-mouse-2024",
    author: {
      name: "Алексей Петров",
      avatar: "https://i.pravatar.cc/300?img=1"
    },
    isFeatured: true
  },
  {
    id: 2,
    title: "Как выбрать клавиатуру за 10 минут",
    excerpt: "Простой гайд по выбору механической клавиатуры без лишних сложностей",
    content: "Полный текст статьи о выборе клавиатуры...",
    image: "https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg",
    publishDate: "10 марта 2024",
    readTime: "5 мин чтения",
    category: "Гайд",
    slug: "how-to-choose-keyboard-in-10-minutes",
    author: {
      name: "Алексей Петров",
      avatar: "https://i.pravatar.cc/300?img=1"
    }
  },
  {
    id: 3,
    title: "NuPhy: механика в стиле Apple",
    excerpt: "Из гаража до собственного бренда: история и обзор популярных моделей",
    content: "Полный текст статьи о NuPhy...",
    image: "https://maxgaming.com/img/cms/NuPhy/NuPhy_Air75_V2_Mint_1.jpg",
    publishDate: "5 марта 2024",
    readTime: "8 мин чтения",
    category: "Обзор",
    slug: "nuphy-apple-style-mechanical-keyboards",
    author: {
      name: "Мария Иванова",
      avatar: "https://i.pravatar.cc/300?img=5"
    }
  },
  {
    id: 4,
    title: "Это база: четыре незаменимых инструмента для обладателей клавиатуры",
    excerpt: "Рассказываем о том, что должно быть в арсенале каждого владельца механической клавиатуры",
    content: "Полный текст статьи об инструментах...",
    image: "https://maxgaming.com/img/cms/Keychron/Keychron_Q1_Pro_Carbon_Black_1.jpg",
    publishDate: "28 февраля 2024",
    readTime: "7 мин чтения",
    category: "Советы",
    slug: "essential-tools-for-keyboard-owners",
    author: {
      name: "Дмитрий Сидоров",
      avatar: "https://i.pravatar.cc/300?img=7"
    }
  },
  {
    id: 5,
    title: "Топ-5 лучших клавиатур 2024 года",
    excerpt: "Обзор самых популярных и качественных клавиатур этого года",
    content: "Полный текст статьи о лучших клавиатурах...",
    image: "https://maxgaming.com/img/cms/Keychron/Keychron_Q1_Pro_Carbon_Black_1.jpg",
    publishDate: "20 февраля 2024",
    readTime: "9 мин чтения",
    category: "Рейтинги",
    slug: "top-5-keyboards-2024",
    author: {
      name: "Алексей Петров",
      avatar: "https://i.pravatar.cc/300?img=1"
    }
  },
  {
    id: 6,
    title: "Как настроить свою первую механическую клавиатуру",
    excerpt: "Подробное руководство для новичков в мире механических клавиатур",
    content: "Полный текст статьи о настройке клавиатуры...",
    image: "https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg",
    publishDate: "15 февраля 2024",
    readTime: "12 мин чтения",
    category: "Гайд",
    slug: "how-to-setup-first-mechanical-keyboard",
    author: {
      name: "Мария Иванова",
      avatar: "https://i.pravatar.cc/300?img=5"
    }
  }
];

const BlogPage: React.FC = () => {
  const [filter, setFilter] = useState<BlogFilter>({
    searchQuery: '',
    category: 'Все статьи'
  });
  
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(updatedBlogPosts);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [remainingPosts, setRemainingPosts] = useState<BlogPost[]>([]);

  // Категории блога
  const categories: BlogCategory[] = [
    'Все статьи', 
    'Обзоры', 
    'Гайды', 
    'Новости', 
    'Сравнения', 
    'Советы', 
    'Рейтинги'
  ];

  useEffect(() => {
    // Применение фильтров
    let filtered = [...updatedBlogPosts];
    
    // Фильтрация по поисковому запросу
    if (filter.searchQuery) {
      const searchLower = filter.searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) || 
        post.excerpt.toLowerCase().includes(searchLower)
      );
    }
    
    // Фильтрация по категории
    if (filter.category !== 'Все статьи') {
      filtered = filtered.filter(post => post.category === filter.category);
    }
    
    setFilteredPosts(filtered);
    
    // Установка главной статьи и остальных статей
    const featured = filtered.find(post => post.isFeatured) || (filtered.length > 0 ? filtered[0] : null);
    setFeaturedPost(featured);
    
    if (featured) {
      setRemainingPosts(filtered.filter(post => post.id !== featured.id));
    } else {
      setRemainingPosts(filtered);
    }
  }, [filter]);

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  // Обработчик изменения категории
  const handleCategoryChange = (category: BlogCategory) => {
    setFilter(prev => ({
      ...prev,
      category
    }));
  };

  return (
    <div className="bg-[#E3E7F0] min-h-screen pb-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto pt-12 pb-16">
        {/* Заголовок, подзаголовок и поиск */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#212121] mb-3" style={{ fontFamily: '"Century Gothic", sans-serif', letterSpacing: '-0.478px', fontWeight: 700 }}>
              Блог ReShip
            </h1>
            <p className="text-gray-600 text-lg">
              Новости, обзоры и советы по игровой периферии
            </p>
          </div>
          
          {/* Строка поиска */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Поиск по блогу"
              value={filter.searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Категории */}
        <div className="flex flex-wrap gap-3 mb-14">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                filter.category === category
                  ? 'bg-primary text-white transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Результаты поиска */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: '"Century Gothic", sans-serif' }}>Ничего не найдено</h3>
            <p className="text-gray-600">
              Попробуйте изменить параметры поиска или выбрать другую категорию.
            </p>
          </div>
        ) : (
          <>
            {/* Главная статья */}
            {featuredPost && (
              <div className="mb-14">
                <Link to={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title}
                        className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-primary text-white text-sm rounded-full shadow-sm font-medium">
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <span>{featuredPost.publishDate}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: '"Century Gothic", sans-serif', color: '#212121', letterSpacing: '-0.478px' }}>
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-5 text-lg">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center">
                        <span className="text-primary font-medium group-hover:underline">Читать далее →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            {/* Остальные статьи в сетке */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col hover:shadow-md transition-all duration-300 transform group-hover:translate-y-[-5px]">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-white text-xs rounded-full shadow-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <span>{post.publishDate}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: '"Century Gothic", sans-serif', color: '#212121', letterSpacing: '-0.478px' }}>
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center mt-auto">
                        <span className="text-primary font-medium text-sm group-hover:underline">Читать далее →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage; 