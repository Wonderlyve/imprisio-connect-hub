
import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PrinterService {
  id: string;
  name: string;
  description?: string;
  priceMin: number;
  priceMax: number;
  estimatedDays?: number;
  categoryId: string;
  categoryName?: string;
  imageUrl?: string;
}

interface ServiceFormData {
  name: string;
  description?: string;
  priceMin: number | string;
  priceMax: number | string;
  estimatedDays?: number | string;
  categoryId: string;
  imageUrl?: string;
}

export const usePrinterServices = () => {
  const [services, setServices] = useState<PrinterService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, session } = useAuth();
  const { toast } = useToast();

  const fetchServices = async () => {
    if (!currentUser || !session) {
      return [];
    }

    setIsLoading(true);

    try {
      // First get printer ID
      const { data: printerData, error: printerError } = await supabase
        .from('printers')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();
        
      if (printerError || !printerData) {
        console.error("Error fetching printer data:", printerError);
        setIsLoading(false);
        return [];
      }
      
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          service_categories (
            name
          )
        `)
        .eq('printer_id', printerData.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching printer services:", error);
        return [];
      }

      const formattedServices = data.map((service: any) => ({
        id: service.id,
        name: service.name,
        description: service.description,
        priceMin: parseFloat(service.price_min),
        priceMax: parseFloat(service.price_max),
        estimatedDays: service.estimated_days,
        categoryId: service.category_id,
        categoryName: service.service_categories?.name,
        imageUrl: service.image_url
      }));

      setServices(formattedServices);
      return formattedServices;
    } catch (error) {
      console.error("Error in fetchServices:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const createService = async (serviceData: ServiceFormData) => {
    if (!currentUser || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour créer un service",
        variant: "destructive",
      });
      return { success: false, service: null };
    }

    setIsLoading(true);

    try {
      // Get printer ID first
      const { data: printerData, error: printerError } = await supabase
        .from('printers')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();
        
      if (printerError || !printerData) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les données d'imprimeur",
          variant: "destructive",
        });
        return { success: false, service: null };
      }

      const { data, error } = await supabase
        .from('services')
        .insert({
          printer_id: printerData.id,
          name: serviceData.name,
          description: serviceData.description,
          price_min: String(serviceData.priceMin),
          price_max: String(serviceData.priceMax),
          estimated_days: serviceData.estimatedDays ? Number(serviceData.estimatedDays) : null,
          category_id: serviceData.categoryId,
          image_url: serviceData.imageUrl
        })
        .select();

      if (error) {
        console.error("Error creating service:", error);
        toast({
          title: "Erreur",
          description: "Impossible de créer le service: " + error.message,
          variant: "destructive",
        });
        return { success: false, service: null };
      }

      toast({
        title: "Service créé",
        description: "Votre service a été créé avec succès",
      });

      // Refresh services
      fetchServices();
      
      return { 
        success: true, 
        service: data[0]
      };
    } catch (error) {
      console.error("Error in createService:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création du service",
        variant: "destructive",
      });
      return { success: false, service: null };
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = async (id: string, serviceData: ServiceFormData) => {
    if (!currentUser || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour modifier un service",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      // First check if this printer owns this service
      const { data: printerData, error: printerError } = await supabase
        .from('printers')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();
        
      if (printerError || !printerData) {
        toast({
          title: "Erreur",
          description: "Impossible de vérifier vos informations d'imprimeur",
          variant: "destructive",
        });
        return { success: false };
      }

      const { error } = await supabase
        .from('services')
        .update({
          name: serviceData.name,
          description: serviceData.description,
          price_min: String(serviceData.priceMin),
          price_max: String(serviceData.priceMax),
          estimated_days: serviceData.estimatedDays ? Number(serviceData.estimatedDays) : null,
          category_id: serviceData.categoryId,
          image_url: serviceData.imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('printer_id', printerData.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le service: " + error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      toast({
        title: "Service mis à jour",
        description: "Votre service a été mis à jour avec succès",
      });
      
      // Refresh services
      fetchServices();
      
      return { success: true };
    } catch (error) {
      console.error("Error updating service:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du service",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!currentUser || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour supprimer un service",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      // First check if this printer owns this service
      const { data: printerData, error: printerError } = await supabase
        .from('printers')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();
        
      if (printerError || !printerData) {
        toast({
          title: "Erreur",
          description: "Impossible de vérifier vos informations d'imprimeur",
          variant: "destructive",
        });
        return { success: false };
      }
      
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('printer_id', printerData.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le service: " + error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      toast({
        title: "Service supprimé",
        description: "Votre service a été supprimé avec succès",
      });
      
      // Refresh services
      fetchServices();
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression du service",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (currentUser && session && currentUser.role === 'printer') {
      fetchServices();
    }
  }, [currentUser, session]);

  return {
    services,
    isLoading,
    fetchServices,
    createService,
    updateService,
    deleteService
  };
};
