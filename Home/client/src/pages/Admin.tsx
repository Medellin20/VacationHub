import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Design: Minimalisme Nordique
 * - Interface admin simple et claire
 * - Authentification par mot de passe (simulation frontend)
 * - Gestion des biens (ajout, modification, suppression)
 */

interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

const ADMIN_PASSWORD = 'admin123';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/data/properties.json')
        .then((res) => res.json())
        .then((data) => {
          setProperties(
            data.properties.map((p: any) => ({
              id: p.id,
              name: p.name,
              location: p.location,
              price: p.price,
              bedrooms: p.bedrooms,
              bathrooms: p.bathrooms,
            }))
          );
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setEditingId(null);
    setFormData({ name: '', location: '', price: 0, bedrooms: 0, bathrooms: 0 });
  };

  const handleAddProperty = () => {
    if (formData.name && formData.location && formData.price > 0) {
      const newProperty: Property = {
        id: Math.max(...properties.map((p) => p.id), 0) + 1,
        ...formData,
      };
      setProperties([...properties, newProperty]);
      setFormData({ name: '', location: '', price: 0, bedrooms: 0, bathrooms: 0 });
    }
  };

  const handleUpdateProperty = () => {
    if (editingId && formData.name && formData.location && formData.price > 0) {
      setProperties(
        properties.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p
        )
      );
      setEditingId(null);
      setFormData({ name: '', location: '', price: 0, bedrooms: 0, bathrooms: 0 });
    }
  };

  const handleDeleteProperty = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const handleEditProperty = (property: Property) => {
    setEditingId(property.id);
    setFormData({
      name: property.name,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Background gradient decoratif */}
        <div className="fixed inset-0 bg-gradient-cool opacity-20 pointer-events-none" />
        <Header />
        <main className="flex-1 pt-24 md:pt-32 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white border border-border rounded-lg p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
                Espace Admin
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Entrez le mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Se connecter
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Background gradient decoratif */}
      <div className="fixed inset-0 bg-gradient-light opacity-20 pointer-events-none" />
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-16 relative z-10">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-foreground">Gestion des Biens</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Formulaire Ajout/Modification */}
          <div className="bg-secondary rounded-lg p-6 mb-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {editingId ? 'Modifier le bien' : 'Ajouter un nouveau bien'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nom du bien"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Localisation"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Prix par nuit"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Chambres"
                value={formData.bedrooms || ''}
                onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Salles de bain"
                value={formData.bathrooms || ''}
                onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              {editingId ? (
                <>
                  <Button
                    onClick={handleUpdateProperty}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Mettre à jour
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ name: '', location: '', price: 0, bedrooms: 0, bathrooms: 0 });
                    }}
                    variant="outline"
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleAddProperty}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              )}
            </div>
          </div>

          {/* Liste des Biens */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Localisation</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Prix</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Chambres</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Salles</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b border-border hover:bg-secondary transition-colors duration-200">
                    <td className="px-6 py-4 text-foreground">{property.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{property.location}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">{property.price}€</td>
                    <td className="px-6 py-4 text-foreground">{property.bedrooms}</td>
                    <td className="px-6 py-4 text-foreground">{property.bathrooms}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEditProperty(property)}
                        className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors duration-200"
                        aria-label="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors duration-200"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
