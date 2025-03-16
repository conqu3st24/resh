import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className = '', children }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ className = '', children }: CardContentProps) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};
