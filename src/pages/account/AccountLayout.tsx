
import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, ShoppingBag, MapPin, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AccountLayout = () => {
  const location = useLocation();
  const { isLoggedIn, currentUser } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect printer users to printer dashboard
  if (currentUser?.role === 'printer') {
    return <Navigate to="/printer-dashboard" replace />;
  }

  // Define account tabs
  const accountTabs = [
    { value: 'profile', label: 'Profil', icon: <User className="w-4 h-4 mr-2" />, path: '/account/profile' },
    { value: 'orders', label: 'Mes commandes', icon: <ShoppingBag className="w-4 h-4 mr-2" />, path: '/account/orders' },
    { value: 'addresses', label: 'Adresses', icon: <MapPin className="w-4 h-4 mr-2" />, path: '/account/addresses' },
    { value: 'language', label: 'Langue', icon: <Globe className="w-4 h-4 mr-2" />, path: '/account/language' },
  ];
  
  // Determine active tab
  const activeTab = accountTabs.find(tab => location.pathname.startsWith(tab.path))?.value || 'profile';
  
  return (
    <div className="imprisio-section bg-white">
      <div className="imprisio-container">
        <div className="mb-6 flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="p-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Mon compte</h1>
        </div>
        
        <div className="grid md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar navigation for desktop */}
          <div className="hidden md:block">
            <Card className="p-4">
              <div className="space-y-1">
                {accountTabs.map(tab => (
                  <Link 
                    key={tab.value} 
                    to={tab.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm w-full ${
                      location.pathname.startsWith(tab.path) 
                        ? 'bg-imprisio-primary text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Tab navigation for mobile */}
          <div className="md:hidden">
            <Tabs value={activeTab} className="w-full overflow-x-auto">
              <TabsList className="w-full justify-start">
                {accountTabs.map(tab => (
                  <Link key={tab.value} to={tab.path}>
                    <TabsTrigger value={tab.value} className="flex items-center">
                      {tab.icon}
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </TabsTrigger>
                  </Link>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Content area */}
          <div className="col-span-1 md:col-span-1">
            <Card className="p-6">
              <Outlet />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
