import React, { useState, useMemo } from 'react';
import { PhotoIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import StarRating from './StarRating';
import ReviewItem from './ReviewItem';
import type { Review, ReviewFilter, ReviewsStats } from '../types/reviews';

interface ReviewsSectionProps {
  productId: number;
  reviews: Review[];
  stats: ReviewsStats;
  onWriteReview?: () => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  productId,
  reviews,
  stats,
  onWriteReview
}) => {
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');
  
  const filteredReviews = useMemo(() => {
    switch (activeFilter) {
      case 'with-photos':
        return reviews.filter(review => review.photos.length > 0);
      case 'positive':
        return reviews.filter(review => review.rating >= 4);
      case 'negative':
        return reviews.filter(review => review.rating <= 2);
      default:
        return reviews;
    }
  }, [reviews, activeFilter]);

  return (
    <div className="reviews-section bg-white rounded-lg shadow-sm">
      {/* Заголовок и общая статистика */}
      <div className="mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">{stats.totalCount} Отзывов</div>
          <div className="text-4xl font-bold mb-2">{stats.averageRating.toFixed(1)}</div>
          <div className="flex justify-center">
            <StarRating rating={stats.averageRating} size="lg" />
          </div>
        </div>
      </div>
      
      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          Все
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1 ${
            activeFilter === 'with-photos' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('with-photos')}
        >
          <PhotoIcon className="w-4 h-4" />
          Фото
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            activeFilter === 'positive' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('positive')}
        >
          Положительные
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            activeFilter === 'negative' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter('negative')}
        >
          Отрицательные
        </button>
      </div>
      
      {/* Список отзывов */}
      <div className="space-y-1">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div className="py-8 text-center">
            <div className="text-gray-500 mb-2">Отзывов с выбранными параметрами не найдено</div>
            <button 
              className="text-primary font-medium"
              onClick={() => setActiveFilter('all')}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
      
      {/* Кнопка "Показать больше" */}
      {filteredReviews.length > 0 && filteredReviews.length < stats.totalCount && (
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
            Показать больше отзывов
          </button>
        </div>
      )}
      
      {/* Кнопка "Оставить отзыв" */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Уже пользовались этим товаром?</h3>
          <p className="text-gray-500 mb-4">Поделитесь своим мнением с другими покупателями</p>
          <button 
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            onClick={onWriteReview}
          >
            Оставить отзыв
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;