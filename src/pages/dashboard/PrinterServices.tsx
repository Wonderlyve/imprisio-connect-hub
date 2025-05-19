
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Image, Loader2 } from 'lucide-react';
import { usePrinterServices, PrinterService, ServiceCategory } from '@/hooks/use-printer-services';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const PrinterServices = () => {
  const { services, categories, isLoading, fetchPrinterServices, fetchServiceCategories, addService, updateService, deleteService } = usePrinterServices();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<PrinterService, 'id' | 'categoryName'>>({
    name: '',
    description: '',
    priceMin: undefined,
    priceMax: undefined,
    estimatedDays: undefined,
    categoryId: '',
    imageUrl: undefined
  });

  useEffect(() => {
    fetchPrinterServices();
    fetchServiceCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value ? parseFloat(value) : undefined }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, categoryId: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile || !currentUser) return null;
    
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${currentUser.id}/service-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('imprisio')
        .upload(filePath, selectedFile);

      if (uploadError) {
        toast({
          title: "Erreur",
          description: "Impossible de télécharger l'image: " + uploadError.message,
          variant: "destructive",
        });
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('imprisio')
        .getPublicUrl(filePath);
        
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du téléchargement de l'image",
        variant: "destructive",
      });
      return null;
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      priceMin: undefined,
      priceMax: undefined,
      estimatedDays: undefined,
      categoryId: '',
      imageUrl: undefined
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsEditing(false);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: PrinterService) => {
    setFormData({
      name: service.name,
      description: service.description || '',
      priceMin: service.priceMin,
      priceMax: service.priceMax,
      estimatedDays: service.estimatedDays,
      categoryId: service.categoryId,
      imageUrl: service.imageUrl
    });
    setPreviewUrl(service.imageUrl || null);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.categoryId) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = formData.imageUrl;
      
      if (selectedFile) {
        imageUrl = await uploadImage();
      }
      
      const serviceData = {
        ...formData,
        imageUrl
      };
      
      let result;
      
      if (isEditing) {
        result = await updateService(formData.id!, serviceData);
      } else {
        result = await addService(serviceData);
      }
      
      if (result.success) {
        setIsDialogOpen(false);
        resetForm();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      await deleteService(id);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Mes Services</h2>
          <p className="text-gray-600">Gérez les services que vous proposez à vos clients</p>
        </div>
        <Button onClick={openAddDialog} className="imprisio-button">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un service
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-imprisio-primary" />
        </div>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <div className="mb-4">
              <Image className="h-16 w-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">Aucun service</h3>
            <p className="text-gray-600 mb-4">Vous n'avez pas encore ajouté de services à votre catalogue.</p>
            <Button onClick={openAddDialog}>Ajouter votre premier service</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Catalogue de services</CardTitle>
            <CardDescription>
              {services.length} service{services.length > 1 ? 's' : ''} dans votre catalogue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du service</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Délai (jours)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map(service => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.categoryName}</TableCell>
                    <TableCell>
                      {service.priceMin && service.priceMax
                        ? `${service.priceMin.toLocaleString()} - ${service.priceMax.toLocaleString()} FC`
                        : service.priceMin
                        ? `À partir de ${service.priceMin.toLocaleString()} FC`
                        : '-'
                      }
                    </TableCell>
                    <TableCell>{service.estimatedDays || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(service)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Modifier le service' : 'Ajouter un nouveau service'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du service <span className="text-red-500">*</span></Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Catégorie <span className="text-red-500">*</span></Label>
                <Select 
                  value={formData.categoryId}
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedDays">Délai de livraison (jours)</Label>
                <Input 
                  id="estimatedDays"
                  name="estimatedDays"
                  type="number"
                  value={formData.estimatedDays || ''}
                  onChange={handleNumberChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceMin">Prix minimum (FC)</Label>
                <Input 
                  id="priceMin"
                  name="priceMin"
                  type="number"
                  value={formData.priceMin || ''}
                  onChange={handleNumberChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priceMax">Prix maximum (FC)</Label>
                <Input 
                  id="priceMax"
                  name="priceMax"
                  type="number"
                  value={formData.priceMax || ''}
                  onChange={handleNumberChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image du service</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
              {previewUrl && (
                <div className="mt-2">
                  <img 
                    src={previewUrl} 
                    alt="Aperçu" 
                    className="w-40 h-auto object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)} 
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="imprisio-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? 'Mise à jour...' : 'Ajout...'}
                  </>
                ) : (
                  <>{isEditing ? 'Mettre à jour' : 'Ajouter'}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrinterServices;
