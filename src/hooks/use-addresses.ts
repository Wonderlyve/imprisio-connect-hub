
import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Address {
  id?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, session } = useAuth();
  const { toast } = useToast();

  const fetchAddresses = async () => {
    if (!currentUser || !session) {
      return [];
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('is_default', { ascending: false });

      if (error) {
        console.error("Error fetching addresses:", error);
        return [];
      }

      const formattedAddresses = data.map(addr => ({
        id: addr.id,
        addressLine1: addr.address_line1,
        addressLine2: addr.address_line2 || '',
        city: addr.city,
        state: addr.state || '',
        postalCode: addr.postal_code || '',
        country: addr.country || 'Congo',
        isDefault: addr.is_default || false,
      }));

      setAddresses(formattedAddresses);
      return formattedAddresses;
    } catch (error) {
      console.error("Error in fetchAddresses:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async (address: Address) => {
    if (!currentUser || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour ajouter une adresse",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      // If this is the default address, update all other addresses to not be default
      if (address.isDefault) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', currentUser.id);
      }

      const { error } = await supabase
        .from('addresses')
        .insert({
          user_id: currentUser.id,
          address_line1: address.addressLine1,
          address_line2: address.addressLine2,
          city: address.city,
          state: address.state,
          postal_code: address.postalCode,
          country: address.country,
          is_default: address.isDefault
        });

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter l'adresse: " + error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      toast({
        title: "Adresse ajoutée",
        description: "Votre adresse a été ajoutée avec succès",
      });
      
      // Refresh the addresses list
      fetchAddresses();
      
      return { success: true };
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout de l'adresse",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = async (address: Address) => {
    if (!currentUser || !session || !address.id) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour mettre à jour une adresse",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      // If this is the default address, update all other addresses to not be default
      if (address.isDefault) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', currentUser.id)
          .neq('id', address.id);
      }

      const { error } = await supabase
        .from('addresses')
        .update({
          address_line1: address.addressLine1,
          address_line2: address.addressLine2,
          city: address.city,
          state: address.state,
          postal_code: address.postalCode,
          country: address.country,
          is_default: address.isDefault,
          updated_at: new Date().toISOString()
        })
        .eq('id', address.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour l'adresse: " + error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      toast({
        title: "Adresse mise à jour",
        description: "Votre adresse a été mise à jour avec succès",
      });
      
      // Refresh the addresses list
      fetchAddresses();
      
      return { success: true };
    } catch (error) {
      console.error("Error updating address:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour de l'adresse",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!currentUser || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour supprimer une adresse",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', currentUser.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'adresse: " + error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      toast({
        title: "Adresse supprimée",
        description: "Votre adresse a été supprimée avec succès",
      });
      
      // Refresh the addresses list
      fetchAddresses();
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting address:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression de l'adresse",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && session) {
      fetchAddresses();
    }
  }, [currentUser, session]);

  return {
    addresses,
    isLoading,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};
