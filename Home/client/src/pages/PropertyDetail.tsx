import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Users, Wifi, Zap, Wind, Droplets, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Design: Minimalisme Nordique
 * - Galerie avec slider principal et thumbnails
 * - Animations fluides au changement d'image
 * - Informations structurées et claires
 * - Bouton "Réserver" prominent
 */

interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  description: string;
  amenities: string[];
  images: string[];
  caution: number;
  type: string;
}

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi haute vitesse': <Wifi className="w-5 h-5" />,
  'Climatisation': <Wind className="w-5 h-5" />,
  'Piscine': <Droplets className="w-5 h-5" />,
  'Électricité': <Zap className="w-5 h-5" />,
};

export default function PropertyDetail() {
  const [match, params] = useRoute('/property/:id');
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    fetch('/data/properties.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.properties.find(
          (p: Property) => p.id === parseInt(params.id)
        );
        setProperty(found);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Erreur:', err);
        setIsLoading(false);
      });
  }, [params?.id]);

  if (!match) return null;
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Propriété non trouvée</div>;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Background gradient decoratif */}
      <div className="fixed inset-0 bg-gradient-cool opacity-20 pointer-events-none" />
      <Header />

      <main className="flex-1 pt-24 md:pt-32">
        {/* Galerie */}
        <section className="border-b border-border">
          <div className="container py-8">
            {/* Image Principale */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary mb-4 group">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-foreground transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-foreground transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === currentImageIndex
                      ? 'border-primary'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Informations */}
        <section className="container py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Détails Principaux */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                      {property.name}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{property.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <div>
                      <div className="font-bold text-foreground">{property.rating}</div>
                      <div className="text-sm text-muted-foreground">({property.reviews} avis)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caractéristiques */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                <div className="text-center">
                  <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-bold text-foreground">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Chambre{property.bedrooms > 1 ? 's' : ''}</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-bold text-foreground">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Salle{property.bathrooms > 1 ? 's' : ''}</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-bold text-foreground">{property.maxGuests}</div>
                  <div className="text-sm text-muted-foreground">Personne{property.maxGuests > 1 ? 's' : ''}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">À propos</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Équipements */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Équipements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-primary transition-colors duration-200"
                    >
                      <div className="text-primary">
                        {amenityIcons[amenity] || <Wifi className="w-5 h-5" />}
                      </div>
                      <span className="text-foreground text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Réservation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-border rounded-lg p-6 space-y-6">
                {/* Prix */}
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Prix par nuit</div>
                  <div className="text-4xl font-bold text-primary">
                    {property.price}{property.currency}
                  </div>
                </div>

                {/* Caution */}
                <div className="bg-secondary rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Caution requise</div>
                  <div className="text-2xl font-bold text-foreground">
                    {property.caution}{property.currency}
                  </div>
                </div>

                {/* Bouton Réserver */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6 transition-all duration-300"
                  onClick={() => {
                    console.log('Réserver:', property.id);
                  }}
                >
                  Réserver maintenant
                </Button>

                {/* Informations supplémentaires */}
                <div className="text-sm text-muted-foreground space-y-2 pt-4 border-t border-border">
                  <p>✓ Confirmation instantanée</p>
                  <p>✓ Annulation gratuite jusqu'à 48h</p>
                  <p>✓ Support client 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
