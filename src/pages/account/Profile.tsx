
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile, ProfileData } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { currentUser } = useAuth();
  const { updateProfile, uploadAvatar, fetchFullProfile, isLoading } = useProfile();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatarUrl: '',
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const result = await fetchFullProfile();
      if (result.success && result.data) {
        setProfileData(result.data);
      }
    };
    
    if (currentUser) {
      loadProfile();
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximum autorisée est de 5 Mo",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "Seuls les formats JPEG, PNG et GIF sont acceptés",
        variant: "destructive",
      });
      return;
    }

    const result = await uploadAvatar(file);
    if (result.success && result.url) {
      setProfileData({
        ...profileData,
        avatarUrl: result.url
      });
      
      await updateProfile({
        avatarUrl: result.url
      });
    }
  };

  const getInitials = () => {
    return `${profileData.firstName?.charAt(0) || ''}${profileData.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar upload section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  {profileData.avatarUrl ? (
                    <AvatarImage src={profileData.avatarUrl} alt={profileData.firstName} />
                  ) : null}
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-imprisio-primary text-white p-1 rounded-full cursor-pointer">
                  <Camera size={16} />
                </label>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isLoading}
                />
              </div>
              <span className="text-sm text-gray-500">Cliquez sur l'icône pour changer votre photo</span>
            </div>

            {/* Profile form */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">Prénom</label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      placeholder="Prénom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Nom</label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      placeholder="Nom"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    readOnly
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">L'adresse email ne peut pas être modifiée</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                  <Input
                    id="phone"
                    value={profileData.phone || ''}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="Téléphone"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="imprisio-button mt-4"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    'Enregistrer les modifications'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      {currentUser?.role === 'printer' && (
        <Card>
          <CardHeader>
            <CardTitle>Information de l'imprimerie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom de l'entreprise</label>
                <p className="font-medium">{currentUser.businessName}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Adresse</label>
                <p>{currentUser.businessAddress}</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/printer-dashboard'}
                className="mt-2"
              >
                Aller au tableau de bord
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
