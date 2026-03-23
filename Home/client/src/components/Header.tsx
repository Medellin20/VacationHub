import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Design: Minimalisme Nordique
 * - Header sticky avec fond blanc et bordure subtile
 * - Logo à gauche, navigation au centre, bouton Admin à droite
 * - Animation au scroll : légère ombre et changement de hauteur
 * - Navigation responsive avec menu mobile
 */

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Biens', href: '/properties' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white border-b border-border shadow-sm'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg md:text-xl">V</span>
            </div>
            <span className="hidden sm:inline font-bold text-primary text-lg md:text-xl">
              VacationHub
            </span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="text-foreground font-medium transition-colors duration-200 hover:text-primary relative group cursor-pointer">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </div>
            </Link>
          ))}
        </nav>

        {/* Boutons Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin">
            <div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                Admin
              </Button>
            </div>
          </Link>
        </div>

        {/* Menu Mobile */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className="text-foreground font-medium transition-colors duration-200 hover:text-primary py-2 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <Link href="/admin">
              <div>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Button>
              </div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
