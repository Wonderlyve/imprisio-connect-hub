
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would update the user profile here
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès.",
    });
    
    setIsEditing(false);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Informations personnelles</h2>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Annuler" : "Modifier"}
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end mt-6">
              <Button type="submit">
                Enregistrer les modifications
              </Button>
            </div>
          )}
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t">
        <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
        
        <Button variant="outline">Modifier le mot de passe</Button>
      </div>
    </div>
  );
};

export default Profile;
