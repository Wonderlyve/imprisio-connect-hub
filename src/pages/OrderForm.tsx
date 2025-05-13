
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNotificationContext } from '@/providers/NotificationProvider';
import { Upload, Truck, Home, Store, CreditCard, Phone } from 'lucide-react';

interface OrderFormData {
  productName: string;
  quantity: number;
  size: string;
  material: string;
  specifications: string;
  deliveryMethod: 'home' | 'pickup' | 'relay';
  paymentMethod: 'card' | 'mobile' | 'cash';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  files: File[];
}

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotificationContext();
  const imprimeurData = location.state?.imprimeur;
  
  const [orderData, setOrderData] = useState<OrderFormData>({
    productName: '',
    quantity: 1,
    size: '',
    material: '',
    specifications: '',
    deliveryMethod: 'home',
    paymentMethod: 'card',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    files: [],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) || 0 : value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setOrderData((prev) => ({
        ...prev,
        files: Array.from(e.target.files || []),
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock order submission
    setTimeout(() => {
      // Send notification to the printer
      addNotification(
        'order',
        'Nouvelle commande reçue',
        `Commande pour ${orderData.quantity} ${orderData.productName} de ${orderData.customerName}`,
        {
          ...orderData,
          imprimeurId: id,
          imprimeurName: imprimeurData?.name || 'Imprimeur',
          orderDate: new Date().toISOString(),
          orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
        }
      );
      
      toast({
        title: 'Commande envoyée',
        description: "Votre commande a été envoyée à l'imprimeur avec succès.",
        variant: "default",
      });
      
      // Navigate back to the imprimeur detail page
      navigate(`/imprimeurs/${id}`);
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container py-16">
        <div className="text-center mb-12">
          <h1 className="imprisio-title">Passer une commande</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {imprimeurData ? `Commande auprès de ${imprimeurData.name}` : "Remplissez le formulaire pour passer votre commande"}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom du produit</label>
                  <Input
                    name="productName"
                    placeholder="Ex: Flyers, Cartes de visite, etc."
                    value={orderData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Quantité</label>
                  <Input
                    type="number"
                    name="quantity"
                    min={1}
                    placeholder="Quantité"
                    value={orderData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Format / Taille</label>
                  <Input
                    name="size"
                    placeholder="Ex: A4, 10x15cm, etc."
                    value={orderData.size}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Matériel / Support</label>
                  <Input
                    name="material"
                    placeholder="Ex: Papier brillant, Coton, etc."
                    value={orderData.material}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Spécifications supplémentaires</label>
                <Textarea
                  name="specifications"
                  placeholder="Détaillez vos besoins spécifiques ici..."
                  rows={4}
                  value={orderData.specifications}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Télécharger vos fichiers
                  <span className="text-gray-500 text-xs ml-2">(Images, PDF, fichiers de design)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Glissez-déposez vos fichiers ici ou
                  </p>
                  <label 
                    htmlFor="file-upload" 
                    className="mt-2 inline-block imprisio-button-sm cursor-pointer"
                  >
                    Parcourir vos fichiers
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                  />
                  {orderData.files.length > 0 && (
                    <div className="mt-4 text-left">
                      <p className="text-sm font-medium">
                        {orderData.files.length} fichier{orderData.files.length > 1 ? 's' : ''} sélectionné{orderData.files.length > 1 ? 's' : ''}:
                      </p>
                      <ul className="mt-2 text-sm text-gray-600 max-h-32 overflow-y-auto">
                        {orderData.files.map((file, index) => (
                          <li key={index} className="truncate">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Livraison et Paiement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Méthode de livraison</label>
                  <Select 
                    value={orderData.deliveryMethod} 
                    onValueChange={(value) => handleSelectChange('deliveryMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une méthode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2" />
                          <span>Livraison à domicile</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="relay">
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 mr-2" />
                          <span>Point relais</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="pickup">
                        <div className="flex items-center">
                          <Store className="h-4 w-4 mr-2" />
                          <span>Retrait sur place</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Méthode de paiement</label>
                  <Select 
                    value={orderData.paymentMethod} 
                    onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une méthode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span>Carte bancaire</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="mobile">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>Mobile Money</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="cash">
                        <div className="flex items-center">
                          <span>Cash à la livraison</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {orderData.deliveryMethod === 'home' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Adresse de livraison</label>
                  <Textarea
                    name="address"
                    placeholder="Adresse complète pour la livraison"
                    rows={3}
                    value={orderData.address}
                    onChange={handleInputChange}
                    required={orderData.deliveryMethod === 'home'}
                  />
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Vos coordonnées</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom complet</label>
                  <Input
                    name="customerName"
                    placeholder="Votre nom complet"
                    value={orderData.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    name="customerEmail"
                    type="email"
                    placeholder="Votre adresse email"
                    value={orderData.customerEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Numéro de téléphone</label>
                  <Input
                    name="customerPhone"
                    placeholder="Votre numéro de téléphone"
                    value={orderData.customerPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                type="submit" 
                className="w-full md:w-auto imprisio-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la commande'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
