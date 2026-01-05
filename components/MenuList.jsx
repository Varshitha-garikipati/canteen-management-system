import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ items, onEdit, onDelete, onOrder }) => {
    if (!items || items.length === 0) {
        return <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400 font-bold uppercase tracking-widest text-xs">No menu items found. Try adjusting your search or filter.</div>;
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {items.map(item => (
                <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    onOrder={onOrder}
                />
            ))}
        </div>
    );
};

export default MenuList;
