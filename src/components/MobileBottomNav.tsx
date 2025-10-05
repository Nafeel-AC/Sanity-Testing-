import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ShoppingCart, User, BookOpen, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import WhatsAppIcon from "./WhatsAppIcon";

interface MobileBottomNavProps {}

const MobileBottomNav = () => {
  const { user } = useAuth();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open('https://wa.me/4915123456789?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zu%20Ihren%20Services', '_blank');
  };

  const handleCartClick = () => {
    // Trigger cart open event
    window.dispatchEvent(new CustomEvent('openCart'));
  };

  const handleFavoritesClick = () => {
    console.log('Favorites clicked - navigating to /favorites');
    navigate('/favorites');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-lg md:hidden">
      <div className="flex items-center justify-center h-14 px-1">
        {/* Home */}
        <Button
          variant="ghost" 
          size="sm"
          asChild
          className="flex flex-col items-center justify-center gap-0.5 h-10 px-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors min-w-[45px]"
        >
          <Link to="/">
            <Home className="w-4 h-4" />
            <span className="text-[10px]">Start</span>
          </Link>
        </Button>

        {/* Favorites */}
        <Button
          variant="ghost" 
          size="sm"
          onClick={handleFavoritesClick}
          className="flex flex-col items-center justify-center gap-0.5 h-10 px-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors min-w-[45px] relative"
        >
          <div className="relative">
            <Star className="w-4 h-4" />
            {favoritesCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[8px] h-3 w-3 p-0 flex items-center justify-center">
                {favoritesCount}
              </Badge>
            )}
          </div>
          <span className="text-[10px]">Favoriten</span>
        </Button>

        {/* Shopping Cart - Centered & Highlighted */}
        <Button
          onClick={handleCartClick}
          className="relative flex flex-col items-center justify-center gap-0.5 h-10 px-2 mx-1 bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[50px]"
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            {/* Cart badge - you can add cart count here */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning text-warning-foreground rounded-full flex items-center justify-center text-[8px] font-bold">
              0
            </div>
          </div>
          <span className="text-[10px] font-semibold">Warenkorb</span>
        </Button>

        {/* Blog */}
        <Button
          variant="ghost" 
          size="sm"
          asChild
          className="flex flex-col items-center justify-center gap-0.5 h-10 px-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors min-w-[45px]"
        >
          <Link to="/blog">
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">Blog</span>
          </Link>
        </Button>

        {/* Login/Profile */}
        <Button
          variant="ghost" 
          size="sm"
          asChild
          className="flex flex-col items-center justify-center gap-0.5 h-10 px-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors min-w-[45px]"
        >
          <Link to="/auth">
            <User className="w-4 h-4" />
            <span className="text-[10px] truncate">{user ? "Profil" : "Anmelden"}</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;