
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BadgePercent, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreatePromotionProps {
  onClose: () => void;
  onSave: (promotion: any) => void;
}

const CreatePromotion: React.FC<CreatePromotionProps> = ({ onClose, onSave }) => {
  const [promotion, setPromotion] = useState({
    title: '',
    description: '',
    validUntil: '',
    discount: '',
    category: '',
  });

  const { toast } = useToast();

  const categories = [
    'Flyers', 
    'Cartes de visite', 
    'Brochures', 
    'Affiches', 
    'Textile',
    'Calendriers',
    'Tous produits'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promotion.title || !promotion.validUntil || !promotion.discount || !promotion.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    onSave({
      ...promotion,
      id: `promo-${Date.now()}`,
      created: new Date().toISOString(),
    });

    toast({
      title: "Promotion créée",
      description: "Votre promotion a été créée avec succès",
    });

    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Créer une promotion</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de la promotion*</Label>
            <Input 
              id="title"
              value={promotion.title}
              onChange={(e) => setPromotion({ ...promotion, title: e.target.value })}
              placeholder="Ex: Flyers à -30%"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={promotion.description}
              onChange={(e) => setPromotion({ ...promotion, description: e.target.value })}
              placeholder="Décrivez votre offre"
              className="h-24"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Catégorie*</Label>
              <Select 
                value={promotion.category} 
                onValueChange={(value) => setPromotion({ ...promotion, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="discount">Réduction (%)*</Label>
              <Input 
                id="discount"
                type="number"
                value={promotion.discount}
                onChange={(e) => setPromotion({ ...promotion, discount: e.target.value })}
                placeholder="Ex: 30"
                required
                min="0"
                max="100"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="validUntil">Valable jusqu'au*</Label>
            <Input 
              id="validUntil"
              type="date"
              value={promotion.validUntil}
              onChange={(e) => setPromotion({ ...promotion, validUntil: e.target.value })}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <BadgePercent className="h-4 w-4" />
              Créer la promotion
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePromotion;
