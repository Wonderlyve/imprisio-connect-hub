
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  Info,
  Briefcase,
  FileText,
  ShoppingBag
} from 'lucide-react';
import { Imprimeur } from '@/components/imprimeurs/ImprimeurCard';

// Mock data for a specific imprimeur
const mockImprimeurDetail = {
  id: '1',
  name: 'Imprimerie Express',
  address: 'Gombe, Kinshasa',
  rating: 4.8,
  reviews: 124,
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
  description: 'Spécialiste en impression numérique et offset pour tous vos besoins professionnels, avec une expérience de plus de 10 ans dans le domaine.',
  services: ['Flyers', 'Cartes de visite', 'Brochures', 'Affiches', 'T-shirts', 'Bâches'],
  phone: '+243 999 888 777',
  email: 'contact@imprimerie-express.cd',
  hours: {
    monday: '8h00 - 17h00',
    tuesday: '8h00 - 17h00',
    wednesday: '8h00 - 17h00',
    thursday: '8h00 - 17h00',
    friday: '8h00 - 17h00',
    saturday: '9h00 - 14h00',
    sunday: 'Fermé'
  },
  owner: 'Marc Kabongo',
  founded: 2012,
  team: 12,
  portfolio: [
    {
      id: 1,
      title: 'Brochure Festival de Jazz',
      image: 'https://images.unsplash.com/photo-1574351409550-6daa89143aac?auto=format&fit=crop&q=80',
      description: 'Brochure de 12 pages pour le Festival International de Jazz de Kinshasa'
    },
    {
      id: 2,
      title: 'Logo et cartes de visite',
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80',
      description: 'Identité visuelle complète pour une startup technologique'
    },
    {
      id: 3,
      title: 'Flyers promotionnels',
      image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&q=80',
      description: 'Flyers A5 pour une campagne marketing d\'un restaurant'
    },
    {
      id: 4,
      title: 'T-shirts personnalisés',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80',
      description: 'Série de t-shirts personnalisés pour une équipe sportive locale'
    },
    {
      id: 5,
      title: 'Affiches événement',
      image: 'https://images.unsplash.com/photo-1492570659156-042b78130e5b?auto=format&fit=crop&q=80',
      description: 'Affiches grand format pour un concert'
    },
    {
      id: 6,
      title: 'Packaging produit',
      image: 'https://images.unsplash.com/photo-1635405074683-96d6b5714921?auto=format&fit=crop&q=80',
      description: 'Design et impression d\'emballages pour une ligne de cosmétiques'
    }
  ],
  products: [
    {
      id: 1,
      name: 'Cartes de visite standard',
      price: '15.000 FC',
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80',
      description: 'Cartes de visite 85x55mm, impression recto-verso, papier couché 350g'
    },
    {
      id: 2,
      name: 'Flyers A5',
      price: '12.000 FC',
      image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&q=80',
      description: 'Flyers A5, impression recto-verso, papier couché 135g'
    },
    {
      id: 3,
      name: 'Brochures A4',
      price: '45.000 FC',
      image: 'https://images.unsplash.com/photo-1574351409550-6daa89143aac?auto=format&fit=crop&q=80',
      description: 'Brochures A4, 8 pages, impression couleur, papier couché 170g'
    },
    {
      id: 4,
      name: 'T-shirt personnalisé',
      price: '25.000 FC',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80',
      description: 'T-shirt 100% coton, impression flex ou sublimation, toutes tailles'
    },
    {
      id: 5,
      name: 'Bâche publicitaire',
      price: '75.000 FC',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80',
      description: 'Bâche publicitaire 1x2m, impression haute définition avec œillets'
    },
    {
      id: 6,
      name: 'Affiches grand format',
      price: '35.000 FC',
      image: 'https://images.unsplash.com/photo-1492570659156-042b78130e5b?auto=format&fit=crop&q=80',
      description: 'Affiches A1, impression couleur sur papier 200g'
    }
  ]
};

// Component for rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex">
      {Array(5).fill(0).map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${
            i < fullStars 
              ? 'text-yellow-400 fill-yellow-400' 
              : i === fullStars && hasHalfStar 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
          }`} 
        />
      ))}
    </div>
  );
};

const ImprimeurDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const imprimeur = mockImprimeurDetail;
  
  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        {/* Hero section */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-xl mb-8">
          <img 
            src={imprimeur.image} 
            alt={imprimeur.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 w-full text-white">
              <h1 className="text-3xl font-bold mb-2">{imprimeur.name}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{imprimeur.address}</span>
              </div>
              <div className="flex items-center">
                <RatingStars rating={imprimeur.rating} />
                <span className="ml-2">{imprimeur.rating} ({imprimeur.reviews} avis)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{imprimeur.name}</h1>
            <p className="text-gray-600">{imprimeur.description}</p>
          </div>
          <div className="flex gap-3">
            <Link to={`/imprimeurs/${id}/order`} state={{ imprimeur }}>
              <Button className="imprisio-button flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Passer une commande</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview" className="text-sm md:text-base">
              <Info className="h-4 w-4 mr-2" />
              Aperçu
            </TabsTrigger>
            <TabsTrigger value="products" className="text-sm md:text-base">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Produits
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-sm md:text-base">
              <FileText className="h-4 w-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="about" className="text-sm md:text-base">
              <Briefcase className="h-4 w-4 mr-2" />
              À propos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de {imprimeur.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{imprimeur.description}</p>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Services proposés</h3>
                      <div className="flex flex-wrap gap-2">
                        {imprimeur.services.map((service, idx) => (
                          <span key={idx} className="bg-imprisio-light text-sm px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Produits populaires</CardTitle>
                    <CardDescription>Découvrez les produits les plus demandés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {imprimeur.products.slice(0, 3).map((product) => (
                        <Card key={product.id}>
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader className="p-3">
                            <CardTitle className="text-md">{product.name}</CardTitle>
                            <CardDescription className="font-semibold text-imprisio-primary">
                              {product.price}
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="p-3 pt-0">
                            <Link to={`/imprimeurs/${id}/order`} state={{ imprimeur, product }}>
                              <Button className="w-full imprisio-button-sm">
                                Commander
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('products')}
                      >
                        Voir tous les produits
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio récent</CardTitle>
                    <CardDescription>Exemples de travaux réalisés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imprimeur.portfolio.slice(0, 3).map((item) => (
                        <div key={item.id} className="relative h-40 overflow-hidden rounded-md group">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="text-center text-white p-2">
                              <p className="font-semibold text-sm">{item.title}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('portfolio')}
                      >
                        Voir le portfolio complet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Coordonnées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-imprisio-primary" />
                        <div>
                          <p className="font-medium">Téléphone</p>
                          <p className="text-gray-600">{imprimeur.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-imprisio-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">{imprimeur.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-imprisio-primary" />
                        <div>
                          <p className="font-medium">Adresse</p>
                          <p className="text-gray-600">{imprimeur.address}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Horaires d'ouverture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Lundi</span>
                        <span>{imprimeur.hours.monday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Mardi</span>
                        <span>{imprimeur.hours.tuesday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Mercredi</span>
                        <span>{imprimeur.hours.wednesday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Jeudi</span>
                        <span>{imprimeur.hours.thursday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Vendredi</span>
                        <span>{imprimeur.hours.friday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Samedi</span>
                        <span>{imprimeur.hours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Dimanche</span>
                        <span>{imprimeur.hours.sunday}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Link to={`/imprimeurs/${id}/order`} state={{ imprimeur }}>
                        <Button className="w-full imprisio-button">
                          Passer une commande
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">
                        Contacter l'imprimeur
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Nos produits</CardTitle>
                <CardDescription>Découvrez notre catalogue de produits et services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imprimeur.products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="text-imprisio-primary font-semibold mt-1">
                          {product.price}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-gray-600 text-sm mb-4">
                          {product.description}
                        </p>
                        <Link to={`/imprimeurs/${id}/order`} state={{ imprimeur, product }}>
                          <Button className="w-full imprisio-button">
                            Commander
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>Exemples de nos réalisations précédentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imprimeur.portfolio.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de nous</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">
                      {imprimeur.description}
                    </p>
                    <p className="text-gray-700 mb-6">
                      Fondée en {imprimeur.founded}, {imprimeur.name} s'est imposée comme un leader dans le secteur de l'impression à Kinshasa. Notre mission est de fournir des services d'impression de haute qualité, avec une attention particulière aux détails et à la satisfaction client.
                    </p>
                    <p className="text-gray-700">
                      Aujourd'hui, avec une équipe de {imprimeur.team} professionnels qualifiés, nous sommes fiers de servir des clients variés, des petites entreprises aux grandes organisations, en offrant une gamme complète de solutions d'impression personnalisées.
                    </p>
                    
                    <div className="mt-8 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Notre vision</h3>
                        <p className="text-gray-700">
                          Devenir la référence en matière d'impression de qualité en République Démocratique du Congo, en alliant innovation technologique, service client exceptionnel et respect de l'environnement.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Nos valeurs</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                          <li>Qualité et précision dans chaque impression</li>
                          <li>Service client personnalisé</li>
                          <li>Innovation et adoption des nouvelles technologies</li>
                          <li>Respect des délais et engagement</li>
                          <li>Responsabilité environnementale</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Informations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-3 text-imprisio-primary" />
                        <div>
                          <p className="font-medium">Propriétaire</p>
                          <p className="text-gray-600">{imprimeur.owner}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 text-imprisio-primary" />
                        <div>
                          <p className="font-medium">Année de fondation</p>
                          <p className="text-gray-600">{imprimeur.founded}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-3 text-imprisio-primary" />
                        <div>
                          <p className="font-medium">Taille de l'équipe</p>
                          <p className="text-gray-600">{imprimeur.team} personnes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6">
                  <Link to={`/imprimeurs/${id}/order`} state={{ imprimeur }}>
                    <Button className="w-full imprisio-button">
                      Passer une commande
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImprimeurDetail;
