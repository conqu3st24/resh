import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Replace } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import Button from './ui/Button';

interface SetupItemCardProps {
  item: {
    id: number;
    type: string;
    name: string;
    image: string;
    price: number;
    description: string;
    specs: string[];
    matchPercent: number;
  };
}

export const SetupItemCard = ({ item }: SetupItemCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: {
        id: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.type,
        brand: '',
        inStock: true,
        rating: 5,
        reviewCount: 0
      },
      quantity: 1
    }));
    toast.success(`${item.name} добавлен в корзину`);
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-medium uppercase">
            {item.type}
          </div>
          <div className="ml-3 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Совпадение {item.matchPercent}%
          </div>
        </div>
        
        <div className="flex gap-6">
          {/* Изображение */}
          <div className="w-32 h-32 shrink-0 rounded-lg border border-gray-100 p-2 bg-white">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder.svg';
              }}
            />
          </div>

          {/* Информация */}
          <div className="flex-grow flex flex-col">
            <div className="text-lg font-medium mb-1 text-blue-900">
              {item.name}
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {item.description}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {item.specs.map((spec, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                  {spec}
                </span>
              ))}
            </div>
            <div className="text-xl font-bold text-blue-600 mb-4">
              {item.price.toLocaleString()} ₽
            </div>
            <div className="flex gap-4 mt-auto">
              <Button 
                variant="primary" 
                className="bg-blue-gradient hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                В корзину
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-200 text-blue-700 hover:border-blue-400"
              >
                <Replace className="h-4 w-4 mr-2" />
                Заменить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
