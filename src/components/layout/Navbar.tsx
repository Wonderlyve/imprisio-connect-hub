
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, LogIn, Menu, X, Home, Box, ChartBar } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Cette valeur viendra de Supabase plus tard
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="imprisio-container flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-imprisio-primary text-2xl font-bold">Imprisio</span>
          </Link>
        </div>
        
        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-imprisio-dark hover:text-imprisio-primary transition-colors">Accueil</Link>
          <Link to="/services" className="text-imprisio-dark hover:text-imprisio-primary transition-colors">Services</Link>
          <Link to="/imprimeurs" className="text-imprisio-dark hover:text-imprisio-primary transition-colors">Imprimeurs</Link>
          <Link to="/about" className="text-imprisio-dark hover:text-imprisio-primary transition-colors">À propos</Link>
          <Link to="/contact" className="text-imprisio-dark hover:text-imprisio-primary transition-colors">Contact</Link>
        </div>
        
        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Mon compte
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
              </Link>
              <Link to="/register">
                <Button className="imprisio-button">S'inscrire</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-md animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={toggleMenu} className="flex items-center py-2 text-imprisio-dark">
              <Home className="h-5 w-5 mr-2" />
              Accueil
            </Link>
            <Link to="/services" onClick={toggleMenu} className="flex items-center py-2 text-imprisio-dark">
              <Box className="h-5 w-5 mr-2" />
              Services
            </Link>
            <Link to="/imprimeurs" onClick={toggleMenu} className="flex items-center py-2 text-imprisio-dark">
              <ChartBar className="h-5 w-5 mr-2" />
              Imprimeurs
            </Link>
            <Link to="/about" onClick={toggleMenu} className="flex items-center py-2 text-imprisio-dark">
              À propos
            </Link>
            <Link to="/contact" onClick={toggleMenu} className="flex items-center py-2 text-imprisio-dark">
              Contact
            </Link>
            
            <div className="border-t pt-4 mt-2">
              {isLoggedIn ? (
                <Link to="/dashboard" onClick={toggleMenu}>
                  <Button className="w-full imprisio-button">
                    <User className="h-4 w-4 mr-2" />
                    Mon compte
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full mb-3 flex justify-center items-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      Se connecter
                    </Button>
                  </Link>
                  <Link to="/register" onClick={toggleMenu}>
                    <Button className="w-full imprisio-button">S'inscrire</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
