
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileUpload, Send, FileCheck } from "lucide-react";

const RequestQuote = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [printType, setPrintType] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(true);
      toast({
        title: "Fichier téléchargé",
        description: `${e.target.files[0].name} a été téléchargé avec succès.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !printType || !description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Demande envoyée",
        description: "Votre demande de devis a été envoyée avec succès. Un imprimeur vous contactera sous peu.",
      });
      
      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setPrintType('');
      setDescription('');
      setQuantity('');
      setFileUploaded(false);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="imprisio-section bg-imprisio-light py-12">
      <div className="imprisio-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-imprisio-primary mb-4">Demandez un devis</h1>
            <p className="text-lg text-gray-600">
              Décrivez votre projet d'impression et recevez des devis personnalisés de nos imprimeurs partenaires.
            </p>
          </div>
          
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Formulaire de demande de devis</CardTitle>
              <CardDescription>
                Remplissez ce formulaire avec les détails de votre projet pour recevoir des propositions adaptées.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom complet <span className="text-red-500">*</span></Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="printType">Type d'impression <span className="text-red-500">*</span></Label>
                    <Select value={printType} onValueChange={setPrintType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type d'impression" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flyers">Flyers & Brochures</SelectItem>
                        <SelectItem value="tshirts">T-shirts Personnalisés</SelectItem>
                        <SelectItem value="banners">Bâches & Bannières</SelectItem>
                        <SelectItem value="cards">Cartes de visite</SelectItem>
                        <SelectItem value="mugs">Mugs & Accessoires</SelectItem>
                        <SelectItem value="vinyl">Impressions Vinyle</SelectItem>
                        <SelectItem value="other">Autre (préciser dans la description)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantité</Label>
                    <Input
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Ex: 100 flyers, 10 t-shirts..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">Ajouter un fichier ou design</Label>
                    <div className="flex items-center">
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer flex items-center gap-2 border border-gray-300 rounded-md p-2 w-full text-sm text-gray-600 hover:bg-gray-50"
                      >
                        {fileUploaded ? (
                          <>
                            <FileCheck className="h-5 w-5 text-green-500" />
                            <span>Fichier téléchargé</span>
                          </>
                        ) : (
                          <>
                            <FileUpload className="h-5 w-5" />
                            <span>Parcourir les fichiers...</span>
                          </>
                        )}
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Formats acceptés: PDF, JPG, PNG, AI (max. 10MB)
                    </p>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description du projet <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Décrivez votre projet d'impression, spécifications, délais, etc."
                      rows={5}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    className="imprisio-button w-full md:w-auto md:px-10"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t">
              <p className="text-sm text-gray-500 pt-4">
                En soumettant ce formulaire, vous acceptez nos{" "}
                <a href="/terms" className="text-imprisio-primary hover:underline">
                  conditions d'utilisation
                </a>
                .
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-imprisio-primary">Comment ça marche ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-imprisio-light rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-imprisio-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Soumettez votre demande</h3>
                <p className="text-sm text-gray-600">
                  Remplissez le formulaire avec les détails de votre projet d'impression.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-imprisio-light rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-imprisio-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Recevez des devis</h3>
                <p className="text-sm text-gray-600">
                  Nos imprimeurs partenaires vous envoient leurs propositions adaptées à vos besoins.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-imprisio-light rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <span className="text-imprisio-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Choisissez et commandez</h3>
                <p className="text-sm text-gray-600">
                  Sélectionnez l'offre qui vous convient et réalisez votre commande en toute simplicité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
