
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, BadgeCheck } from 'lucide-react';

const Profile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phoneNumber: '', // Added default empty string for phone number
    businessName: currentUser?.businessName || '',
    businessAddress: currentUser?.businessAddress || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès.",
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Mon profil</h2>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>
        <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? 'Enregistrer les modifications' : 'Modifier le profil'}
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <Label htmlFor="fullName" className="mb-2 block">Nom complet</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                ) : (
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.fullName}</span>
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-1/2">
                <Label htmlFor="email" className="mb-2 block">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                ) : (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <Label htmlFor="phoneNumber" className="mb-2 block">Téléphone</Label>
                {isEditing ? (
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.phoneNumber || "Non défini"}</span>
                  </div>
                )}
              </div>
              
              {currentUser?.role === 'printer' && (
                <div className="w-full md:w-1/2">
                  <Label htmlFor="businessName" className="mb-2 block">Nom de l'entreprise</Label>
                  {isEditing ? (
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center">
                      <BadgeCheck className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{formData.businessName}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {currentUser?.role === 'printer' && (
              <div>
                <Label htmlFor="businessAddress" className="mb-2 block">Adresse de l'entreprise</Label>
                {isEditing ? (
                  <Input
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                  />
                ) : (
                  <div className="flex items-center">
                    <BadgeCheck className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formData.businessAddress}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
