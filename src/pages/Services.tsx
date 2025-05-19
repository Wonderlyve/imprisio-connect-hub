
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, ShoppingBag, CreditCard, Truck, 
  Package, ChevronRight, ArrowLeft, Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

const Services = () => {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      const formattedCategories = data.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        image_url: category.image_url
      }));

      setCategories(formattedCategories);
      
      if (categorySlug && data.length > 0) {
        const selected = data.find(c => c.id === categorySlug);
        setSelectedCategory(selected || null);
      }
    } catch (error) {
      console.error('Error in fetchCategories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="imprisio-section bg-white min-h-screen">
        <div className="imprisio-container py-10 flex justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-imprisio-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        {selectedCategory ? (
          <ServiceDetail category={selectedCategory} />
        ) : (
          <CategoriesList categories={categories} />
        )}
      </div>
    </div>
  );
};

const CategoriesList = ({ categories }: { categories: ServiceCategory[] }) => {
  // Assign default icons for categories
  const getCategoryIcon = (index: number) => {
    const icons = [FileText, ShoppingBag, CreditCard, Package, FileText, ShoppingBag];
    return icons[index % icons.length];
  };

  return (
    <>
      <div className="mb-6 flex items-center">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="sm" className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Nos catégories d'impression</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Aucune catégorie disponible pour le moment.</p>
          </div>
        ) : (
          categories.map((category, index) => {
            const IconComponent = getCategoryIcon(index);
            return (
              <Link to={`/category/${category.id}`} key={category.id}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={category.image_url || "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&q=80"} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="mr-4 bg-imprisio-primary bg-opacity-10 p-3 rounded-full text-imprisio-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                        <p className="text-imprisio-primary font-medium">Voir les services</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description || "Découvrez nos services d'impression de qualité."}</p>
                    <Button className="w-full">
                      Voir les détails
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
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

const ServiceDetail = ({ category }: { category: ServiceCategory }) => {
  return (
    <>
      <div className="mb-8">
        <Link to="/services" className="text-imprisio-primary hover:underline flex items-center mb-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux catégories
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{category.description || "Découvrez nos services d'impression de qualité."}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Caractéristiques</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-imprisio-primary mr-2">✓</span>
                  <span>Plusieurs formats disponibles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-imprisio-primary mr-2">✓</span>
                  <span>Papier de qualité</span>
                </li>
                <li className="flex items-start">
                  <span className="text-imprisio-primary mr-2">✓</span>
                  <span>Livraison rapide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-imprisio-primary mr-2">✓</span>
                  <span>Petites et grandes quantités</span>
                </li>
              </ul>
            </div>
            
            <div className="space-x-4">
              <Link to={`/category/${category.id}`}>
                <Button className="imprisio-button">Voir les services</Button>
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden">
            <img 
              src={category.image_url || "https://images.unsplash.com/photo-1581093196277-9f397c262dc3?auto=format&fit=crop&q=80"} 
              alt={category.name} 
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
            <h3 className="text-xl font-semibold mb-4">À propos de cette catégorie</h3>
            <p className="text-gray-600 mb-4">
              Nos services de {category.name.toLowerCase()} sont imprimés avec des encres de haute qualité sur des matériaux soigneusement sélectionnés. Que vous ayez besoin d'une petite ou d'une grande quantité, nous garantissons un résultat exceptionnel pour vos projets personnels ou professionnels.
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
    </>
  );
};

export default Services;
