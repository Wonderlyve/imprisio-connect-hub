
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, ShoppingCart, Clock, FileText,
  CreditCard, User, Settings, Star 
} from 'lucide-react';

const Dashboard = () => {
  const userInfo = {
    name: "Jean Muteba",
    email: "jeanmuteba@example.com",
    phone: "+243 123 456 789",
    address: "123 Avenue Lumumba, Gombe, Kinshasa"
  };

  const recentOrders = [
    { id: 'ORD-1234', date: '12/05/2023', product: 'Flyers A5 (x500)', status: 'Livré', price: '45.000 FC' },
    { id: 'ORD-1235', date: '28/05/2023', product: 'Cartes de visite (x200)', status: 'En cours', price: '30.000 FC' },
    { id: 'ORD-1236', date: '03/06/2023', product: 'T-shirt personnalisé (x5)', status: 'En préparation', price: '75.000 FC' },
  ];

  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        <h1 className="text-3xl font-bold mb-8">Mon tableau de bord</h1>
        
        <Tabs defaultValue="commandes" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="commandes" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Mes commandes
            </TabsTrigger>
            <TabsTrigger value="profil" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Mon profil
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="commandes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-imprisio-primary bg-opacity-10 p-3 rounded-full mr-4">
                      <ShoppingCart className="h-6 w-6 text-imprisio-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Commandes totales</p>
                      <h3 className="text-2xl font-bold">8</h3>
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
                      <h3 className="text-2xl font-bold">5</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Commandes en cours</p>
                      <h3 className="text-2xl font-bold">3</h3>
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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-3 pr-4 font-medium">Référence</th>
                        <th className="pb-3 pr-4 font-medium">Date</th>
                        <th className="pb-3 pr-4 font-medium">Produit</th>
                        <th className="pb-3 pr-4 font-medium">Statut</th>
                        <th className="pb-3 pr-4 font-medium">Prix</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-4 pr-4">{order.id}</td>
                          <td className="py-4 pr-4">{order.date}</td>
                          <td className="py-4 pr-4">{order.product}</td>
                          <td className="py-4 pr-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Livré' ? 'bg-green-100 text-green-700' : 
                              order.status === 'En cours' ? 'bg-blue-100 text-blue-700' : 
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 pr-4 font-medium">{order.price}</td>
                          <td className="py-4">
                            <Button variant="ghost" size="sm">Détails</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">Voir toutes mes commandes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profil">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">Nom complet</label>
                          <input 
                            type="text" 
                            value={userInfo.name} 
                            className="w-full p-2 border rounded-md"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                          <input 
                            type="email" 
                            value={userInfo.email} 
                            className="w-full p-2 border rounded-md"
                            readOnly
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">Téléphone</label>
                          <input 
                            type="tel" 
                            value={userInfo.phone} 
                            className="w-full p-2 border rounded-md"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600 mb-1 block">Adresse</label>
                          <input 
                            type="text" 
                            value={userInfo.address} 
                            className="w-full p-2 border rounded-md"
                            readOnly
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Modifier mes informations</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Sécurité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Mot de passe</label>
                        <input 
                          type="password" 
                          value="********" 
                          className="w-full p-2 border rounded-md"
                          readOnly
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline">Changer mon mot de passe</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Modes de paiement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 border rounded-md">
                        <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
                        <div>
                          <p className="font-medium">Visa se terminant par 4567</p>
                          <p className="text-sm text-gray-500">Expire 09/2025</p>
                        </div>
                        <div className="ml-auto">
                          <Button variant="ghost" size="sm">Supprimer</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline">Ajouter une méthode de paiement</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Mon compte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 bg-imprisio-light rounded-full flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-imprisio-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                      <p className="text-gray-600 mb-4">{userInfo.email}</p>
                      <p className="text-xs bg-imprisio-primary bg-opacity-10 text-imprisio-primary px-3 py-1 rounded-full">
                        Client depuis Mai 2023
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2 mb-2">
                        <Settings className="h-4 w-4" />
                        Paramètres du compte
                      </Button>
                      <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                        Se déconnecter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Mes avis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center mb-3">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <Star className="h-5 w-5 text-gray-300" />
                        <span className="ml-2 font-medium">4.0</span>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        Vous avez laissé 3 avis sur des imprimeurs.
                      </p>
                      
                      <Button variant="ghost" className="w-full">
                        Voir mes avis
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

export default Dashboard;
