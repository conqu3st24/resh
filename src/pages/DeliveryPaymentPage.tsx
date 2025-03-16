import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRightIcon, 
  TruckIcon, 
  CreditCardIcon, 
  ClockIcon, 
  MapPinIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';
import DeliveryCalculator from '../components/DeliveryCalculator';

const DeliveryPaymentPage: React.FC = () => {
  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <div className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-primary transition-colors">
            Главная
          </Link>
          <ChevronRightIcon className="h-3 w-3 inline mx-1" />
          <span>Доставка и оплата</span>
        </div>

        <h1 className="text-3xl font-bold mb-8">Доставка и оплата</h1>

        {/* Delivery Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <TruckIcon className="w-8 h-8 text-primary mr-4" />
              <h2 className="text-2xl font-semibold">Способы доставки</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <TruckIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Курьерская доставка СДЭК</h3>
                    <p className="text-gray-600">Доставка до двери</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Доставка по всей России</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Срок доставки: 1-3 дня в Москву и Санкт-Петербург, 3-7 дней в другие регионы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Стоимость: от 300 ₽ (бесплатно при заказе от 5000 ₽)</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-500">
                  * Точная стоимость и сроки доставки рассчитываются при оформлении заказа
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPinIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Самовывоз из пунктов выдачи</h3>
                    <p className="text-gray-600">СДЭК, Boxberry, PickPoint</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Более 15 000 пунктов выдачи по всей России</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Срок доставки: 1-3 дня в Москву и Санкт-Петербург, 3-7 дней в другие регионы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Стоимость: от 200 ₽ (бесплатно при заказе от 3000 ₽)</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-500">* Срок хранения заказа в пункте выдачи - 7 дней</div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-lg mb-4">Отслеживание заказа</h3>
              <p className="text-gray-700 mb-4">
                После передачи заказа в службу доставки вы получите трек-номер для отслеживания на email и в личном
                кабинете.
              </p>
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-primary mr-3" />
                  <p className="text-gray-700">
                    Среднее время обработки заказа - <span className="font-medium">1 рабочий день</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Delivery Calculator */}
        <section className="mb-12">
          <DeliveryCalculator />
        </section>

        {/* Payment Section */}
        <section>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <CreditCardIcon className="w-8 h-8 text-primary mr-4" />
              <h2 className="text-2xl font-semibold">Способы оплаты</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">Банковская карта</h3>
                <p className="text-gray-700 mb-4">
                  Оплата картами Visa, MasterCard, МИР через безопасный платежный шлюз
                </p>
                <div className="flex space-x-3">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
                    alt="Visa" 
                    className="h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/45x30?text=VISA";
                    }}
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" 
                    alt="MasterCard" 
                    className="h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/45x30?text=MC";
                    }}
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/MIR-logo.svg/1200px-MIR-logo.svg.png" 
                    alt="МИР" 
                    className="h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/45x30?text=МИР";
                    }}
                  />
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">Электронные кошельки</h3>
                <p className="text-gray-700 mb-4">Оплата через популярные платежные системы</p>
                <div className="flex space-x-3">
                  <img 
                    src="https://yoomoney.ru/transfer/images/logos/logo.svg"
                    alt="ЮMoney" 
                    className="h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/45x30?text=ЮMoney";
                    }}
                  />
                  <img 
                    src="https://static.qiwi.com/img/qiwi_com/header/qiwi-logo.svg"
                    alt="QIWI" 
                    className="h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/45x30?text=QIWI";
                    }}
                  />
                  <img 
                    src="https://www.webmoney.ru/img/logo-wm.png"
                    alt="WebMoney" 
                    className="h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/45x30?text=WebMoney";
                    }}
                  />
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">Наличными при получении</h3>
                <p className="text-gray-700 mb-4">Оплата наличными курьеру или в пункте выдачи заказа</p>
                <div className="text-sm text-gray-500">* Доступно не для всех регионов</div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-start">
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
          </div>
        </section>
      </div>
    </main>
  );
};

export default DeliveryPaymentPage; 