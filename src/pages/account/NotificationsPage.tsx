import React, { useState } from 'react';
import { Bell, ShoppingBag, Tag, Zap, Info, Settings } from 'lucide-react';
import AccountLayout from '../../components/account/AccountLayout';

interface Notification {
  id: number;
  type: 'order' | 'promo' | 'system' | 'info';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const NotificationsPage = () => {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Заказ отправлен',
      message: 'Ваш заказ №2430119 был передан в службу доставки',
      date: '07.03.2025',
      isRead: false
    },
    {
      id: 2,
      type: 'promo',
      title: 'Специальное предложение',
      message: 'Скидка 15% на все мыши Logitech до конца недели!',
      date: '05.03.2025',
      isRead: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Профиль обновлен',
      message: 'Ваши данные профиля были успешно обновлены',
      date: '01.03.2025',
      isRead: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Информация о доставке',
      message: 'Обновлен график работы пунктов выдачи заказов',
      date: '28.02.2025',
      isRead: true
    }
  ]);

  // Mock notification settings
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'order_updates',
      name: 'Обновления заказов',
      description: 'Уведомления о статусе и изменениях в ваших заказах',
      email: true,
      push: true,
      sms: false
    },
    {
      id: 'promos',
      name: 'Акции и скидки',
      description: 'Информация о специальных предложениях и распродажах',
      email: true,
      push: false,
      sms: false
    },
    {
      id: 'system',
      name: 'Системные уведомления',
      description: 'Важные обновления аккаунта и безопасности',
      email: true,
      push: true,
      sms: true
    },
    {
      id: 'newsletter',
      name: 'Новости и статьи',
      description: 'Блог, обзоры новинок и гайды по настройке',
      email: false,
      push: false,
      sms: false
    }
  ]);

  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  // Update notification settings
  const updateSetting = (id: string, channel: keyof Pick<NotificationSetting, 'email' | 'push' | 'sms'>) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, [channel]: !setting[channel] } : setting
      )
    );
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'promo':
        return <Tag className="h-5 w-5 text-purple-500" />;
      case 'system':
        return <Zap className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <AccountLayout activeTab="notifications" title="Уведомления">
      <div className="max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Уведомления
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'settings'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Настройки уведомлений
          </button>
        </div>

        {activeTab === 'notifications' && (
          <>
            {/* Header with actions */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Все уведомления</h3>
              {notifications.some(n => !n.isRead) && (
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={markAllAsRead}
                >
                  Отметить все как прочитанные
                </button>
              )}
            </div>

            {/* Notifications list */}
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg border ${
                    notification.isRead ? 'border-gray-200' : 'border-blue-200 bg-blue-50'
                  } p-4 transition-all hover:shadow-sm`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className={`font-medium ${notification.isRead ? 'text-gray-900' : 'text-blue-900'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500">{notification.date}</span>
                      </div>
                      <p className={`mt-1 text-sm ${notification.isRead ? 'text-gray-600' : 'text-blue-800'}`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Нет новых уведомлений
                  </h3>
                  <p className="text-gray-500">
                    Все ваши уведомления будут отображаться здесь
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <h3 className="text-lg font-medium mb-4">Настройки уведомлений</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-5 gap-2 p-4 border-b border-gray-200 bg-gray-50">
                <div className="col-span-2">
                  <span className="font-medium text-sm text-gray-700">Тип уведомлений</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700">Push</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700">SMS</span>
                </div>
              </div>

              {settings.map((setting) => (
                <div key={setting.id} className="grid grid-cols-5 gap-2 p-4 border-b border-gray-200">
                  <div className="col-span-2">
                    <div className="font-medium text-gray-800">{setting.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{setting.description}</div>
                  </div>
                  <div className="flex justify-center items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.email}
                        onChange={() => updateSetting(setting.id, 'email')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-center items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.push}
                        onChange={() => updateSetting(setting.id, 'push')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-center items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.sms}
                        onChange={() => updateSetting(setting.id, 'sms')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AccountLayout>
  );
};

export default NotificationsPage;
