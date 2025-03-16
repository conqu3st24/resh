import React from 'react';
import { ShoppingCart } from 'lucide-react';
import AccountLayout from '../../components/account/AccountLayout';

// Типы для моковых данных
interface FavoriteProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
}

const FavoritePage = () => {
  // Моковые данные избранных товаров
  const favorites: FavoriteProduct[] = [
    {
      id: 1,
      title: 'Logitech G Pro X Superlight Pink',
      brand: 'Logitech',
      price: 14990,
      oldPrice: 16990,
      image: 'https://resource.logitech.com/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-magenta-gallery-1.png',
      inStock: true
    },
    {
      id: 2,
      title: 'Razer BlackShark V2 Pro',
      brand: 'Razer',
      price: 15990,
      image: 'https://assets3.razerzone.com/GZ3NqwqQvxqQHUPoXzwBNkmzlYI=/1500x1000/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh5c%2Fh9f%2F9080963514398%2Frazer-blackshark-v2-pro-white-500x500.png',
      inStock: true
    },
    {
      id: 3,
      title: 'SteelSeries Arctis Nova Pro Wireless',
      brand: 'SteelSeries',
      price: 34990,
      oldPrice: 39990,
      image: 'https://media.steelseriescdn.com/thumbs/catalog/items/61486/ff8b13c8410a4659828a352daa4d9ca0.png.500x400_q100_crop-fit_optimize.png',
      inStock: false
    }
  ];

  return (
    <AccountLayout activeTab="favorite" title="Избранное">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 relative">
              {/* Изображение товара */}
              <div className="aspect-square p-4 bg-white flex items-center justify-center relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150';
                  }}
                />
                
                {/* Кнопка удаления из избранного */}
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                
                {/* Кнопка добавления в корзину */}
                <div className="absolute bottom-2 right-2">
                  <button 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      product.inStock ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Информация о товаре */}
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-1 line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {product.title}
                </h3>
                
                <p className="text-xs text-gray-500 mb-3">{product.brand}</p>
                
                {/* Цена */}
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {product.price.toLocaleString()} ₽
                  </span>
                  
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {product.oldPrice.toLocaleString()} ₽
                    </span>
                  )}
                </div>
                
                {/* Статус наличия */}
                {!product.inStock && (
                  <div className="mt-2 text-xs text-red-500">
                    Нет в наличии
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
};

export default FavoritePage;
