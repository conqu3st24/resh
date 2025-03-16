import React from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showEmpty?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showEmpty = true,
  interactive = false,
  onChange
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const renderStar = (position: number) => {
    const isFilled = position <= Math.floor(rating);
    const isHalf = !isFilled && position <= rating + 0.5;
    const StarComponent = isFilled ? StarSolid : StarOutline;

    return (
      <span 
        key={position}
        className={`${interactive ? 'cursor-pointer' : ''} inline-block mx-0.5`}
        onClick={() => {
          if (interactive && onChange) {
            onChange(position);
          }
        }}
      >
        <StarComponent 
          className={`${sizeClasses[size]} ${isFilled ? 'text-blue-500' : 'text-gray-300'}`}
        />
      </span>
    );
  };

  return (
    <div className="flex items-center -mx-0.5">
      {Array.from({ length: maxRating }).map((_, index) => 
        renderStar(index + 1)
      )}
    </div>
  );
};

export default StarRating;