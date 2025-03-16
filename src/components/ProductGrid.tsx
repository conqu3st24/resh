import React from 'react';
import ProductCard from './ProductCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  inStock?: boolean;
  isPreorder?: boolean;
  colors?: Array<{ id: number, name: string, hex: string }>;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  filters?: React.ReactNode;
  showViewAll?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title, 
  products, 
  filters, 
  showViewAll = true 
}) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-century">{title}</h2>
          
          {showViewAll && (
            <div className="flex items-center">
              {filters && <div className="mr-4">{filters}</div>}
              <Link to={`/catalog/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:text-lightBlue flex items-center text-sm font-medium transition-colors">
                Смотреть все
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </Link>
            </div>
          )}
        </div>
        
        {/* Индикаторы */}
        <div className="flex space-x-2 mb-8">
          <div className="w-24 h-1 bg-primary rounded-full"></div>
          <div className="w-12 h-1 bg-lightGray rounded-full"></div>
          <div className="w-12 h-1 bg-lightGray rounded-full"></div>
        </div>
        
        {/* На мобильных отображаем в виде списка, на десктопе - в виде сетки */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard
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
                isPreorder={product.isPreorder}
                colors={product.colors}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid; 