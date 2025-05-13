
import { useEffect, useState } from 'react';

type NotificationType = 'order' | 'message' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: Date;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sound] = useState(new Audio('/notification-sound.mp3'));

  const addNotification = (
    type: NotificationType,
    title: string,
    message: string,
    data?: any
  ) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      read: false,
      data,
      createdAt: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    
    // Play notification sound
    try {
      sound.currentTime = 0;
      sound.play().catch(err => console.error("Error playing notification sound:", err));
    } catch (error) {
      console.error("Error with audio playback:", error);
    }

    return newNotification.id;
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  };
};
