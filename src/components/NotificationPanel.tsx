
import React from 'react';
import { X, Bell, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  isRead: boolean;
}

const NotificationPanel: React.FC = () => {
  const { notifications, markAsRead, clearAll, closeNotificationPanel } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in z-50">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <div className="flex space-x-2">
          <button
            onClick={clearAll}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary px-2 py-1 rounded transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={closeNotificationPanel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification: Notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.isRead && (
                  <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(NotificationPanel);
