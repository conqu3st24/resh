import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import AccountLayout from '../../components/account/AccountLayout';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'male' | 'female' | '';
}

const ProfilePage = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: ''
  });
  
  const [sections, setSections] = useState({
    mainInfo: true,
    contacts: true
  });
  
  const [photo, setPhoto] = useState<string | null>(null);
  
  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGenderSelect = (gender: 'male' | 'female') => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика сохранения
    console.log('Сохранено:', formData);
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  return (
    <AccountLayout activeTab="profile" title="Профиль">
      <div className="max-w-3xl mx-auto">
        {/* Основная информация */}
        <div className="bg-white rounded-lg overflow-hidden mb-6">
          <div 
            className="px-6 py-4 flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('mainInfo')}
          >
            <h3 className="text-lg font-medium">Основная информация</h3>
            <ChevronDownIcon 
              className={`w-5 h-5 transform transition-transform ${sections.mainInfo ? 'rotate-180' : ''}`}
            />
          </div>
          
          {sections.mainInfo && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <div className="flex items-start mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-6">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex space-x-2 mb-2">
                    <button 
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                      Обновить фото
                    </button>
                    
                    {photo && (
                      <button 
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100"
                        onClick={handleRemovePhoto}
                      >
                        Удалить фото
                      </button>
                    )}
                    
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Минимальный размер изображения профиля (аватара) — 200×200 пикселей
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Обязательный пункт"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Фамилия <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Обязательный пункт"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дата рождения
                    </label>
                    <input
                      type="text"
                      name="birthDate"
                      placeholder="Например: 05.05.1990"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Пол
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className={`px-6 py-2 border ${
                          formData.gender === 'male' 
                            ? 'border-blue-500 bg-blue-50 text-blue-600' 
                            : 'border-gray-300 text-gray-700'
                        } rounded-md`}
                        onClick={() => handleGenderSelect('male')}
                      >
                        Мужчина
                      </button>
                      <button
                        type="button"
                        className={`px-6 py-2 border ${
                          formData.gender === 'female' 
                            ? 'border-blue-500 bg-blue-50 text-blue-600' 
                            : 'border-gray-300 text-gray-700'
                        } rounded-md`}
                        onClick={() => handleGenderSelect('female')}
                      >
                        Женщина
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      >
                        Сохранить
                      </button>
                      
                      <button
                        type="button"
                        className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </div>
        
        {/* Контакты */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div 
            className="px-6 py-4 flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('contacts')}
          >
            <h3 className="text-lg font-medium">Контакты</h3>
            <ChevronDownIcon 
              className={`w-5 h-5 transform transition-transform ${sections.contacts ? 'rotate-180' : ''}`}
            />
          </div>
          
          {sections.contacts && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Номер телефона
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+7 (962) 339-03-09"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Почта
                    </label>
                    <input
                      type="email"
                      placeholder="reship@bk.ru"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      >
                        Сохранить
                      </button>
                      
                      <button
                        type="button"
                        className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default ProfilePage;
