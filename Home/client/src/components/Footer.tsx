import { Link } from 'wouter';
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

/**
 * Design: Minimalisme Nordique
 * - Footer avec 4 colonnes : À propos, Liens, Contact, Réseaux
 * - Fond blanc avec bordure supérieure subtile
 * - Texte gris sage pour les descriptions
 * - Bas de footer avec copyright et mentions légales
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border mt-20">
      {/* Main Footer Content */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* À propos */}
          <div>
            <h3 className="font-bold text-foreground mb-4">À Propos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              VacationHub est votre plateforme de confiance pour trouver les plus beaux biens de location pour vos vacances. Découvrez des propriétés exceptionnelles dans le monde entier.
            </p>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                    Accueil
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <a className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                    Biens
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                    Contact
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                    FAQ
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@vacationhub.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  info@vacationhub.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  +33 (0) 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Suivez-Nous</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary text-foreground hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary text-foreground hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary text-foreground hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} VacationHub. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Mentions Légales
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Politique de Confidentialité
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Conditions d'Utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
