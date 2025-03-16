import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Данные для слайдера
const slides = [
  {
    id: 1,
    title: 'Как поменялись клавиатуры в 2025',
    description: 'О выбранный нами инновационный путь требует от нас анализа форм воздействия. Являясь всего лишь частью общей картины.',
    backgroundImage: 'url(https://images.unsplash.com/photo-1595044426077-d36d9236d35a)',
    link: '/blog/keyboards-2025',
  },
  {
    id: 2,
    title: 'Лучшие мышки 2025 года',
    description: 'Обзор самых инновационных игровых мышек текущего года и их сравнение с предыдущими моделями.',
    backgroundImage: 'url(https://images.unsplash.com/photo-1613141411244-0e4ac259d217)',
    link: '/blog/best-mice-2025',
  },
  {
    id: 3,
    title: 'Топ-5 ковриков для киберспортсменов',
    description: 'Выбор профессионалов: какие коврики используют лучшие игроки на мировой сцене.',
    backgroundImage: 'url(https://images.unsplash.com/photo-1629429407756-446d68174e27)',
    link: '/blog/pro-mousepads-2025',
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundErrors, setBackgroundErrors] = useState<Record<number, boolean>>({});
  
  // Автоматическое переключение слайдов
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Переключение на конкретный слайд
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Обработчик ошибки загрузки фонового изображения
  const handleBackgroundError = (slideId: number) => {
    setBackgroundErrors(prev => ({
      ...prev,
      [slideId]: true
    }));
  };
  
  // Генерация фонового стиля для слайда
  const getSlideBackground = (slideIndex: number) => {
    const slide = slides[slideIndex];
    
    // Если ошибка загрузки или нет фонового изображения - используем градиент
    if (backgroundErrors[slide.id] || !slide.backgroundImage) {
      return 'linear-gradient(135deg, #0A6DFF, #213559)';
    }
    
    return slide.backgroundImage;
  };
  
  return (
    <section className="w-full bg-[#E3E7F0] pt-8 pb-0">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-[13px]" style={{ height: 'auto' }}>
        {/* Левая часть с изображением */}
        <div 
          className="relative flex-grow w-full lg:w-[75%] h-[300px] md:h-[400px] lg:h-[570px] rounded-[7px] overflow-hidden opacity-100 translate-y-0 mb-4 lg:mb-0" 
          style={{ flex: 'none', order: 0 }}
        >
          {/* Фоновое изображение */}
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-[7px]" 
            style={{
              background: getSlideBackground(currentSlide),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'all 0.4s ease-in-out'
            }}
            key={currentSlide}
            onError={() => handleBackgroundError(slides[currentSlide].id)}
          ></div>
          
          {/* Градиентный оверлей */}
          <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 rounded-[7px]"></div>
          
          {/* Контент */}
          <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-[40px]">
            <div className="flex flex-col gap-[20px]">
              <div 
                className="flex flex-col gap-2 md:gap-[18px] max-w-[700px]"
                key={`content-${currentSlide}`}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
              >
                <h1 className="text-xl md:text-3xl lg:text-[42px] font-bold text-white leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                  {slides[currentSlide].title}
                </h1>
                <p className="text-sm md:text-base lg:text-[20px] text-white/90 leading-[1.4] max-w-[600px]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                  {slides[currentSlide].description}
                </p>
              </div>
              
              {/* Кнопка посмотреть */}
              <div className="flex justify-start mt-2 md:mt-[10px]">
                <Link 
                  to={slides[currentSlide].link}
                  className="flex justify-center items-center w-[140px] md:w-[180px] h-[40px] md:h-[54px] rounded-[10px] bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Посмотреть"
                >
                  <span className="text-white font-semibold text-sm md:text-[16px]">Посмотреть</span>
                </Link>
              </div>
            </div>
            
            {/* Индикаторы слайдов */}
            <div className="mt-3 md:mt-[25px] flex items-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-[3px] transition-all duration-300 ${
                    currentSlide === index ? 'w-[32px] md:w-[42px] bg-[#0A6DFF]' : 'w-[10px] md:w-[14px] bg-white/40 hover:bg-white/70'
                  } rounded-full`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Правая часть с советником по подбору */}
        <div 
          className="w-full lg:w-[25%] h-[250px] md:h-[350px] lg:h-[570px] lg:flex-grow-0 lg:flex-shrink-0 transition-all duration-500"
          style={{ order: 1 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Link 
            to="/tools/setup-finder"
            className="rounded-[7px] p-4 md:p-[20px] flex flex-col h-full bg-[#0A6DFF] bg-gradient-to-t from-blue-700 to-blue-500 relative overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Визуальные элементы */}
            <div className="absolute left-0 top-0 w-full h-full opacity-20">
              <div className="absolute rounded-full w-[400px] h-[400px] border-2 border-white/20 left-[-258px] top-[139px]" />
              <div className="absolute rounded-full w-[302px] h-[302px] border-2 border-white/20 left-[-150px] top-[187px]" />
              <div className="absolute rounded-full w-[200px] h-[200px] border-2 border-white/20 left-[-38px] top-[237px]" />
              <div className="absolute rounded-full w-[100px] h-[100px] border-2 border-white/20 left-[63px] top-[287px]" />
            </div>
            
            {/* Основной контент */}
            <div className="flex h-full flex-col justify-between z-10">
              <div>
                <h2 className="text-[28px] font-bold text-white leading-[1.2] tracking-[-0.02em] w-[296px]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                  Не знаете, какое оборудование выбрать?
                </h2>
                
                <div className="mt-[14px] flex flex-col gap-[14px]">
                  <div className="flex items-center gap-[14px]">
                    <span className="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-[7px] text-white font-medium">01</span>
                    <p className="text-[16px] text-white">Ответьте на несколько вопросов</p>
                  </div>
                  
                  <div className="flex items-center gap-[14px]">
                    <span className="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-[7px] text-white font-medium">02</span>
                    <p className="text-[16px] text-white">Получите подборку товаров</p>
                  </div>
                  
                  <div className="flex items-center gap-[14px]">
                    <span className="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-[7px] text-white font-medium">03</span>
                    <p className="text-[16px] text-white">Выбирайте что нравится</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto text-center flex flex-col items-center">
                <div className="mb-[14px] w-[217px] h-[48px] bg-white rounded-[10px] flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105">
                  <span className="font-bold text-[16px] text-[#212121]">
                    Подобрать сетап
                  </span>
                </div>
                
                <p className="text-[14px] text-white/80">
                  Занимает не более 1 минуты
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;