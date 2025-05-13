
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Box, Info, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const navItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: Users, label: 'Imprimeurs', path: '/imprimeurs' },
    { icon: Box, label: 'Services', path: '/services' },
    { icon: Info, label: 'À propos', path: '/about' },
    { icon: User, label: 'Compte', path: '/login' },
  ];
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const isActive = path === item.path || 
                          (item.path !== '/' && path.startsWith(item.path));
          
          return (
            <Link 
              to={item.path}
              key={index}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-imprisio-primary" : "text-gray-500"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
