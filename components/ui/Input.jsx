import React from 'react';

const Input = ({ label, id, error, className = '', ...props }) => {
    const errorClasses = 'border-red-500 focus:ring-red-500 focus:border-red-500';
    const defaultClasses = 'border-gray-300 focus:ring-primary focus:border-primary';

    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input
                id={id}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 transition ${error ? errorClasses : defaultClasses} ${className}`}
                {...props}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
