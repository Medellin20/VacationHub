import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Design: Minimalisme Nordique
 * - Page de propriétés avec filtres avancés
 * - Grille responsive
 * - Animations au scroll
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

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 1000,
    minBedrooms: 0,
    minRating: 0,
  });

  useEffect(() => {
    fetch('/data/properties.json')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      });
  }, []);

  const applyFilters = () => {
    let filtered = properties;

    if (filters.location) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.minBedrooms > 0) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.minBedrooms);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating);
    }

    setFilteredProperties(filtered);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 1000,
      minBedrooms: 0,
      minRating: 0,
    });
    setFilteredProperties(properties);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Background gradient decoratif */}
      <div className="fixed inset-0 bg-gradient-light opacity-25 pointer-events-none" />
      <Header />

      <main className="flex-1 pt-24 md:pt-32 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Tous nos biens
              </h1>
              <p className="text-muted-foreground">
                {filteredProperties.length} propriété{filteredProperties.length !== 1 ? 's' : ''} disponible{filteredProperties.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="bg-secondary rounded-lg p-6 mb-8 border border-border animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Filtrer les résultats</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-border rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="Où ?"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Prix min: {filters.minPrice}€
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Prix max: {filters.maxPrice}€
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Chambres min
                  </label>
                  <select
                    value={filters.minBedrooms}
                    onChange={(e) => setFilters({ ...filters, minBedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="0">Toutes</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Note min
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="0">Toutes</option>
                    <option value="4">4.0+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={applyFilters}
                  className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
                >
                  Appliquer les filtres
                </Button>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          )}

          {/* Grille de Propriétés */}
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
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                Aucune propriété ne correspond à votre recherche.
              </p>
              <Button
                onClick={resetFilters}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
