
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, BadgePercent, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const MobileNav = () => {
  const location = useLocation();
  const { isLoggedIn, currentUser } = useAuth();
  
  const navItems = [
    { label: 'Accueil', icon: <Home className="w-5 h-5" />, path: '/' },
    { label: 'Catégories', icon: <ShoppingBag className="w-5 h-5" />, path: '/services' },
    { label: 'Imprimeurs', icon: <Users className="w-5 h-5" />, path: '/imprimeurs' },
    { label: 'Promos', icon: <BadgePercent className="w-5 h-5" />, path: '/promotions' },
    { 
      label: 'Compte', 
      icon: <User className="w-5 h-5" />, 
      path: isLoggedIn ? (currentUser?.role === 'printer' ? '/printer-dashboard' : '/account/profile') : '/login'
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 px-2 py-2">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center text-xs py-1 rounded",
              location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                ? "text-imprisio-primary"
                : "text-gray-500 hover:text-imprisio-primary"
            )}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
