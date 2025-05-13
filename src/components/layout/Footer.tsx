
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-imprisio-dark text-white pt-12 pb-6">
      <div className="imprisio-container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">Imprisio</Link>
            <p className="text-gray-300 mb-4">
              Connectez-vous avec des imprimeurs professionnels pour tous vos besoins d'impression personnalisée.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/imprimeurs" className="text-gray-300 hover:text-white transition-colors">Imprimeurs</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/flyers" className="text-gray-300 hover:text-white transition-colors">Flyers & Brochures</Link></li>
              <li><Link to="/services/tshirts" className="text-gray-300 hover:text-white transition-colors">T-shirts Personnalisés</Link></li>
              <li><Link to="/services/banners" className="text-gray-300 hover:text-white transition-colors">Bâches & Bannières</Link></li>
              <li><Link to="/services/mugs" className="text-gray-300 hover:text-white transition-colors">Mugs & Accessoires</Link></li>
              <li><Link to="/services/vinyl" className="text-gray-300 hover:text-white transition-colors">Impressions Vinyle</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: contact@imprisio.com</li>
              <li className="text-gray-300">Téléphone: +243 000 000 000</li>
              <li className="text-gray-300">Adresse: Kinshasa, RDC</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Imprisio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
