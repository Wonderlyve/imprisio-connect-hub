
import React from 'react';
import { Button } from '@/components/ui/button';
import { Order } from '@/hooks/use-orders';

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  handleStatusUpdate: (orderId: string, newStatus: string) => Promise<void>;
}

const OrdersTable = ({ orders, isLoading, handleStatusUpdate }: OrdersTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-imprisio-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucune commande n'a été trouvée</p>
      </div>
    );
  }

  return (
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
      
      {orders.length > 5 && (
        <div className="mt-6 text-center">
          <Button variant="outline">Voir toutes les commandes</Button>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
