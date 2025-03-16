"use client"

import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  TruckIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline"
import { toast } from "react-hot-toast"
import type { RootState } from "../../store"
import { setActiveHistoryStep, toggleShowAllItems } from "../../store/slices/orderSlice"
import { cn } from "../../utils/classNames"

const OrderDetailsPage: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()

  // Получаем данные из Redux store
  const activeHistoryStep = useSelector((state: RootState) => state.order.activeHistoryStep)
  const showAllItems = useSelector((state: RootState) => state.order.showAllItems)

  // Состояние для аккордеонов
  const [openSections, setOpenSections] = useState({
    orderInfo: true,
    orderHistory: true,
    deliveryInfo: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Мок-данные для заказа
  const orderData = {
    id: id,
    orderNumber: "2430119",
    status: "delivered" as const,
    date: "07.03.2025",
    itemCount: 3,
    items: [
      {
        id: 1,
        name: "WLmouse Beat X Max 8K",
        description: "Описание товара",
        image: "/placeholder.svg?height=60&width=60",
        quantity: 1,
        price: "200₽",
        total: "1×12 200₽",
      },
      {
        id: 2,
        name: "WLmouse Beat X Max 8K",
        description: "Коврик размером NxN",
        image: "/placeholder.svg?height=60&width=104",
        quantity: 3,
        price: "200₽",
        total: "1×3 200₽",
      },
      {
        id: 3,
        name: "WLmouse Beat X Max 8K",
        description: "Описание товара",
        image: "/placeholder.svg?height=60&width=60",
        quantity: 8,
        price: "200₽",
        total: "1×8 200₽",
      },
    ],
    history: [
      {
        id: 0,
        status: "Оформлен",
        date: "23 мая, 10:00",
        description: "Мы подтвердили ваш заказ и скоро начинаем его собирать",
        icon: "circle",
      },
      {
        id: 1,
        status: "Готовится к отправке",
        date: "23 мая, 10:00",
        description: "Мы подтвердили ваш заказ и скоро начинаем его собирать",
        icon: "star",
      },
      {
        id: 2,
        status: "В пути",
        date: "24 мая, 12:00",
        description: "Ваш заказ передан курьеру и скоро будет доставлен",
        icon: "truck",
        completed: false,
      },
      {
        id: 3,
        status: "Доставлен",
        date: "25 мая, 15:00",
        description: "Заказ доставлен в пункт выдачи",
        icon: "package",
        completed: false,
      },
    ],
    delivery: {
      date: "23 мая, 09:00 - 21:00",
      method: "Самовывоз",
      payment: "СБП",
      address: "23 мая, 09:00 - 21:00",
      mapImage: "/placeholder.svg?height=150&width=400",
    },
  }

  const displayedItems = showAllItems ? orderData.items : orderData.items.slice(0, 2)

  const handleRepeatOrder = () => {
    toast.success("Заказ добавлен в корзину")
  }

  const handleDownloadReceipt = () => {
    toast.success("Чек скачивается...")
  }

  const handleLeaveReview = () => {
    toast.success("Переход к форме отзыва")
  }

  return (
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/account" className="flex items-center text-[#096DFF] hover:underline">
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Назад к списку заказов</span>
        </Link>
        <h1 className="text-[36px] text-[#3772FF]">Мои покупки</h1>
      </div>

      {/* Информация о заказе */}
      <div className="mb-5">
        <div
          className="bg-white rounded-t-[7px] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("orderInfo")}
        >
          <h2 className="text-xl font-medium">Информация о заказе</h2>
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              openSections.orderInfo ? "transform rotate-180" : "",
            )}
          />
        </div>

        {openSections.orderInfo && (
          <div className="bg-white mt-[1px] rounded-b-[7px] p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <div className="flex items-center">
                <span className="text-base">№ {orderData.orderNumber}</span>
                <span className="ml-4 py-[5px] px-[9px] bg-[#096DFF] text-white rounded-[7px] text-[14px]">
                  Получен
                </span>
              </div>
              <div className="text-base">Количество товаров: {orderData.itemCount}</div>
            </div>

            {/* Список товаров */}
            <div className="space-y-2">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F5F7FA] rounded-[7px] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-[#EDF0F7] transition-colors"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-[60px] h-[60px] bg-white rounded-[7px] flex items-center justify-center">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-base">{item.name}</h3>
                      <p className="text-sm text-[#5F5F5F]">{item.description}</p>
                    </div>
                  </div>
                  <div className="font-medium text-base">{item.total}</div>
                </div>
              ))}

              {orderData.items.length > 2 && (
                <button
                  className="w-full mt-2 py-2 px-4 border-2 border-[#096DFF] text-[#096DFF] rounded-[7px] hover:bg-[#096DFF] hover:text-white transition-colors"
                  onClick={() => dispatch(toggleShowAllItems())}
                >
                  {showAllItems ? "Скрыть" : `Показать еще ${orderData.items.length - 2} товара`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* История заказа */}
      <div className="mb-5">
        <div
          className="bg-white rounded-t-[7px] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("orderHistory")}
        >
          <h2 className="text-xl font-medium">История заказа</h2>
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              openSections.orderHistory ? "transform rotate-180" : "",
            )}
          />
        </div>

        {openSections.orderHistory && (
          <div className="bg-white mt-[1px] rounded-b-[7px] p-4">
            <div className="relative">
              {orderData.history.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex mb-8 relative cursor-pointer",
                    activeHistoryStep === item.id ? "opacity-100" : "opacity-70",
                  )}
                  onClick={() => dispatch(setActiveHistoryStep(item.id))}
                >
                  <div className="mr-4 relative z-10">
                    {item.icon === "circle" ? (
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-[#096DFF] flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#096DFF]"></div>
                      </div>
                    ) : item.icon === "star" ? (
                      <div className="w-8 h-8 rounded-full bg-[#096DFF] flex items-center justify-center text-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    ) : item.icon === "truck" ? (
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white",
                          item.completed ? "bg-[#096DFF]" : "bg-[#ADADAD]",
                        )}
                      >
                        <TruckIcon className="w-4 h-4" />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white",
                          item.completed ? "bg-[#096DFF]" : "bg-[#ADADAD]",
                        )}
                      >
                        <ShoppingBagIcon className="w-4 h-4" />
                      </div>
                    )}
                    {index < orderData.history.length - 1 && (
                      <div
                        className={cn(
                          "absolute top-8 left-4 w-[1px] h-[calc(100%-8px)]",
                          index < activeHistoryStep ? "bg-[#096DFF]" : "bg-[#D9D9D9]",
                        )}
                      ></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-base">{item.status}</h3>
                      <span className="text-sm text-[#5F5F5F]">• {item.date}</span>
                    </div>
                    <p className="text-sm text-[#5F5F5F] mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Информация о доставке */}
      <div className="mb-5">
        <div
          className="bg-white rounded-t-[7px] p-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("deliveryInfo")}
        >
          <h2 className="text-xl font-medium">Информация о доставке</h2>
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              openSections.deliveryInfo ? "transform rotate-180" : "",
            )}
          />
        </div>

        {openSections.deliveryInfo && (
          <div className="bg-white mt-[1px] rounded-b-[7px] p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="border border-[#D9D9D9] rounded-[7px] p-3 hover:border-[#096DFF] transition-colors">
                <div className="text-sm text-[#5F5F5F] mb-1 flex items-center gap-2">
                  <TruckIcon className="w-4 h-4 text-[#096DFF]" />
                  Дата доставки
                </div>
                <div className="text-base">{orderData.delivery.date}</div>
              </div>
              <div className="border border-[#D9D9D9] rounded-[7px] p-3 hover:border-[#096DFF] transition-colors">
                <div className="text-sm text-[#5F5F5F] mb-1 flex items-center gap-2">
                  <ShoppingBagIcon className="w-4 h-4 text-[#096DFF]" />
                  Способ доставки
                </div>
                <div className="text-base">{orderData.delivery.method}</div>
              </div>
              <div className="border border-[#D9D9D9] rounded-[7px] p-3 hover:border-[#096DFF] transition-colors">
                <div className="text-sm text-[#5F5F5F] mb-1 flex items-center gap-2">
                  <CreditCardIcon className="w-4 h-4 text-[#096DFF]" />
                  Способ оплаты
                </div>
                <div className="text-base">{orderData.delivery.payment}</div>
              </div>
            </div>

            <div className="border border-[#D9D9D9] rounded-[7px] p-3 mb-4 hover:border-[#096DFF] transition-colors">
              <div className="text-sm text-[#5F5F5F] mb-1 flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-[#096DFF]" />
                Адрес пункта выдачи
              </div>
              <div className="text-base">{orderData.delivery.address}</div>
            </div>

            <div className="rounded-[7px] overflow-hidden relative group">
              <img
                src={orderData.delivery.mapImage || "/placeholder.svg"}
                alt="Карта с пунктом выдачи"
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-[#096DFF] rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  Пункт выдачи
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button
          className="bg-[#096DFF] hover:bg-[#0756CC] text-white flex items-center gap-2 py-2 px-4 rounded-[7px] transition-colors"
          onClick={handleRepeatOrder}
        >
          <ArrowPathIcon className="w-4 h-4" />
          Повторить заказ
        </button>

        <button
          className="border-2 border-[#096DFF] text-[#096DFF] hover:bg-[#096DFF] hover:text-white py-2 px-4 rounded-[7px] transition-colors"
          onClick={handleDownloadReceipt}
        >
          Скачать чек
        </button>

        <button
          className="border-2 border-[#5F5F5F] text-[#5F5F5F] hover:bg-[#5F5F5F] hover:text-white py-2 px-4 rounded-[7px] transition-colors"
          onClick={handleLeaveReview}
        >
          Оставить отзыв
        </button>
      </div>
    </div>
  )
}

export default OrderDetailsPage
