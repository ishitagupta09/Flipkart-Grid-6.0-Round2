import React from 'react';
import { Package, AlertTriangle, Clock, Leaf } from 'lucide-react';
import type { Product } from '../types';

interface StatsCardsProps {
  products: Product[];
}

export default function StatsCards({ products }: StatsCardsProps) {
  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.count < 10).length,
    nearExpiry: products.filter(p => {
      const daysUntilExpiry = Math.ceil(
        (new Date(p.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length,
    freshness: Math.round(
      products
        .filter(p => p.freshness)
        .reduce((acc, p) => acc + (p.freshness || 0), 0) /
        products.filter(p => p.freshness).length
    )
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <Package className="w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-3xl font-bold mt-2">{stats.total}</p>
        <p className="text-sm text-green-500 mt-1">+12% from last month</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Low Stock Items</h3>
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{stats.lowStock}</p>
        <p className="text-sm text-red-500 mt-1">Needs attention</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Near Expiry</h3>
          <Clock className="w-6 h-6 text-orange-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{stats.nearExpiry}</p>
        <p className="text-sm text-orange-500 mt-1">Expiring within 30 days</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Fresh Products</h3>
          <Leaf className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{stats.freshness}%</p>
        <p className="text-sm text-green-500 mt-1">Optimal freshness maintained</p>
      </div>
    </div>
  );
}