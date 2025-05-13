
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Printer, ShoppingBag, CreditCard, Truck, Star, FileText } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-imprisio-primary to-blue-600 text-white py-20">
        <div className="imprisio-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">L'impression personnalisée simplifiée</h1>
            <p className="text-xl opacity-90 mb-8">
              Connectez-vous avec des imprimeurs professionnels locaux et commandez des produits personnalisés en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="bg-white text-imprisio-primary hover:bg-gray-100 imprisio-button">
                  Commencer maintenant
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Découvrir les services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="imprisio-section bg-white">
        <div className="imprisio-container">
          <div className="text-center mb-12">
            <h2 className="imprisio-title">Comment ça marche</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Imprisio connecte clients et imprimeurs pour une expérience d'impression sur mesure, rapide et fiable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-imprisio-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-imprisio-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choisissez votre produit</h3>
              <p className="text-gray-600">
                Parcourez notre sélection de produits et trouvez un imprimeur qui correspond à vos besoins.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-imprisio-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-imprisio-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personnalisez votre commande</h3>
              <p className="text-gray-600">
                Choisissez les formats, supports et quantités selon vos besoins spécifiques.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-imprisio-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-imprisio-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recevez votre commande</h3>
              <p className="text-gray-600">
                Faites-vous livrer à domicile, en point relais ou retirez directement chez l'imprimeur.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Services */}
      <section className="imprisio-section bg-imprisio-light">
        <div className="imprisio-container">
          <div className="text-center mb-12">
            <h2 className="imprisio-title">Services populaires</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les produits d'impression les plus demandés par nos clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Flyers & Brochures", icon: <FileText className="h-6 w-6" />, path: "/services/flyers" },
              { title: "T-shirts Personnalisés", icon: <ShoppingBag className="h-6 w-6" />, path: "/services/tshirts" },
              { title: "Bâches & Bannières", icon: <FileText className="h-6 w-6" />, path: "/services/banners" },
              { title: "Cartes de visite", icon: <CreditCard className="h-6 w-6" />, path: "/services/business-cards" },
              { title: "Mugs & Accessoires", icon: <ShoppingBag className="h-6 w-6" />, path: "/services/mugs" },
              { title: "Impressions Vinyle", icon: <FileText className="h-6 w-6" />, path: "/services/vinyl" }
            ].map((service, index) => (
              <Link to={service.path} key={index}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 bg-imprisio-primary bg-opacity-10 p-3 rounded-full text-imprisio-primary">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">Découvrir les options</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/services">
              <Button className="imprisio-button">Voir tous les services</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* For Printers */}
      <section className="imprisio-section bg-white">
        <div className="imprisio-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="imprisio-title">Vous êtes un imprimeur ?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Rejoignez Imprisio pour développer votre activité, trouver de nouveaux clients et gérer vos commandes facilement.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Créez votre portfolio professionnel en ligne",
                  "Définissez vos produits et vos prix",
                  "Recevez des commandes en ligne",
                  "Gérez vos livraisons et retraits",
                  "Augmentez votre visibilité et votre clientèle"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-imprisio-accent mr-3">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register-printer">
                <Button className="imprisio-button-secondary">Devenir imprimeur partenaire</Button>
              </Link>
            </div>
            <div className="bg-imprisio-light rounded-lg p-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-imprisio-primary bg-opacity-10 p-3 rounded-full">
                    <Printer className="h-6 w-6 text-imprisio-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">Imprimerie Exemple</h3>
                    <div className="flex items-center text-sm text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-gray-600">(127 avis)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    "Depuis que j'ai rejoint Imprisio, j'ai augmenté mon chiffre d'affaires de 40%. La plateforme me permet de me concentrer sur mon travail d'impression pendant qu'elle s'occupe des commandes et des paiements."
                  </p>
                  <p className="text-sm font-medium">– Jean Dupont, Imprimeur à Kinshasa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="imprisio-section bg-imprisio-primary text-white">
        <div className="imprisio-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à commencer?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez Imprisio dès aujourd'hui et découvrez la simplicité de l'impression personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-imprisio-primary hover:bg-gray-100">
                S'inscrire comme client
              </Button>
            </Link>
            <Link to="/register-printer">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Devenir imprimeur
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
