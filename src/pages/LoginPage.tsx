import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика входа
    console.log('Login attempt with:', { email, password });
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
            <h1 className="font-century text-[32px] font-bold text-[#212121] tracking-tight mb-4">Вход</h1>
            <p className="font-roboto text-base text-[#212121]">
              Давайте войдем в аккаунт для того, чтобы вы смогли использовать полные возможности сайта
            </p>
          </div>

          {/* Форма входа */}
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
                placeholder="Например: reship@gmail.com"
                className="w-full h-12 px-4 font-roboto text-base text-[#212121] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
              />
            </div>

            {/* Пароль поле */}
            <div className="space-y-2">
              <label htmlFor="password" className="block font-roboto text-sm text-[#212121]">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Не менее 6 знаков"
                className="w-full h-12 px-4 font-roboto text-base text-[#212121] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent"
              />
            </div>

            {/* Ссылка "Забыли пароль?" */}
            <div className="text-right">
              <Link to="/forgot-password" className="font-roboto text-sm text-[#212121] hover:opacity-80">
                Забыли пароль?
              </Link>
            </div>

            {/* Кнопка входа */}
            <button
              type="submit"
              className="w-full h-12 bg-[#212121] text-white font-roboto text-base rounded-lg hover:bg-[#313131] transition-colors"
            >
              Войти
            </button>

            {/* Разделитель "или" */}
            <div className="text-center font-roboto text-sm text-[#212121]">
              или
            </div>

            {/* Кнопка регистрации */}
            <Link
              to="/register"
              className="block w-full h-12 bg-[#E5F3FF] text-[#212121] font-roboto text-base rounded-lg hover:bg-[#D5E9FA] transition-colors text-center leading-[48px]"
            >
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 