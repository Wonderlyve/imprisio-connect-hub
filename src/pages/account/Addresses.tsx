
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock addresses
const initialAddresses = [
  {
    id: '1',
    name: 'Domicile',
    street: 'Av. Lumumba 243',
    city: 'Kinshasa',
    zone: 'Ngaliema',
    isDefault: true
  },
  {
    id: '2',
    name: 'Bureau',
    street: 'Rue Commercial 56',
    city: 'Kinshasa',
    zone: 'Gombe',
    isDefault: false
  }
];

const Addresses = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    street: '',
    city: '',
    zone: '',
    isDefault: false
  });
  
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      street: '',
      city: '',
      zone: '',
      isDefault: false
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing address
      setAddresses(prev => 
        prev.map(addr => addr.id === editingId ? { ...formData, id: editingId } : addr)
      );
      setEditingId(null);
      toast({ title: "Adresse mise à jour" });
    } else {
      // Add new address
      const newId = Date.now().toString();
      setAddresses(prev => [...prev, { ...formData, id: newId }]);
      toast({ title: "Nouvelle adresse ajoutée" });
    }
    
    setIsAddingNew(false);
    resetForm();
  };
  
  const handleEdit = (id: string) => {
    const addressToEdit = addresses.find(addr => addr.id === id);
    if (addressToEdit) {
      setFormData(addressToEdit);
      setEditingId(id);
      setIsAddingNew(true);
    }
  };
  
  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast({ title: "Adresse supprimée" });
    
    if (editingId === id) {
      setIsAddingNew(false);
      setEditingId(null);
      resetForm();
    }
  };
  
  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    toast({ title: "Adresse par défaut mise à jour" });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Mes adresses</h2>
          <p className="text-gray-600">Gérez vos adresses de livraison</p>
        </div>
        <Button onClick={() => {
          setIsAddingNew(!isAddingNew);
          setEditingId(null);
          resetForm();
        }}>
          {isAddingNew ? 'Annuler' : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter une adresse
            </>
          )}
        </Button>
      </div>
      
      {isAddingNew ? (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">
            {editingId ? 'Modifier l\'adresse' : 'Nouvelle adresse'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'adresse</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Domicile, Bureau, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="street">Rue et numéro</Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Adresse complète"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ville"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zone">Commune/Zone</Label>
              <Input
                id="zone"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                placeholder="Commune ou zone"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="mr-2"
            />
            <Label htmlFor="isDefault">Définir comme adresse par défaut</Label>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              {editingId ? 'Mettre à jour' : 'Ajouter l\'adresse'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(address => (
            <Card key={address.id} className="border-2 relative">
              {address.isDefault && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-imprisio-primary">Par défaut</Badge>
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-imprisio-primary mr-2 mt-1" />
                  <div>
                    <h3 className="font-medium">{address.name}</h3>
                    <p className="text-sm text-gray-600">{address.street}</p>
                    <p className="text-sm text-gray-600">{address.zone}, {address.city}</p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(address.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 border-red-200"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                  
                  {!address.isDefault && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Définir par défaut
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {addresses.length === 0 && (
            <div className="col-span-2 text-center py-12 border rounded-lg">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="font-medium text-lg mb-1">Aucune adresse</h3>
              <p className="text-gray-600 mb-4">Vous n'avez pas encore ajouté d'adresse</p>
              <Button onClick={() => setIsAddingNew(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter une adresse
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Addresses;
