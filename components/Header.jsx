import React from 'react';

const Header = () => {
    const LogoIcon = () => (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white p-2.5 rounded-2xl shadow-sm border border-indigo-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 15h18" />
            <path d="M3 19h18" />
            <path d="m15 11-3 3-3-3" />
            <path d="M12 4v10" />
            <path d="M8 8.5C8 5.5 10 3 12 3s4 2.5 4 5.5" />
          </svg>
        </div>
      </div>
    );
    return (
        <header className="bg-white sticky top-0 z-50 border-b border-gray-100 backdrop-blur-md bg-white/80">
            <div className="container mx-auto px-6 py-5 md:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LogoIcon />
                  <div className="flex flex-col">
                    <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-none">
                      Canteen <span className="text-primary-600">Management System</span>
                    </h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Enterprise Operations Hub</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center">
                    <div className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-200 shadow-inner">
                        <span className="text-xs font-bold text-gray-900">Dashboard</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
