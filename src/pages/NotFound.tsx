
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="imprisio-section min-h-[70vh] flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-imprisio-primary text-8xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page introuvable</h2>
        <p className="text-lg text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button className="imprisio-button">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
