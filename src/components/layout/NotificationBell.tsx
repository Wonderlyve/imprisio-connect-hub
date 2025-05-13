
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotificationContext } from '@/providers/NotificationProvider';

const NotificationBell = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotificationContext();
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " ans";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " mois";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " jours";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " heures";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes";
    
    return Math.floor(seconds) + " secondes";
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex justify-between items-center border-b p-3">
          <h3 className="font-medium">Notifications</h3>
          {notifications.length > 0 && (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs h-7 px-2"
                onClick={() => markAllAsRead()}
              >
                Tout marquer comme lu
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs h-7 px-2"
                onClick={() => clearAllNotifications()}
              >
                Effacer tout
              </Button>
            </div>
          )}
        </div>
        
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`p-3 border-b last:border-b-0 cursor-pointer ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {getTimeAgo(notification.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>Aucune notification</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
