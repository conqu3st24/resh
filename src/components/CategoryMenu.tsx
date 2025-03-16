import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface CategoryProps {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface CategoryMenuProps {
  categories: CategoryProps[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories }) => {
  // Состояние для отслеживания ошибок загрузки изображений для каждой категории
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Обработчик ошибки загрузки изображения
  const handleImageError = (categoryId: number) => {
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true
    }));
  };
  
  // Получаем финальный URL изображения для категории
  const getCategoryImageUrl = (category: CategoryProps) => {
    if (imageErrors[category.id]) {
      // Используем локальную заглушку при ошибке
      return '/images/categories/fallback.svg';
    }
    return category.image;
  };

  return (
    <section className="py-4 md:py-8 bg-[#E3E7F0]">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary font-century">Категории товаров</h2>
          <div>
            <Link to="/catalog" className="text-primary hover:text-primary/80 flex items-center text-xs md:text-sm font-medium transition-colors group">
              <span className="group-hover:mr-1 transition-all">Все категории</span>
              <ChevronRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
            >
              <Link 
                to={`/catalog/${category.slug}`} 
                className="block bg-white rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-3px] transition-all duration-200 overflow-hidden flex flex-col items-center text-center p-2 md:p-3"
              >
                <div className="h-14 w-14 md:h-20 md:w-20 mb-1 md:mb-2 flex items-center justify-center">
                  <img 
                    src={getCategoryImageUrl(category)} 
                    alt={category.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    onError={() => handleImageError(category.id)}
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-700">{category.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
