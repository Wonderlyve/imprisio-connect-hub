
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, MapPin } from "lucide-react";
import { Address } from "@/hooks/use-addresses";
import AddressForm from './AddressForm';

interface AddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: Address;
  setCurrentAddress: React.Dispatch<React.SetStateAction<Address>>;
  onSave: () => Promise<void>;
  isEditing: boolean;
  isSaving: boolean;
}

const AddressDialog = ({
  isOpen,
  onClose,
  currentAddress,
  setCurrentAddress,
  onSave,
  isEditing,
  isSaving
}: AddressDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier l'adresse" : "Ajouter une adresse"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Mettez à jour les informations de votre adresse" 
              : "Entrez les détails de votre nouvelle adresse de livraison"}
          </DialogDescription>
        </DialogHeader>
        
        <AddressForm currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Annuler
          </Button>
          <Button 
            className="imprisio-button" 
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                {isEditing ? "Mettre à jour" : "Ajouter"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
