import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика регистрации
    console.log('Register attempt with:', { email, phone });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[460px] bg-white rounded-2xl p-8">
          {/* Кнопка "Назад" */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-[#212121] hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-roboto text-base">Назад</span>
          </Link>

          {/* Заголовок и описание */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="font-century text-[32px] font-bold text-[#212121] tracking-tight">Регистрация</h1>
              <span className="font-roboto text-sm text-[#9CA3AF]">1 шаг из 2</span>
            </div>
            <p className="font-roboto text-base text-[#212121]">
              Если вы еще не создали аккаунт то самое время это исправить. Для начала введите данные ниже
            </p>
          </div>

          {/* Форма регистрации */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email поле */}
            <div className="space-y-2">
              <label htmlFor="email" className="block font-roboto text-sm text-[#212121]">
                Почта
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Например: reship@bk.ru"
                className="w-full h-12 px-4 font-roboto text-base text-[#212121] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
              />
            </div>

            {/* Телефон поле */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block font-roboto text-sm text-[#212121]">
                Номер телефона
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Например: + 7 950 123 33 55"
                className="w-full h-12 px-4 font-roboto text-base text-[#212121] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
              />
            </div>

            {/* Кнопка "Далее" */}
            <button
              type="submit"
              className="w-full h-12 bg-[#212121] text-white font-roboto text-base rounded-lg hover:bg-[#313131] transition-colors"
            >
              Далее
            </button>

            {/* Разделитель "или" */}
            <div className="text-center font-roboto text-sm text-[#212121]">
              или
            </div>

            {/* Кнопка входа */}
            <Link
              to="/login"
              className="block w-full h-12 bg-[#E5F3FF] text-[#212121] font-roboto text-base rounded-lg hover:bg-[#D5E9FA] transition-colors text-center leading-[48px]"
            >
              Войти
            </Link>

            {/* Ссылка "Забыли пароль?" */}
            <div className="text-right">
              <Link to="/forgot-password" className="font-roboto text-sm text-[#212121] hover:opacity-80">
                Забыли пароль?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 