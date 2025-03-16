import React, { useState } from 'react';
import { EllipsisHorizontalIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import StarRating from './StarRating';
import type { Review } from '../types/reviews';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [unhelpfulCount, setUnhelpfulCount] = useState(review.unhelpfulCount);
  const [userVote, setUserVote] = useState<'helpful' | 'unhelpful' | null>(null);
  
  const handleHelpful = () => {
    if (userVote === 'helpful') {
      setHelpfulCount(helpfulCount - 1);
      setUserVote(null);
    } else {
      if (userVote === 'unhelpful') {
        setUnhelpfulCount(unhelpfulCount - 1);
      }
      setHelpfulCount(helpfulCount + 1);
      setUserVote('helpful');
    }
  };
  
  const handleUnhelpful = () => {
    if (userVote === 'unhelpful') {
      setUnhelpfulCount(unhelpfulCount - 1);
      setUserVote(null);
    } else {
      if (userVote === 'helpful') {
        setHelpfulCount(helpfulCount - 1);
      }
      setUnhelpfulCount(unhelpfulCount + 1);
      setUserVote('unhelpful');
    }
  };

  return (
    <div className="py-6 border-b border-gray-200 last:border-none">
      <div className="flex gap-4">
        {/* Аватар и информация о пользователе */}
        <div className="flex-shrink-0">
          {review.author.avatar ? (
            <img 
              src={review.author.avatar} 
              alt={review.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
              {review.author.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Контент отзыва */}
        <div className="flex-grow">
          {/* Заголовок отзыва и рейтинг */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="font-medium">{review.author.name}</div>
              <div className="text-sm text-gray-500 mt-1">{review.date}</div>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <EllipsisHorizontalIcon className="w-6 h-6" />
              </button>
              
              {/* Выпадающее меню с опциями */}
              {showOptions && (
                <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg py-2 z-10 w-48">
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      setShowOptions(false);
                      // Здесь будет логика для жалобы на отзыв
                    }}
                  >
                    Пожаловаться на отзыв
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Рейтинг */}
          <div className="mb-3">
            <StarRating rating={review.rating} size="sm" />
          </div>
          
          {/* Текст отзыва */}
          <div className="mb-4 text-gray-700 leading-relaxed">
            {review.content}
          </div>
          
          {/* Фотографии */}
          {review.photos.length > 0 && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {review.photos.map(photo => (
                <img 
                  key={photo.id}
                  src={photo.thumbnailUrl} 
                  alt="Фото к отзыву"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                />
              ))}
              {review.photos.length > 4 && (
                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg text-sm font-medium text-gray-600">
                  +{review.photos.length - 4}
                </div>
              )}
            </div>
          )}
          
          {/* Ответ от магазина */}
          {review.response && (
            <div className="mt-4 mb-4 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="font-medium text-primary">Reship</div>
                <div className="text-sm text-gray-500">{review.response.date}</div>
              </div>
              <div className="text-gray-700">
                {review.response.content}
              </div>
            </div>
          )}
          
          {/* Кнопки полезности */}
          <div className="flex items-center space-x-4 mt-2">
            <button 
              onClick={handleHelpful}
              className={`flex items-center space-x-1 text-sm ${userVote === 'helpful' ? 'text-primary' : 'text-gray-500'}`}
            >
              <HandThumbUpIcon className="w-4 h-4" />
              <span>{helpfulCount > 0 ? helpfulCount : 'Полезно'}</span>
            </button>
            <button 
              onClick={handleUnhelpful}
              className={`flex items-center space-x-1 text-sm ${userVote === 'unhelpful' ? 'text-primary' : 'text-gray-500'}`}
            >
              <HandThumbDownIcon className="w-4 h-4" />
              <span>{unhelpfulCount > 0 ? unhelpfulCount : 'Бесполезно'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;