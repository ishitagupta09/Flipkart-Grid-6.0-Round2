import { Product, Notification } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Anti-Aging Cream',
    brand: 'GlowUp',
    price: 999.99,
    expiryDate: '2024-08-15',
    count: 75,
    category: 'Beauty',
    freshness: 90,
    expectedLifeSpan: 365,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
    batchNumber: 'BT2024001'
  },
  {
    id: '2',
    name: 'Fresh Apples',
    brand: "Nature's Best",
    price: 199.99,
    expiryDate: '2024-04-15',
    count: 150,
    category: 'Produce',
    freshness: 95,
    expectedLifeSpan: 21,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    storage: '4°C'
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 129999.99,
    expiryDate: '2025-12-31',
    count: 45,
    category: 'Electronics',
    expectedLifeSpan: 730,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc',
    location: 'Aisle A-12'
  },
  {
    id: '4',
    name: 'Paracetamol',
    brand: 'HealthCare',
    price: 29.99,
    expiryDate: '2024-06-30',
    count: 500,
    category: 'Medicine',
    expectedLifeSpan: 365,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
    batchNumber: 'MED2024112'
  },
  {
    id: '5',
    name: 'Organic Spinach',
    brand: 'Green Fields',
    price: 29.99,
    expiryDate: '2024-03-20',
    count: 5,
    category: 'Produce',
    freshness: 88,
    expectedLifeSpan: 7,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    storage: '4°C'
  },
  {
    id: '6',
    name: 'Lipstick Set',
    brand: 'Glamour',
    price: 1499.99,
    expiryDate: '2025-01-15',
    count: 200,
    category: 'Cosmetics',
    expectedLifeSpan: 365,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    batchNumber: 'COS2024045'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Low Stock Alert',
    message: 'Organic Spinach stock is running low (5 units remaining)',
    type: 'warning',
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: '2',
    title: 'New Shipment Arrived',
    message: 'iPhone 15 Pro shipment has been received and logged',
    type: 'success',
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: '3',
    title: 'Expiring Soon',
    message: 'Multiple products are expiring within 30 days',
    type: 'warning',
    timestamp: new Date().toISOString(),
    read: false
  }
];