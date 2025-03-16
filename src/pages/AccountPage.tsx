import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, ShoppingBagIcon, HeartIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

// Типы для моковых данных
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Order {
  id: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface FavoriteProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  inStock: boolean;
}

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Моковые данные пользователя
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Александр',
    lastName: 'Иванов',
    email: 'alexander@example.com',
    phone: '+7 (921) 123-45-67',
    avatar: 'https://i.pravatar.cc/150?img=32'
  });

  // Моковые данные заказов
  const orders: Order[] = [
    {
      id: 10043,
      date: '15.06.2023',
      status: 'delivered',
      total: 15990,
      items: [
        {
          id: 1,
          title: 'Ducky One 3 Daybreak',
          price: 15990,
          quantity: 1,
          image: 'https://maxgaming.com/img/cms/Ducky/Ducky%20One%203/Ducky_One_3_TKL_Daybreak_ISO_1.jpg'
        }
      ]
    },
    {
      id: 10042,
      date: '02.05.2023',
      status: 'shipped',
      total: 23980,
      items: [
        {
          id: 2,
          title: 'Logitech G Pro X Superlight',
          price: 13990,
          quantity: 1,
          image: 'https://maxgaming.com/img/cms/Logitech/G%20PRO%20X%20SUPERLIGHT/Logitech_G_PRO_X_SUPERLIGHT_Black_1.jpg'
        },
        {
          id: 3,
          title: 'Artisan Hien FX XSOFT (XL)',
          price: 9990,
          quantity: 1,
          image: 'https://maxgaming.com/img/cms/Artisan/Artisan_Hien_Series_Gaming_Mouse_Pad_Wine_Red_700x.jpg'
        }
      ]
    },
    {
      id: 10041,
      date: '14.04.2023',
      status: 'cancelled',
      total: 7990,
      items: [
        {
          id: 4,
          title: 'HyperX Cloud II',
          price: 7990,
          quantity: 1,
          image: 'https://maxgaming.com/img/cms/HyperX/Cloud%20II/HyperX_Cloud_II_Red_1.jpg'
        }
      ]
    }
  ];

  // Моковые данные избранных товаров
  const favorites: FavoriteProduct[] = [
    {
      id: 1,
      title: 'Varmilo VA88M Sakura',
      brand: 'Varmilo',
      price: 12000,
      rating: 4.5,
      image: 'https://maxgaming.com/img/cms/Varmilo/VA88M/Varmilo_VA88M_Sakura_White_LED_MX_Brown_US_1.jpg',
      inStock: true
    },
    {
      id: 2,
      title: 'Pulsar X2 Mini Wireless',
      brand: 'Pulsar',
      price: 9900,
      oldPrice: 12900,
      rating: 4.8,
      image: 'https://maxgaming.com/img/cms/Pulsar/X2%20Mini/Pulsar_X2_Mini_Wireless_White_1.jpg',
      inStock: true
    },
    {
      id: 3,
      title: 'Razer BlackShark V2 Pro',
      brand: 'Razer',
      price: 14500,
      rating: 4.6,
      image: 'https://maxgaming.com/img/cms/Razer/Blackshark%20V2%20Pro/Razer_BlackShark_V2_Pro_Wireless_Gaming_Headset_1.jpg',
      inStock: false
    }
  ];

  // Форма профиля
  const [formData, setFormData] = useState({ ...profile });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    setNotification('Профиль успешно обновлен');
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Настройки уведомлений
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    productRestock: true
  });

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
  };

  const handleSaveSettings = () => {
    setNotification('Настройки успешно сохранены');
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Функция для отображения статуса заказа
  const getStatusDisplay = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">В обработке</span>;
      case 'shipped':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">Отправлен</span>;
      case 'delivered':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">Доставлен</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium">Отменен</span>;
      default:
        return null;
    }
  };

  return (
    <main className="bg-gray-100 py-8">
      <div className="container">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Личный кабинет</h1>
        
        {notification && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-md">
            {notification}
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковое меню */}
          <div className="lg:w-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 text-center border-b">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                <img src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} className="w-full h-full object-cover" />
              </div>
              <div className="font-medium">{profile.firstName} {profile.lastName}</div>
              <div className="text-sm text-gray-500">{profile.email}</div>
            </div>
            
            <nav className="p-2">
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <UserIcon className="h-5 w-5 mr-3" />
                Профиль
              </button>
              
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBagIcon className="h-5 w-5 mr-3" />
                Заказы
              </button>
              
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'favorites' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('favorites')}
              >
                <HeartIcon className="h-5 w-5 mr-3" />
                Избранное
              </button>
              
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Cog6ToothIcon className="h-5 w-5 mr-3" />
                Настройки
              </button>
            </nav>
          </div>
          
          {/* Основной контент */}
          <div className="flex-1">
            {/* Профиль */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Информация профиля</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Редактировать
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          Имя
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Фамилия
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...profile });
                          setIsEditing(false);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Имя</h3>
                        <p className="mt-1">{profile.firstName}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Фамилия</h3>
                        <p className="mt-1">{profile.lastName}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="mt-1">{profile.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Телефон</h3>
                        <p className="mt-1">{profile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Безопасность</h3>
                      <Link
                        to="#"
                        className="text-blue-600 hover:text-blue-500 font-medium text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          // Логика смены пароля
                        }}
                      >
                        Изменить пароль
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Заказы */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">История заказов</h2>
                
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-500">Заказ №{order.id}</span>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500 mr-3">{order.date}</span>
                              {getStatusDisplay(order.status)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{order.total} ₽</div>
                            <button className="text-sm text-blue-600 hover:text-blue-500">
                              Подробнее
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center py-3 border-b last:border-b-0">
                              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-gray-500">
                                  {item.price} ₽ x {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{item.price * item.quantity} ₽</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Нет заказов</h3>
                    <p className="mt-1 text-sm text-gray-500">У вас пока нет заказов.</p>
                    <div className="mt-6">
                      <Link
                        to="/catalog/keyboards"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Перейти в каталог
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Избранное */}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Избранные товары</h2>
                
                {favorites.length > 0 ? (
                  <div className="space-y-4">
                    {favorites.map((product) => (
                      <div key={product.id} className="flex items-start border-b pb-4">
                        <Link to={`/product/${product.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                        </Link>
                        
                        <div className="ml-4 flex-1">
                          <Link to={`/product/${product.id}`} className="hover:text-blue-600">
                            <h3 className="font-medium">{product.title}</h3>
                          </Link>
                          <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                          
                          <div className="flex items-center space-x-2">
                            <div className={`font-semibold ${product.oldPrice ? 'current-price' : ''}`}>{product.price} ₽</div>
                            {product.oldPrice && (
                              <div className="text-sm old-price">{product.oldPrice} ₽</div>
                            )}
                          </div>
                          
                          {product.inStock ? (
                            <div className="text-sm text-green-600 mt-1">В наличии</div>
                          ) : (
                            <div className="text-sm text-red-600 mt-1">Нет в наличии</div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <button className="text-gray-500 hover:text-red-600">
                            <HeartIcon className="h-5 w-5" />
                          </button>
                          
                          {product.inStock && (
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                              В корзину
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Нет избранных товаров</h3>
                    <p className="mt-1 text-sm text-gray-500">Добавляйте понравившиеся товары в избранное, чтобы не потерять их.</p>
                    <div className="mt-6">
                      <Link
                        to="/catalog/keyboards"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Перейти в каталог
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Настройки */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Настройки уведомлений</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="orderUpdates"
                        name="orderUpdates"
                        type="checkbox"
                        checked={notifications.orderUpdates}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="orderUpdates" className="font-medium text-gray-700">
                        Обновления статуса заказа
                      </label>
                      <p className="text-gray-500">Получать уведомления об изменениях статуса ваших заказов.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="promotions"
                        name="promotions"
                        type="checkbox"
                        checked={notifications.promotions}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="promotions" className="font-medium text-gray-700">
                        Акции и скидки
                      </label>
                      <p className="text-gray-500">Получать информацию о специальных предложениях и скидках.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={notifications.newsletter}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="font-medium text-gray-700">
                        Новостная рассылка
                      </label>
                      <p className="text-gray-500">Получать информацию о новинках и новостях компании.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="productRestock"
                        name="productRestock"
                        type="checkbox"
                        checked={notifications.productRestock}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="productRestock" className="font-medium text-gray-700">
                        Пополнение товаров
                      </label>
                      <p className="text-gray-500">Получать уведомления, когда товары из вашего списка желаний снова будут в наличии.</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <button
                      onClick={handleSaveSettings}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Сохранить настройки
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage; 