
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegisterPrinter = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs personnels.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    setActiveTab("business");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName || !businessAddress || !businessDescription) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs concernant votre entreprise.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les conditions d'utilisation.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte imprimeur a été créé avec succès.",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="imprisio-section bg-imprisio-light min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-lg p-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Devenir imprimeur partenaire</CardTitle>
            <CardDescription className="text-center">
              Créez votre compte professionnel pour proposer vos services d'impression
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal" className="text-xs sm:text-sm">Infos personnelles</TabsTrigger>
                <TabsTrigger value="business" className="text-xs sm:text-sm">Infos professionnelles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <label htmlFor="full-name" className="text-sm font-medium">Nom complet</label>
                    <Input 
                      id="full-name"
                      placeholder="Jean Dupont"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+243 XXX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">Confirmer le mot de passe</label>
                    <Input 
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    className="w-full imprisio-button"
                    onClick={handleNextStep}
                  >
                    Suivant
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="business">
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                  <div className="space-y-2">
                    <label htmlFor="business-name" className="text-sm font-medium">Nom de l'entreprise</label>
                    <Input 
                      id="business-name"
                      placeholder="Imprimerie XYZ"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="business-address" className="text-sm font-medium">Adresse de l'entreprise</label>
                    <Input 
                      id="business-address"
                      placeholder="123 Rue Principale, Kinshasa"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="business-description" className="text-sm font-medium">Description de votre activité</label>
                    <Textarea 
                      id="business-description"
                      placeholder="Décrivez vos services d'impression, vos spécialités..."
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      J'accepte les{" "}
                      <Link to="/terms" className="text-imprisio-primary hover:underline">
                        conditions d'utilisation
                      </Link>
                      {" "}et la commission de 10% sur les commandes
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => setActiveTab("personal")}
                    >
                      Retour
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 imprisio-button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span>Chargement...</span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Printer className="mr-2 h-4 w-4" />
                          S'inscrire
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-center text-gray-600">
              Déjà inscrit?{" "}
              <Link to="/login" className="text-imprisio-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPrinter;
