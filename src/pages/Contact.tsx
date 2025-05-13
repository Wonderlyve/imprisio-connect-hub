
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="imprisio-section bg-white min-h-screen">
      <div className="imprisio-container py-16">
        <div className="text-center mb-12">
          <h1 className="imprisio-title">Contactez-nous</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions ou besoin d'assistance ? Notre équipe est là pour vous aider.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre-email@exemple.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Détaillez votre message ici..."
                  rows={6}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full imprisio-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-imprisio-light p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-imprisio-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 mt-1">contact@imprisio.com</p>
                    <p className="text-gray-600">support@imprisio.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-imprisio-light p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-imprisio-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-gray-600 mt-1">+243 999 888 777</p>
                    <p className="text-gray-600">+243 111 222 333</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-imprisio-light p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-imprisio-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Adresse</h3>
                    <p className="text-gray-600 mt-1">
                      123 Avenue du Commerce<br />
                      Gombe, Kinshasa<br />
                      République Démocratique du Congo
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Heures d'ouverture</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex justify-between">
                    <span>Lundi - Vendredi:</span>
                    <span>8h00 - 17h00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Samedi:</span>
                    <span>9h00 - 15h00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Dimanche:</span>
                    <span>Fermé</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
