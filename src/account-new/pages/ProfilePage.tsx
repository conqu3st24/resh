"use client"

import React, { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { cn } from "../../utils/classNames"

const ProfilePage: React.FC = () => {
  // Состояния для аккордеонов
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    contacts: true,
  })

  // Состояния для полей формы
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "male", // male или female
    phone: "+7 (962) 339-03-09",
    email: "reship@bk.ru",
  })

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Обработчик выбора пола
  const handleGenderSelect = (gender: "male" | "female") => {
    setProfileData((prev) => ({
      ...prev,
      gender,
    }))
  }

  // Обработчик открытия/закрытия аккордеонов
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Обработчики сохранения форм
  const handleSaveBasicInfo = () => {
    alert("Основная информация сохранена")
  }

  const handleSaveContacts = () => {
    alert("Контактная информация сохранена")
  }

  // Обработчики для фото
  const handleUpdatePhoto = () => {
    alert("Функция обновления фото")
  }

  const handleDeletePhoto = () => {
    alert("Функция удаления фото")
  }

  return (
    <div className="flex-1">
      <h1 className="text-[36px] text-[#3772FF] mb-8">Профиль</h1>

      {/* Основная информация */}
      <div className="mb-5">
        <div
          className="bg-white rounded-t-[7px] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("basicInfo")}
        >
          <h2 className="text-xl font-medium">Основная информация</h2>
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              openSections.basicInfo ? "transform rotate-180" : "",
            )}
          />
        </div>

        {openSections.basicInfo && (
          <div className="bg-white mt-[1px] rounded-b-[7px] p-6">
            {/* Фото профиля */}
            <div className="bg-[#F5F7FA] rounded-[7px] p-4 mb-6 flex flex-col md:flex-row items-start md:items-center">
              <div className="mr-4 mb-4 md:mb-0">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Аватар пользователя"
                  className="w-[80px] h-[80px] rounded-[5px]"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-2">
                  <button
                    className="bg-[#096DFF] text-white border-none hover:bg-[#0756CC] py-2 px-4 rounded-[7px]"
                    onClick={handleUpdatePhoto}
                  >
                    Обновить фото
                  </button>
                  <button
                    className="border-2 border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white py-2 px-4 rounded-[7px]"
                    onClick={handleDeletePhoto}
                  >
                    Удалить фото
                  </button>
                </div>
                <p className="text-sm text-[#5F5F5F]">
                  Минимальный размер изображения профиля (аватара) – 320×320 пикселей.
                </p>
              </div>
            </div>

            {/* Форма основной информации */}
            <div className="space-y-6">
              <div>
                <label className="block mb-1 text-sm font-medium">*Имя</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  placeholder="* Обязательный пункт"
                  className="w-full border-2 border-[#D9D9D9] rounded-[7px] h-12 px-3"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">*Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  placeholder="* Обязательный пункт"
                  className="w-full border-2 border-[#D9D9D9] rounded-[7px] h-12 px-3"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Дата рождения</label>
                <input
                  type="text"
                  name="birthDate"
                  value={profileData.birthDate}
                  onChange={handleInputChange}
                  placeholder="Например: 05.03.2025"
                  className="w-full border-2 border-[#D9D9D9] rounded-[7px] h-12 px-3"
                />
              </div>

              <div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className={cn(
                      "flex-1 h-12 rounded-[7px]",
                      profileData.gender === "male"
                        ? "bg-[#096DFF] text-white hover:bg-[#0756CC]"
                        : "bg-white border-2 border-[#D9D9D9] text-[#212121] hover:bg-[#F5F7FA]",
                    )}
                    onClick={() => handleGenderSelect("male")}
                  >
                    Мужчина
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "flex-1 h-12 rounded-[7px]",
                      profileData.gender === "female"
                        ? "bg-[#096DFF] text-white hover:bg-[#0756CC]"
                        : "bg-white border-2 border-[#D9D9D9] text-[#212121] hover:bg-[#F5F7FA]",
                    )}
                    onClick={() => handleGenderSelect("female")}
                  >
                    Женщина
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                className="bg-[#212121] hover:bg-black text-white h-12 px-8 rounded-[7px]"
                onClick={handleSaveBasicInfo}
              >
                Сохранить
              </button>
              <button className="border-none text-[#212121] hover:bg-[#F5F7FA] hover:text-[#212121] h-12 px-4">
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Контакты */}
      <div className="mb-5">
        <div
          className="bg-white rounded-t-[7px] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("contacts")}
        >
          <h2 className="text-xl font-medium">Контакты</h2>
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              openSections.contacts ? "transform rotate-180" : "",
            )}
          />
        </div>

        {openSections.contacts && (
          <div className="bg-white mt-[1px] rounded-b-[7px] p-6">
            <div className="space-y-6">
              <div>
                <label className="block mb-1 text-sm font-medium">Номер телефона</label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#D9D9D9] rounded-[7px] h-12 pr-10 px-3"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D9D9D9]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 8L14 2M8 8L2 14M8 8L2 2M8 8L14 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Почта</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#D9D9D9] rounded-[7px] h-12 px-3"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                className="bg-[#212121] hover:bg-black text-white h-12 px-8 rounded-[7px]"
                onClick={handleSaveContacts}
              >
                Сохранить
              </button>
              <button className="border-none text-[#212121] hover:bg-[#F5F7FA] hover:text-[#212121] h-12 px-4">
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
