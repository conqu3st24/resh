import React, { useState } from 'react';
import { Star, Edit2, Trash2 } from 'lucide-react';
import AccountLayout from '../../components/account/AccountLayout';

interface Review {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  rating: number;
  date: string;
  text: string;
}

const ReviewsPage = () => {
  // Mock reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      productId: 101,
      productName: 'Logitech G Pro X Superlight Pink',
      productImage: 'https://resource.logitech.com/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-magenta-gallery-1.png',
      rating: 5,
      date: '15.03.2025',
      text: 'Отличная мышка! Очень легкая, сенсор идеальный, заряд держит очень долго. Полностью доволен покупкой!'
    },
    {
      id: 2,
      productId: 102,
      productName: 'SteelSeries Arctis Nova Pro Wireless',
      productImage: 'https://media.steelseriescdn.com/thumbs/catalog/items/61486/ff8b13c8410a4659828a352daa4d9ca0.png.500x400_q100_crop-fit_optimize.png',
      rating: 4,
      date: '10.03.2025',
      text: 'Хорошие наушники с отличным звуком. Единственный минус - иногда бывают проблемы с подключением по Bluetooth.'
    }
  ]);

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Handle review deletion
  const handleDeleteReview = (reviewId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  return (
    <AccountLayout activeTab="reviews" title="Мои отзывы">
      <div className="max-w-3xl mx-auto">
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center p-4 border-b border-gray-100">
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden mr-4">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/80';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{review.productName}</h3>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-700">{review.text}</p>
                </div>
                
                <div className="flex justify-end bg-gray-50 px-4 py-2 border-t border-gray-100">
                  <button
                    className="flex items-center mr-3 text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => {}}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Редактировать
                  </button>
                  <button
                    className="flex items-center text-sm text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Star className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">У вас пока нет отзывов</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              После покупки и использования товаров, вы сможете оставить свой отзыв, который поможет другим покупателям
            </p>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default ReviewsPage;
