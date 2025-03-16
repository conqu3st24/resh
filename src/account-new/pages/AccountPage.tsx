"use client"

import React, { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { UserIcon, ShoppingBagIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import ProfilePage from "./ProfilePage"
import OrderDetailsPage from "./OrderDetailsPage"
import { cn } from "../../utils/classNames"

const AccountPage: React.FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("profile") // profile, orders
  
  // Handle tab switching
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Handle logout
  const handleLogout = () => {
    alert("Выход из аккаунта")
    // Implement logout functionality here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-[7px] p-6">
            <h2 className="text-xl font-medium mb-6">Личный кабинет</h2>
            
            <div className="space-y-3">
              <Link 
                to="/account" 
                className={cn(
                  "flex items-center gap-3 py-2 px-3 rounded-[7px] w-full transition-colors",
                  location.pathname === "/account" || location.pathname === "/account/profile"
                    ? "bg-[#F5F7FA] text-[#096DFF]"
                    : "hover:bg-[#F5F7FA] text-[#212121]"
                )}
                onClick={() => handleTabChange("profile")}
              >
                <UserIcon className="w-5 h-5" />
                <span>Профиль</span>
              </Link>
              
              <Link 
                to="/account/orders" 
                className={cn(
                  "flex items-center gap-3 py-2 px-3 rounded-[7px] w-full transition-colors",
                  location.pathname.includes("/account/orders")
                    ? "bg-[#F5F7FA] text-[#096DFF]"
                    : "hover:bg-[#F5F7FA] text-[#212121]"
                )}
                onClick={() => handleTabChange("orders")}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Мои покупки</span>
              </Link>
              
              <button 
                className="flex items-center gap-3 py-2 px-3 rounded-[7px] w-full transition-colors hover:bg-[#F5F7FA] text-[#212121]"
                onClick={handleLogout}
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

// Mock orders list component
const OrdersList: React.FC = () => {
  const orders = [
    {
      id: "2430119",
      date: "07.03.2025",
      status: "Получен",
      totalItems: 3,
      total: "16 600₽",
    },
    {
      id: "2430118",
      date: "05.03.2025",
      status: "В обработке",
      totalItems: 1,
      total: "8 200₽",
    },
    {
      id: "2430117",
      date: "02.03.2025",
      status: "Доставлен",
      totalItems: 2,
      total: "12 800₽",
    },
  ]

  return (
    <div>
      <h1 className="text-[36px] text-[#3772FF] mb-8">Мои покупки</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-[7px] p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <div>
                <span className="font-medium">Заказ №{order.id}</span>
                <span className="text-sm text-[#5F5F5F] ml-2">от {order.date}</span>
              </div>
              <div className="py-1 px-3 bg-[#096DFF] text-white rounded-[5px] text-sm">
                {order.status}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div className="text-sm text-[#5F5F5F]">
                Количество товаров: {order.totalItems}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">{order.total}</span>
                <Link
                  to={`/account/orders/${order.id}`}
                  className="bg-[#096DFF] hover:bg-[#0756CC] text-white py-2 px-4 rounded-[7px] transition-colors"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountPage
