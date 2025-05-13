
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, MapPin, Phone, Mail, Globe, 
  Clock, Package, Truck, ChevronRight 
} from 'lucide-react';
import { Imprimeur } from '@/components/imprimeurs/ImprimeurCard';

// Mock data pour la démo
const mockImprimeurs: Record<string, Imprimeur> = {
  '1': {
    id: '1',
    name: 'Imprimerie Express',
    address: 'Gombe, Kinshasa',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    description: 'Spécialiste en impression numérique et offset pour tous vos besoins professionnels. Nous proposons une large gamme de produits personnalisés avec des matériaux de qualité et une finition soignée. Notre équipe expérimentée vous accompagne dans tous vos projets d\'impression.',
    services: ['Flyers', 'Cartes de visite', 'Brochures', 'Affiches']
  },
  '2': {
    id: '2',
    name: 'Print & Design',
    address: 'Limete, Kinshasa',
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
    description: 'Services d\'impression de qualité avec un accent sur le design et la créativité. Notre équipe de designers professionnels vous aide à créer des produits uniques qui se démarquent. Nous combinons expertise technique et vision artistique pour des résultats exceptionnels.',
    services: ['T-shirts', 'Mugs', 'Bannières', 'Stickers']
  },
};

const products = [
  { id: '1', name: 'Carte de visite', price: '10.000 FC', image: 'https://images.unsplash.com/photo-1581093196277-9f397c262dc3?auto=format&fit=crop&q=80' },
  { id: '2', name: 'Flyers A5', price: '8.000 FC', image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&q=80' },
  { id: '3', name: 'Brochure A4', price: '25.000 FC', image: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58148?auto=format&fit=crop&q=80' },
];

const reviews = [
  { id: '1', author: 'Jean Dupont', rating: 5, comment: 'Excellent service, livraison rapide et produits de qualité.', date: '12/04/2023' },
  { id: '2', author: 'Marie Mbongo', rating: 4, comment: 'Très satisfaite de la qualité d\'impression. Je recommande.', date: '03/05/2023' },
  { id: '3', author: 'Patrick Lemba', rating: 5, comment: 'Professionnalisme et réactivité. Parfait !', date: '18/06/2023' },
];

const ImprimeurDetail = () => {
  const { id } = useParams<{ id: string }>();
  const imprimeur = id ? mockImprimeurs[id] : null;

  if (!imprimeur) {
    return <div className="imprisio-container py-12 text-center">Imprimeur non trouvé</div>;
  }

  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="h-60 md:h-80 w-full rounded-lg overflow-hidden relative">
            <img 
              src={imprimeur.image} 
              alt={imprimeur.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-white text-3xl font-bold">{imprimeur.name}</h1>
              <div className="flex items-center text-white mt-2">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 fill-yellow-400 stroke-none" />
                  <span className="ml-1">{imprimeur.rating}</span>
                  <span className="ml-1 text-sm opacity-80">({imprimeur.reviews} avis)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{imprimeur.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="presentation">
              <TabsList className="mb-4">
                <TabsTrigger value="presentation">Présentation</TabsTrigger>
                <TabsTrigger value="products">Produits</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="presentation" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">À propos de nous</h2>
                    <p className="text-gray-600 mb-6">{imprimeur.description}</p>
                    
                    <h3 className="font-semibold mb-3">Nos services</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      {imprimeur.services.map((service, idx) => (
                        <div key={idx} className="bg-imprisio-light px-4 py-3 rounded-md text-center">
                          {service}
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="font-semibold mb-3">Informations</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-imprisio-primary mr-3" />
                        <span>Lundi - Vendredi: 8h - 18h | Samedi: 9h - 15h</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-imprisio-primary mr-3" />
                        <span>Délai moyen de traitement: 2-3 jours ouvrables</span>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-imprisio-primary mr-3" />
                        <span>Modes de livraison: À domicile, Point relais, Retrait sur place</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold mb-1">{product.name}</h3>
                            <p className="text-imprisio-primary font-medium mb-3">À partir de {product.price}</p>
                            <Button className="w-full">Commander</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        Voir tous les produits
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="focus-visible:outline-none focus-visible:ring-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold">{imprimeur.reviews} avis</h2>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < Math.floor(imprimeur.rating) ? 'fill-yellow-400 stroke-none' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-gray-600">{imprimeur.rating} sur 5</span>
                        </div>
                      </div>
                      <Button>Laisser un avis</Button>
                    </div>
                    
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-semibold">{review.author}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 stroke-none' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        Voir tous les avis
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-imprisio-primary mr-3" />
                    <span>+243 123 456 789</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-imprisio-primary mr-3" />
                    <span>contact@imprimerieexpress.cd</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-imprisio-primary mr-3" />
                    <a href="#" className="text-imprisio-primary">www.imprimerieexpress.cd</a>
                  </div>
                </div>
                
                <Button className="w-full mb-3">
                  Commander maintenant
                </Button>
                
                <Button variant="outline" className="w-full">
                  Contacter l'imprimeur
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprimeurDetail;
