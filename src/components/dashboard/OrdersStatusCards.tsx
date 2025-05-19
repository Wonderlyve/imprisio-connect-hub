
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Package, TrendingUp, DollarSign } from 'lucide-react';
import { Order } from '@/hooks/use-orders';

interface OrdersStatusCardsProps {
  orders: Order[];
}

const OrdersStatusCards = ({ orders }: OrdersStatusCardsProps) => {
  return (
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
  );
};

export default OrdersStatusCards;
