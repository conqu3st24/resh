import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  project: string;
}

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    project: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!formData.name || !formData.email) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    // Эмуляция отправки данных на сервер
    setIsSubmitting(true);
    
    try {
      // В реальном приложении здесь был бы запрос к API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
      
      // Сброс формы после успешной отправки
      setFormData({
        name: '',
        email: '',
        project: ''
      });
    } catch (error) {
      toast.error('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-8 md:py-12 bg-gray-50">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Контакты</h1>
          <div className="flex items-center text-textGray">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">›</span>
            <span>Контакты</span>
          </div>
        </div>
        
        {/* Основной блок с формой */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Левая часть с преимуществами */}
            <div className="p-8 bg-blue-50">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Давайте обсудим ваш проект</h2>
              <p className="text-primary text-lg mb-8">
                Первая консультация бесплатна — узнайте, как ИИ может трансформировать ваш бизнес
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Почему стоит связаться прямо сейчас:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Полная концентрация на вашем проекте</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Индивидуальный подход к каждому клиенту</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Быстрый запуск и видимые результаты</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Выберите удобный способ связи:</h3>
                <div className="space-y-4">
                  <a 
                    href="https://t.me/Kera_programmer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.95z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">Telegram</div>
                      <div className="text-primary text-sm">@Kera_programmer</div>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-primary" />
                  </a>
                  
                  <a 
                    href="https://wa.me/79285521799" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 4.5c-3.183 0-5.797 2.614-5.797 5.797v.203c0 .266.035.515.097.75.5 1.903 2.198 3.344 4.25 3.344 1.197 0 2.271-.494 3.047-1.281.776.787 1.85 1.281 3.047 1.281 2.052 0 3.75-1.441 4.25-3.344.062-.235.097-.484.097-.75v-.203c0-3.183-2.614-5.797-5.797-5.797H12.14zm-3.703 6.635c.512 0 .926.414.926.926s-.414.926-.926.926-.926-.414-.926-.926.414-.926.926-.926zm7.406 0c.512 0 .926.414.926.926s-.414.926-.926.926-.926-.414-.926-.926.414-.926.926-.926z"/>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-primary text-sm">+7 (928) 552-17-99</div>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Правая часть с формой */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Расскажите о вашем проекте</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Как к вам обращаться?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email или телефон
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Как с вами связаться?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="project" className="block text-gray-700 mb-2">
                    Опишите ваш проект
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder="Расскажите о вашей задаче или идее..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span>Отправка...</span>
                  ) : (
                    <>
                      <span>Отправить сообщение</span>
                      <PaperAirplaneIcon className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
                
                <div className="text-center text-gray-500 text-sm mt-4">
                  Обычно я отвечаю в течение 2-3 часов в рабочее время
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Контактная информация */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start">
              <PhoneIcon className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Телефон</h3>
                <p className="text-gray-600">
                  <a href="tel:+79213330701" className="hover:text-primary">+7 921 333 07 01</a>
                </p>
                <p className="text-sm text-gray-500 mt-1">Пн-Пт: 10:00 - 19:00</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start">
              <EnvelopeIcon className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@reship.ru" className="hover:text-primary">info@reship.ru</a>
                </p>
                <p className="text-sm text-gray-500 mt-1">Отвечаем в течение 24 часов</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Адрес</h3>
                <p className="text-gray-600">
                  г. Санкт-Петербург, ул. Большая Конюшенная, д. 19
                </p>
                <p className="text-sm text-gray-500 mt-1">Пн-Вс: 11:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Карта */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold text-secondary mb-6">Как нас найти</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.9801987523278!2d30.32112081621797!3d59.93879686904928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310fca145cc1%3A0x42371d51a3c4e95!2z0JHQvtC70YzRiNCw0Y8g0JrQvtC90Y7RiNC10L3QvdCw0Y8g0YPQuy4sIDE5LCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywgMTkxMTg2!5e0!3m2!1sru!2sru!4v1615554574517!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Карта с расположением офиса"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactsPage; 