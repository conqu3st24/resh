import React, { useState } from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface FilterPanelProps {
  onClose: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
}

interface FilterState {
  discount: boolean;
  preorder: boolean;
  inStock: boolean;
  priceRange: [number, number];
  brands: string[];
  connectionType: string[];
  lighting: string[];
  interface: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onClose, onApply, onClear }) => {
  const [filters, setFilters] = useState<FilterState>({
    discount: false,
    preorder: false,
    inStock: true,
    priceRange: [89, 9000],
    brands: [],
    connectionType: [],
    lighting: [],
    interface: []
  });

  const [expandedSections, setExpandedSections] = useState({
    connectionType: false,
    lighting: false,
    interface: false,
  });

  const handleCheckboxChange = (field: keyof FilterState, value: boolean) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => {
      const brands = [...prev.brands];
      if (brands.includes(brand)) {
        return { ...prev, brands: brands.filter(b => b !== brand) };
      } else {
        return { ...prev, brands: [...brands, brand] };
      }
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleClear = () => {
    setFilters({
      discount: false,
      preorder: false,
      inStock: true,
      priceRange: [89, 9000],
      brands: [],
      connectionType: [],
      lighting: [],
      interface: []
    });
    onClear();
  };

  // Список доступных брендов
  const availableBrands = [
    'A4tech', 'Acer', 'DEXP', 'LAMZU', 'Razer', 'Accesstyle', 'CoolerMaster'
  ];

  // Предустановленные интервалы цен
  const priceRanges = [
    { min: 4000, max: 7000, label: '4 000 — 7 000 ₽' },
    { min: 7000, max: 10000, label: '7 000 — 10 000 ₽' },
    { min: 10000, max: 14000, label: '10 000 — 14 000 ₽' },
    { min: 14000, max: 20000, label: '14 000 — 20 000 ₽' },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex">
      <div className="w-80 bg-white h-full overflow-y-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-secondary font-century">Фильтры</h2>
          <div className="flex items-center">
            <button 
              onClick={handleClear} 
              className="text-primary hover:text-lightBlue text-sm font-medium mr-4"
            >
              Очистить всё
            </button>
            <button 
              onClick={onClose} 
              className="text-secondary hover:text-primary transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Товары */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4 text-secondary">Товары</h3>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary rounded border-lightGray focus:ring-primary"
                  checked={filters.discount}
                  onChange={(e) => handleCheckboxChange('discount', e.target.checked)}
                />
                <span className="ml-2 text-secondary font-roboto">Со скидкой</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary rounded border-lightGray focus:ring-primary"
                  checked={filters.preorder}
                  onChange={(e) => handleCheckboxChange('preorder', e.target.checked)}
                />
                <span className="ml-2 text-secondary font-roboto">Предзаказ</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary rounded border-lightGray focus:ring-primary"
                  checked={filters.inStock}
                  onChange={(e) => handleCheckboxChange('inStock', e.target.checked)}
                />
                <span className="ml-2 text-secondary font-roboto">В наличии</span>
              </label>
            </div>
          </div>

          {/* Цена */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4 text-secondary">Цена</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center border border-lightGray rounded-lg p-2 w-[45%]">
                <span className="text-sm text-textGray mr-1">от</span>
                <span className="font-medium text-secondary font-inter">89 ₽</span>
              </div>
              <span className="text-textGray">—</span>
              <div className="flex items-center border border-lightGray rounded-lg p-2 w-[45%]">
                <span className="text-sm text-textGray mr-1">до</span>
                <span className="font-medium text-secondary font-inter">9 000 ₽</span>
              </div>
            </div>
          </div>
          
          {/* Цена */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Цена</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">от</span>
                <span className="ml-1 font-medium">89 ₽</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">до</span>
                <span className="ml-1 font-medium">9 000 ₽</span>
              </div>
            </div>
            
            <div className="mb-4 relative pt-1">
              <input 
                type="range"
                min="89"
                max="9000"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
                className="w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, index) => (
                <button 
                  key={index}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:border-blue-500 hover:bg-blue-50"
                  onClick={() => setFilters(prev => ({ ...prev, priceRange: [range.min, range.max] }))}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Бренды */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Бренды</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {availableBrands.slice(0, 6).map((brand) => (
                <button 
                  key={brand}
                  className={`px-3 py-1 border rounded text-sm transition-colors ${
                    filters.brands.includes(brand) 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                  onClick={() => handleBrandToggle(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
            <button className="text-blue-600 text-sm flex items-center">
              Показать все <span className="ml-1">↓</span>
            </button>
          </div>

          {/* Тип подключения */}
          <div className="mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('connectionType')}
            >
              <h3 className="font-semibold">Тип подключения</h3>
              <span>{expandedSections.connectionType ? '−' : '+'}</span>
            </div>
            
            {expandedSections.connectionType && (
              <div className="mt-3 space-y-2 pl-1">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">Проводное</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">Беспроводное</span>
                </label>
              </div>
            )}
          </div>

          {/* Подсветка */}
          <div className="mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('lighting')}
            >
              <h3 className="font-semibold">Подсветка</h3>
              <span>{expandedSections.lighting ? '−' : '+'}</span>
            </div>
            
            {expandedSections.lighting && (
              <div className="mt-3 space-y-2 pl-1">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">RGB</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">Одноцветная</span>
                </label>
              </div>
            )}
          </div>

          {/* Интерфейс подключения */}
          <div className="mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('interface')}
            >
              <h3 className="font-semibold">Интерфейс подключения</h3>
              <span>{expandedSections.interface ? '−' : '+'}</span>
            </div>
            
            {expandedSections.interface && (
              <div className="mt-3 space-y-2 pl-1">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">USB</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">Type-C</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">Bluetooth</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <span className="ml-2 text-gray-700">2.4G</span>
                </label>
              </div>
            )}
          </div>
        </div>
        
        {/* Кнопки внизу */}
        <div className="sticky bottom-0 p-4 bg-white border-t border-lightGray mt-6">
          <button 
            onClick={handleApply}
            className="w-full py-3 bg-primary hover:bg-lightBlue text-white font-medium rounded transition-colors flex items-center justify-center"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Показать результаты
          </button>
        </div>
      </div>
      
      {/* Клик в затемнение → onClose */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
};

export default FilterPanel; 