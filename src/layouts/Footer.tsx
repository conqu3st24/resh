import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Логотип и контакты */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-white text-2xl font-bold flex items-center mb-4">
              <span className="text-primary">RE</span>
              <span>SHIP</span>
            </Link>
            <div className="mb-4">
              <a href="tel:+79213330701" className="text-xl font-medium block mb-2">+7 921 333 07 01</a>
              <p className="text-gray-400 text-sm">Круглосуточный call-центр</p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* О магазине */}
          <div>
            <h3 className="text-lg font-semibold mb-4">О магазине</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">О нас</Link></li>
              <li><Link to="/vacancies" className="text-gray-300 hover:text-white">Вакансии</Link></li>
              <li><Link to="/policy" className="text-gray-300 hover:text-white">Политика</Link></li>
              <li><Link to="/merch" className="text-gray-300 hover:text-white">Мерч</Link></li>
            </ul>
          </div>

          {/* Полезное */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Полезное</h3>
            <ul className="space-y-2">
              <li><Link to="/mouse-finder" className="text-gray-300 hover:text-white">Подбор мышки</Link></li>
              <li><Link to="/switch-finder" className="text-gray-300 hover:text-white">Выбор свитча</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Блог</Link></li>
              <li><Link to="/forum" className="text-gray-300 hover:text-white">Форум</Link></li>
            </ul>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2">
              <li><Link to="/delivery" className="text-gray-300 hover:text-white">Доставка и Оплата</Link></li>
              <li><Link to="/warranty" className="text-gray-300 hover:text-white">Гарантия и Возврат</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Пользовательское соглашение</Link></li>
              <li><Link to="/offer" className="text-gray-300 hover:text-white">Договор и оферта</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li><Link to="/contacts" className="text-gray-300 hover:text-white">Общие контакты</Link></li>
              <li><Link to="/marketing" className="text-gray-300 hover:text-white">Отдел маркетинга и рекламы</Link></li>
              <li><Link to="/partnership" className="text-gray-300 hover:text-white">Для предложений по ассортименту</Link></li>
            </ul>
          </div>
        </div>

        {/* Форма подписки */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Не пропусти новости</h3>
              <p className="text-gray-400">Подпишись на рассылку и получай первым информацию о новинках и акциях</p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Введите e-mail"
                  className="flex-grow py-2 px-4 bg-gray-700 text-white rounded-l focus:outline-none"
                />
                <button className="bg-primary text-white py-2 px-4 rounded-r hover:bg-blue-700 transition-colors">
                  Отправить
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Нажимая на кнопку Подписаться, вы даёте согласие на обработку персональных данных
              </p>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Reship. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 