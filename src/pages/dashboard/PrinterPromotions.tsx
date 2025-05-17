
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgePercent, Edit, Trash2, Plus } from 'lucide-react';
import CreatePromotion from '@/components/promotions/CreatePromotion';
import { useToast } from '@/hooks/use-toast';

const PrinterPromotions = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [promotions, setPromotions] = useState([
    {
      id: '1',
      title: 'Flyers à -30%',
      description: 'Profitez de 30% de réduction sur tous nos flyers jusqu\'au 30 juin',
      validUntil: '2025-06-30',
      discount: '30',
      category: 'Flyers',
      status: 'active'
    },
    {
      id: '2',
      title: 'Cartes de visite 2=1',
      description: 'Pour chaque lot de cartes de visite acheté, un lot offert',
      validUntil: '2025-05-31',
      discount: '50',
      category: 'Cartes de visite',
      status: 'active'
    }
  ]);

  const { toast } = useToast();

  const handleAddPromotion = (promotion: any) => {
    setPromotions([...promotions, { ...promotion, status: 'active' }]);
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
    toast({
      title: "Promotion supprimée",
      description: "La promotion a été supprimée avec succès",
    });
  };

  // Function to format date to display in a human-readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Mes promotions</h2>
          <p className="text-gray-600">Gérez vos offres promotionnelles</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)} 
          className="flex items-center gap-2 imprisio-button"
          disabled={isCreating}
        >
          <Plus className="h-4 w-4" />
          Créer une promotion
        </Button>
      </div>
      
      {isCreating ? (
        <CreatePromotion 
          onClose={() => setIsCreating(false)} 
          onSave={handleAddPromotion} 
        />
      ) : (
        <>
          {promotions.length > 0 ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Promotions actives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-3 pr-4 font-medium">Titre</th>
                          <th className="pb-3 pr-4 font-medium">Catégorie</th>
                          <th className="pb-3 pr-4 font-medium">Réduction</th>
                          <th className="pb-3 pr-4 font-medium">Date de fin</th>
                          <th className="pb-3 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {promotions.map((promo) => (
                          <tr key={promo.id} className="border-b last:border-0">
                            <td className="py-4 pr-4">
                              <div className="font-medium">{promo.title}</div>
                              <div className="text-sm text-gray-500">{promo.description?.substring(0, 60)}{promo.description?.length > 60 ? '...' : ''}</div>
                            </td>
                            <td className="py-4 pr-4">
                              <span className="bg-imprisio-light text-imprisio-primary text-xs px-2 py-1 rounded-full">
                                {promo.category}
                              </span>
                            </td>
                            <td className="py-4 pr-4 font-medium">
                              {promo.discount}%
                            </td>
                            <td className="py-4 pr-4">
                              {formatDate(promo.validUntil)}
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="sm" className="flex items-center">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleDeletePromotion(promo.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-center py-3">
                <span className="text-gray-500 text-sm">Les promotions sont affichées sur la page Promotions et sur votre page imprimeur</span>
              </div>
            </div>
          ) : (
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-10">
                <BadgePercent className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune promotion</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Vous n'avez pas encore créé de promotions. Les promotions peuvent vous aider à attirer plus de clients.
                </p>
                <Button 
                  onClick={() => setIsCreating(true)}
                  className="imprisio-button flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Créer votre première promotion
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default PrinterPromotions;
