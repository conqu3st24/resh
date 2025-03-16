import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Flag, ChevronDown, ChevronUp } from 'lucide-react';

interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
  likes: number;
  userLiked: boolean;
  images?: string[];
}

interface ProductReviewsProps {
  productId: number;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingsDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviews,
  averageRating,
  totalReviews,
  ratingsDistribution,
}) => {
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filter, setFilter] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  // Function to toggle review expansion
  const toggleReviewExpansion = (reviewId: number) => {
    const newExpandedReviews = new Set(expandedReviews);
    if (expandedReviews.has(reviewId)) {
      newExpandedReviews.delete(reviewId);
    } else {
      newExpandedReviews.add(reviewId);
    }
    setExpandedReviews(newExpandedReviews);
  };

  // Function to handle sorting reviews
  const sortReviews = (reviews: Review[]) => {
    switch (sortBy) {
      case 'newest':
        return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'highest':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return [...reviews].sort((a, b) => b.likes - a.likes);
      default:
        return reviews;
    }
  };

  // Function to filter reviews by rating
  const filterReviews = (reviews: Review[]) => {
    if (filter === null) return reviews;
    return reviews.filter(review => review.rating === filter);
  };

  // Function to format review date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Get percent of each rating
  const getRatingPercent = (ratingValue: number) => {
    if (totalReviews === 0) return 0;
    return (ratingsDistribution[ratingValue as keyof typeof ratingsDistribution] / totalReviews) * 100;
  };

  // Filtered and sorted reviews
  const processedReviews = sortReviews(filterReviews(reviews));

  return (
    <div className="mt-8 bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Отзывы покупателей</h2>

      {/* Reviews summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Overall rating */}
        <div className="flex flex-col items-center justify-center border-r border-gray-200 pr-6">
          <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <div className="text-sm text-gray-500">{totalReviews} {totalReviews % 10 === 1 && totalReviews % 100 !== 11 ? 'отзыв' : (totalReviews % 10 >= 2 && totalReviews % 10 <= 4 && (totalReviews % 100 < 10 || totalReviews % 100 >= 20) ? 'отзыва' : 'отзывов')}</div>
        </div>

        {/* Rating distribution */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-3">Распределение оценок</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <button 
                  className={`flex items-center w-16 ${filter === rating ? 'font-semibold text-blue-600' : ''}`} 
                  onClick={() => setFilter(filter === rating ? null : rating)}
                >
                  {rating} <Star className="w-3 h-3 ml-1 inline" fill={filter === rating ? "currentColor" : "none"} />
                </button>
                <div className="relative flex-1 h-5 bg-gray-100 rounded-full overflow-hidden ml-3 mr-3">
                  <div 
                    className="absolute left-0 top-0 h-full bg-yellow-400" 
                    style={{ width: `${getRatingPercent(rating)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 w-10 text-right">
                  {ratingsDistribution[rating as keyof typeof ratingsDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls for sorting and filtering */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Сортировать по:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="newest">Сначала новые</option>
            <option value="highest">Сначала высокие оценки</option>
            <option value="lowest">Сначала низкие оценки</option>
            <option value="helpful">По полезности</option>
          </select>
        </div>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Написать отзыв
        </button>
      </div>

      {/* Review form */}
      {showReviewForm && (
        <div className="mb-8 border rounded-lg p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Оставить отзыв</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="rating">
                Ваша оценка <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    key={value}
                    type="button"
                    className="p-1"
                    aria-label={`Rate ${value} stars`}
                  >
                    <Star className="w-6 h-6 text-gray-300 hover:text-yellow-400" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                Заголовок <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Кратко о вашем опыте использования"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="content">
                Отзыв <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Поделитесь своими впечатлениями о товаре"
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pros">
                Достоинства
              </label>
              <textarea
                id="pros"
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Что вам понравилось в товаре?"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cons">
                Недостатки
              </label>
              <textarea
                id="cons"
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Что можно было бы улучшить?"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Фотографии
              </label>
              <div className="mt-1 flex items-center">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Загрузить фото
                </button>
                <span className="ml-2 text-xs text-gray-500">До 5 фотографий</span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowReviewForm(false)}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отправить отзыв
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews list */}
      {processedReviews.length > 0 ? (
        <div className="space-y-6">
          {processedReviews.map(review => {
            const isExpanded = expandedReviews.has(review.id);
            const needsExpansion = review.content.length > 300;
            
            return (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start">
                  {/* Avatar */}
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      {review.userAvatar ? (
                        <img 
                          src={review.userAvatar} 
                          alt={review.userName} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Review content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-medium mr-2">{review.userName}</span>
                      <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                    </div>
                    
                    <div className="flex mb-2">
                      {renderStars(review.rating)}
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
                    
                    <div className="text-gray-700 mb-3">
                      {needsExpansion && !isExpanded ? (
                        <>
                          <p>{review.content.substring(0, 300)}...</p>
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1"
                            onClick={() => toggleReviewExpansion(review.id)}
                          >
                            Читать полностью
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </button>
                        </>
                      ) : (
                        <>
                          <p>{review.content}</p>
                          {needsExpansion && (
                            <button
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1"
                              onClick={() => toggleReviewExpansion(review.id)}
                            >
                              Свернуть
                              <ChevronUp className="w-4 h-4 ml-1" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    
                    {(review.pros || review.cons) && (
                      <div className="space-y-2 mb-4">
                        {review.pros && (
                          <div>
                            <div className="text-sm font-medium text-green-600 mb-1">Достоинства:</div>
                            <p className="text-sm text-gray-700">{review.pros}</p>
                          </div>
                        )}
                        
                        {review.cons && (
                          <div>
                            <div className="text-sm font-medium text-red-600 mb-1">Недостатки:</div>
                            <p className="text-sm text-gray-700">{review.cons}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Review images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {review.images.map((image, index) => (
                          <div key={index} className="w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src={image}
                              alt={`Фото к отзыву ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Review actions */}
                    <div className="flex items-center space-x-4 mt-2">
                      <button className={`flex items-center text-sm ${review.userLiked ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        <ThumbsUp className="w-4 h-4 mr-1" fill={review.userLiked ? "currentColor" : "none"} />
                        <span>{review.likes > 0 ? review.likes : 'Полезно'}</span>
                      </button>
                      
                      <button className="flex items-center text-sm text-gray-500 hover:text-red-600">
                        <Flag className="w-4 h-4 mr-1" />
                        <span>Пожаловаться</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Пока нет отзывов</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            Будьте первым, кто оставит отзыв об этом товаре и поможет другим покупателям с выбором.
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Написать отзыв
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
