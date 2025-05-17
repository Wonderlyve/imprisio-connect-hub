
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';

const RegisterPrinter = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isLoggedIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword || !businessName || !businessAddress) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
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
      // Register user first
      const result = await signUp(email, password, fullName);
      
      if (result.success) {
        // Get session to get user ID
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session?.user) {
          // Create printer record
          const { error: printerError } = await supabase
            .from('printers')
            .insert({
              user_id: sessionData.session.user.id,
              business_name: businessName,
              description: description,
              address: businessAddress,
              phone: phone
            });
            
          // Update profile role
          await supabase
            .from('profiles')
            .update({ role: 'printer' })
            .eq('id', sessionData.session.user.id);
          
          if (printerError) {
            console.error("Error creating printer profile:", printerError);
            toast({
              title: "Erreur d'inscription",
              description: "Votre compte a été créé mais il y a eu un problème avec l'enregistrement de votre imprimerie.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Inscription réussie",
              description: "Votre compte d'imprimeur a été créé avec succès.",
            });
          }
        }
        
        navigate('/login');
      } else {
        toast({
          title: "Erreur d'inscription",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during printer registration:", error);
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
    <div className="imprisio-section bg-imprisio-light min-h-[80vh] py-12">
      <div className="w-full max-w-2xl mx-auto p-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Inscription Imprimeur</CardTitle>
            <CardDescription className="text-center">
              Créez votre compte professionnel pour proposer vos services d'impression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations sur l'imprimerie</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="business-name" className="text-sm font-medium">Nom de l'imprimerie</label>
                    <Input 
                      id="business-name"
                      placeholder="Imprimerie XYZ"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                    <Input 
                      id="phone"
                      placeholder="+243 XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="business-address" className="text-sm font-medium">Adresse de l'imprimerie</label>
                    <Input 
                      id="business-address"
                      placeholder="123 Rue Principale, Kinshasa"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="description" className="text-sm font-medium">Description de votre activité</label>
                    <Textarea 
                      id="description"
                      placeholder="Décrivez votre imprimerie et les services que vous proposez..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-imprisio-primary hover:underline">
                    conditions d'utilisation
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full imprisio-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Chargement...</span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Printer className="mr-2 h-4 w-4" />
                    S'inscrire en tant qu'imprimeur
                  </span>
                )}
              </Button>
            </form>
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
