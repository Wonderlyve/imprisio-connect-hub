
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, ShoppingBag, Globe } from "lucide-react";
import AccountLayout from './AccountLayout';
import Profile from './Profile';
import Addresses from './Addresses';
import Orders from './Orders';
import Language from './Language';

const Account = () => {
  const [activeTab, setActiveTab] = React.useState("profile");

  return (
    <AccountLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Adresses
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Commandes
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Langue
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        
        <TabsContent value="addresses">
          <Addresses />
        </TabsContent>
        
        <TabsContent value="orders">
          <Orders />
        </TabsContent>
        
        <TabsContent value="language">
          <Language />
        </TabsContent>
      </Tabs>
    </AccountLayout>
  );
};

export default Account;
