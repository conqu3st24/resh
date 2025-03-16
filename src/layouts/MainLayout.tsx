import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScrollToTop } from '../hooks';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useScrollToTop();
  
  return (
    <div className="flex flex-col min-h-screen bg-lightGray">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout; 