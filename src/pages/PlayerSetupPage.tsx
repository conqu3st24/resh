import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchPlayerById } from '../store/slices/playerSlice';
import { addToCart } from '../store/slices/cartSlice';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { EquipmentItem, PlayerEquipment } from '../types/player';

const PlayerSetupPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPlayer, loading, error } = useSelector((state: RootState) => state.players);
  
  // Состояние для выбранных товаров
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    mouse: true,
    keyboard: true,
    headset: true,
    mousepad: true,
    monitor: true
  });

  // Состояние для развернутых/свернутых секций
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    mouse: true,
    keyboard: true,
    headset: true,
    mousepad: true,
    monitor: true
  });

  // Загружаем данные игрока при монтировании компонента
  useEffect(() => {
    if (id) {
      dispatch(fetchPlayerById(Number(id)) as any);
    }
  }, [dispatch, id]);

  // Обработчик выбора/отмены выбора устройства
  const handleToggleItem = (key: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Обработчик сворачивания/разворачивания секции
  const toggleSection = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Обработчик добавления всего сетапа в корзину
  const handleAddSetupToCart = () => {
    if (!currentPlayer) return;

    const equipment = currentPlayer.equipment;
    let addedItems = 0;

    // Проверяем каждое устройство и добавляем в корзину если оно выбрано
    if (equipment.mouse && selectedItems.mouse) {
      dispatch(addToCart({
        product: {
          id: equipment.mouse.id,
          title: equipment.mouse.name,
          brand: equipment.mouse.brand,
          price: equipment.mouse.price,
          image: equipment.mouse.image || '',
          rating: 5,
          reviewCount: 100,
          inStock: equipment.mouse.inStock
        },
        quantity: 1
      }));
      addedItems++;
    }
    
    if (equipment.keyboard && selectedItems.keyboard) {
      dispatch(addToCart({
        product: {
          id: equipment.keyboard.id,
          title: equipment.keyboard.name,
          brand: equipment.keyboard.brand,
          price: equipment.keyboard.price,
          image: equipment.keyboard.image || '',
          rating: 5,
          reviewCount: 100,
          inStock: equipment.keyboard.inStock
        },
        quantity: 1
      }));
      addedItems++;
    }
    
    if (equipment.headset && selectedItems.headset) {
      dispatch(addToCart({
        product: {
          id: equipment.headset.id,
          title: equipment.headset.name,
          brand: equipment.headset.brand,
          price: equipment.headset.price,
          image: equipment.headset.image || '',
          rating: 5,
          reviewCount: 100,
          inStock: equipment.headset.inStock
        },
        quantity: 1
      }));
      addedItems++;
    }
    
    if (equipment.mousepad && selectedItems.mousepad) {
      dispatch(addToCart({
        product: {
          id: equipment.mousepad.id,
          title: equipment.mousepad.name,
          brand: equipment.mousepad.brand,
          price: equipment.mousepad.price,
          image: equipment.mousepad.image || '',
          rating: 5,
          reviewCount: 100,
          inStock: equipment.mousepad.inStock
        },
        quantity: 1
      }));
      addedItems++;
    }
    
    if (equipment.monitor && selectedItems.monitor) {
      dispatch(addToCart({
        product: {
          id: equipment.monitor.id,
          title: equipment.monitor.name,
          brand: equipment.monitor.brand,
          price: equipment.monitor.price,
          image: equipment.monitor.image || '',
          rating: 5,
          reviewCount: 100,
          inStock: equipment.monitor.inStock
        },
        quantity: 1
      }));
      addedItems++;
    }

    // Показываем уведомление об успешном добавлении
    if (addedItems > 0) {
      toast.success(`${addedItems} товаров добавлено в корзину`);
      // Переходим на страницу корзины
      navigate('/cart');
    } else {
      toast.error('Выберите хотя бы один товар');
    }
  };

  // Вычисляем общую цену выбранных устройств
  const calculateTotalPrice = () => {
    if (!currentPlayer) return 0;
    
    const equipment = currentPlayer.equipment;
    let totalPrice = 0;
    
    if (equipment.mouse && selectedItems.mouse) {
      totalPrice += equipment.mouse.price;
    }
    
    if (equipment.keyboard && selectedItems.keyboard) {
      totalPrice += equipment.keyboard.price;
    }
    
    if (equipment.headset && selectedItems.headset) {
      totalPrice += equipment.headset.price;
    }
    
    if (equipment.mousepad && selectedItems.mousepad) {
      totalPrice += equipment.mousepad.price;
    }
    
    if (equipment.monitor && selectedItems.monitor) {
      totalPrice += equipment.monitor.price;
    }
    
    return totalPrice;
  };

  // Проверяем, есть ли хотя бы одно устройство в сетапе
  const hasEquipment = () => {
    return currentPlayer && Object.values(currentPlayer.equipment).some(item => item);
  };

  // Функция для получения перевода категории на русский
  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'mouse': return 'Мышь';
      case 'keyboard': return 'Клавиатура';
      case 'headset': return 'Наушники';
      case 'mousepad': return 'Коврик';
      case 'monitor': return 'Монитор';
      default: return category;
    }
  };

  // Функция для проверки наличия предмета
  const getStockStatus = (inStock: boolean | undefined) => {
    if (inStock === undefined) return '';
    return inStock 
      ? <span className="text-green-500 text-xs ml-2">В наличии</span>
      : <span className="text-red-500 text-xs ml-2">Нет в наличии</span>;
  };

  // Функция для отображения доставки
  const getDeliveryInfo = () => {
    return <span className="bg-gray-100 text-sm px-3 py-1 rounded-full mr-2">Доставка: 1-3 дня</span>;
  };

  // Функция для отображения гарантии
  const getWarrantyInfo = () => {
    return <span className="bg-gray-100 text-sm px-3 py-1 rounded-full mr-2">Гарантия: 2 года</span>;
  };

  return (
    <main className="py-8 md:py-12 bg-[#E3E7F0]" data-component-name="PlayerSetupPage">
      <div className="container mx-auto px-4" data-component-name="PlayerSetupPage">
        {/* Кнопка назад */}
        <div className="mb-6">
          <Link to="/players" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Назад к списку
          </Link>
        </div>
        
        {/* Индикатор загрузки */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* Сообщение об ошибке */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {/* Информация о игроке и его сетапе */}
        {currentPlayer && (
          <>
            {/* Шапка с информацией об игроке */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-2">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        {currentPlayer.image ? (
                          <img 
                            src={currentPlayer.image} 
                            alt={currentPlayer.nickname} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400 text-4xl">{currentPlayer.nickname.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold">{currentPlayer.nickname}</h1>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <StarIcon key={star} className="h-4 w-4 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-gray-500 text-sm">Профессиональный сетап</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{currentPlayer.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {currentPlayer.games.map((game: string) => (
                        <span key={game} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <div className="text-3xl font-bold mb-1">{calculateTotalPrice().toLocaleString()} ₽</div>
                      <p className="text-gray-500 text-sm">Полный сетап как у {currentPlayer.nickname}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      {(Object.entries(currentPlayer.equipment) as [keyof PlayerEquipment, EquipmentItem | undefined][]).map(([category, item]) => {
                        if (!item) return null;
                        return (
                          <div
                            key={category}
                            className="flex items-start gap-2 pb-2 border-b border-gray-200 last:border-0"
                          >
                            <input
                              type="checkbox"
                              id={`select-${category}`}
                              checked={selectedItems[category] || false}
                              onChange={() => handleToggleItem(category)}
                              className="w-4 h-4 mt-1 text-primary rounded focus:ring-primary"
                            />
                            <div className="flex-1 min-w-0">
                              <label htmlFor={`select-${category}`} className="block font-medium text-sm mb-0.5 capitalize">
                                {getCategoryName(category)}
                              </label>
                              <span className="block text-xs text-gray-600 truncate">{item.name}</span>
                            </div>
                            <div className="text-right whitespace-nowrap">
                              <span className="font-medium text-sm">{item.price.toLocaleString()} ₽</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleAddSetupToCart}
                      className="w-full bg-primary hover:bg-lightBlue text-white py-2 rounded-lg font-medium mb-2 transition flex items-center justify-center"
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                      Добавить весь сетап в корзину
                    </button>

                    <p className="text-center text-xs text-gray-500">или выберите отдельные товары ниже</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Список компонентов сетапа */}
            {hasEquipment() && (
              <div className="space-y-6">
                {(Object.entries(currentPlayer.equipment) as [keyof PlayerEquipment, EquipmentItem | undefined][]).map(([category, item]) => {
                  if (!item) return null;
                  return (
                    <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div
                        className="flex items-center justify-between p-6 cursor-pointer"
                        onClick={() => toggleSection(category)}
                      >
                        <h3 className="text-xl font-semibold">{getCategoryName(category)}</h3>
                        <button className="text-gray-500">
                          {expandedSections[category] ? 
                            <ChevronUpIcon className="w-5 h-5" /> : 
                            <ChevronDownIcon className="w-5 h-5" />
                          }
                        </button>
                      </div>

                      {expandedSections[category] && (
                        <div className="px-6 pb-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Изображение товара */}
                            <div className="md:w-1/4">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-auto object-contain"
                                />
                              ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded">
                                  <span className="text-gray-400">Нет изображения</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Информация о товаре */}
                            <div className="md:w-2/4">
                              <h4 className="text-lg font-medium mb-2">{item.name}</h4>
                              <p className="text-gray-600 mb-4">{item.brand} {item.model}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {getDeliveryInfo()}
                                {getWarrantyInfo()}
                                {getStockStatus(item.inStock)}
                              </div>
                              
                              <p className="text-sm text-gray-600">
                                Эргономичная игровая {getCategoryName(category).toLowerCase()} с сенсором 3360 и частотой опроса 1000 Гц
                              </p>
                            </div>
                            
                            {/* Цена и кнопка добавления */}
                            <div className="md:w-1/4 flex flex-col items-end">
                              <div className="text-2xl font-bold mb-2">{item.price.toLocaleString()} ₽</div>
                              <button
                                onClick={() => {
                                  dispatch(addToCart({
                                    product: {
                                      id: item.id,
                                      title: item.name,
                                      brand: item.brand,
                                      price: item.price,
                                      image: item.image || '',
                                      rating: 5,
                                      reviewCount: 100,
                                      inStock: item.inStock
                                    },
                                    quantity: 1
                                  }));
                                  toast.success(`${item.name} добавлен в корзину`);
                                }}
                                className="bg-primary hover:bg-lightBlue text-white py-2 px-4 rounded-lg font-medium transition mt-2"
                              >
                                В корзину
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default PlayerSetupPage; 