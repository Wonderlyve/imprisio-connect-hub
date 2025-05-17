
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Plus, Pencil, Trash2, Check } from 'lucide-react';

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Bureau',
      address: '123 Avenue du Commerce, Gombe',
      city: 'Kinshasa',
      country: 'RDC',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Domicile',
      address: '45 Rue des Fleurs, Lingwala',
      city: 'Kinshasa',
      country: 'RDC',
      isDefault: false,
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState({
    id: '',
    name: '',
    address: '',
    city: '',
    country: '',
    isDefault: false,
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    country: 'RDC',
    isDefault: false,
  });

  const { toast } = useToast();

  const handleEdit = (addressId: string) => {
    const addressToEdit = addresses.find(addr => addr.id === addressId);
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setIsEditing(addressId);
    }
  };

  const handleUpdate = () => {
    const updatedAddresses = addresses.map(addr => 
      addr.id === editingAddress.id ? editingAddress : addr
    );
    
    // If the updated address is set as default, update other addresses
    if (editingAddress.isDefault) {
      const finalAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === editingAddress.id
      }));
      setAddresses(finalAddresses);
    } else {
      setAddresses(updatedAddresses);
    }
    
    setIsEditing(null);
    
    toast({
      title: "Adresse mise à jour",
      description: "L'adresse a été mise à jour avec succès.",
    });
  };

  const handleDelete = (addressId: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setAddresses(updatedAddresses);
    
    toast({
      title: "Adresse supprimée",
      description: "L'adresse a été supprimée avec succès.",
    });
  };

  const handleAddNew = () => {
    const newId = `${addresses.length + 1}`;
    
    // If this is the first address or marked as default, make sure it's the only default
    const finalNewAddress = {
      ...newAddress,
      id: newId,
      isDefault: newAddress.isDefault || addresses.length === 0
    };
    
    let updatedAddresses;
    
    if (finalNewAddress.isDefault) {
      updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
      updatedAddresses.push(finalNewAddress);
    } else {
      updatedAddresses = [...addresses, finalNewAddress];
    }
    
    setAddresses(updatedAddresses);
    setNewAddress({
      name: '',
      address: '',
      city: '',
      country: 'RDC',
      isDefault: false,
    });
    setShowAddForm(false);
    
    toast({
      title: "Adresse ajoutée",
      description: "La nouvelle adresse a été ajoutée avec succès.",
    });
  };

  const setDefaultAddress = (addressId: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    
    setAddresses(updatedAddresses);
    
    toast({
      title: "Adresse par défaut modifiée",
      description: "L'adresse par défaut a été modifiée avec succès.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Mes adresses</h2>
          <p className="text-gray-600">Gérez vos adresses de livraison</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center"
          disabled={showAddForm}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une adresse
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nouvelle adresse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-name">Nom de l'adresse</Label>
                <Input 
                  id="new-name" 
                  value={newAddress.name} 
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  placeholder="Bureau, Domicile, etc."
                />
              </div>
              
              <div>
                <Label htmlFor="new-address">Adresse</Label>
                <Input 
                  id="new-address" 
                  value={newAddress.address} 
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  placeholder="Rue, numéro, etc."
                />
              </div>
              
              <div>
                <Label htmlFor="new-city">Ville</Label>
                <Input 
                  id="new-city" 
                  value={newAddress.city} 
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  placeholder="Ville"
                />
              </div>
              
              <div>
                <Label htmlFor="new-country">Pays</Label>
                <Input 
                  id="new-country" 
                  value={newAddress.country} 
                  onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                  placeholder="Pays"
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <input 
                  type="checkbox" 
                  id="new-default" 
                  checked={newAddress.isDefault} 
                  onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                  className="mt-1"
                />
                <Label htmlFor="new-default" className="font-normal">
                  Définir comme adresse par défaut
                </Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddNew}>
                  Ajouter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        {addresses.map((address) => (
          <Card key={address.id} className={address.isDefault ? 'border-imprisio-primary' : ''}>
            <CardContent className="p-6">
              {isEditing === address.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`edit-name-${address.id}`}>Nom de l'adresse</Label>
                    <Input 
                      id={`edit-name-${address.id}`} 
                      value={editingAddress.name} 
                      onChange={(e) => setEditingAddress({...editingAddress, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`edit-address-${address.id}`}>Adresse</Label>
                    <Input 
                      id={`edit-address-${address.id}`} 
                      value={editingAddress.address} 
                      onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`edit-city-${address.id}`}>Ville</Label>
                    <Input 
                      id={`edit-city-${address.id}`} 
                      value={editingAddress.city} 
                      onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`edit-country-${address.id}`}>Pays</Label>
                    <Input 
                      id={`edit-country-${address.id}`} 
                      value={editingAddress.country} 
                      onChange={(e) => setEditingAddress({...editingAddress, country: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id={`edit-default-${address.id}`} 
                      checked={editingAddress.isDefault} 
                      onChange={(e) => setEditingAddress({...editingAddress, isDefault: e.target.checked})}
                      className="mt-1"
                    />
                    <Label htmlFor={`edit-default-${address.id}`} className="font-normal">
                      Définir comme adresse par défaut
                    </Label>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(null)}>
                      Annuler
                    </Button>
                    <Button onClick={handleUpdate}>
                      Enregistrer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-lg">{address.name}</h3>
                      {address.isDefault && (
                        <span className="bg-imprisio-light text-imprisio-primary text-xs px-2 py-0.5 rounded-full">Par défaut</span>
                      )}
                    </div>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-gray-600">{address.city}, {address.country}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    {!address.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setDefaultAddress(address.id)}
                        className="text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Par défaut
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(address.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(address.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
