
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, ShoppingBag, CreditCard, Truck, 
  Package, ChevronRight
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  path: string;
  image: string;
  price: string;
  features: string[];
}

const services: Service[] = [
  { 
    id: 'flyers', 
    name: 'Flyers & Brochures', 
    icon: FileText, 
    path: '/services/flyers',
    description: 'Imprimez des flyers et des brochures personnalisés pour vos événements et promotions.',
    image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&q=80',
    price: 'À partir de 8.000 FC',
    features: ['Plusieurs formats disponibles', 'Papier de qualité', 'Livraison rapide', 'Petites et grandes quantités']
  },
  { 
    id: 'tshirts', 
    name: 'T-shirts Personnalisés', 
    icon: ShoppingBag, 
    path: '/services/tshirts',
    description: 'Créez des t-shirts personnalisés avec votre design, logo ou message.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80',
    price: 'À partir de 15.000 FC',
    features: ['Toutes tailles disponibles', 'Impression durable', 'Plusieurs couleurs', 'Matériaux de qualité']
  },
  { 
    id: 'banners', 
    name: 'Bâches & Bannières', 
    icon: FileText, 
    path: '/services/banners',
    description: 'Imprimez des bannières et bâches grand format pour vos événements et publicités.',
    image: 'https://images.unsplash.com/photo-1492140269802-4232b5680782?auto=format&fit=crop&q=80',
    price: 'À partir de 30.000 FC',
    features: ['Grand format', 'Résistant aux intempéries', 'Haute résolution', 'Œillets inclus']
  },
  { 
    id: 'business-cards', 
    name: 'Cartes de visite', 
    icon: CreditCard, 
    path: '/services/business-cards',
    description: 'Créez des cartes de visite professionnelles qui vous démarquent.',
    image: 'https://images.unsplash.com/photo-1581093196277-9f397c262dc3?auto=format&fit=crop&q=80',
    price: 'À partir de 10.000 FC',
    features: ['Design élégant', 'Finition de qualité', 'Papier premium', 'Livraison rapide']
  },
  { 
    id: 'mugs', 
    name: 'Mugs & Accessoires', 
    icon: ShoppingBag, 
    path: '/services/mugs',
    description: 'Personnalisez des mugs et accessoires avec vos designs préférés.',
    image: 'https://images.unsplash.com/photo-1581067721837-13ab95130441?auto=format&fit=crop&q=80',
    price: 'À partir de 12.000 FC',
    features: ['Impression résistante', 'Lavable en machine', 'Plusieurs modèles', 'Idéal pour cadeaux']
  },
  { 
    id: 'vinyl', 
    name: 'Impressions Vinyle', 
    icon: FileText, 
    path: '/services/vinyl',
    description: 'Impression sur vinyle de haute qualité pour intérieur et extérieur.',
    image: 'https://images.unsplash.com/photo-1619537903429-eb3bf537167f?auto=format&fit=crop&q=80',
    price: 'À partir de 20.000 FC',
    features: ['Résistant aux UV', 'Application facile', 'Durée de vie longue', 'Découpe sur mesure']
  }
];

const ServicesPage = () => {
  const { category } = useParams<{ category?: string }>();
  const selectedService = category ? services.find(s => s.id === category) : null;
  
  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        {selectedService ? (
          <ServiceDetail service={selectedService} />
        ) : (
          <ServicesList />
        )}
      </div>
    </div>
  );
};

const ServicesList = () => {
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="imprisio-title">Nos services d'impression</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez notre gamme complète de services d'impression personnalisée pour particuliers et professionnels
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {services.map((service) => (
          <Link to={service.path} key={service.id}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <div className="h-40 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-imprisio-primary bg-opacity-10 p-3 rounded-full text-imprisio-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                    <p className="text-imprisio-primary font-medium">{service.price}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button className="w-full">
                  Voir les détails
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="bg-imprisio-light rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Contactez-nous pour un devis personnalisé adapté à vos besoins spécifiques d'impression.
        </p>
        <Button className="imprisio-button">Demander un devis</Button>
      </div>
    </>
  );
};

const ServiceDetail = ({ service }: { service: Service }) => {
  return (
    <>
      <div className="mb-8">
        <Link to="/services" className="text-imprisio-primary hover:underline flex items-center mb-4">
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
          Retour aux services
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{service.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Caractéristiques</h3>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-imprisio-primary mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-xl font-semibold text-imprisio-primary">{service.price}</p>
              <p className="text-sm text-gray-500">Prix variable selon quantités et options</p>
            </div>
            
            <div className="space-x-4">
              <Button className="imprisio-button">Commander maintenant</Button>
              <Button variant="outline">Voir les imprimeurs</Button>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="delivery">Livraison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="p-6 bg-white border rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">À propos de ce produit</h3>
            <p className="text-gray-600 mb-4">
              Nos {service.name.toLowerCase()} sont imprimés avec des encres de haute qualité sur des matériaux soigneusement sélectionnés. Que vous ayez besoin d'une petite ou d'une grande quantité, nous garantissons un résultat exceptionnel pour vos projets personnels ou professionnels.
            </p>
            <p className="text-gray-600">
              Vous pouvez personnaliser entièrement votre commande en choisissant parmi différentes options de matériaux, de finitions et de formats. Notre équipe d'experts est à votre disposition pour vous conseiller tout au long du processus.
            </p>
          </TabsContent>
          
          <TabsContent value="specifications" className="p-6 bg-white border rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">Spécifications techniques</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Matériaux disponibles</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Papier couché (150g, 250g, 350g)</li>
                  <li>Papier recyclé</li>
                  <li>Vinyle adhésif</li>
                  <li>Bâche PVC</li>
                  <li>Textile (100% coton)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Options de finition</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Pelliculage mat ou brillant</li>
                  <li>Vernis sélectif</li>
                  <li>Découpe à la forme</li>
                  <li>Coins arrondis</li>
                  <li>Pliage et rainage</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="delivery" className="p-6 bg-white border rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">Options de livraison</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-imprisio-primary mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Livraison à domicile</h4>
                  <p className="text-gray-600">Recevez votre commande directement chez vous dans un délai de 2 à 5 jours ouvrables.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Package className="h-5 w-5 text-imprisio-primary mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Point relais</h4>
                  <p className="text-gray-600">Récupérez votre commande dans l'un de nos points relais partenaires à Kinshasa.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <ShoppingBag className="h-5 w-5 text-imprisio-primary mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold">Retrait sur place</h4>
                  <p className="text-gray-600">Récupérez gratuitement votre commande directement chez l'imprimeur.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Autres services qui pourraient vous intéresser</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter(s => s.id !== service.id)
            .slice(0, 3)
            .map((relatedService) => (
              <Link to={relatedService.path} key={relatedService.id}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-3 bg-imprisio-primary bg-opacity-10 p-2 rounded-full text-imprisio-primary">
                        <relatedService.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{relatedService.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{relatedService.description}</p>
                    <p className="text-imprisio-primary font-medium">{relatedService.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
