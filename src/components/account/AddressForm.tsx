
import React from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Address } from "@/hooks/use-addresses";

interface AddressFormProps {
  currentAddress: Address;
  setCurrentAddress: React.Dispatch<React.SetStateAction<Address>>;
}

const AddressForm = ({ currentAddress, setCurrentAddress }: AddressFormProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="addressLine1" className="text-sm font-medium">Adresse <span className="text-red-500">*</span></label>
        <Input
          id="addressLine1"
          value={currentAddress.addressLine1}
          onChange={(e) => setCurrentAddress({...currentAddress, addressLine1: e.target.value})}
          placeholder="123 Rue Principale"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="addressLine2" className="text-sm font-medium">Complément d'adresse</label>
        <Input
          id="addressLine2"
          value={currentAddress.addressLine2 || ''}
          onChange={(e) => setCurrentAddress({...currentAddress, addressLine2: e.target.value})}
          placeholder="Appartement, étage, etc."
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">Ville <span className="text-red-500">*</span></label>
          <Input
            id="city"
            value={currentAddress.city}
            onChange={(e) => setCurrentAddress({...currentAddress, city: e.target.value})}
            placeholder="Kinshasa"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">Province</label>
          <Input
            id="state"
            value={currentAddress.state || ''}
            onChange={(e) => setCurrentAddress({...currentAddress, state: e.target.value})}
            placeholder="Province"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="postalCode" className="text-sm font-medium">Code postal</label>
          <Input
            id="postalCode"
            value={currentAddress.postalCode || ''}
            onChange={(e) => setCurrentAddress({...currentAddress, postalCode: e.target.value})}
            placeholder="Code postal"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">Pays</label>
          <Input
            id="country"
            value={currentAddress.country}
            onChange={(e) => setCurrentAddress({...currentAddress, country: e.target.value})}
            placeholder="Congo"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id="isDefault" 
          checked={currentAddress.isDefault}
          onCheckedChange={(checked) => setCurrentAddress({...currentAddress, isDefault: checked === true})}
        />
        <label htmlFor="isDefault" className="text-sm text-gray-700">
          Définir comme adresse par défaut
        </label>
      </div>
    </div>
  );
};

export default AddressForm;
