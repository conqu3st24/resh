"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Categories from "@/components/Categories"
import Footer from "@/components/Footer"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from "lucide-react"

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // В реальном приложении здесь будет отправка данных на сервер
    console.log("Form submitted:", formData)
    setIsSubmitted(true)

    // Сбросить форму через 3 секунды
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      <Header />
      <Navigation />
      <Categories />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-[#0A6DFF]">
            Главная
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">Контакты</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Контакты</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Наши контакты</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#0A6DFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                  <p className="text-gray-700">г. Санкт-Петербург, ул. Примерная, д. 123, офис 45</p>
                  <p className="text-gray-500 text-sm mt-1">Бизнес-центр "Технополис", 4 этаж</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#0A6DFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                  <p className="text-gray-700">+7 921 333 07 01</p>
                  <p className="text-gray-500 text-sm mt-1">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#0A6DFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-700">info@reship.ru</p>
                  <p className="text-gray-500 text-sm mt-1">Для общих вопросов</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#0A6DFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Режим работы</h3>
                  <p className="text-gray-700">Пн-Пт: 10:00 - 20:00</p>
                  <p className="text-gray-700">Сб-Вс: 11:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Мы в социальных сетях</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center hover:bg-[#0A6DFF]/20 transition"
                >
                  <svg className="w-5 h-5 text-[#0A6DFF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center hover:bg-[#0A6DFF]/20 transition"
                >
                  <svg className="w-5 h-5 text-[#0A6DFF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center hover:bg-[#0A6DFF]/20 transition"
                >
                  <svg className="w-5 h-5 text-[#0A6DFF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#0A6DFF]/10 rounded-full flex items-center justify-center hover:bg-[#0A6DFF]/20 transition"
                >
                  <svg className="w-5 h-5 text-[#0A6DFF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.374 17c-.897 0-1.626-.727-1.624s.729-1.624 1.626-1.624 1.626.727 1.626 1.624-.729 1.624-1.626 1.624zm3.885 0c-.03-3.022-2.485-5.474-5.511-5.504v-2.406c4.361.03 7.889 3.555 7.92 7.91h-2.409zm4.081 0c-.016-5.297-4.303-9.571-9.592-9.594v-2.406c6.623.023 11.985 5.384 12 12h-2.408z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Напишите нам</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Сообщение отправлено!</h3>
                <p className="text-gray-700">Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A6DFF]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A6DFF]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Тема
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A6DFF]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A6DFF]"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#0A6DFF] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Как нас найти</h2>
          <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            {/* Здесь будет интерактивная карта Google Maps */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.8734445883054!2d30.316614!3d59.929846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDA3JzQ3LjUiTiAzMMKwMTEnNTkuNyJF!5e0!3m2!1sru!2sru!4v1625574367968!5m2!1sru!2sru" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Карта расположения офиса"
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 