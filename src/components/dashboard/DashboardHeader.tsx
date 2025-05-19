
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  setActiveTab: (tab: string) => void;
}

const DashboardHeader = ({ setActiveTab }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord imprimeur</h1>
        <p className="text-gray-600">Gérez vos commandes, produits et votre boutique</p>
      </div>
      <Button onClick={() => setActiveTab('produits')} className="imprisio-button flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Ajouter un produit
      </Button>
    </div>
  );
};

export default DashboardHeader;
