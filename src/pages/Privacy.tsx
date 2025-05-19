
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="imprisio-section py-16">
      <div className="imprisio-container">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Politique de Confidentialité</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.
            </p>
            
            <h2>2. Informations collectées</h2>
            <p>
              Nous collectons les types d'informations suivants :
            </p>
            <ul>
              <li>Informations d'identification (nom, prénom, email)</li>
              <li>Coordonnées (adresse, téléphone)</li>
              <li>Informations de paiement</li>
              <li>Données d'utilisation du site</li>
            </ul>
            
            <h2>3. Utilisation des informations</h2>
            <p>
              Vos informations sont utilisées pour :
            </p>
            <ul>
              <li>Fournir nos services</li>
              <li>Traiter les commandes et paiements</li>
              <li>Communiquer avec vous concernant votre compte ou vos commandes</li>
              <li>Améliorer notre site et nos services</li>
            </ul>
            
            <h2>4. Partage des informations</h2>
            <p>
              Nous ne partageons vos informations qu'avec :
            </p>
            <ul>
              <li>Les imprimeurs pour traiter vos commandes</li>
              <li>Les prestataires de services nécessaires à notre activité</li>
              <li>Les autorités légales si requis par la loi</li>
            </ul>
            
            <h2>5. Protection des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre l'accès non autorisé, la perte ou l'altération.
            </p>
            
            <h2>6. Vos droits</h2>
            <p>
              Vous disposez des droits suivants concernant vos données :
            </p>
            <ul>
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            
            <h2>7. Cookies</h2>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
            
            <h2>8. Modifications de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications prennent effet dès leur publication.
            </p>
            
            <h2>9. Contact</h2>
            <p>
              Pour toute question concernant notre politique de confidentialité, veuillez nous contacter à : privacy@impressio.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
