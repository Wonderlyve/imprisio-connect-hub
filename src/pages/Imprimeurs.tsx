
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, LayoutGrid, LayoutList } from 'lucide-react';
import ImprimeurCard, { Imprimeur } from '@/components/imprimeurs/ImprimeurCard';

const mockImprimeurs: Imprimeur[] = [
  {
    id: '1',
    name: 'Imprimerie Express',
    address: 'Gombe, Kinshasa',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    description: 'Spécialiste en impression numérique et offset pour tous vos besoins professionnels.',
    services: ['Flyers', 'Cartes de visite', 'Brochures', 'Affiches']
  },
  {
    id: '2',
    name: 'Print & Design',
    address: 'Limete, Kinshasa',
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
    description: 'Services d\'impression de qualité avec un accent sur le design et la créativité.',
    services: ['T-shirts', 'Mugs', 'Bannières', 'Stickers']
  },
  {
    id: '3',
    name: 'Graphex',
    address: 'Ngaliema, Kinshasa',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    description: 'Solutions d\'impression complètes adaptées aux entreprises et aux particuliers.',
    services: ['Flyers', 'Brochures', 'Catalogues', 'Rapports annuels']
  },
  {
    id: '4',
    name: 'ImpressionPlus',
    address: 'Lingwala, Kinshasa',
    rating: 4.5,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    description: 'Impression de qualité avec service rapide et prix compétitifs.',
    services: ['Cartes de visite', 'Affiches', 'Calendriers', 'Invitations']
  },
  {
    id: '5',
    name: 'Artprint Studio',
    address: 'Bandalungwa, Kinshasa',
    rating: 4.7,
    reviews: 103,
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80',
    description: 'Studio d\'impression artistique spécialisé dans les impressions de haute qualité.',
    services: ['Impressions d\'art', 'Photos', 'Posters', 'Toiles']
  },
  {
    id: '6',
    name: 'Rapid Print',
    address: 'Matete, Kinshasa',
    rating: 4.4,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
    description: 'Service d\'impression rapide pour vos besoins urgents avec livraison express.',
    services: ['Flyers', 'Cartes', 'Documents', 'Badges']
  },
];

const Imprimeurs = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredImprimeurs = searchTerm 
    ? mockImprimeurs.filter(imp => 
        imp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        imp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        imp.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : mockImprimeurs;

  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        <div className="text-center mb-12">
          <h1 className="imprisio-title">Trouvez votre imprimeur</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les meilleurs imprimeurs professionnels pour vos projets d'impression personnalisée
          </p>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un imprimeur ou un service..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
            
            <div className="hidden md:flex border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-r-none ${view === 'grid' ? 'bg-imprisio-light' : ''}`}
                onClick={() => setView('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-l-none ${view === 'list' ? 'bg-imprisio-light' : ''}`}
                onClick={() => setView('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {filteredImprimeurs.length > 0 ? (
          <div className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredImprimeurs.map((imprimeur) => (
              <ImprimeurCard key={imprimeur.id} imprimeur={imprimeur} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Aucun imprimeur trouvé</h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou réinitialisez les filtres.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Imprimeurs;
