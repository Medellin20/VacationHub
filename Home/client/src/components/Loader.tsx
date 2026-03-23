/**
 * Design: Minimalisme Nordique
 * - Loader minimaliste avec animation fluide
 */

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        {/* Cercle extérieur */}
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        {/* Cercle animé */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" />
      </div>
    </div>
  );
}
