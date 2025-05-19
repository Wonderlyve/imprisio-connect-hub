
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderCreateData {
  serviceId: string;
  printerId: string;
  totalAmount: number;
  deliveryAddress?: string;
  specialInstructions?: string;
}

export const useClientOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, session } = useAuth();
  const { toast } = useToast();

  const createOrder = async (orderData: OrderCreateData) => {
    if (!currentUser || !session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour passer une commande",
        variant: "destructive",
      });
      return { success: false, orderId: null };
    }

    setIsLoading(true);

    try {
      // Generate an order number
      const orderPrefix = 'ORD';
      const timestamp = Date.now().toString().slice(-6);
      const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
      const orderNumber = `${orderPrefix}-${timestamp}${randomChars}`;

      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: currentUser.id,
          printer_id: orderData.printerId,
          service_id: orderData.serviceId,
          total_amount: orderData.totalAmount,
          order_number: orderNumber,
          delivery_address: orderData.deliveryAddress,
          special_instructions: orderData.specialInstructions,
          status: 'pending',
          payment_status: 'unpaid'
        })
        .select();

      if (error) {
        console.error("Error creating order:", error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la commande: " + error.message,
          variant: "destructive",
        });
        return { success: false, orderId: null };
      }

      toast({
        title: "Commande créée",
        description: "Votre commande a été créée avec succès",
      });
      
      return { 
        success: true, 
        orderId: data[0].id,
        orderNumber: data[0].order_number
      };
    } catch (error) {
      console.error("Error in createOrder:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création de la commande",
        variant: "destructive",
      });
      return { success: false, orderId: null };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createOrder
  };
};
