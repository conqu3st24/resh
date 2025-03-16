import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress = ({ value, className = '' }: ProgressProps) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div 
        className={`h-full ${value > 95 ? 'bg-red-500' : 'bg-blue-600'}`}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
};
