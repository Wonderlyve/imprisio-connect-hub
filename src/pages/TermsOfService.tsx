
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="imprisio-section py-12">
      <div className="imprisio-container">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-imprisio-primary">Conditions d'utilisation</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p className="mb-4">
              Bienvenue sur Imprisio. En utilisant notre site web et nos services, vous acceptez de vous 
              conformer aux présentes conditions d'utilisation et à toutes les lois et réglementations applicables. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Utilisation des services</h2>
            <p className="mb-4">
              Imprisio est une plateforme qui connecte les clients avec des imprimeurs professionnels. 
              Nous proposons un service de mise en relation et ne sommes pas responsables de la qualité 
              des services fournis par les imprimeurs partenaires.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Comptes utilisateurs</h2>
            <p className="mb-4">
              Pour utiliser certaines fonctionnalités de la plateforme, vous devrez créer un compte. 
              Vous êtes responsable de maintenir la confidentialité de vos identifiants et de toutes 
              les activités qui se produisent sous votre compte.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Commissions et paiements</h2>
            <p className="mb-4">
              Pour les imprimeurs partenaires, Imprisio prélève une commission de 10% sur chaque 
              commande réalisée via la plateforme. Les paiements sont sécurisés et traités par nos 
              partenaires de confiance.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Responsabilités des utilisateurs</h2>
            <p className="mb-4">
              <strong>Pour les clients :</strong> Vous êtes responsable de fournir des informations 
              précises concernant vos commandes et de respecter les délais de paiement.
            </p>
            <p className="mb-4">
              <strong>Pour les imprimeurs :</strong> Vous êtes responsable de la qualité des services 
              que vous fournissez, du respect des délais et de la conformité avec les spécifications 
              des clients.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Propriété intellectuelle</h2>
            <p className="mb-4">
              Tout contenu fourni par les utilisateurs reste leur propriété. Cependant, en téléchargeant 
              du contenu sur notre plateforme, vous nous accordez une licence non exclusive pour utiliser, 
              reproduire et afficher ce contenu dans le cadre de nos services.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Résiliation</h2>
            <p className="mb-4">
              Nous nous réservons le droit de suspendre ou de résilier votre accès à la plateforme 
              si vous ne respectez pas ces conditions d'utilisation ou si vous vous engagez dans des 
              activités frauduleuses ou illégales.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Limitation de responsabilité</h2>
            <p className="mb-4">
              Imprisio n'est pas responsable des dommages directs, indirects, accessoires, consécutifs 
              ou punitifs résultant de votre utilisation ou de votre incapacité à utiliser nos services.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Modifications des conditions</h2>
            <p className="mb-4">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications 
              entrent en vigueur dès leur publication sur la plateforme. Vous êtes invité à consulter 
              régulièrement cette page pour rester informé.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact</h2>
            <p className="mb-4">
              Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous 
              contacter via notre page de contact.
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="/">
              <Button className="imprisio-button">Retour à l'accueil</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
