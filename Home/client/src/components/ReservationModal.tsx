import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

/**
 * Design: Minimalisme Nordique
 * - Modal avec structure claire
 * - Affichage du RIB/IBAN
 * - Confirmation simulée avec animation
 */

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: number;
    name: string;
    price: number;
    currency: string;
    caution: number;
  };
}

type ReservationStep = 'details' | 'payment' | 'confirmation';

export default function ReservationModal({
  isOpen,
  onClose,
  property,
}: ReservationModalProps) {
  const [step, setStep] = useState<ReservationStep>('details');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalAmount = nights * property.price;

  const handleSubmitDetails = () => {
    if (checkInDate && checkOutDate && guests > 0) {
      setStep('payment');
    }
  };

  const handleSubmitPayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('details');
    setCheckInDate('');
    setCheckOutDate('');
    setGuests(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {step === 'confirmation' ? 'Réservation confirmée !' : 'Réserver ce bien'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Étape 1: Détails */}
          {step === 'details' && (
            <div className="space-y-6">
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="font-bold text-foreground mb-2">{property.name}</h3>
                <p className="text-muted-foreground">
                  {property.price}{property.currency} par nuit
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date d'arrivée
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date de départ
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre de personnes
                </label>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {nights > 0 && (
                <div className="bg-primary/10 border border-primary rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-foreground">
                    <span>{nights} nuit{nights > 1 ? 's' : ''} x {property.price}{property.currency}</span>
                    <span className="font-bold">{totalAmount}{property.currency}</span>
                  </div>
                  <div className="flex justify-between text-foreground font-bold text-lg border-t border-primary/20 pt-2">
                    <span>Total</span>
                    <span className="text-primary">{totalAmount}{property.currency}</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSubmitDetails}
                disabled={!checkInDate || !checkOutDate || nights <= 0}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Continuer
              </Button>
            </div>
          )}

          {/* Étape 2: Paiement */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="font-bold text-foreground mb-4">Récapitulatif</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Bien</span>
                    <span className="text-foreground">{property.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durée</span>
                    <span className="text-foreground">{nights} nuit{nights > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground border-t border-border pt-2 mt-2">
                    <span>Montant total</span>
                    <span className="text-primary">{totalAmount}{property.currency}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <h3 className="font-bold text-foreground">Informations de paiement</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground">Bénéficiaire</p>
                    <p>VacationHub SARL</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">IBAN</p>
                    <p className="font-mono">FR76 1234 5678 9012 3456 7890 123</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">BIC</p>
                    <p className="font-mono">SOFRFRPP</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Montant à virer</p>
                    <p className="text-lg font-bold text-primary">{property.caution}{property.currency} (caution)</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
                    <p className="text-xs text-yellow-800">
                      Veuillez virer la caution de {property.caution}{property.currency} au compte ci-dessus. Votre réservation sera confirmée après réception du paiement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  {isProcessing ? 'Traitement...' : "J'ai effectué le paiement"}
                </Button>
                <Button
                  onClick={() => setStep('details')}
                  variant="outline"
                  className="w-full"
                >
                  Retour
                </Button>
              </div>
            </div>
          )}

          {/* Étape 3: Confirmation */}
          {step === 'confirmation' && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Demande en cours de validation
                </h2>
                <p className="text-muted-foreground">
                  Votre demande de réservation a été reçue. Nous vérifierons le paiement et vous confirmerons votre réservation par email.
                </p>
              </div>

              <div className="bg-secondary rounded-lg p-4 text-left space-y-2">
                <h3 className="font-bold text-foreground">Détails de votre réservation</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Propriété:</strong> {property.name}</p>
                  <p><strong>Dates:</strong> {checkInDate} au {checkOutDate}</p>
                  <p><strong>Nombre de nuits:</strong> {nights}</p>
                  <p><strong>Montant total:</strong> {totalAmount}{property.currency}</p>
                  <p><strong>Caution:</strong> {property.caution}{property.currency}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <p className="text-sm text-blue-900">
                  Un email de confirmation vous a été envoyé. Vérifiez votre dossier spam si vous ne le recevez pas.
                </p>
              </div>

              <Button
                onClick={handleClose}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Fermer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
