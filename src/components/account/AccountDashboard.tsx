import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Clock, 
  ChevronRight,
  Bell,
  CheckCircle
} from 'lucide-react';

interface DashboardStatsProps {
  ordersCount: number;
  favoritesCount: number;
  reviewsCount: number;
  notificationsCount: number;
}

const AccountDashboard: React.FC<DashboardStatsProps> = ({
  ordersCount,
  favoritesCount,
  reviewsCount,
  notificationsCount
}) => {
  // Sample last order
  const lastOrder = {
    id: '2430119',
    date: '07.03.2025',
    status: 'processing',
    total: 14000,
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Добро пожаловать в личный кабинет</h2>
        <p className="opacity-90">Управляйте своими заказами, избранными товарами и настройками профиля</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link to="/account/orders" className="bg-white rounded-lg p-4 border border-gray-200 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Заказы</h3>
              <p className="text-2xl font-bold">{ordersCount}</p>
            </div>
          </div>
        </Link>

        <Link to="/account/favorite" className="bg-white rounded-lg p-4 border border-gray-200 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Избранное</h3>
              <p className="text-2xl font-bold">{favoritesCount}</p>
            </div>
          </div>
        </Link>

        <Link to="/account/reviews" className="bg-white rounded-lg p-4 border border-gray-200 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Отзывы</h3>
              <p className="text-2xl font-bold">{reviewsCount}</p>
            </div>
          </div>
        </Link>

        <Link to="/account/notifications" className="bg-white rounded-lg p-4 border border-gray-200 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Bell className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Уведомления</h3>
              <p className="text-2xl font-bold">{notificationsCount}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Last order */}
      {lastOrder && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">Последний заказ</h3>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">№ {lastOrder.id} от {lastOrder.date}</p>
                <div className="text-xl font-semibold">{lastOrder.total.toLocaleString()} ₽</div>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    В пути
                  </span>
                </div>
              </div>
              <Link to={`/account/orders`} className="flex items-center text-blue-600 hover:text-blue-800">
                <span className="mr-1 text-sm font-medium">Все заказы</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Быстрые действия</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <Link to="/account/profile" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <span>Редактировать профиль</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          
          <Link to="/account/orders" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <span>История заказов</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          
          <Link to="/account/notifications" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-3" />
              <span>Настройки уведомлений</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
