
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Printer, Clock, Tag } from 'lucide-react';
import { useClientOrders } from '@/hooks/use-client-orders';
import { useAuth } from '@/contexts/AuthContext';
import { useAddresses } from '@/hooks/use-addresses';

interface Service {
  id: string;
  name: string;
  description: string;
  price_min: string;
  price_max: string;
  estimated_days: number;
  image_url: string;
  printer: {
    id: string;
    business_name: string;
  };
}

const CategoryServices = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [category, setCategory] = useState<{ name: string } | null>(null);
  const { toast } = useToast();
  const { createOrder, isLoading: isCreatingOrder } = useClientOrders();
  const { currentUser } = useAuth();
  const { addresses } = useAddresses();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      try {
        const { data, error } = await supabase
          .from('service_categories')
          .select('name')
          .eq('id', categoryId)
          .single();

        if (error) {
          console.error('Error fetching category:', error);
          return;
        }

        setCategory(data);
      } catch (error) {
        console.error('Error in fetchCategory:', error);
      }
    };

    const fetchServices = async () => {
      if (!categoryId) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select(`
            id,
            name,
            description,
            price_min,
            price_max,
            estimated_days,
            image_url,
            printers:printer_id (
              id,
              business_name
            )
          `)
          .eq('category_id', categoryId);

        if (error) {
          console.error('Error fetching services:', error);
          return;
        }

        setServices(data);
      } catch (error) {
        console.error('Error in fetchServices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
    fetchServices();
  }, [categoryId]);

  const handleOrder = async (service: Service) => {
    if (!currentUser) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour passer une commande",
        variant: "destructive",
      });
      return;
    }

    setSelectedServiceId(service.id);

    try {
      const defaultAddress = addresses.find(address => address.isDefault);
      const deliveryAddress = defaultAddress ? 
        `${defaultAddress.addressLine1}, ${defaultAddress.city}, ${defaultAddress.country}` : 
        '';

      const totalAmount = parseFloat(service.price_min);
      
      const result = await createOrder({
        serviceId: service.id,
        printerId: service.printer.id,
        totalAmount: totalAmount,
        deliveryAddress: deliveryAddress
      });

      if (result.success) {
        toast({
          title: "Commande réussie",
          description: `Votre commande n°${result.orderNumber} a été créée avec succès.`,
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la création de votre commande",
        variant: "destructive",
      });
    } finally {
      setSelectedServiceId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="imprisio-section py-16">
        <div className="imprisio-container">
          <div className="flex justify-center">
            <div className="animate-spin h-12 w-12 border-4 border-imprisio-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="imprisio-section py-16">
      <div className="imprisio-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category?.name || 'Services d\'impression'}</h1>
          <p className="text-gray-600">
            Découvrez tous les services de {category?.name.toLowerCase() || 'impression'} disponibles sur notre plateforme.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-500">Aucun service trouvé dans cette catégorie</p>
            <Button variant="outline" asChild className="mt-4">
              <Link to="/services">Voir toutes les catégories</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={service.image_url || 'https://placehold.co/600x400?text=Image'}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Printer className="h-4 w-4 mr-1" />
                      <span>{service.printer.business_name}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{service.estimated_days || '3-5'} jours</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Tag className="h-4 w-4 mr-1" />
                      <span>{`${parseInt(service.price_min).toLocaleString()} - ${parseInt(service.price_max).toLocaleString()} FC`}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <Link to={`/printers/${service.printer.id}`}>Voir détails</Link>
                    </Button>
                    <Button 
                      onClick={() => handleOrder(service)}
                      disabled={isCreatingOrder && selectedServiceId === service.id}
                    >
                      {isCreatingOrder && selectedServiceId === service.id ? 
                        'Traitement...' : 'Commander'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryServices;
