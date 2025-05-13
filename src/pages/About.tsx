
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, Globe, Shield, CheckCircle, 
  Award, Truck, CreditCard, HelpCircle 
} from 'lucide-react';

const About = () => {
  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="imprisio-title mb-6">À propos d'Imprisio</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Imprisio est une plateforme qui connecte les imprimeurs professionnels avec les clients à la recherche de produits d'impression personnalisés de qualité, le tout avec une expérience simple et fluide.
          </p>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-imprisio-primary bg-opacity-10 p-3 rounded-full mr-4">
                <CheckCircle className="h-8 w-8 text-imprisio-primary" />
              </div>
              <h2 className="text-2xl font-bold">Notre Mission</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Démocratiser l'accès à l'impression personnalisée de qualité en République Démocratique du Congo en créant une plateforme qui connecte de manière transparente les clients avec des imprimeurs professionnels locaux.
            </p>
            <p className="text-gray-600">
              Nous visons à simplifier le processus de commande, à garantir la qualité et à offrir des prix compétitifs pour tous les projets d'impression, qu'ils soient petits ou grands.
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-imprisio-primary bg-opacity-10 p-3 rounded-full mr-4">
                <Globe className="h-8 w-8 text-imprisio-primary" />
              </div>
              <h2 className="text-2xl font-bold">Notre Vision</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Devenir la plateforme de référence pour l'impression personnalisée en Afrique centrale, en soutenant les entreprises locales tout en offrant aux clients une expérience d'achat moderne et sans friction.
            </p>
            <p className="text-gray-600">
              Nous aspirons à créer un écosystème où la créativité s'épanouit grâce à des services d'impression accessibles et de haute qualité pour tous.
            </p>
          </div>
        </div>
        
        {/* Notre histoire */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Notre Histoire</h2>
          <div className="bg-imprisio-light rounded-xl p-8">
            <p className="text-gray-600 mb-4">
              Imprisio est née d'un constat simple : trouver un service d'impression fiable et de qualité en RDC pouvait être un véritable défi. Les fondateurs, ayant eux-mêmes fait face à ces difficultés, ont décidé de créer une solution qui simplifierait ce processus tant pour les clients que pour les imprimeurs.
            </p>
            <p className="text-gray-600 mb-4">
              Lancée en 2023, la plateforme a rapidement gagné en popularité grâce à son approche centrée sur l'utilisateur, sa transparence et son engagement envers la qualité. En quelques mois seulement, Imprisio a construit un réseau de partenaires imprimeurs dans plusieurs villes du pays.
            </p>
            <p className="text-gray-600">
              Aujourd'hui, Imprisio continue de grandir, avec pour ambition de révolutionner l'industrie de l'impression personnalisée en RDC et au-delà, en mettant l'accent sur l'innovation, la qualité et le service client.
            </p>
          </div>
        </div>
        
        {/* Nos valeurs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Qualité", 
                description: "Nous nous engageons à maintenir les plus hauts standards de qualité pour tous les produits d'impression." 
              },
              { 
                icon: Users, 
                title: "Communauté", 
                description: "Nous soutenons les imprimeurs locaux et contribuons à renforcer l'économie locale." 
              },
              { 
                icon: Award, 
                title: "Excellence", 
                description: "Nous visons l'excellence dans chaque aspect de notre service et de notre plateforme." 
              },
              { 
                icon: HelpCircle, 
                title: "Support", 
                description: "Nous offrons un support client réactif et professionnel pour répondre à toutes les questions." 
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="bg-imprisio-primary bg-opacity-10 p-4 rounded-full inline-flex mb-4">
                  <value.icon className="h-8 w-8 text-imprisio-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pourquoi choisir Imprisio */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Choisir Imprisio</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: CheckCircle, 
                title: "Qualité garantie", 
                description: "Tous nos imprimeurs partenaires sont sélectionnés pour leur expertise et la qualité de leur travail." 
              },
              { 
                icon: Truck, 
                title: "Livraison flexible", 
                description: "Choisissez entre la livraison à domicile, le retrait en point relais ou directement chez l'imprimeur." 
              },
              { 
                icon: CreditCard, 
                title: "Paiement sécurisé", 
                description: "Plusieurs options de paiement sécurisées, incluant carte bancaire, mobile money ou espèces." 
              },
              { 
                icon: Users, 
                title: "Support local", 
                description: "En utilisant Imprisio, vous soutenez les entreprises locales et contribuez à l'économie de la RDC." 
              },
            ].map((feature, index) => (
              <div key={index} className="flex">
                <div className="mr-4 mt-1">
                  <feature.icon className="h-6 w-6 text-imprisio-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-imprisio-primary text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à découvrir Imprisio ?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté d'imprimeurs et de clients et découvrez une nouvelle façon de réaliser vos projets d'impression.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-imprisio-primary hover:bg-gray-100 imprisio-button">
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
      </div>
    </div>
  );
};

export default About;
