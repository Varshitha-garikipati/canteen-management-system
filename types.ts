
export enum FoodCategory {
  APPETIZER = 'Appetizer',
  MAIN_COURSE = 'Main Course',
  DESSERT = 'Dessert',
  BEVERAGE = 'Beverage',
  SNACK = 'Snack',
}

export enum OrderStatus {
  NEW = 'New Order',
  PREPARING = 'Preparing',
  READY = 'Ready to Serve',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: FoodCategory;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  category: FoodCategory;
  timestamp: string;
  status: OrderStatus;
}
