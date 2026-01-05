import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FoodCategory, OrderStatus } from './types';
import { canteenService } from './services/canteenService';
import Header from './components/Header';
import MenuList from './components/MenuList';
import ItemFormModal from './components/ItemFormModal';
import ConfirmationModal from './components/ConfirmationModal';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import Toast from './components/ui/Toast';

const App = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState('menu');
    const [toasts, setToasts] = useState([]);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    
    const [currentItem, setCurrentItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const [items, txs] = await Promise.all([
                canteenService.getItems(),
                canteenService.getTransactions()
            ]);
            setMenuItems(items);
            setTransactions(txs);
        } catch (err) {
            setError('Failed to fetch data.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addToast = (message, type = 'success') => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleAddItem = () => {
        setCurrentItem(null);
        setIsFormModalOpen(true);
    };

    const handleEditItem = (item) => {
        setCurrentItem(item);
        setIsFormModalOpen(true);
    };

    const handleSaveItem = async (item) => {
        try {
            if (item.id) {
                await canteenService.updateItem(item);
                addToast(`Item "${item.name}" updated`, 'info');
            } else {
                await canteenService.addItem(item);
                addToast(`New item "${item.name}" added`, 'success');
            }
            await fetchData();
            setIsFormModalOpen(false);
            setCurrentItem(null);
        } catch (err) {
            setError('Failed to save item.');
            addToast('Error saving item', 'error');
            console.error(err);
        }
    };

    const handleDeleteRequest = (id) => {
        setItemToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            try {
                await canteenService.deleteItem(itemToDelete);
                await fetchData();
                setIsConfirmModalOpen(false);
                setItemToDelete(null);
                addToast('Item deleted successfully', 'info');
            } catch (err) {
                setError('Failed to delete item.');
                addToast('Error deleting item', 'error');
                console.error(err);
            }
        }
    };

    const handleOrder = async (item) => {
        try {
            await canteenService.recordTransaction(item);
            const txs = await canteenService.getTransactions();
            setTransactions(txs);
            addToast(`Order placed: ${item.name}`, 'success');
        } catch (err) {
            addToast('Quick Order failed', 'error');
            console.error('Order failed', err);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await canteenService.updateTransactionStatus(id, status);
            const txs = await canteenService.getTransactions();
            setTransactions(txs);
            addToast(`Order status: ${status}`, 'info');
        } catch (err) {
            addToast('Failed to update status', 'error');
            console.error('Status update failed', err);
        }
    };

    const filteredMenuItems = useMemo(() => {
        return menuItems
            .filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(item => 
                categoryFilter === 'All' || item.category === categoryFilter
            );
    }, [menuItems, searchTerm, categoryFilter]);

    const activeTransactions = useMemo(() => {
        return transactions.filter(t => 
            t.status === OrderStatus.NEW || 
            t.status === OrderStatus.PREPARING || 
            t.status === OrderStatus.READY
        );
    }, [transactions]);

    const AddIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfd] text-gray-800 pb-24 relative">
            <Header />

            <div className="fixed top-24 right-6 z-[100] flex flex-col space-y-3 pointer-events-none">
                {toasts.map(toast => (
                  <Toast 
                    key={toast.id} 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => removeToast(toast.id)} 
                  />
                ))}
            </div>
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
                <Dashboard items={menuItems} transactions={transactions} />
                
                <div className="mb-10 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 w-full lg:w-auto self-start overflow-hidden">
                            <button 
                                onClick={() => setActiveView('menu')}
                                className={`flex-1 lg:w-32 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeView === 'menu' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Menu
                            </button>
                            <button 
                                onClick={() => setActiveView('status')}
                                className={`flex-1 lg:w-40 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeView === 'status' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Order Status
                            </button>
                            <button 
                                onClick={() => setActiveView('history')}
                                className={`flex-1 lg:w-32 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeView === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                History
                            </button>
                        </div>

                        {activeView === 'menu' && (
                            <>
                                <div className="relative flex-grow w-full">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search menu items..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white text-sm font-medium"
                                    />
                                </div>
                                <div className="w-full lg:w-64">
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer text-sm font-bold text-gray-700"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                                    >
                                        <option value="All">All Categories</option>
                                        {Object.values(FoodCategory).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 space-y-4">
                        <div className="w-16 h-16 border-[6px] border-primary-100 border-t-primary-600 rounded-full animate-spin shadow-inner"></div>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs animate-pulse">Loading menu items...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-rose-50 shadow-xl">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 text-rose-500 mb-6 border border-rose-100">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Sync Error</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">{error}</p>
                        <button onClick={fetchData} className="px-8 py-3 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-95 uppercase tracking-widest text-xs">Reload System</button>
                    </div>
                ) : activeView === 'menu' ? (
                    <MenuList 
                        items={filteredMenuItems} 
                        onEdit={handleEditItem} 
                        onDelete={handleDeleteRequest} 
                        onOrder={handleOrder}
                    />
                ) : activeView === 'status' ? (
                    <TransactionHistory 
                      transactions={activeTransactions} 
                      onUpdateStatus={handleUpdateStatus}
                      title="Live Order Pipeline"
                    />
                ) : (
                    <TransactionHistory 
                      transactions={transactions} 
                      onUpdateStatus={handleUpdateStatus}
                      title="Full Transaction History"
                    />
                )}
            </main>

            {isFormModalOpen && (
                <ItemFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSaveItem}
                    item={currentItem}
                />
            )}
            {isConfirmModalOpen && (
                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Menu Item"
                    message="Are you sure you want to remove this item? This will permanently delete it from the menu database."
                />
            )}
            
            {activeView === 'menu' && (
                <button
                    onClick={handleAddItem}
                    className="fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white font-black px-6 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-100 z-40 flex items-center space-x-3 group"
                    aria-label="Add new menu item"
                >
                    <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-90 transition-transform">
                        <AddIcon />
                    </div>
                    <span className="hidden sm:inline uppercase tracking-widest text-xs">New Dish</span>
                </button>
            )}
        </div>
    );
};

export default App;
