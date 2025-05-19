
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, ShoppingCart, Printer, BadgePercent, Settings, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PrinterPromotions from './PrinterPromotions';
import PrinterServices from './PrinterServices';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/use-orders';
import { useProfile } from '@/hooks/use-profile';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OrdersStatusCards from '@/components/dashboard/OrdersStatusCards';
import OrdersTable from '@/components/dashboard/OrdersTable';
import ShopInfo from '@/components/dashboard/ShopInfo';

const PrinterDashboard = () => {
  const { currentUser } = useAuth();
  const { orders, isLoading: ordersLoading, fetchOrders, updateOrderStatus } = useOrders();
  const { isLoading: profileLoading } = useProfile();
  const [activeTab, setActiveTab] = useState('commandes');

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      fetchOrders();
    }
  };

  const isLoading = ordersLoading || profileLoading;

  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        <DashboardHeader setActiveTab={setActiveTab} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="commandes" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="produits" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Produits
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-2">
              <BadgePercent className="h-4 w-4" />
              Promotions
            </TabsTrigger>
            <TabsTrigger value="boutique" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Ma boutique
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="commandes">
            <OrdersStatusCards orders={orders} />
            
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersTable 
                  orders={orders} 
                  isLoading={isLoading} 
                  handleStatusUpdate={handleStatusUpdate} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="produits">
            <PrinterServices />
          </TabsContent>

          <TabsContent value="promotions">
            <PrinterPromotions />
          </TabsContent>
          
          <TabsContent value="boutique">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Informations de la boutique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ShopInfo currentUser={currentUser} isLoading={isLoading} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Description de la boutique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Description</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-32"
                          value="Spécialiste en impression numérique et offset pour tous vos besoins professionnels. Nous proposons une large gamme de produits personnalisés avec des matériaux de qualité et une finition soignée. Notre équipe expérimentée vous accompagne dans tous vos projets d'impression."
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Services proposés</label>
                        <div className="flex flex-wrap gap-2">
                          {['Flyers', 'Cartes de visite', 'Brochures', 'Affiches', 'T-shirts', 'Bâches'].map((service, idx) => (
                            <span key={idx} className="bg-imprisio-light text-sm px-3 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                          <Button variant="outline" size="sm" className="rounded-full">+ Ajouter</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Mettre à jour</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Image de couverture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-40 rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
                          alt="Couverture" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline">Changer l'image</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Visites de boutique</span>
                        <span className="font-semibold">745</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Taux de conversion</span>
                        <span className="font-semibold">4.3%</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Note moyenne</span>
                        <span className="font-semibold">4.8/5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Avis clients</span>
                        <span className="font-semibold">124</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Mon compte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <Settings className="h-4 w-4" />
                        Paramètres du compte
                      </Button>
                      <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                        Se déconnecter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PrinterDashboard;
