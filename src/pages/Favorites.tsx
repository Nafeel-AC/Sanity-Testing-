import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ShoppingCart, Trash2 } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOrderClick = (favoriteItem: any) => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um eine Bestellung aufzugeben');
      navigate('/auth');
      return;
    }

    window.dispatchEvent(new CustomEvent('openCart', {
      detail: {
        platform: favoriteItem.platform.toLowerCase(),
        category: favoriteItem.serviceName.split(' ')[1].toLowerCase(),
        package: favoriteItem.packageAmount,
        price: favoriteItem.price
      }
    }));
  };

  const handleRemoveFromFavorites = (id: string) => {
    removeFromFavorites(id);
    toast.success('Aus Favoriten entfernt');
  };

  const handleClearAllFavorites = () => {
    clearFavorites();
    toast.success('Alle Favoriten gelöscht');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                Meine <span className="text-gradient-primary">Favoriten</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hier finden Sie alle Ihre gespeicherten Lieblings-Pakete. 
              Bestellen Sie mit nur einem Klick!
            </p>
            
            {favorites.length > 0 && (
              <div className="flex items-center justify-center space-x-4 mt-8">
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {favorites.length} {favorites.length === 1 ? 'Favorit' : 'Favoriten'}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearAllFavorites}
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Alle löschen
                </Button>
              </div>
            )}
          </div>

          {/* Favorites Grid */}
          {favorites.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite, index) => (
                <Card 
                  key={favorite.id} 
                  className="card-service relative group hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Remove from favorites button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemoveFromFavorites(favorite.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className={`w-10 h-10 ${favorite.platformColor} rounded-lg flex items-center justify-center`}>
                        {favorite.icon && <favorite.icon className="w-5 h-5 text-white" />}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {favorite.platform}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg">{favorite.packageAmount}</CardTitle>
                    <CardDescription className="text-sm">
                      {favorite.serviceName.split(' ')[1]}
                    </CardDescription>
                    
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <span className="text-2xl font-bold text-primary">€{favorite.price}</span>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground line-through">€{favorite.originalPrice}</div>
                        <div className="text-xs text-success font-medium">50% Rabatt</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-sm">Lieferung in {favorite.delivery}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-sm">100% sicher</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-sm">DSGVO-konform</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-sm">24/7 Support</span>
                      </li>
                    </ul>
                    
                    <Button 
                      className="w-full btn-hero"
                      onClick={() => handleOrderClick(favorite)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      In den Warenkorb
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <Star className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Noch keine Favoriten</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Markieren Sie Ihre Lieblings-Pakete als Favoriten, um sie hier schnell wiederzufinden.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/')}
                  className="btn-hero"
                >
                  Services durchstöbern
                </Button>
                <div className="text-sm text-muted-foreground">
                  💡 Tipp: Klicken Sie auf das Stern-Symbol bei jedem Paket, um es zu favorisieren
                </div>
              </div>
            </div>
          )}

          {/* Call to Action for more services */}
          {favorites.length > 0 && (
            <div className="text-center mt-16 pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-4">Auf der Suche nach mehr?</h3>
              <p className="text-muted-foreground mb-6">
                Entdecken Sie weitere Pakete für alle Social Media Plattformen
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="mr-4"
              >
                Alle Services
              </Button>
              <Button 
                onClick={() => navigate('/pricing')}
                className="btn-hero"
              >
                Preise vergleichen
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;