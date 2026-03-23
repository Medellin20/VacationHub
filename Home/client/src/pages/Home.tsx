import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react';

/**
 * Design: Minimalisme Nordique
 * - Hero section asymétrique avec image à droite
 * - Section de recherche avec filtres
 * - Grille 3 colonnes pour les biens
 * - Animations au scroll (fade-in + slide-up)
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
  mainImage: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState(500);

  useEffect(() => {
    // Charger les données JSON
    fetch('/data/properties.json')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch((err) => console.error('Erreur chargement propriétés:', err));
  }, []);

  const handleFilter = () => {
    let filtered = properties;

    if (location) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    filtered = filtered.filter((p) => p.price <= priceRange);

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Background gradient decoratif */}
      <div className="fixed inset-0 bg-gradient-light opacity-30 pointer-events-none" />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 border-b border-border z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Texte */}
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Trouvez votre maison de rêve
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Découvrez les plus belles propriétés de location pour vos vacances. De la plage aux montagnes, trouvez votre destination parfaite.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 group"
                >
                  Explorer les biens
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  En savoir plus
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
              <div className="aspect-square rounded-lg overflow-hidden border border-border shadow-sm">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663467332845/dPQ8jy7EnSHnYQ6HRWJub6/hero-vacation-homes-Bv7riuDibbMfw9p72y4RFy.webp"
                  alt="Villa de luxe"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Ligne verticale décorative */}
              <div className="absolute -left-6 top-1/2 w-1 h-32 bg-primary rounded-full transform -translate-y-1/2 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-blue-50/50 to-transparent z-10">
        <div className="container">
          <div className="bg-white border border-border rounded-lg p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Filtrer les biens
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Localisation */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Localisation
                </label>
                <input
                  type="text"
                  placeholder="Où allez-vous ?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                />
              </div>

              {/* Prix */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Prix max : {priceRange}€/nuit
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Bouton Rechercher */}
              <div className="flex items-end">
                <Button
                  onClick={handleFilter}
                  className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
                >
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="relative py-16 md:py-24 z-10" id="properties-section">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Nos biens vedettes
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez une sélection de propriétés exceptionnelles
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Aucune propriété ne correspond à votre recherche.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-primary text-white z-10">
        <div className="container text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Prêt pour votre prochaine aventure ?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Rejoignez des milliers de voyageurs qui ont trouvé leur destination de rêve sur VacationHub.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-blue-50 transition-all duration-300"
          >
            Commencer maintenant
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
