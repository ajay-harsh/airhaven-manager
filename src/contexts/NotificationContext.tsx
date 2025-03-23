
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define types for our notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  isRead: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  isNotificationPanelOpen: boolean;
  toggleNotificationPanel: () => void;
  closeNotificationPanel: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Sample notification data
const initialNotifications: Notification[] = [
  {
    id: uuidv4(),
    title: 'System Update',
    message: 'Air-Buddy system has been updated to version 2.4.0',
    time: '10 minutes ago',
    type: 'info',
    isRead: false
  },
  {
    id: uuidv4(),
    title: 'Maintenance Alert',
    message: 'Scheduled maintenance will occur tonight at 02:00 UTC',
    time: '2 hours ago',
    type: 'warning',
    isRead: false
  },
  {
    id: uuidv4(),
    title: 'Login Alert',
    message: 'New login detected from New York, USA',
    time: 'Yesterday',
    type: 'warning',
    isRead: true
  },
  {
    id: uuidv4(),
    title: 'Report Generated',
    message: 'Monthly performance report has been generated successfully',
    time: '3 days ago',
    type: 'success',
    isRead: true
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'isRead'>) => {
    const newNotification = {
      ...notification,
      id: uuidv4(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const toggleNotificationPanel = useCallback(() => {
    setIsNotificationPanelOpen(prev => !prev);
  }, []);

  const closeNotificationPanel = useCallback(() => {
    setIsNotificationPanelOpen(false);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearAll,
        isNotificationPanelOpen,
        toggleNotificationPanel,
        closeNotificationPanel
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
