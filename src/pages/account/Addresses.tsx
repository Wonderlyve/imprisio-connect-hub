
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Home, MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddress, Address, useAddresses } from "@/hooks/use-addresses";
import { useToast } from "@/hooks/use-toast";

const Addresses = () => {
  const { addresses, isLoading, fetchAddresses, addAddress, updateAddress, deleteAddress } = useAddresses();
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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-imprisio-primary" />
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-8">
              <Home className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-4 text-gray-600">Vous n'avez pas encore d'adresses enregistrées</p>
              <Button onClick={openAddDialog} variant="outline" className="mt-4">
                Ajouter votre première adresse
              </Button>
            </div>
          ) : (
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
                        onClick={() => openEditDialog(address)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => address.id && handleDeleteAddress(address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifier l'adresse" : "Ajouter une adresse"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Mettez à jour les informations de votre adresse" 
                : "Entrez les détails de votre nouvelle adresse de livraison"}
            </DialogDescription>
          </DialogHeader>
          
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

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
            >
              Annuler
            </Button>
            <Button 
              className="imprisio-button" 
              onClick={handleSaveAddress}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  {isEditing ? "Mettre à jour" : "Ajouter"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Addresses;
