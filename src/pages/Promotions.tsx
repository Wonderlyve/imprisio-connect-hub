
import React from 'react';
import PageHeader from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge, Tag, BadgePercent, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const mockPromotions = [
  {
    id: '1',
    title: 'Flyers à -30%',
    description: 'Profitez de 30% de réduction sur tous nos flyers jusqu\'au 30 juin',
    printer: 'Imprimerie Express',
    printerId: '1',
    validUntil: '2025-06-30',
    discount: 30,
    category: 'Flyers',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Cartes de visite 2=1',
    description: 'Pour chaque lot de cartes de visite acheté, un lot offert',
    printer: 'Print & Design',
    printerId: '2',
    validUntil: '2025-05-31',
    discount: 50,
    category: 'Cartes de visite',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: '-15% sur les t-shirts personnalisés',
    description: 'Réduction valable pour toute commande de plus de 10 t-shirts',
    printer: 'Graphex',
    printerId: '3',
    validUntil: '2025-07-15',
    discount: 15,
    category: 'Textile',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Livraison gratuite',
    description: 'Livraison offerte pour toute commande de plus de 100.000 FC',
    printer: 'ImpressionPlus',
    printerId: '4',
    validUntil: '2025-06-01',
    discount: 0,
    category: 'Tous produits',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  },
];

const Promotions = () => {
  const isMobile = useIsMobile();
  
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
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        <PageHeader 
          title="Promotions en cours" 
          subtitle="Découvrez les meilleures offres de nos imprimeurs partenaires"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPromotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{promo.discount}%
                </div>
                <img 
                  src={promo.imageUrl} 
                  alt={promo.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{promo.title}</h3>
                  <div className="bg-imprisio-light text-imprisio-primary text-xs px-2 py-1 rounded-full">
                    {promo.category}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm my-2 flex-grow">{promo.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mt-3">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Valable jusqu'au {formatDate(promo.validUntil)}</span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <Link to={`/imprimeurs/${promo.printerId}`} className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {promo.printer}
                  </Link>
                  <Link to={`/imprimeurs/${promo.printerId}`}>
                    <Button size="sm">Voir l'offre</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
