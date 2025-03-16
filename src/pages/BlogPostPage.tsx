import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, UserIcon, CalendarIcon, ShareIcon } from '@heroicons/react/24/outline';
import { blogPosts } from '../data/blogPosts';
import { BlogPost } from '../types/blog';
import '../styles/blog.css';

// Компонент для формат-фактора (как в примере)
interface FormFactor {
  id: string;
  title: string;
  percentage: string;
  description: string;
  image: string;
}

// Моковые данные для формат-факторов клавиатуры
const formFactors: FormFactor[] = [
  {
    id: "full",
    title: "Полноразмерные клавиатуры",
    percentage: "100%",
    description: "Если пользуетесь цифровым блоком каждый день",
    image: "https://maxgaming.com/img/cms/Keychron/Keychron_Q5_Pro_Carbon_Black_1.jpg",
  },
  {
    id: "tkl",
    title: "TKL (без цифрового блока)",
    percentage: "80%",
    description: "Компактнее, но сохраняют все основные клавиши",
    image: "https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg",
  },
  {
    id: "65",
    title: "65% клавиатуры",
    percentage: "65-60%",
    description: "Максимально компактные, но функциональные",
    image: "https://maxgaming.com/img/cms/GMK%2067%20Lite/GMK_67_Lite_V2_Black_1.jpg",
  },
];

// Моковые данные для рекомендуемых статей
const recommendedPosts: BlogPost[] = [
  {
    id: 101,
    title: "Как выбрать свитчи для механической клавиатуры",
    excerpt: "Подробный гайд по типам переключателей и их характеристикам",
    content: "",
    image: "https://maxgaming.com/img/cms/Keychron/Keychron_Q1_Pro_Carbon_Black_1.jpg",
    publishDate: "25 февраля 2024",
    readTime: "8 мин чтения",
    category: "Гайд",
    slug: "how-to-choose-switches",
    author: {
      name: "Алексей Петров",
      avatar: "https://i.pravatar.cc/300?img=1"
    }
  },
  {
    id: 102,
    title: "Лучшие коврики для мыши 2024",
    excerpt: "Обзор самых популярных ковриков для разных стилей игры",
    content: "",
    image: "https://maxgaming.com/img/cms/Varmilo/Varmilo_Sakura_Mousepad_1.jpg",
    publishDate: "18 февраля 2024",
    readTime: "6 мин чтения",
    category: "Обзор",
    slug: "best-mousepads-2024",
    author: {
      name: "Мария Иванова",
      avatar: "https://i.pravatar.cc/300?img=5"
    }
  },
  {
    id: 103,
    title: "Как правильно чистить механическую клавиатуру",
    excerpt: "Пошаговая инструкция по уходу за клавиатурой",
    content: "",
    image: "https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg",
    publishDate: "10 февраля 2024",
    readTime: "7 мин чтения",
    category: "Советы",
    slug: "how-to-clean-mechanical-keyboard",
    author: {
      name: "Дмитрий Сидоров",
      avatar: "https://i.pravatar.cc/300?img=7"
    }
  }
];

// Заполнитель для контента статьи
const dummyContent = `
<h2>Введение</h2>
<p>Выбор игровой мыши может оказаться сложной задачей из-за огромного количества вариантов на рынке. Независимо от того, играете ли вы в шутеры от первого лица, стратегии в реальном времени или MOBA, правильная мышь может значительно улучшить ваш игровой опыт.</p>

<p>В этом руководстве мы рассмотрим все важные аспекты: от сенсоров и DPI до формы и веса, чтобы помочь вам найти идеальную мышь для вашего стиля игры.</p>

<h2>На что обращать внимание при выборе игровой мыши</h2>

<h3>1. Тип сенсора</h3>
<p>Современные игровые мыши используют оптические или лазерные сенсоры. Оптические сенсоры обычно предпочтительнее для игр, поскольку они обеспечивают более точное отслеживание и работают практически на любой поверхности.</p>

<h3>2. DPI/CPI и чувствительность</h3>
<p>DPI (точек на дюйм) или CPI (количество отсчетов на дюйм) определяет, насколько чувствительна мышь. Высокий DPI означает, что курсор перемещается на большее расстояние при небольшом движении мыши. Для большинства игроков диапазон от 800 до 3200 DPI вполне достаточен, хотя многие мыши предлагают гораздо более высокий DPI.</p>

<h3>3. Частота опроса</h3>
<p>Частота опроса измеряется в герцах (Гц) и указывает, как часто мышь сообщает о своем положении компьютеру. Более высокая частота опроса (1000 Гц) означает меньшую задержку, что важно для соревновательных игр.</p>

<h3>4. Форма и размер</h3>
<p>Выбор формы и размера мыши зависит от размера вашей руки и предпочтительного хвата. Существует три основных типа хвата:</p>
<ul>
  <li><strong>Хват ладонью (Palm grip):</strong> Вся ладонь лежит на мыши. Подходит для мышей большего размера.</li>
  <li><strong>Хват когтем (Claw grip):</strong> Пальцы изогнуты, как когти, только подушечки касаются кнопок. Подходит для мышей среднего размера.</li>
  <li><strong>Хват пальцами (Fingertip grip):</strong> Только кончики пальцев касаются мыши. Подходит для маленьких и легких мышей.</li>
</ul>

<h3>5. Вес</h3>
<p>Вес мыши — это вопрос личных предпочтений, но в последнее время наблюдается тенденция к использованию более легких мышей, особенно для шутеров, где важны быстрые движения.</p>

<h3>6. Проводные или беспроводные</h3>
<p>Современные беспроводные игровые мыши практически не уступают проводным в плане производительности, но они дороже и требуют зарядки. Проводные мыши надежны, не требуют зарядки и обычно дешевле.</p>

<blockquote>
  <p>Помните, что самая дорогая мышь не обязательно является лучшей для вас. Важно найти ту, которая соответствует вашему стилю игры, размеру руки и личным предпочтениям.</p>
</blockquote>
`;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Находим статью по slug
    const foundPost = blogPosts.find(post => post.slug === slug);
    console.log('Looking for post with slug:', slug);
    console.log('Found post:', foundPost);
    
    if (foundPost) {
      // Заполняем контент-заглушкой, если это демо
      setPost({
        ...foundPost,
        content: dummyContent
      });
    } else {
      // Если статья не найдена, перенаправляем на страницу блога
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3E7F0]">
        <div className="animate-pulse text-primary">Загрузка...</div>
      </div>
    );
  }

  // Проверяем, касается ли пост клавиатур (для демонстрации секции формат-факторов)
  const isKeyboardPost = post.title.toLowerCase().includes('клавиатур');

  return (
    <div className="min-h-screen bg-[#E3E7F0]">
      {/* Заголовок и фото */}
      <div className="w-full bg-[#E3E7F0] pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Кнопка назад */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Назад к блогу
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Мета-информация */}
            <div className="mb-5">
              <span className="inline-block px-4 py-1.5 bg-primary text-white text-sm rounded-full shadow-sm mb-5 font-medium">
                {post.category}
              </span>
            </div>

            {/* Заголовок статьи */}
            <h1 className="text-4xl md:text-5xl font-bold mb-5" 
              style={{ 
                fontFamily: '"Century Gothic", sans-serif', 
                color: '#212121', 
                letterSpacing: '-0.478px', 
                lineHeight: '1.2' 
              }}
            >
              {post.title}
            </h1>

            {/* Автор и дата */}
            <div className="flex flex-wrap gap-5 items-center text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-2 text-gray-500" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                <span>{post.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Изображение статьи */}
      <div className="relative w-full mx-auto max-w-5xl h-[50vh] rounded-2xl overflow-hidden mb-12 shadow-lg -mt-6">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Содержимое статьи */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-10 md:p-12">
          {/* Текст статьи */}
          <article className="prose prose-lg max-w-none">
            <p className="text-xl font-medium text-gray-700 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="article-content"
            />
          </article>

          {/* Кнопки шаринга */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h4 className="font-medium text-gray-700">Поделиться статьей:</h4>
              <div className="flex space-x-3">
                <button className="p-3 bg-[#E3E7F0] hover:bg-primary hover:text-white rounded-full transition-colors">
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button className="p-3 bg-[#E3E7F0] hover:bg-[#1877F2] hover:text-white rounded-full transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                  </svg>
                </button>
                <button className="p-3 bg-[#E3E7F0] hover:bg-[#1DA1F2] hover:text-white rounded-full transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="p-3 bg-[#E3E7F0] hover:bg-[#0A66C2] hover:text-white rounded-full transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Секция с формат-факторами для статей о клавиатурах */}
        {isKeyboardPost && (
          <section className="max-w-5xl mx-auto mt-16 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[#212121]" style={{ fontFamily: '"Century Gothic", sans-serif' }}>
              По форм-фактору
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formFactors.map((factor) => (
                <div key={factor.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold" style={{ fontFamily: '"Century Gothic", sans-serif', color: '#212121' }}>
                      {factor.title}
                    </h3>
                    <span className="text-primary font-bold">{factor.percentage}</span>
                  </div>
                  <p className="text-gray-600 mb-5">{factor.description}</p>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img 
                      src={factor.image} 
                      alt={factor.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Рекомендуемые статьи */}
        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-[#212121]" style={{ fontFamily: '"Century Gothic", sans-serif' }}>
            Рекомендуем прочитать
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary text-white text-xs rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{post.publishDate}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: '"Century Gothic", sans-serif', color: '#212121' }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
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
        </section>
      </div>
    </div>
  );
};

export default BlogPostPage; 