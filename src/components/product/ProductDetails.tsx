import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Scale, Share2, TrendingUp, Check, Info, AlertTriangle } from 'lucide-react';
import { RootState } from '../../store';
import toast from 'react-hot-toast';

interface Specification {
  name: string;
  value: string;
}

interface ProductDetailsProps {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  inStock: boolean;
  stockCount?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  specifications: Specification[];
  sku: string;
  categories: { id: number; name: string }[];
  features?: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  id,
  title,
  brand,
  price,
  oldPrice,
  discount,
  inStock,
  stockCount = 0,
  rating,
  reviewsCount,
  description,
  specifications,
  sku,
  categories,
  features,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [expandedSpecs, setExpandedSpecs] = useState(false);
  
  // Check if product is in cart
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === id);
  
  // Check if product is in wishlist
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);
  const isInWishlist = favoriteItems.some(item => item.id === id);

  // Check if product is in comparison list
  const comparisonItems = useSelector((state: RootState) => 
    state.products.comparisonItems || []
  );
  const isInComparison = comparisonItems.some((item: any) => item.id === id);

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= (stockCount || 10)) {
      setQuantity(value);
    }
  };

  // Handle quantity increment/decrement
  const incrementQuantity = () => {
    if (quantity < (stockCount || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!inStock) return;
    
    // In a real app, you would dispatch an action to add the item to the cart
    // For now, we'll just show a toast
    toast.success(`${title} добавлен в корзину`);
  };

  // Handle add to wishlist
  const handleToggleWishlist = () => {
    if (isInWishlist) {
      toast.success(`${title} удален из избранного`);
    } else {
      toast.success(`${title} добавлен в избранное`);
    }
  };

  // Handle add to comparison
  const handleToggleComparison = () => {
    if (isInComparison) {
      toast.success(`${title} удален из сравнения`);
    } else {
      toast.success(`${title} добавлен в сравнение`);
    }
  };

  // Handle share product
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description.substring(0, 100) + '...',
        url: window.location.href,
      })
      .catch(error => console.error('Ошибка при попытке поделиться:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Ссылка скопирована в буфер обмена'))
        .catch(error => console.error('Ошибка при копировании ссылки:', error));
    }
  };

  // Get stock status text and color
  const getStockStatus = () => {
    if (!inStock) {
      return { text: 'Нет в наличии', color: 'text-red-600', icon: <AlertTriangle className="w-4 h-4" /> };
    }
    
    if (stockCount && stockCount <= 5) {
      return { text: `Осталось ${stockCount} шт.`, color: 'text-amber-600', icon: <Info className="w-4 h-4" /> };
    }
    
    return { text: 'В наличии', color: 'text-green-600', icon: <Check className="w-4 h-4" /> };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Title and brand */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">
          <Link to={`/brands/${brand.toLowerCase()}`} className="hover:text-blue-600">
            {brand}
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      {/* Rating and SKU */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <a href="#reviews" className="ml-2 text-sm text-blue-600 hover:underline">
            {reviewsCount} {reviewsCount === 1 ? 'отзыв' : (reviewsCount % 10 >= 2 && reviewsCount % 10 <= 4 && (reviewsCount % 100 < 10 || reviewsCount % 100 >= 20) ? 'отзыва' : 'отзывов')}
          </a>
        </div>
        <div className="text-sm text-gray-500">
          SKU: <span className="font-medium">{sku}</span>
        </div>
      </div>

      {/* Price and stock status */}
      <div className="mb-6">
        <div className="flex items-end mb-2">
          <div className="text-3xl font-bold text-gray-900">
            {price.toLocaleString()} ₽
          </div>
          {oldPrice && (
            <div className="ml-2 text-lg text-gray-500 line-through">
              {oldPrice.toLocaleString()} ₽
            </div>
          )}
          {discount && (
            <div className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
              -{discount}%
            </div>
          )}
        </div>
        <div className={`flex items-center ${stockStatus.color}`}>
          {stockStatus.icon}
          <span className="ml-1 text-sm font-medium">{stockStatus.text}</span>
        </div>
      </div>

      {/* Add to cart section */}
      <div className="flex flex-col space-y-4 mb-6">
        {inStock && (
          <div className="flex items-center">
            <div className="flex border border-gray-300 rounded-md mr-4">
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={stockCount || 10}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
              />
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={incrementQuantity}
                disabled={quantity >= (stockCount || 10)}
              >
                +
              </button>
            </div>
            <button
              className={`flex-1 flex items-center justify-center px-6 py-3 rounded-md ${
                isInCart
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-medium transition-colors`}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isInCart ? 'В корзине' : 'Добавить в корзину'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <button
            className={`flex items-center justify-center px-4 py-2 rounded-md border ${
              isInWishlist
                ? 'border-red-500 bg-red-50 text-red-600'
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            } transition-colors`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
            <span className="text-sm">{isInWishlist ? 'В избранном' : 'В избранное'}</span>
          </button>
          
          <button
            className={`flex items-center justify-center px-4 py-2 rounded-md border ${
              isInComparison
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            } transition-colors`}
            onClick={handleToggleComparison}
          >
            <Scale className="w-4 h-4 mr-2" />
            <span className="text-sm">Сравнить</span>
          </button>
          
          <button
            className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            <span className="text-sm">Поделиться</span>
          </button>
        </div>
      </div>

      {/* Key features */}
      {features && features.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Ключевые особенности</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-2">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Описание</h3>
        <div className="text-gray-700 space-y-2">
          {description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Характеристики</h3>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            {specifications.slice(0, expandedSpecs ? specifications.length : 5).map((spec, index) => (
              <div key={index} className="grid grid-cols-2 py-3 px-4">
                <div className="text-sm text-gray-600">{spec.name}</div>
                <div className="text-sm font-medium">{spec.value}</div>
              </div>
            ))}
          </div>
          
          {specifications.length > 5 && (
            <div className="px-4 py-3 bg-gray-100 text-center">
              <button
                className="text-blue-600 text-sm font-medium hover:text-blue-800"
                onClick={() => setExpandedSpecs(!expandedSpecs)}
              >
                {expandedSpecs ? 'Свернуть' : `Показать все характеристики (${specifications.length})`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Категории:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                <Link
                  to={`/catalog/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-blue-600 hover:underline"
                >
                  {category.name}
                </Link>
                {index < categories.length - 1 && <span>,</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
