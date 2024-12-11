import React from 'react';
import { 
  Package, 
  Smartphone, 
  Leaf, 
  Sparkles, 
  Stethoscope, // Changed from Pills to Stethoscope for Medicine
  Palette, 
  Coffee, 
  Wine 
} from 'lucide-react';
import type { ProductCategory } from '../types';

interface CategoryTabsProps {
  activeTab: ProductCategory | 'all';
  onTabChange: (tab: ProductCategory | 'all') => void;
}

export default function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  const tabs = [
    { id: 'all', label: 'All', icon: Package },
    { id: 'electronics', label: 'Electronics', icon: Smartphone },
    { id: 'produce', label: 'Produce', icon: Leaf },
    { id: 'beauty', label: 'Beauty', icon: Sparkles },
    { id: 'medicine', label: 'Medicine', icon: Stethoscope },
    { id: 'cosmetics', label: 'Cosmetics', icon: Palette },
    { id: 'food', label: 'Food', icon: Coffee },
    { id: 'beverages', label: 'Beverages', icon: Wine }
  ];

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id as ProductCategory | 'all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}