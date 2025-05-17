
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingBag, Calendar, FileText, Printer as PrinterIcon, Box } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/hooks/use-orders";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const paymentStatusColors = {
  paid: "bg-green-100 text-green-800 border-green-200",
  unpaid: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  deliveryAddress?: string;
  specialInstructions?: string;
  paymentStatus: string;
  printer: {
    id: string;
    businessName?: string;
    address?: string;
    phone?: string;
  };
  service: {
    id: string;
    name?: string;
    description?: string;
  };
}

const Orders = () => {
  const { currentUser } = useAuth();
  const { orders, isLoading, fetchOrders, getOrderDetails } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetails = async (orderId: string) => {
    setIsLoadingDetails(true);
    try {
      const result = await getOrderDetails(orderId);
      if (result.success && result.data) {
        setSelectedOrder(result.data);
        setIsDialogOpen(true);
      }
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: fr
      });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPaymentStatusColor = (status: string) => {
    return paymentStatusColors[status as keyof typeof paymentStatusColors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatOrderStatus = (status: string) => {
    switch(status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En traitement';
      case 'shipped': return 'Expédié';
      case 'delivered': return 'Livré';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const formatPaymentStatus = (status: string) => {
    switch(status) {
      case 'paid': return 'Payé';
      case 'unpaid': return 'Non payé';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'CDF' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes commandes</CardTitle>
          <CardDescription>Historique de vos commandes d'impression</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-imprisio-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-4 text-gray-600">Vous n'avez pas encore de commandes</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Imprimeur</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.serviceName}</TableCell>
                    <TableCell>{order.printerName}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {formatOrderStatus(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                        {formatPaymentStatus(order.paymentStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(order.id)}
                        disabled={isLoadingDetails}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la commande #{selectedOrder.orderNumber}</DialogTitle>
              <DialogDescription>
                Commande passée {formatDate(selectedOrder.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center mb-2">
                      <Box className="mr-2 h-4 w-4" />
                      Détails de la commande
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Service:</span>
                        <span className="text-sm font-medium">{selectedOrder.service.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Statut:</span>
                        <Badge className={getStatusColor(selectedOrder.status)}>
                          {formatOrderStatus(selectedOrder.status)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Paiement:</span>
                        <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                          {formatPaymentStatus(selectedOrder.paymentStatus)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="text-sm font-medium">{formatPrice(selectedOrder.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="text-sm">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold flex items-center mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      Dates importantes
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Commande passée:</span>
                        <span className="text-sm">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Dernière mise à jour:</span>
                        <span className="text-sm">{new Date(selectedOrder.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center mb-2">
                      <PrinterIcon className="mr-2 h-4 w-4" />
                      Informations de l'imprimeur
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div>
                        <span className="text-sm font-medium">{selectedOrder.printer.businessName}</span>
                      </div>
                      {selectedOrder.printer.address && (
                        <div>
                          <span className="text-sm">{selectedOrder.printer.address}</span>
                        </div>
                      )}
                      {selectedOrder.printer.phone && (
                        <div>
                          <span className="text-sm">{selectedOrder.printer.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {(selectedOrder.deliveryAddress || selectedOrder.specialInstructions) && (
                    <div>
                      <h4 className="text-sm font-semibold flex items-center mb-2">
                        <FileText className="mr-2 h-4 w-4" />
                        Informations supplémentaires
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        {selectedOrder.deliveryAddress && (
                          <div>
                            <span className="text-sm text-gray-600 block mb-1">Adresse de livraison:</span>
                            <span className="text-sm">{selectedOrder.deliveryAddress}</span>
                          </div>
                        )}
                        {selectedOrder.specialInstructions && (
                          <div>
                            <span className="text-sm text-gray-600 block mb-1">Instructions spéciales:</span>
                            <span className="text-sm">{selectedOrder.specialInstructions}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
