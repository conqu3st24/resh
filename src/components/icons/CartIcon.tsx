import React from 'react';

interface CartIconProps {
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 33 34" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12.4167 31.9954C13.1071 31.9954 13.6667 31.4358 13.6667 30.7454C13.6667 30.055 13.1071 29.4954 12.4167 29.4954C11.7263 29.4954 11.1667 30.055 11.1667 30.7454C11.1667 31.4358 11.7263 31.9954 12.4167 31.9954Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27.4167 31.9954C28.1071 31.9954 28.6667 31.4358 28.6667 30.7454C28.6667 30.055 28.1071 29.4954 27.4167 29.4954C26.7263 29.4954 26.1667 30.055 26.1667 30.7454C26.1667 31.4358 26.7263 31.9954 27.4167 31.9954Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.75 7.99536H6.75L10.59 22.1154C10.7366 22.7354 11.0966 23.2887 11.6084 23.6852C12.1203 24.0817 12.7536 24.3013 13.4 24.3154H26.55C27.1964 24.3013 27.8297 24.0817 28.3416 23.6852C28.8534 23.2887 29.2134 22.7354 29.36 22.1154L31.75 12.3154H8.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default CartIcon;
