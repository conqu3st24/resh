import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import AccountLayout from '../../components/account/AccountLayout';
import AccountDashboard from '../../components/account/AccountDashboard';

const DashboardPage = () => {
  // In a real application, you would fetch this data from Redux or an API
  const [stats, setStats] = useState({
    ordersCount: 0,
    favoritesCount: 0,
    reviewsCount: 0,
    notificationsCount: 2
  });

  // Example of how to use Redux state
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);
  const orders = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {
    // Update stats based on redux state or make API calls
    setStats({
      ordersCount: orders?.length || 3,
      favoritesCount: favoriteItems?.length || 5,
      reviewsCount: 2, // Example value
      notificationsCount: 2 // Example value
    });
  }, [favoriteItems, orders]);

  return (
    <AccountLayout activeTab="dashboard" title="Панель управления">
      <AccountDashboard 
        ordersCount={stats.ordersCount}
        favoritesCount={stats.favoritesCount}
        reviewsCount={stats.reviewsCount}
        notificationsCount={stats.notificationsCount}
      />
    </AccountLayout>
  );
};

export default DashboardPage;
