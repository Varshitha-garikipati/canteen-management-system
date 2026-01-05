import { FoodCategory, OrderStatus } from '../types';

const LOCAL_STORAGE_KEY = 'canteenMenuItems';
const TRANSACTIONS_KEY = 'canteenTransactions';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const getInitialData = () => [
    { id: generateId(), name: 'Masala Samosa', price: 20, category: FoodCategory.APPETIZER, imageUrl: 'https://images.unsplash.com/photo-1601050638917-3f887b993f4e?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Butter Chicken', price: 380, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Gulab Jamun (2 pcs)', price: 60, category: FoodCategory.DESSERT, imageUrl: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Mango Lassi', price: 90, category: FoodCategory.BEVERAGE, imageUrl: 'https://images.unsplash.com/photo-1571006682858-39d777954388?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Paneer Tikka', price: 280, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1567184109191-3756c73445a5?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Peri Peri Fries', price: 110, category: FoodCategory.SNACK, imageUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=400', isAvailable: false },
    { id: generateId(), name: 'Tandoori Roti', price: 25, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Masala Chai', price: 40, category: FoodCategory.BEVERAGE, imageUrl: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Chole Bhature', price: 180, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Pani Puri (6 pcs)', price: 50, category: FoodCategory.SNACK, imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Chicken Biryani', price: 320, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Masala Dosa', price: 140, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Veg Hakka Noodles', price: 160, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Spring Rolls (4 pcs)', price: 120, category: FoodCategory.APPETIZER, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Rasgulla (2 pcs)', price: 50, category: FoodCategory.DESSERT, imageUrl: 'https://images.unsplash.com/photo-1626202341492-4d13f8c85023?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Jalebi (100g)', price: 70, category: FoodCategory.DESSERT, imageUrl: 'https://images.unsplash.com/photo-1623689048105-a17b1e1936b1?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Filter Coffee', price: 45, category: FoodCategory.BEVERAGE, imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Cold Coffee', price: 120, category: FoodCategory.BEVERAGE, imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4bb1dba5?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Pav Bhaji', price: 150, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Aloo Paratha', price: 80, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Medu Vada (2 pcs)', price: 90, category: FoodCategory.SNACK, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Onion Pakora', price: 60, category: FoodCategory.APPETIZER, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Kulfi', price: 80, category: FoodCategory.DESSERT, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: false },
    { id: generateId(), name: 'Chicken Tikka', price: 290, category: FoodCategory.APPETIZER, imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Rajma Chawal', price: 160, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Dal Makhani', price: 220, category: FoodCategory.MAIN_COURSE, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Vada Pav', price: 30, category: FoodCategory.SNACK, imageUrl: 'https://images.unsplash.com/photo-1626132646545-0d67da9d7a22?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Lemonade', price: 50, category: FoodCategory.BEVERAGE, imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: generateId(), name: 'Fish Fry', price: 350, category: FoodCategory.APPETIZER, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400', isAvailable: false },
    { id: generateId(), name: 'Rasmalai (2 pcs)', price: 90, category: FoodCategory.DESSERT, imageUrl: 'https://images.unsplash.com/photo-1626202341492-4d13f8c85023?auto=format&fit=crop&q=80&w=400', isAvailable: true },
];

const getItems = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const itemsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (itemsJson) {
                resolve(JSON.parse(itemsJson));
            } else {
                const initialData = getInitialData();
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
                resolve(initialData);
            }
        }, 600);
    });
};

const addItem = (itemData) => {
    return new Promise(async (resolve) => {
        const items = await getItems();
        const newItem = { ...itemData, id: generateId() };
        const updatedItems = [...items, newItem];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
        setTimeout(() => resolve(newItem), 400);
    });
};

const updateItem = (updatedItem) => {
    return new Promise(async (resolve, reject) => {
        const items = await getItems();
        const itemIndex = items.findIndex(item => item.id === updatedItem.id);
        if (itemIndex > -1) {
            const updatedItems = [...items];
            updatedItems[itemIndex] = updatedItem;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
            setTimeout(() => resolve(updatedItem), 400);
        } else {
            reject(new Error('Item not found'));
        }
    });
};

const deleteItem = (id) => {
    return new Promise(async (resolve, reject) => {
        let items = await getItems();
        const itemIndex = items.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            items = items.filter(item => item.id !== id);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
            setTimeout(() => resolve(), 400);
        } else {
            reject(new Error('Item not found'));
        }
    });
};

const getTransactions = () => {
  return new Promise((resolve) => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    resolve(data ? JSON.parse(data) : []);
  });
};

const recordTransaction = (item) => {
  return new Promise(async (resolve) => {
    const transactions = await getTransactions();
    const newTransaction = {
      id: generateId(),
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      category: item.category,
      timestamp: new Date().toISOString(),
      status: OrderStatus.NEW
    };
    const updated = [newTransaction, ...transactions];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
    resolve(newTransaction);
  });
};

const updateTransactionStatus = (id, status) => {
  return new Promise(async (resolve, reject) => {
    const transactions = await getTransactions();
    const index = transactions.findIndex(tx => tx.id === id);
    if (index > -1) {
      transactions[index].status = status;
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
      resolve();
    } else {
      reject(new Error('Transaction not found'));
    }
  });
};

export const canteenService = {
    getItems,
    addItem,
    updateItem,
    deleteItem,
    getTransactions,
    recordTransaction,
    updateTransactionStatus
};
