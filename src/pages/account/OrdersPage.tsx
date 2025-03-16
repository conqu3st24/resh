import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import AccountLayout from '../../components/account/AccountLayout';

// Типы для моковых данных
interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

const OrdersPage = () => {
  // Моковые данные заказов
  const orders: Order[] = [
    {
      id: 2430119,
      date: '07.03.2025',
      status: 'processing',
      total: 14000,
      items: [
        {
          id: 1,
          title: 'Logitech G Pro X Superlight Pink',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png'
        },
        {
          id: 2,
          title: 'Logitech G Pro X Superlight Black',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png'
        },
        {
          id: 3,
          title: 'Logitech G Pro X Keyboard',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g303-shroud/g303-shroud-gallery-1.png'
        }
      ]
    },
    {
      id: 2430118,
      date: '07.03.2025',
      status: 'shipped',
      total: 14000,
      items: [
        {
          id: 4,
          title: 'Logitech G Pro X Superlight Pink',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png'
        },
        {
          id: 5,
          title: 'Logitech G Pro X Superlight Black',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png'
        },
        {
          id: 6,
          title: 'Logitech G Pro X Keyboard',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g303-shroud/g303-shroud-gallery-1.png'
        }
      ]
    },
    {
      id: 2430117,
      date: '07.03.2025',
      status: 'cancelled',
      total: 14000,
      items: [
        {
          id: 7,
          title: 'Logitech G Pro X Superlight Pink',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-pink-gallery-1.png'
        },
        {
          id: 8,
          title: 'Logitech G Pro X Superlight Black',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png'
        },
        {
          id: 9,
          title: 'Logitech G Pro X Keyboard',
          price: 7000,
          quantity: 1,
          image: 'https://resource.logitechg.com/w_386,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g303-shroud/g303-shroud-gallery-1.png'
        }
      ]
    }
  ];

  // Функция для отображения статуса заказа с разными цветами
  const getStatusDisplay = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return (
          <span className="inline-flex items-center justify-center px-4 py-1 text-[#096DFF] text-sm border border-[#096DFF] rounded-full whitespace-nowrap">
            В пути
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center justify-center px-4 py-1 text-[#096DFF] text-sm border border-[#096DFF] rounded-full whitespace-nowrap">
            Отправлен
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center justify-center px-4 py-1 text-green-600 text-sm border border-green-600 rounded-full whitespace-nowrap">
            Доставлен
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center justify-center px-4 py-1 text-red-500 text-sm border border-red-500 rounded-full whitespace-nowrap">
            Отменен
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AccountLayout activeTab="orders" title="Мои покупки">
      <div className="max-w-3xl mx-auto bg-[#E3E7F0] p-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg mb-4 p-4">
            {/* Заголовок заказа и статус на одной строке */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold">
                  Заказ от {order.date}
                </div>
                {getStatusDisplay(order.status)}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  Кол-во товаров: {order.items.length}
                </div>
                <ChevronRightIcon size={20} />
              </div>
            </div>
            
            {/* Серый блок с деталями заказа */}
            <div className="bg-[#E3E7F0] rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-[#383838] mb-14">
                    № {order.id}
                  </div>
                  <div className="text-lg font-semibold text-[#212121]">
                    {order.total.toLocaleString()} ₽
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="bg-white rounded-lg w-[120px] h-[100px] flex items-center justify-center overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="max-h-[80px] max-w-[80px] object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/80';
                        }}
                      />
                    </div>
                  ))}
                  
                  {order.items.length > 2 && (
                    <div className="bg-[#B9CEFF] rounded-lg w-[120px] h-[100px] flex items-center justify-center">
                      <span className="text-[#096DFF] text-2xl font-medium">
                        +{order.items.length - 2}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
};

export default OrdersPage;
