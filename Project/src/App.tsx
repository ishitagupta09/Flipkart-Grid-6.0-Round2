import React, { useState } from 'react';
import type { Product, Notification, ProductCategory } from './types';
import { INITIAL_PRODUCTS, INITIAL_NOTIFICATIONS } from './data/sampleData';
import Header from './components/Header';
import ProductScanner from './components/ProductScanner';
import InventoryTable from './components/InventoryTable';
import NotificationPanel from './components/NotificationPanel';
import CategoryTabs from './components/CategoryTabs';
import StatsCards from './components/StatsCards';

function App() {
  const [activeTab, setActiveTab] = useState<ProductCategory | 'all'>('all');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

  const handleScan = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
    // Add notification for new scan
    setNotifications(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Product Scanned',
      message: `${newProduct.name} has been added to inventory`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false
    }, ...prev]);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        notifications={unreadNotifications}
        onToggleNotifications={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)}
        isNotificationsPanelOpen={isNotificationsPanelOpen}
      />
      {isNotificationsPanelOpen && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setIsNotificationsPanelOpen(false)}
          onMarkAsRead={handleMarkNotificationAsRead}
        />
      )}

      <main className="container mx-auto py-8 px-4">
        <StatsCards products={products} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <InventoryTable
                products={products.filter(
                  p => activeTab === 'all' || p.category.toLowerCase() === activeTab.toLowerCase()
                )}
                type={activeTab === 'produce' ? 'produce' : 'regular'}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <ProductScanner onScan={handleScan} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;