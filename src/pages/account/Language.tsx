
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Globe, Check } from 'lucide-react';

const Language = () => {
  const [language, setLanguage] = useState('fr');
  const { toast } = useToast();
  
  const languages = [
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'ln', name: 'Lingala', flag: '🇨🇩' },
  ];
  
  const handleSave = () => {
    toast({
      title: "Langue mise à jour",
      description: "Vos préférences de langue ont été mises à jour avec succès.",
    });
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Préférences de langue</h2>
        <p className="text-gray-600">Sélectionnez la langue de votre choix pour l'interface</p>
      </div>
      
      <RadioGroup value={language} onValueChange={setLanguage} className="space-y-4 mb-6">
        {languages.map(lang => (
          <div
            key={lang.id}
            className={`flex items-center p-4 rounded-lg border-2 ${
              language === lang.id ? 'border-imprisio-primary' : 'border-transparent'
            }`}
          >
            <RadioGroupItem value={lang.id} id={lang.id} className="mr-3" />
            <Label htmlFor={lang.id} className="flex items-center cursor-pointer flex-1">
              <span className="text-2xl mr-3">{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.id && (
                <Check className="h-5 w-5 ml-auto text-imprisio-primary" />
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          Enregistrer les préférences
        </Button>
      </div>
    </div>
  );
};

export default Language;
