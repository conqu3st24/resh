import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Reusable Button component with different variants and sizes
 * Updated to match the design system specifications
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center transition-colors font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 font-roboto';
  
  // Variant-specific styles - updated with design system colors
  const variantStyles = {
    primary: 'bg-primary hover:bg-lightBlue text-white focus:ring-primary',
    secondary: 'bg-lightGray hover:bg-gray-200 text-secondary focus:ring-gray-400',
    outline: 'border border-primary text-primary hover:bg-blue-50 focus:ring-primary',
    text: 'text-primary hover:bg-blue-50 focus:ring-primary',
  };
  
  // Size-specific styles
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combined styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;
  
  return (
    <button className={buttonStyles} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button; 