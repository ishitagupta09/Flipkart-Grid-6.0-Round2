import React from 'react';
import type { Product } from '../types';
import { AlertTriangle, Clock } from 'lucide-react';

interface InventoryTableProps {
  products: Product[];
  type: 'regular' | 'produce';
}

export default function InventoryTable({ products, type }: InventoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S.No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            {type === 'regular' ? (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </>
            ) : (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produce
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Freshness
                </th>
              </>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expected Life Span (Days)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date().toLocaleString()}
              </td>
              {type === 'regular' ? (
                <>
                  <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(product.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(product.expiryDate) < new Date() ? (
                      <span className="text-red-500 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Expired
                      </span>
                    ) : (
                      <span className="text-green-500">Valid</span>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        product.freshness! >= 90
                          ? 'bg-green-500'
                          : product.freshness! >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`} />
                      {product.freshness}%
                    </div>
                  </td>
                </>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {product.expectedLifeSpan}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}