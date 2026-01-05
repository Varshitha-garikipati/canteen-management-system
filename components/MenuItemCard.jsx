import React from 'react';

const MenuItemCard = ({ item, onEdit, onDelete, onOrder }) => {

    const EditIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
      </svg>
    );

    const DeleteIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
      </svg>
    );

    const OrderIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );

    const availabilityClass = item.isAvailable 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
        : 'bg-rose-100 text-rose-700 border-rose-200 ring-2 ring-rose-50';
    
    return (
        <div className={`group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col ${!item.isAvailable ? 'opacity-80' : ''}`}>
            <div className="relative overflow-hidden h-48">
                <img 
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!item.isAvailable ? 'grayscale opacity-75' : ''}`} 
                    src={item.imageUrl} 
                    alt={item.name} 
                    loading="lazy"
                />
                {!item.isAvailable && (
                    <div className="absolute inset-0 bg-gray-900/10 backdrop-grayscale-[0.5] flex items-center justify-center pointer-events-none">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-rose-600 uppercase tracking-widest shadow-xl border border-rose-100">Unavailable</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60" />
                <div className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-md transition-all ${availabilityClass}`}>
                    {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-primary-600/80 px-2 py-0.5 rounded shadow-sm">
                        {item.category}
                    </span>
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-xl font-extrabold transition-colors line-clamp-1 ${item.isAvailable ? 'text-gray-900 group-hover:text-primary-600' : 'text-gray-500'}`}>{item.name}</h3>
                </div>
                
                <div className="flex items-center mt-3 mb-6">
                    <span className={`text-2xl font-black ${item.isAvailable ? 'text-gray-800' : 'text-gray-400'}`}>₹{item.price.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="mt-auto flex flex-col space-y-3">
                    <button 
                        onClick={() => onOrder(item)}
                        disabled={!item.isAvailable}
                        className={`w-full inline-flex items-center justify-center px-4 py-3 text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-md active:scale-95 ${item.isAvailable ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                        <OrderIcon />
                        Quick Order
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => onEdit(item)} 
                            className="inline-flex items-center justify-center px-4 py-2.5 text-[10px] font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-sm active:scale-95"
                        >
                            <EditIcon />
                            Edit
                        </button>
                        <button 
                            onClick={() => onDelete(item.id)} 
                            className="inline-flex items-center justify-center px-4 py-2.5 text-[10px] font-bold text-gray-600 bg-gray-50 rounded-xl border border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all active:scale-95"
                        >
                            <DeleteIcon />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;
