
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export const useProfile = () => {
  const { currentUser, session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateProfile = async (profileData: Partial<ProfileData>) => {
    if (!currentUser || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour mettre à jour votre profil",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          avatar_url: profileData.avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le profil: " + error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      toast({
        title: "Profil mis à jour",
        description: "Votre profil a été mis à jour avec succès",
      });
      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du profil",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!currentUser || !session) {
      return { success: false, url: null };
    }

    setIsLoading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${currentUser.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('imprisio')
        .upload(filePath, file);

      if (uploadError) {
        toast({
          title: "Erreur",
          description: "Impossible de télécharger la photo: " + uploadError.message,
          variant: "destructive",
        });
        return { success: false, url: null };
      }

      const url = `${supabase.storageUrl}/object/public/imprisio/${filePath}`;
      return { success: true, url };
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du téléchargement de la photo",
        variant: "destructive",
      });
      return { success: false, url: null };
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFullProfile = async () => {
    if (!currentUser || !session) {
      return { success: false, data: null };
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return { success: false, data: null };
      }

      return { 
        success: true, 
        data: {
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || currentUser.email,
          phone: data.phone || '',
          avatarUrl: data.avatar_url || '',
        } 
      };
    } catch (error) {
      console.error("Error in fetchFullProfile:", error);
      return { success: false, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    uploadAvatar,
    fetchFullProfile,
    isLoading
  };
};
