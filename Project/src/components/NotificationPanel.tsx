import React from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationPanel({ notifications, onClose, onMarkAsRead }: NotificationPanelProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="absolute top-full right-4 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border-b hover:bg-gray-50 ${
              notification.read ? 'opacity-60' : ''
            }`}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <div className="flex gap-3">
              {getIcon(notification.type)}
              <div>
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}