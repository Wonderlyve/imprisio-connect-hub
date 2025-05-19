
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Home, Pencil, Trash2 } from "lucide-react";
import { Address } from "@/hooks/use-addresses";

interface AddressListProps {
  addresses: Address[];
  isLoading: boolean;
  onAddClick: () => void;
  onEditClick: (address: Address) => void;
  onDeleteClick: (id: string) => void;
}

const AddressList = ({ addresses, isLoading, onAddClick, onEditClick, onDeleteClick }: AddressListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-imprisio-primary" />
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <Home className="h-12 w-12 mx-auto text-gray-400" />
        <p className="mt-4 text-gray-600">Vous n'avez pas encore d'adresses enregistrées</p>
        <Button onClick={onAddClick} variant="outline" className="mt-4">
          Ajouter votre première adresse
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div 
          key={address.id} 
          className={`p-4 rounded-lg border ${address.isDefault ? 'bg-imprisio-light border-imprisio-primary' : 'bg-white border-gray-200'}`}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              {address.isDefault && (
                <span className="inline-block bg-imprisio-primary text-white text-xs px-2 py-1 rounded-full mb-2">
                  Adresse par défaut
                </span>
              )}
              <p className="font-medium">{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>{address.city} {address.postalCode && `, ${address.postalCode}`}</p>
              <p>{address.state} {address.country}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEditClick(address)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => address.id && onDeleteClick(address.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
