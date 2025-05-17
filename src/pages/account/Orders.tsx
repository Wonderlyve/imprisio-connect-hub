
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, Package } from 'lucide-react';

// Mock order data
const orders = [
  {
    id: 'ORD-123456',
    date: '12/05/2023',
    status: 'Livré',
    total: '45.000 FC',
    items: [
      { name: 'Flyers A5', quantity: 500, price: '25.000 FC' },
      { name: 'Carte de visite', quantity: 100, price: '20.000 FC' }
    ]
  },
  {
    id: 'ORD-789012',
    date: '05/04/2023',
    status: 'En cours',
    total: '35.000 FC',
    items: [
      { name: 'T-shirt personnalisé', quantity: 5, price: '35.000 FC' }
    ]
  }
];

const Orders = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Mes commandes</h2>
        <p className="text-gray-600">Consultez et suivez vos commandes récentes</p>
      </div>
      
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <span className="font-medium">{order.id}</span>
                  <span className="text-sm text-gray-500">
                    Commandé le {order.date}
                  </span>
                </div>
                <Badge className={
                  order.status === 'Livré' ? 'bg-green-500' : 
                  order.status === 'En cours' ? 'bg-blue-500' : 'bg-yellow-500'
                }>
                  {order.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Articles</h3>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-semibold">Total: {order.total}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Facture
                    </Button>
                    <Button size="sm" className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="font-medium text-lg mb-1">Aucune commande</h3>
          <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande</p>
          <Button>Parcourir les produits</Button>
        </div>
      )}
    </div>
  );
};

export default Orders;
