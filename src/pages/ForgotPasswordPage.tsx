import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isPhoneRecovery, setIsPhoneRecovery] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Поле обязательно для заполнения');
      return;
    }

    if (!validateEmail(email)) {
      setError('Выбранное значение для почты некорректно');
      return;
    }

    // Здесь будет логика восстановления
    console.log('Recovery attempt with:', { email });
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[460px] bg-white rounded-2xl p-8">
          {/* Кнопка "Назад" */}
          <Link to="/login" className="inline-flex items-center gap-2 mb-8 text-[#212121] hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-roboto text-base">Назад</span>
          </Link>

          {/* Заголовок и описание */}
          <div className="mb-8">
            <h1 className="font-century text-[32px] font-bold text-[#212121] tracking-tight mb-4">
              Восстановление пароля
            </h1>
            <p className="font-roboto text-base text-[#212121]">
              Укажите почту, на которой был зарегистрирован ваш аккаунт
            </p>
          </div>

          {/* Форма восстановления */}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={`w-full h-12 px-4 font-roboto text-base text-[#212121] border ${
                  error ? 'border-[#EF4444]' : 'border-[#E5E7EB]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121] focus:border-transparent`}
              />
              {error && (
                <p className="text-[#EF4444] text-sm font-roboto mt-1">{error}</p>
              )}
            </div>

            {/* Кнопка восстановления */}
            <button
              type="submit"
              className="w-full h-12 bg-[#212121] text-white font-roboto text-base rounded-lg hover:bg-[#313131] transition-colors"
            >
              Восстановить
            </button>

            {/* Ссылка на восстановление по телефону */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsPhoneRecovery(true)}
                className="font-roboto text-sm text-[#212121] hover:opacity-80"
              >
                Восстановить по номеру телефона
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;