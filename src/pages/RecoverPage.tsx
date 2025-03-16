import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline';

const RecoverPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    code?: string;
    password?: string;
    passwordConfirm?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = () => {
    const newErrors: {email?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCode = () => {
    const newErrors: {code?: string} = {};
    
    if (!code) {
      newErrors.code = 'Код обязателен';
    } else if (code.length !== 6 || !/^\d+$/.test(code)) {
      newErrors.code = 'Код должен состоять из 6 цифр';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: {password?: string; passwordConfirm?: string} = {};
    
    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    if (!passwordConfirm) {
      newErrors.passwordConfirm = 'Подтверждение пароля обязательно';
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    
    // Имитация отправки кода на email
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Код отправлен на email ${email}`);
      
      // Переход к вводу кода
      setTimeout(() => {
        setSuccessMessage('');
        setStep('code');
      }, 2000);
    }, 1500);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCode()) {
      return;
    }

    setIsLoading(true);
    
    // Имитация проверки кода
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Код подтвержден');
      
      // Переход к созданию нового пароля
      setTimeout(() => {
        setSuccessMessage('');
        setStep('newPassword');
      }, 1500);
    }, 1500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    
    // Имитация смены пароля
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Пароль успешно изменен');
      
      // Редирект на страницу входа
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  const getStepIndicator = () => {
    if (step === 'email') return 1;
    if (step === 'code') return 2;
    return 3;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" 
         style={{ 
           backgroundImage: 'url(https://maxgaming.com/img/cms/Keychron/Q1%20Pro/Keychron_Q1_Pro_QMK_VIA_Wireless_Custom_Mechanical_Keyboard_Blue_ISO_1.jpg)', 
           backgroundSize: 'cover', 
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           backgroundAttachment: 'fixed', 
         }}>
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg relative z-10">
        {/* Progress indicator */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-1 bg-primary rounded-full mx-1"></div>
          <div className={`w-12 h-1 rounded-full mx-1 ${getStepIndicator() >= 2 ? 'bg-primary' : 'bg-lightGray'}`}></div>
          <div className={`w-12 h-1 rounded-full mx-1 ${getStepIndicator() >= 3 ? 'bg-primary' : 'bg-lightGray'}`}></div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary font-century tracking-tighter">RESHIP</h1>
          <h2 className="mt-4 text-2xl font-bold text-secondary font-century tracking-tighter">Восстановление пароля</h2>
          <p className="mt-4 text-textGray font-roboto">
            {step === 'email' && 'Введите email, указанный при регистрации'}
            {step === 'code' && 'Введите код, который мы отправили на ваш email'}
            {step === 'newPassword' && 'Придумайте новый надежный пароль'}
          </p>
        </div>
        
        {/* Alert message */}
        {successMessage && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center font-roboto">
            {successMessage}
          </div>
        )}
        
        {/* Email form */}
        {step === 'email' && (
          <form className="space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary font-roboto">
                Email
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-lightGray focus:ring-primary focus:border-primary'
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none font-roboto`}
                  placeholder="example@mail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 font-roboto">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-lightBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors font-roboto"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Отправить код
              </button>
            </div>
          </form>
        )}
        
        {/* Code form */}
        {step === 'code' && (
          <form className="space-y-6" onSubmit={handleCodeSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-secondary font-roboto">
                Код подтверждения
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    errors.code ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-lightGray focus:ring-primary focus:border-primary'
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none font-roboto`}
                  placeholder="Введите 6-значный код"
                  maxLength={6}
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600 font-roboto">{errors.code}</p>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-1/3 py-3 px-4 border border-lightGray rounded-lg shadow-sm text-sm font-medium text-secondary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors font-roboto"
              >
                Назад
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-lightBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors font-roboto"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Подтвердить
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                className="text-primary hover:text-lightBlue text-sm font-medium transition-colors font-roboto"
                onClick={handleEmailSubmit}
              >
                Отправить код повторно
              </button>
            </div>
          </form>
        )}
        
        {/* New password form */}
        {step === 'newPassword' && (
          <form className="space-y-6" onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary font-roboto">
                Новый пароль
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-lightGray focus:ring-primary focus:border-primary'
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none font-roboto`}
                  placeholder="••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 font-roboto">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-secondary font-roboto">
                Подтверждение пароля
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    errors.passwordConfirm ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-lightGray focus:ring-primary focus:border-primary'
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none font-roboto`}
                  placeholder="••••••"
                />
                {errors.passwordConfirm && (
                  <p className="mt-1 text-sm text-red-600 font-roboto">{errors.passwordConfirm}</p>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep('code')}
                className="w-1/3 py-3 px-4 border border-lightGray rounded-lg shadow-sm text-sm font-medium text-secondary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors font-roboto"
              >
                Назад
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-lightBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors font-roboto"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Сохранить пароль
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-textGray font-roboto">
            Вспомнили пароль? <Link to="/login" className="font-medium text-primary hover:text-lightBlue transition-colors">Войти</Link>
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0 flex space-x-1 h-1">
          <div className="w-2/3 bg-primary"></div>
          <div className="w-1/3 bg-lightBlue"></div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPage; 