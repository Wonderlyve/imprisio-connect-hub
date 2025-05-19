
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, ShoppingBag, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useClientOrders } from '@/hooks/use-client-orders';

interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

interface Service {
  id: string;
  name: string;
  description?: string;
  price_min: number;
  price_max?: number;
  estimated_days?: number;
  image_url?: string;
  printer_id: string;
  printer_name: string;
  printer_address?: string;
  printer_phone?: string;
}

const CategoryServices = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const { currentUser, isLoggedIn } = useAuth();
  const { createOrder, isLoading: orderLoading } = useClientOrders();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
    fetchServices();
    if (isLoggedIn) {
      fetchAddresses();
    }
  }, [categoryId, isLoggedIn]);

  const fetchCategory = async () => {
    if (!categoryId) return;

    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
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
          *,
          printers (
            business_name,
            address,
            phone
          )
        `)
        .eq('category_id', categoryId);

      if (error) {
        console.error('Error fetching services:', error);
        return;
      }

      const formattedServices = data.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price_min: parseFloat(service.price_min),
        price_max: service.price_max ? parseFloat(service.price_max) : undefined,
        estimated_days: service.estimated_days,
        image_url: service.image_url,
        printer_id: service.printer_id,
        printer_name: service.printers?.business_name,
        printer_address: service.printers?.address,
        printer_phone: service.printers?.phone,
      }));

      setServices(formattedServices);
    } catch (error) {
      console.error('Error in fetchServices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', currentUser?.id);

      if (error) {
        console.error('Error fetching addresses:', error);
        return;
      }

      setAddresses(data);
      // Set default address if exists
      const defaultAddress = data.find(addr => addr.is_default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }
    } catch (error) {
      console.error('Error in fetchAddresses:', error);
    }
  };

  const handleOrderClick = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const handleCreateOrder = async () => {
    if (!selectedService) return;

    // Find selected address details
    let deliveryAddress = '';
    const address = addresses.find(addr => addr.id === selectedAddress);
    
    if (address) {
      deliveryAddress = `${address.address_line1}${address.address_line2 ? ', ' + address.address_line2 : ''}, ${address.city}${address.state ? ', ' + address.state : ''}${address.postal_code ? ' ' + address.postal_code : ''}, ${address.country}`;
    }

    const result = await createOrder({
      serviceId: selectedService.id,
      printerId: selectedService.printer_id,
      totalAmount: selectedService.price_min,
      deliveryAddress,
      specialInstructions
    });

    if (result.success) {
      setIsDialogOpen(false);
      navigate('/account/orders');
    }
  };

  const formatPrice = (min?: number, max?: number) => {
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()} FC`;
    }
    if (min) {
      return `À partir de ${min.toLocaleString()} FC`;
    }
    return 'Prix sur demande';
  };

  if (isLoading) {
    return (
      <div className="imprisio-section bg-white min-h-screen">
        <div className="imprisio-container py-10 flex justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-imprisio-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container py-8">
        <Link to="/services" className="text-imprisio-primary hover:underline flex items-center mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux catégories
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category?.name || 'Services'}</h1>
          {category?.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>

        {services.length === 0 ? (
          <div className="py-12 text-center">
            <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun service disponible</h3>
            <p className="text-gray-500">Il n'y a pas encore de services disponibles dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {service.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                  <p className="text-gray-500 mb-3 text-sm">
                    Par <span className="font-medium">{service.printer_name}</span>
                  </p>
                  {service.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-imprisio-primary font-medium">
                        {formatPrice(service.price_min, service.price_max)}
                      </p>
                      {service.estimated_days && (
                        <p className="text-gray-500 text-sm">
                          Livraison en {service.estimated_days} jour{service.estimated_days > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleOrderClick(service)} 
                    className="w-full imprisio-button"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Commander
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Commander ce service</DialogTitle>
            </DialogHeader>
            {!isLoggedIn ? (
              <div className="py-6">
                <p className="text-gray-600 mb-4">Vous devez être connecté pour passer une commande.</p>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    className="flex-1 imprisio-button"
                    onClick={() => navigate('/login')}
                  >
                    Se connecter
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <div className="font-medium">Détails du service</div>
                    <div className="px-4 py-3 bg-gray-50 rounded-md">
                      <p className="font-semibold">{selectedService?.name}</p>
                      <p className="text-gray-600 text-sm">{selectedService?.printer_name}</p>
                      <p className="text-imprisio-primary font-medium mt-2">
                        {selectedService ? formatPrice(selectedService.price_min, selectedService.price_max) : ''}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse de livraison</Label>
                    {addresses.length === 0 ? (
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-600">Vous n'avez pas encore d'adresse.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="self-start"
                          onClick={() => navigate('/account/addresses')}
                        >
                          Ajouter une adresse
                        </Button>
                      </div>
                    ) : (
                      <Select 
                        value={selectedAddress} 
                        onValueChange={setSelectedAddress}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une adresse" />
                        </SelectTrigger>
                        <SelectContent>
                          {addresses.map(address => (
                            <SelectItem key={address.id} value={address.id}>
                              {address.address_line1}, {address.city}
                              {address.is_default && " (Défaut)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions spéciales (optionnel)</Label>
                    <Textarea 
                      id="instructions"
                      placeholder="Précisez vos besoins spécifiques ou toute information utile pour l'imprimeur..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    disabled={orderLoading}
                  >
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleCreateOrder} 
                    className="imprisio-button"
                    disabled={orderLoading || addresses.length === 0}
                  >
                    {orderLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      'Confirmer la commande'
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoryServices;
