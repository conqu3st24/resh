import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import RecentlyViewed from './RecentlyViewed';

const Footer: React.FC = () => {
  return (
    <>
      {/* Секция "Вы уже смотрели" */}
      <RecentlyViewed />
      
      {/* Основной футер */}
      <footer className="bg-[#1e1e1e] text-white">
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            {/* Логотип и контакты */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <Link to="/" className="text-white text-2xl font-bold font-century flex items-center">
                  <img src="/images/new-reship-logo.svg" alt="Reship" className="h-10" />
                  <span className="ml-3">Reship</span>
                </Link>
              </div>
              <div className="mb-6">
                <a href="tel:+79213330701" className="text-xl font-semibold block mb-1 hover:text-gray-200 transition-colors">+7 921 333 07 01</a>
                <p className="text-gray-400 text-sm">Круглосуточный call-центр</p>
              </div>
              <div className="flex space-x-3 mt-6">
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="bg-[#333333] hover:bg-primary text-white p-2.5 rounded-full transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-[#333333] hover:bg-primary text-white p-2.5 rounded-full transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                  </svg>
                </a>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="bg-[#333333] hover:bg-primary text-white p-2.5 rounded-full transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.741.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.649.87 2.138v3.228c0 .707-.128.836-.407.836-.741 0-2.546-2.725-3.617-5.846-.21-.606-.42-.854-.98-.854H2.76c-.627 0-.752.295-.752.619 0 .582.741 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.932-.197-.615-.907-1.509-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.604 0-.976.001 0 2.672-3.761 2.95-5.04z"/>
                  </svg>
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="bg-[#333333] hover:bg-primary text-white p-2.5 rounded-full transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* О магазине */}
            <div>
              <h3 className="text-base font-bold mb-4">О магазине</h3>
              <ul className="space-y-2.5">
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">О нас</Link></li>
                <li><Link to="/vacancies" className="text-gray-300 hover:text-white transition-colors text-sm">Вакансии</Link></li>
                <li><Link to="/policy" className="text-gray-300 hover:text-white transition-colors text-sm">Политика</Link></li>
                <li><Link to="/merch" className="text-gray-300 hover:text-white transition-colors text-sm">Мерч</Link></li>
              </ul>
            </div>

            {/* Полезное */}
            <div>
              <h3 className="text-base font-bold mb-4">Полезное</h3>
              <ul className="space-y-2.5">
                <li><Link to="/mouse-finder" className="text-gray-300 hover:text-white transition-colors text-sm">Подбор мышки</Link></li>
                <li><Link to="/setup-finder" className="text-gray-300 hover:text-white transition-colors text-sm">Выбор сетапа</Link></li>
                <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">Блог</Link></li>
                <li><Link to="/forum" className="text-gray-300 hover:text-white transition-colors text-sm">Форум <ChevronRightIcon className="h-3 w-3 inline-block" /></Link></li>
              </ul>
            </div>

            {/* Покупателям */}
            <div>
              <h3 className="text-base font-bold mb-4">Покупателям</h3>
              <ul className="space-y-2.5">
                <li><Link to="/delivery" className="text-gray-300 hover:text-white transition-colors text-sm">Доставка и Оплата</Link></li>
                <li><Link to="/warranty" className="text-gray-300 hover:text-white transition-colors text-sm">Гарантия и Возврат</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">Пользовательское соглашение</Link></li>
                <li><Link to="/offer" className="text-gray-300 hover:text-white transition-colors text-sm">Договор и оферта</Link></li>
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-base font-bold mb-4">Контакты</h3>
              <ul className="space-y-2.5">
                <li><Link to="/contacts" className="text-gray-300 hover:text-white transition-colors text-sm">Общие контакты</Link></li>
                <li><Link to="/marketing" className="text-gray-300 hover:text-white transition-colors text-sm">Отдел маркетинга и рекламы</Link></li>
                <li><Link to="/partnership" className="text-gray-300 hover:text-white transition-colors text-sm">Для предложений по ассортименту</Link></li>
              </ul>
            </div>
          </div>

          {/* Форма подписки */}
          <div className="mb-8">
            <h3 className="text-base font-bold mb-4">Не пропусти новости</h3>
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="flex flex-1 rounded-md overflow-hidden border border-gray-700">
                <input
                  type="email"
                  placeholder="Введите e-mail"
                  className="flex-grow py-2.5 px-4 bg-transparent text-white focus:outline-none"
                />
                <button className="bg-[#333333] hover:bg-gray-700 text-white py-2 px-5 transition-colors font-medium">
                  Отправить
                </button>
              </div>
              <p className="text-gray-500 text-xs">
                Нажимая на кнопку Подписаться, вы даёте согласие на 
                <Link to="/policy" className="text-blue-400 hover:underline ml-1">обработку персональных данных</Link>
              </p>
            </div>
          </div>

          {/* Копирайт */}
          <div className="pt-6 border-t border-[#333333] text-gray-500 text-xs">
            <div>&copy; 2025, Reship. Адрес типа тд и тп</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer; 