
import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  printerId: string;
  printerName?: string;
  serviceName?: string;
  paymentStatus: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, session } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!currentUser || !session) {
      return [];
    }

    setIsLoading(true);

    try {
      let query;
      
      if (currentUser.role === 'printer') {
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
        
        // Fetch orders for this printer
        query = supabase
          .from('orders')
          .select(`
            *,
            printers (
              business_name
            ),
            services (
              name
            )
          `)
          .eq('printer_id', printerData.id)
          .order('created_at', { ascending: false });
      } else {
        // Fetch orders for regular user
        query = supabase
          .from('orders')
          .select(`
            *,
            printers (
              business_name
            ),
            services (
              name
            )
          `)
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });
      }
      
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching orders:", error);
        return [];
      }

      const formattedOrders = data.map(order => ({
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
        totalAmount: parseFloat(order.total_amount),
        createdAt: order.created_at,
        printerId: order.printer_id,
        printerName: order.printers?.business_name || 'Imprimerie',
        serviceName: order.services?.name || 'Service d\'impression',
        paymentStatus: order.payment_status
      }));

      setOrders(formattedOrders);
      return formattedOrders;
    } catch (error) {
      console.error("Error in fetchOrders:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderDetails = async (orderId: string) => {
    if (!currentUser || !session) {
      return { success: false, data: null };
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          printers (
            business_name,
            address,
            phone
          ),
          services (
            name,
            description
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) {
        console.error("Error fetching order details:", error);
        return { success: false, data: null };
      }

      return { 
        success: true, 
        data: {
          id: data.id,
          orderNumber: data.order_number,
          status: data.status,
          totalAmount: parseFloat(data.total_amount),
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          deliveryAddress: data.delivery_address,
          specialInstructions: data.special_instructions,
          paymentStatus: data.payment_status,
          printer: {
            id: data.printer_id,
            businessName: data.printers?.business_name,
            address: data.printers?.address,
            phone: data.printers?.phone
          },
          service: {
            id: data.service_id,
            name: data.services?.name,
            description: data.services?.description
          }
        } 
      };
    } catch (error) {
      console.error("Error in getOrderDetails:", error);
      return { success: false, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    if (!currentUser || !session || currentUser.role !== 'printer') {
      toast({
        title: "Erreur",
        description: "Vous n'êtes pas autorisé à mettre à jour le statut des commandes",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);

    try {
      // First check if this printer owns this order
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
      
      // Update order status
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('printer_id', printerData.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut de la commande: " + error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la commande a été mis à jour avec succès",
      });
      
      // Refresh the orders list
      fetchOrders();
      
      return { success: true };
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du statut",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (currentUser && session) {
      fetchOrders();
    }
  }, [currentUser, session]);

  return {
    orders,
    isLoading,
    fetchOrders,
    getOrderDetails,
    updateOrderStatus,
  };
};
