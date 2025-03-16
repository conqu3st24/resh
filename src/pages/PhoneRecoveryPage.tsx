import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PhoneRecoveryPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (phone: string) => {
    // Простая валидация - проверяем что есть хотя бы 10 цифр
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      setError('Поле обязательно для заполнения');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Введите корректный номер телефона');
      return;
    }

    // Здесь будет логика восстановления по телефону
    console.log('Phone recovery attempt with:', { phone });
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[460px] bg-white rounded-2xl p-8">
          {/* Кнопка "Назад" */}
          <Link to="/forgot-password" className="inline-flex items-center gap-2 mb-8 text-[#212121] hover:opacity-80">
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
              Укажите номер телефона, на который был зарегистрирован ваш аккаунт
            </p>
          </div>

          {/* Форма восстановления */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Поле телефона */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block font-roboto text-sm text-[#212121]">
                Номер телефона
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="Например: + 7 950 123 33 55"
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

            {/* Ссылка на восстановление по почте */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="font-roboto text-sm text-[#212121] hover:opacity-80"
              >
                Восстановить по почте
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneRecoveryPage; 