export type ProductCategory = 
  | 'Electronics'
  | 'Produce'
  | 'Beauty'
  | 'Fashion'
  | 'Medicine'
  | 'Cosmetics'
  | 'Food'
  | 'Beverages';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  expiryDate: string;
  count: number;
  category: ProductCategory;
  freshness?: number;
  expectedLifeSpan: number;
  image: string;
  storage?: string;
  batchNumber?: string;
  location?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'success' | 'error' | 'info';
  timestamp: string;
  read: boolean;
}

export interface ScannerState {
  isActive: boolean;
  lastScanned: Product | null;
}