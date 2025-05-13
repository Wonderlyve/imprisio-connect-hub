
import React, { createContext, useContext } from 'react';
import { useNotification, Notification } from '@/hooks/use-notification';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    type: 'order' | 'message' | 'system',
    title: string,
    message: string,
    data?: any
  ) => string;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const notificationService = useNotification();

  return (
    <NotificationContext.Provider value={notificationService}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  
  return context;
};
