import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  
  // Handle case where images array is empty
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Изображение недоступно</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

  return (
    <div className="relative">
      {/* Main image */}
      <div 
        className={`relative aspect-square bg-white rounded-lg mb-4 overflow-hidden cursor-pointer transition-all ${
          zoomed ? 'shadow-xl' : 'shadow-sm'
        }`}
        onClick={toggleZoom}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Изображение ${currentIndex + 1}`}
            className={`w-full h-full object-contain transition-transform ${
              zoomed ? 'scale-150' : 'scale-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400?text=Изображение+недоступно';
            }}
          />
        </AnimatePresence>

        {/* Navigation arrows for larger screens */}
        {images.length > 1 && !zoomed && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Предыдущее изображение"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Следующее изображение"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
        
        {/* Zoom indicator */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {zoomed ? 'Нажмите, чтобы уменьшить' : 'Нажмите, чтобы увеличить'}
        </div>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {images.map((img, index) => (
            <button
              key={index}
              className={`aspect-square rounded border-2 transition-all overflow-hidden ${
                index === currentIndex
                  ? 'border-blue-500 shadow-sm'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              onClick={() => selectImage(index)}
              aria-label={`Выбрать изображение ${index + 1}`}
            >
              <img
                src={img}
                alt={`${title} - Миниатюра ${index + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/80?text=..';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
