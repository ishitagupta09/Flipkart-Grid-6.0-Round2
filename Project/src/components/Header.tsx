import React from 'react';
import { Package, Bell } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

interface HeaderProps {
  notifications: number;
  onToggleNotifications: () => void;
  isNotificationsPanelOpen: boolean;
}

export default function Header({ notifications, onToggleNotifications, isNotificationsPanelOpen }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-8 h-8" />
          <h1 className="text-2xl font-bold">FlipTrack Warehouse</h1>
        </div>
        <button
          onClick={onToggleNotifications}
          className="relative p-2 hover:bg-indigo-700 rounded-full transition-colors"
        >
          <Bell className="w-6 h-6" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}