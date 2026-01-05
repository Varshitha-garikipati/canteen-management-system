
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
    const baseClasses = "px-5 py-2.5 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none transition-colors duration-200";

    const variantClasses = {
        primary: 'text-white bg-primary hover:bg-primary-700 focus:ring-primary-300',
        secondary: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-gray-200',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-300',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
