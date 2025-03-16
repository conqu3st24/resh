import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts';
import { Toaster } from 'react-hot-toast';
import {
  HomePage,
  CatalogPage,
  ProductPage,
  LoginPage,
  RegisterPage,
  RecoverPage,
  CartPage,
  CheckoutPage,
  CheckoutSuccessPage,
  SearchPage,
  PlayersPage,
  PlayerSetupPage,
  BlogPage,
  BlogPostPage,
  MouseFinderPage,
  SetupFinderPage,
  SalePage,
  GiftCardPage,
  GiftCardActivationPage,
  DeliveryPaymentPage,
  MouseComparisonPage,
  MouseStatsPage,
  ContactsPage
} from './pages';

// Импорт страниц личного кабинета
import ProfilePage from './pages/account/ProfilePage';
import OrdersPage from './pages/account/OrdersPage';
import FavoritePage from './pages/account/FavoritePage';
import DashboardPage from './pages/account/DashboardPage';
import ReviewsPage from './pages/account/ReviewsPage';
import NotificationsPage from './pages/account/NotificationsPage';

/**
 * Toast notification configuration
 */
const toastOptions = {
  duration: 3000,
  style: {
    background: '#fff',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '12px 16px',
  },
  success: {
    iconTheme: {
      primary: '#4F46E5',
      secondary: '#fff',
    },
  },
  error: {
    iconTheme: {
      primary: '#E11D48',
      secondary: '#fff',
    },
  },
};

/**
 * Main App component defining the application routes
 */
function App() {
  return (
    <Router>
      {/* Toast notifications */}
      <Toaster position="top-right" toastOptions={toastOptions} />
      
      <Routes>
        {/* Auth pages (without header and footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} />
        
        {/* Main pages (with header and footer) */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        
        {/* Catalog and product pages */}
        <Route path="/catalog/:category" element={<MainLayout><CatalogPage /></MainLayout>} />
        <Route path="/product/:id" element={<MainLayout><ProductPage /></MainLayout>} />
        <Route path="/search" element={<MainLayout><SearchPage /></MainLayout>} />
        <Route path="/discount" element={<MainLayout><SalePage /></MainLayout>} />
        <Route path="/gift-cards" element={<MainLayout><GiftCardPage /></MainLayout>} />
        <Route path="/gift-cards/activate" element={<MainLayout><GiftCardActivationPage /></MainLayout>} />
        <Route path="/delivery" element={<MainLayout><DeliveryPaymentPage /></MainLayout>} />
        <Route path="/contacts" element={<MainLayout><ContactsPage /></MainLayout>} />
        
        {/* User account and order pages */}
        <Route path="/account" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/account/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
        <Route path="/account/orders" element={<MainLayout><OrdersPage /></MainLayout>} />
        <Route path="/account/favorite" element={<MainLayout><FavoritePage /></MainLayout>} />
        <Route path="/account/reviews" element={<MainLayout><ReviewsPage /></MainLayout>} />
        <Route path="/account/notifications" element={<MainLayout><NotificationsPage /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
        <Route path="/checkout/success" element={<MainLayout><CheckoutSuccessPage /></MainLayout>} />
        
        {/* Community pages */}
        <Route path="/players" element={<MainLayout><PlayersPage /></MainLayout>} />
        <Route path="/player/:id" element={<MainLayout><PlayerSetupPage /></MainLayout>} />
        
        {/* Blog pages */}
        <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
        <Route path="/blog/:slug" element={<MainLayout><BlogPostPage /></MainLayout>} />
        
        {/* Tools pages */}
        <Route path="/tools/mouse-finder" element={<MainLayout><MouseFinderPage /></MainLayout>} />
        <Route path="/tools/setup-finder" element={<MainLayout><SetupFinderPage /></MainLayout>} />
        <Route path="/tools/mouse-comparison" element={<MainLayout><MouseComparisonPage /></MainLayout>} />
        <Route path="/tools/mouse-stats" element={<MainLayout><MouseStatsPage /></MainLayout>} />
        
        {/* 404 page */}
        <Route path="*" element={
          <MainLayout>
            <div className="container py-20 text-center">
              <h1 className="text-2xl font-bold mb-4">Страница не найдена</h1>
              <p className="text-gray-600">Запрошенная страница не существует.</p>
            </div>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
