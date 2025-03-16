import React from 'react';

interface ShieldCheckIconProps {
  className?: string;
}

const ShieldCheckIcon: React.FC<ShieldCheckIconProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#212121" />
      <path 
        d="M12 18C12 18 17 15.5 17 12V7.5L12 5.5L7 7.5V12C7 15.5 12 18 12 18Z" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M9.75 11.5L11.25 13L14.25 10" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShieldCheckIcon;
