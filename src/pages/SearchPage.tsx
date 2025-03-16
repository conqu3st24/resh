import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { searchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Product } from '../types/product';

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Выполняем поиск при загрузке страницы или изменении запроса
  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query) as any);
      setHasSearched(true);
    }
  }, [dispatch, query]);
  
  return (
    <main className="py-8 md:py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2 font-century">Результаты поиска</h1>
          <div className="flex items-center text-textGray">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">›</span>
            <span>Поиск: {query}</span>
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && hasSearched && (
          <>
            <div className="mb-6">
              <p className="text-lg">
                По запросу <span className="font-medium">"{query}"</span> {products.length > 0 ? `найдено ${products.length} товаров` : 'ничего не найдено'}
              </p>
            </div>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    brand={product.brand}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    image={product.image}
                    discount={product.discount}
                    isNew={product.isNew}
                    inStock={product.inStock}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-secondary mb-4">Ничего не найдено</h2>
                <p className="text-textGray mb-6">
                  По вашему запросу "{query}" не найдено ни одного товара. Попробуйте изменить запрос или перейти в каталог.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/"
                    className="bg-white hover:bg-gray-50 text-secondary font-medium px-6 py-3 rounded-lg transition-colors border border-gray-300"
                  >
                    На главную
                  </Link>
                  <Link
                    to="/catalog/all"
                    className="bg-primary hover:bg-lightBlue text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Перейти в каталог
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default SearchPage; 