import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRightIcon, 
  GiftIcon, 
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import GiftCardActivationModal from '../components/GiftCardActivationModal';

const GiftCardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActivateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleActivate = (code: string) => {
    // Здесь будет логика активации карты
    console.log('Активация карты с кодом:', code);
    setIsModalOpen(false);
    // Здесь можно добавить уведомление об успешной активации
  };

  return (
    <main style={{ backgroundColor: '#E3E7F0' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Хлебные крошки */}
          <div className="text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRightIcon className="h-3 w-3 inline mx-1" />
            <span>Подарочные карты</span>
          </div>

          <h1 className="text-3xl font-bold mb-8">Подарочные карты</h1>

          {/* Hero Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4">Идеальный подарок для геймера</h2>
                  <p className="mb-6">
                    Подарите возможность выбрать именно то, что нужно. Подарочная карта ReShip — отличный подарок для
                    любого геймера или энтузиаста игровой периферии.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
                      Купить подарочную карту
                    </button>
                    <button 
                      className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition"
                      onClick={handleActivateClick}
                    >
                      Активировать карту
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2 relative h-64 md:h-auto bg-gray-200 flex items-center justify-center">
                  <img 
                    src="/images/gift-card.jpg" 
                    alt="Подарочная карта ReShip" 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placeholder.pics/svg/400x300/DEDEDE/555555/Gift%20Card";
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Gift Card Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Выберите номинал</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1000, 3000, 5000, 10000].map((amount) => (
                <div
                  key={amount}
                  className="border border-gray-200 rounded-lg p-5 bg-white hover:border-primary hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <GiftIcon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-2xl font-bold">{amount} ₽</span>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition">
                    Выбрать
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Как это работает</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Выберите и оплатите</h3>
                  <p className="text-gray-600">Выберите номинал подарочной карты и оплатите удобным способом</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Получите код</h3>
                  <p className="text-gray-600">Получите уникальный код на email или в виде красивой открытки</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Используйте</h3>
                  <p className="text-gray-600">Активируйте код в личном кабинете и используйте при оформлении заказа</p>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Способы получения</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <EnvelopeIcon className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-lg">Электронная карта</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Мгновенная доставка на email. Идеально подходит, если нужно быстро отправить подарок.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>Мгновенная доставка</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>Можно переслать получателю</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>Бесплатно</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <GiftIcon className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-lg">Физическая карта</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Красивая подарочная карта с конвертом. Отличный вариант для личного вручения.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>Премиальный дизайн</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>Доставка курьером или почтой</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span>Стоимость доставки от 300 ₽</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Часто задаваемые вопросы</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-lg mb-2">Какой срок действия подарочной карты?</h3>
                  <p className="text-gray-700">Срок действия подарочной карты составляет 1 год с момента покупки.</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-lg mb-2">Можно ли использовать карту частями?</h3>
                  <p className="text-gray-700">
                    Да, вы можете использовать подарочную карту для нескольких покупок, пока не израсходуете всю сумму.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-lg mb-2">Что делать, если я потерял код карты?</h3>
                  <p className="text-gray-700">
                    Свяжитесь с нашей службой поддержки, и мы поможем восстановить код, если вы сможете подтвердить
                    покупку.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Можно ли вернуть или обменять подарочную карту?</h3>
                  <p className="text-gray-700">
                    Подарочные карты не подлежат возврату или обмену, за исключением случаев, предусмотренных
                    законодательством.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-start">
                <QuestionMarkCircleIcon className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Остались вопросы?</h3>
                  <p className="text-gray-700">
                    Свяжитесь с нашей службой поддержки по телефону{" "}
                    <span className="font-medium">+7 921 333 07 01</span> или напишите на почту{" "}
                    <a href="mailto:support@reship.ru" className="text-primary hover:underline">
                      support@reship.ru
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Модальное окно активации */}
          <GiftCardActivationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onActivate={handleActivate}
          />
        </div>
      </div>
    </main>
  );
};

export default GiftCardPage; 