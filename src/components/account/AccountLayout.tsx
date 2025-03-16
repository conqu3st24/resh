import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UserCircle, 
  ShoppingBag, 
  Heart, 
  MapPin,
  HelpCircle,
  LogOut,
  ChevronRight,
  Bell,
  CheckCircle,
  Layout
} from 'lucide-react';

interface AccountLayoutProps {
  children: ReactNode;
  activeTab: string;
  title: string;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, activeTab, title }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Панель управления', icon: <Layout className="w-5 h-5" />, path: '/account' },
    { id: 'orders', label: 'Мои покупки', icon: <ShoppingBag className="w-5 h-5" />, path: '/account/orders' },
    { id: 'reviews', label: 'Отзывы', icon: <CheckCircle className="w-5 h-5" />, path: '/account/reviews' },
    { id: 'favorite', label: 'Избранное', icon: <Heart className="w-5 h-5" />, path: '/account/favorite' },
    { id: 'notifications', label: 'Уведомления', icon: <Bell className="w-5 h-5" />, path: '/account/notifications' },
    { id: 'addresses', label: 'Мои адреса', icon: <MapPin className="w-5 h-5" />, path: '/account/addresses' },
    { id: 'profile', label: 'Профиль', icon: <UserCircle className="w-5 h-5" />, path: '/account/profile' },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-5 h-5" />, path: '/account/faq' },
  ];
  
  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Link to="/" className="text-gray-500 text-sm hover:text-black">
          Главная
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-gray-800 text-sm">{title}</span>
      </div>
    
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar для десктопа */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                <img 
                  src="https://via.placeholder.com/48" 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <p className="text-sm font-medium">+7 (962) 339-03-09</p>
                <Link to="/account/profile" className="text-blue-600 text-xs hover:underline">
                  Перейти в профиль
                </Link>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              <Link to="/account/notifications" className="flex items-center justify-between text-sm hover:underline text-gray-700">
                <span>Уведомления</span>
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <nav>
              <ul className="divide-y divide-gray-100">
                {menuItems.map(item => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 ${
                        activeTab === item.id
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-500'}`}>{item.icon}</div>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                
                <li>
                  <button className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50">
                    <LogOut className="w-5 h-5 mr-3 text-gray-500" />
                    <span>Выйти</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Мобильная навигация */}
        <div className="lg:hidden w-full mb-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">+7 (962) 339-03-09</p>
                  <Link to="/account/profile" className="text-blue-600 text-xs hover:underline">
                    Профиль
                  </Link>
                </div>
              </div>
              
              <Link to="/account/notifications" className="relative">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
              </Link>
            </div>
            
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={location.pathname}
              onChange={(e) => {
                window.location.href = e.target.value;
              }}
            >
              {menuItems.map(item => (
                <option key={item.id} value={item.path}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Основное содержимое */}
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
