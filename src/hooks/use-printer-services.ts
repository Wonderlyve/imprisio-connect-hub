
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface PrinterService {
  id: string;
  name: string;
  description?: string;
  priceMin?: number;
  priceMax?: number;
  estimatedDays?: number;
  categoryId: string;
  categoryName?: string;
  imageUrl?: string;
}

export const usePrinterServices = () => {
  const [services, setServices] = useState<PrinterService[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, session } = useAuth();
  const { toast } = useToast();

  const fetchPrinterServices = async () => {
    if (!currentUser || !session) {
      return [];
    }

    setIsLoading(true);

    try {
      // Fetch printer ID first
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

      // Fetch services for this printer
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          service_categories (
            name
          )
        `)
        .eq('printer_id', printerData.id);

      if (error) {
        console.error("Error fetching services:", error);
        return [];
      }

      const formattedServices = data.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        priceMin: service.price_min ? parseFloat(service.price_min) : undefined,
        priceMax: service.price_max ? parseFloat(service.price_max) : undefined,
        estimatedDays: service.estimated_days,
        categoryId: service.category_id,
        categoryName: service.service_categories?.name,
        imageUrl: service.image_url
      }));

      setServices(formattedServices);
      return formattedServices;
    } catch (error) {
      console.error("Error in fetchPrinterServices:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchServiceCategories = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*');

      if (error) {
        console.error("Error fetching categories:", error);
        return [];
      }

      const formattedCategories = data.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        imageUrl: category.image_url
      }));

      setCategories(formattedCategories);
      return formattedCategories;
    } catch (error) {
      console.error("Error in fetchServiceCategories:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async (service: Omit<PrinterService, 'id' | 'categoryName'>) => {
    if (!currentUser || !session || currentUser.role !== 'printer') {
      toast({
        title: "Erreur",
        description: "Vous n'avez pas l'autorisation d'ajouter des services",
        variant: "destructive",
      });
      return { success: false, id: null };
    }

    setIsLoading(true);

    try {
      // Fetch printer ID first
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
        return { success: false, id: null };
      }

      const { data, error } = await supabase
        .from('services')
        .insert({
          printer_id: printerData.id,
          category_id: service.categoryId,
          name: service.name,
          description: service.description,
          price_min: service.priceMin,
          price_max: service.priceMax,
          estimated_days: service.estimatedDays,
          image_url: service.imageUrl
        })
        .select();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter le service: " + error.message,
          variant: "destructive",
        });
        return { success: false, id: null };
      }

      toast({
        title: "Service ajouté",
        description: "Le service a été ajouté avec succès",
      });

      // Refresh services list
      fetchPrinterServices();
      
      return { success: true, id: data[0].id };
    } catch (error) {
      console.error("Error adding service:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du service",
        variant: "destructive",
      });
      return { success: false, id: null };
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = async (id: string, service: Partial<Omit<PrinterService, 'id' | 'categoryName'>>) => {
    if (!currentUser || !session || currentUser.role !== 'printer') {
      toast({
        title: "Erreur",
        description: "Vous n'avez pas l'autorisation de modifier des services",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('services')
        .update({
          category_id: service.categoryId,
          name: service.name,
          description: service.description,
          price_min: service.priceMin,
          price_max: service.priceMax,
          estimated_days: service.estimatedDays,
          image_url: service.imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

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
        description: "Le service a été mis à jour avec succès",
      });

      // Refresh services list
      fetchPrinterServices();
      
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
    if (!currentUser || !session || currentUser.role !== 'printer') {
      toast({
        title: "Erreur",
        description: "Vous n'avez pas l'autorisation de supprimer des services",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

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
        description: "Le service a été supprimé avec succès",
      });

      // Refresh services list
      fetchPrinterServices();
      
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

  return {
    services,
    categories,
    isLoading,
    fetchPrinterServices,
    fetchServiceCategories,
    addService,
    updateService,
    deleteService
  };
};
