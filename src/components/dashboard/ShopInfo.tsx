
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserData } from '@/contexts/AuthContext';

interface ShopInfoProps {
  currentUser: UserData | null;
  isLoading: boolean;
}

const ShopInfo = ({ currentUser, isLoading }: ShopInfoProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-imprisio-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Nom de l'imprimerie</label>
          <input 
            type="text" 
            value={currentUser?.businessName || ""}
            className="w-full p-2 border rounded-md"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Propriétaire</label>
          <input 
            type="text" 
            value={currentUser?.fullName || ""}
            className="w-full p-2 border rounded-md"
            readOnly
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
          <input 
            type="email" 
            value={currentUser?.email || ""}
            className="w-full p-2 border rounded-md"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Téléphone</label>
          <input 
            type="tel" 
            value={currentUser?.phone || ""}
            className="w-full p-2 border rounded-md"
            readOnly
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Adresse</label>
        <input 
          type="text" 
          value={currentUser?.businessAddress || ""}
          className="w-full p-2 border rounded-md"
          readOnly
        />
      </div>
      
      <div className="flex justify-end">
        <Button>Modifier les informations</Button>
      </div>
    </div>
  );
};

export default ShopInfo;
