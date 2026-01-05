import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const CloseIcon = () => (
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div 
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" 
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-scale-in">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button 
                        type="button" 
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
