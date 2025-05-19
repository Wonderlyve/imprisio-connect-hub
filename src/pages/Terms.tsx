
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="imprisio-section py-16">
      <div className="imprisio-container">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Conditions Générales d'Utilisation</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Bienvenue sur notre plateforme de mise en relation entre clients et imprimeurs.
              Les présentes Conditions Générales d'Utilisation (CGU) régissent votre utilisation de notre site web et de nos services.
            </p>
            
            <h2>2. Définitions</h2>
            <p>
              <strong>Utilisateur</strong> : Toute personne qui accède à notre plateforme.<br />
              <strong>Client</strong> : Utilisateur qui recherche des services d'impression.<br />
              <strong>Imprimeur</strong> : Professionnel de l'impression qui propose ses services sur notre plateforme.
            </p>
            
            <h2>3. Services proposés</h2>
            <p>
              Notre plateforme permet aux clients de découvrir des services d'impression, 
              de comparer les offres, de passer commande et de communiquer avec les imprimeurs.
              Les imprimeurs peuvent présenter leurs services, recevoir des commandes et gérer leur activité.
            </p>
            
            <h2>4. Inscription et compte utilisateur</h2>
            <p>
              Pour utiliser certaines fonctionnalités, vous devez créer un compte utilisateur.
              Vous êtes responsable de maintenir la confidentialité de vos informations de connexion.
              Les informations fournies lors de l'inscription doivent être exactes et complètes.
            </p>
            
            <h2>5. Responsabilités</h2>
            <p>
              <strong>Des clients</strong> : Les clients sont responsables de la précision des informations fournies pour leurs commandes.<br />
              <strong>Des imprimeurs</strong> : Les imprimeurs sont responsables de la qualité des services fournis et de l'exactitude des informations sur leurs services.
            </p>
            
            <h2>6. Propriété intellectuelle</h2>
            <p>
              Tous les droits de propriété intellectuelle liés à notre plateforme sont réservés.
              Les utilisateurs conservent leurs droits sur le contenu qu'ils publient.
            </p>
            
            <h2>7. Modification des conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment.
              Les modifications prennent effet dès leur publication sur la plateforme.
            </p>
            
            <h2>8. Contact</h2>
            <p>
              Pour toute question concernant ces conditions, veuillez nous contacter à l'adresse suivante : contact@impressio.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
