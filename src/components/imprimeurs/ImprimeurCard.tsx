
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

export interface Imprimeur {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  services: string[];
}

interface ImprimeurCardProps {
  imprimeur: Imprimeur;
}

const ImprimeurCard: React.FC<ImprimeurCardProps> = ({ imprimeur }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden">
        <img 
          src={imprimeur.image} 
          alt={imprimeur.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-lg">{imprimeur.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm">{imprimeur.rating}</span>
            <span className="ml-1 text-xs text-gray-500">({imprimeur.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{imprimeur.address}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {imprimeur.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {imprimeur.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className="bg-imprisio-light text-xs px-2 py-1 rounded-full">
              {service}
            </span>
          ))}
          {imprimeur.services.length > 3 && (
            <span className="bg-imprisio-light text-xs px-2 py-1 rounded-full">
              +{imprimeur.services.length - 3}
            </span>
          )}
        </div>
        
        <div className="mt-auto flex gap-2">
          <Link to={`/imprimeurs/${imprimeur.id}`} className="flex-1">
            <Button variant="outline" className="w-full">Visiter</Button>
          </Link>
          <Link to={`/imprimeurs/${imprimeur.id}/commander`} className="flex-1">
            <Button className="w-full bg-imprisio-primary">Commander</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprimeurCard;
