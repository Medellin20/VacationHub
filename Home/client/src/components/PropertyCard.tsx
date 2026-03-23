import { Link } from 'wouter';
import { Star, MapPin, Bed, Bath } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Design: Minimalisme Nordique
 * - Carte sans ombre avec bordure subtile
 * - Image avec ratio 4:3
 * - Hover : changement de couleur de fond + légère élévation
 * - Informations structurées et claires
 */

interface PropertyCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  mainImage: string;
}

export default function PropertyCard({
  id,
  name,
  location,
  price,
  currency,
  rating,
  reviews,
  bedrooms,
  bathrooms,
  mainImage,
}: PropertyCardProps) {
  return (
    <Link href={`/property/${id}`}>
      <div className="group block h-full">
        <div className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-sm h-full flex flex-col">
          {/* Image Container */}
          <div className="relative w-full aspect-video overflow-hidden bg-secondary">
            <img
              src={mainImage}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 bg-white rounded-lg px-3 py-1 flex items-center gap-1 shadow-sm">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground text-sm">
                {rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground text-xs">({reviews})</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 flex flex-col gap-3 flex-grow">
            {/* Title */}
            <div>
              <h3 className="font-bold text-foreground text-lg line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{location}</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex gap-4 text-sm text-muted-foreground py-2 border-y border-border">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{bedrooms} chambre{bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{bathrooms} salle{bathrooms > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between mt-auto pt-2">
              <div>
                <span className="text-2xl font-bold text-primary">
                  {price}
                </span>
                <span className="text-muted-foreground text-sm ml-1">
                  {currency}/nuit
                </span>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
              >
                Détails
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
