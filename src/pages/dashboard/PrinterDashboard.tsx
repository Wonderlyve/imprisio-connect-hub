
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, ShoppingCart, TrendingUp, DollarSign,
  User, Settings, Plus, Printer, BadgePercent
} from 'lucide-react';
import PrinterPromotions from './PrinterPromotions';
import PrinterServices from './PrinterServices';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/use-orders';
import { useProfile } from '@/hooks/use-profile';

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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord imprimeur</h1>
            <p className="text-gray-600">Gérez vos commandes, produits et votre boutique</p>
          </div>
          <Button onClick={() => setActiveTab('produits')} className="imprisio-button flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un produit
          </Button>
        </div>
        
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-imprisio-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <ShoppingCart className="h-6 w-6 text-imprisio-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Commandes totales</p>
                      <h3 className="text-2xl font-bold">{orders.length}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Commandes livrées</p>
                      <h3 className="text-2xl font-bold">{orders.filter(order => order.status === 'delivered').length}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <TrendingUp className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Commandes en cours</p>
                      <h3 className="text-2xl font-bold">{orders.filter(order => order.status === 'processing').length}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Revenus totaux</p>
                      <h3 className="text-2xl font-bold">
                        {orders
                          .reduce((sum, order) => sum + order.totalAmount, 0)
                          .toLocaleString()} FC
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin h-8 w-8 border-4 border-imprisio-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune commande n'a été trouvée</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-3 pr-4 font-medium">Référence</th>
                          <th className="pb-3 pr-4 font-medium">Date</th>
                          <th className="pb-3 pr-4 font-medium">Client</th>
                          <th className="pb-3 pr-4 font-medium">Produit</th>
                          <th className="pb-3 pr-4 font-medium">Statut</th>
                          <th className="pb-3 pr-4 font-medium">Prix</th>
                          <th className="pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="border-b last:border-0">
                            <td className="py-4 pr-4">{order.orderNumber}</td>
                            <td className="py-4 pr-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="py-4 pr-4">Client</td>
                            <td className="py-4 pr-4">{order.serviceName}</td>
                            <td className="py-4 pr-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                                order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 pr-4 font-medium">{order.totalAmount.toLocaleString()} FC</td>
                            <td className="py-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">Détails</Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleStatusUpdate(
                                    order.id,
                                    order.status === 'pending' ? 'processing' : 
                                    order.status === 'processing' ? 'delivered' : 'pending'
                                  )}
                                >
                                  {order.status === 'pending' ? 'En production' : 
                                   order.status === 'processing' ? 'Marquer livré' : 'Réinitialiser'}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {orders.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button variant="outline">Voir toutes les commandes</Button>
                  </div>
                )}
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
                    {isLoading ? (
                      <div className="flex justify-center p-8">
                        <div className="animate-spin h-8 w-8 border-4 border-imprisio-primary border-t-transparent rounded-full"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Nom de l'imprimerie</label>
                            <input 
                              type="text" 
                              value={currentUser?.businessName || ""}
                              className="w-full p-2 border rounded-md"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Propriétaire</label>
                            <input 
                              type="text" 
                              value={currentUser?.fullName || ""}
                              className="w-full p-2 border rounded-md"
                              readOnly
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                            <input 
                              type="email" 
                              value={currentUser?.email || ""}
                              className="w-full p-2 border rounded-md"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Téléphone</label>
                            <input 
                              type="tel" 
                              value={currentUser?.phone || ""}
                              className="w-full p-2 border rounded-md"
                              readOnly
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">Adresse</label>
                          <input 
                            type="text" 
                            value={currentUser?.businessAddress || ""}
                            className="w-full p-2 border rounded-md"
                            readOnly
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>Modifier les informations</Button>
                        </div>
                      </div>
                    )}
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
