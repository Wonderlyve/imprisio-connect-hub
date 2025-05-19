
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Address, useAddresses } from "@/hooks/use-addresses";
import { useToast } from "@/hooks/use-toast";
import AddressList from "@/components/account/AddressList";
import AddressDialog from "@/components/account/AddressDialog";

const Addresses = () => {
  const { addresses, isLoading, addAddress, updateAddress, deleteAddress } = useAddresses();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Congo',
    isDefault: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const openAddDialog = () => {
    setCurrentAddress({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Congo',
      isDefault: addresses.length === 0 // Make default if this is the first address
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (address: Address) => {
    setCurrentAddress(address);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSaveAddress = async () => {
    // Basic validation
    if (!currentAddress.addressLine1 || !currentAddress.city) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      let result;
      
      if (isEditing && currentAddress.id) {
        result = await updateAddress(currentAddress);
      } else {
        result = await addAddress(currentAddress);
      }

      if (result.success) {
        setIsDialogOpen(false);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) {
      await deleteAddress(id);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Mes adresses</CardTitle>
            <CardDescription>Gérez vos adresses de livraison</CardDescription>
          </div>
          <Button onClick={openAddDialog} className="imprisio-button">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une adresse
          </Button>
        </CardHeader>
        <CardContent>
          <AddressList 
            addresses={addresses}
            isLoading={isLoading}
            onAddClick={openAddDialog}
            onEditClick={openEditDialog}
            onDeleteClick={handleDeleteAddress}
          />
        </CardContent>
      </Card>

      <AddressDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        currentAddress={currentAddress}
        setCurrentAddress={setCurrentAddress}
        onSave={handleSaveAddress}
        isEditing={isEditing}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Addresses;
