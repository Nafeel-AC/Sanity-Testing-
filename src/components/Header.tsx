import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Menu, X, ChevronDown, LogOut, User as UserIcon, Users, Star, Eye, MessageCircle, HelpCircle, Settings, Phone, Search, FileText, MessageSquare, Grid3X3, Euro, Building2, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
import { socialPlatforms } from "./SocialMediaIcons";
import InlineAuth from "./InlineAuth";
import CompensationRequestDialog from "./CompensationRequestDialog";

type NavigationItem = {
  name: string;
  href: string;
  icon?: any;
  color?: string;
  dropdown?: Array<{
    name: string;
    href: string;
  }>;
};

interface HeaderProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const Header = ({ isMobileMenuOpen = false, setIsMobileMenuOpen }: HeaderProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const isOpen = isMenuOpen || isMobileMenuOpen;
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen, isMobileMenuOpen]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Fehler beim Abmelden');
    } else {
      toast.success('Erfolgreich abgemeldet');
    }
  };

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  // Main platforms with individual dropdowns (Instagram & TikTok)
  const mainPlatforms = socialPlatforms.filter(platform => 
    ['instagram', 'tiktok'].includes(platform.value)
  );

  // Other platforms for "Andere Dienstleistungen" dropdown
  const otherPlatforms = socialPlatforms.filter(platform => 
    ['youtube', 'facebook', 'linkedin', 'twitter', 'telegram'].includes(platform.value)
  );

  const navigationItems: NavigationItem[] = [
    // Individual platform dropdowns for Instagram & TikTok
    ...mainPlatforms.map(platform => ({
      name: platform.name,
      href: platform.href,
      icon: platform.icon,
      color: platform.bgColor,
      dropdown: [
        { name: "Follower kaufen", href: `${platform.href}/followers` },
        { name: "Likes kaufen", href: `${platform.href}/likes` },
        { name: "Views kaufen", href: `${platform.href}/views` },
        { name: "Kommentare kaufen", href: `${platform.href}/comments` }
      ]
    })),
    // Other services dropdown
    {
      name: "Andere Dienstleistungen",
      href: "#",
      icon: Grid3X3,
      color: "bg-gradient-to-br from-slate-500 to-slate-600",
      dropdown: otherPlatforms.map(platform => ({
        name: platform.name,
        href: platform.href
      }))
    },
    { 
      name: "Preise", 
      href: "/pricing",
      icon: Euro,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      name: "Unternehmen", 
      href: "#",
      icon: Building2,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      dropdown: [
        { name: "Wie es funktioniert", href: "/how-it-works" },
        { name: "FAQ", href: "/faq" },
        { name: "Kundenbewertungen", href: "/testimonials" },
        { name: "Kontakt", href: "/contact" }
      ]
    }
  ];

  return (
    <>
      {/* Desktop Top Bar */}
      <div className="hidden lg:block bg-background/98 border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-end h-12">
            <div className="flex items-center space-x-0">
              {/* 1. Compensation Claim */}
              <CompensationRequestDialog className="px-3" />

              {/* 2. Order Tracking Search */}
              <div className="flex items-center px-3">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Bestellung verfolgen"
                    className="pl-4 pr-12 py-2.5 bg-accent/20 border-2 border-accent/40 focus:border-primary focus:bg-background text-sm font-medium rounded-lg shadow-sm transition-all duration-200 w-56"
                  />
                  <Button 
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success text-white p-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 3. Favorites */}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/favorites')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors px-3 relative"
              >
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Favoriten</span>
                {favoritesCount > 0 && (
                  <Badge className="ml-1 bg-primary text-primary-foreground text-xs h-4 w-4 p-0 flex items-center justify-center">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background/98 border-b border-border shadow-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
              onClick={() => {
                // Force reload if already on homepage
                if (window.location.pathname === '/') {
                  window.location.reload();
                }
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-lg">SN</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black bg-gradient-to-r from-primary to-success bg-clip-text text-transparent leading-tight">SocialNova</span>
                <span className="text-xs text-muted-foreground font-medium -mt-1">
                  Digital Growth
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group h-10 flex items-center">
                  {item.dropdown ? (
                    <div className="relative h-10 flex items-center">
                      <Link
                        to={item.href}
                        className="flex items-center space-x-2 px-3 py-2 h-10 text-xs font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
                      >
                        {item.icon && item.color && (
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span className="whitespace-nowrap">{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Link>
                      <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 rounded-md"
                            >
                              <span className="w-5 h-5 flex items-center justify-center">
                                {dropdownItem.name.includes('Follower') && <Users className="w-4 h-4" />}
                                 {dropdownItem.name.includes('Likes') && <Heart className="w-4 h-4" />}
                                {dropdownItem.name.includes('Views') && <Eye className="w-4 h-4" />}
                                {dropdownItem.name.includes('Kommentare') && <MessageCircle className="w-4 h-4" />}
                                {dropdownItem.name.includes('FAQ') && <HelpCircle className="w-4 h-4" />}
                                {dropdownItem.name.includes('Wie') && <Settings className="w-4 h-4" />}
                                 {dropdownItem.name.includes('Kundenbewertungen') && <MessageSquare className="w-4 h-4" />}
                                {dropdownItem.name.includes('Kontakt') && <Phone className="w-4 h-4" />}
                                {/* Platform icons for "Andere Dienstleistungen" */}
                                {item.name === "Andere Dienstleistungen" && (() => {
                                  const platform = otherPlatforms.find(p => p.name === dropdownItem.name);
                                  if (platform) {
                                    const IconComponent = platform.icon;
                                    // Apply platform-specific colors
                                    let colorClass = "w-4 h-4";
                                    if (platform.value === 'youtube') colorClass = "w-4 h-4 text-red-600";
                                    else if (platform.value === 'facebook') colorClass = "w-4 h-4 text-blue-600";
                                    else if (platform.value === 'linkedin') colorClass = "w-4 h-4 text-[#0A66C2]";
                                    else if (platform.value === 'twitter') colorClass = "w-4 h-4 text-slate-800";
                                    else if (platform.value === 'telegram') colorClass = "w-4 h-4 text-[#229ED9]";
                                    return <IconComponent className={colorClass} size={16} />;
                                  }
                                  return null;
                                })()}
                              </span>
                              <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-10 flex items-center">
                      <Link
                        to={item.href}
                        className="flex items-center space-x-2 px-3 py-2 h-10 text-xs font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200 whitespace-nowrap"
                      >
                        {item.icon && item.color && (
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span>{item.name}</span>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {/* Mobile Auth Button - visible on mobile */}
              <div className="md:hidden">
                {!user && (
                  <Button 
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success text-white px-3 py-1.5 text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link to="/auth">
                      <UserIcon className="w-3 h-3 mr-1" />
                      <span>Anmelden</span>
                    </Link>
                  </Button>
                )}
              </div>
              
              {/* Desktop Auth Section */}
              <div className="hidden md:flex items-center space-x-3 relative">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-accent/20 rounded-lg">
                      <UserIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {user.email}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Abmelden
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success text-white px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link to="/auth">
                        <UserIcon className="w-4 h-4 mr-2" />
                        <span>Anmelden</span>
                      </Link>
                    </Button>
                    <InlineAuth 
                      isOpen={isAuthOpen} 
                      onClose={() => setIsAuthOpen(false)} 
                    />
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => {
                  const newState = !isMenuOpen;
                  setIsMenuOpen(newState);
                  setIsMobileMenuOpen?.(newState);
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen || isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {(isMenuOpen || isMobileMenuOpen) && (
            <div className="md:hidden border-t border-border bg-background/98 max-h-[80vh] overflow-y-auto shadow-lg">
              <nav className="py-4">
                {/* Mobile Order Tracking - at the top */}
                <div className="px-4 mb-6">
                  <div className="relative">
                    <Input
                      type="text" 
                      placeholder="Bestellung verfolgen"
                      className="pl-4 pr-12 py-2.5 bg-accent/20 border-2 border-accent/40 focus:border-primary focus:bg-background text-sm font-medium rounded-lg shadow-sm transition-all duration-200"
                    />
                    <Button 
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success text-white p-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Navigation Items */}
                {navigationItems.map((item) => (
                  <div key={item.name} className="mb-2">
                    {item.dropdown ? (
                      <div className="px-4">
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full py-3 text-left border-b border-border/30 hover:bg-accent/20 transition-colors rounded-t-md"
                        >
                          <div className="flex items-center space-x-2">
                            {item.icon && item.color && (
                              <div className={`w-5 h-5 rounded flex items-center justify-center ${item.color}`}>
                                <item.icon className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <span className="font-medium text-foreground">{item.name}</span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        {/* Dropdown Content with Animation */}
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openDropdown === item.name 
                              ? 'max-h-96 opacity-100 animate-fade-in' 
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="pl-7 space-y-1 py-2 bg-accent/10 rounded-b-md">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsMobileMenuOpen?.(false);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center space-x-3 py-2.5 px-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent/30 transition-colors rounded-md"
                              >
                                <span className="w-5 h-5 flex items-center justify-center">
                                  {dropdownItem.name.includes('Follower') && <Users className="w-4 h-4" />}
                                  {dropdownItem.name.includes('Likes') && <Heart className="w-4 h-4" />}
                                  {dropdownItem.name.includes('Views') && <Eye className="w-4 h-4" />}
                                  {dropdownItem.name.includes('Kommentare') && <MessageCircle className="w-4 h-4" />}
                                  {dropdownItem.name.includes('FAQ') && <HelpCircle className="w-4 h-4" />}
                                  {dropdownItem.name.includes('Wie') && <Settings className="w-4 h-4" />}
                                  {dropdownItem.name.includes('Kundenbewertungen') && <MessageSquare className="w-4 h-4" />}
                                  {dropdownItem.name.includes('Kontakt') && <Phone className="w-4 h-4" />}
                                  {/* Platform icons for "Andere Dienstleistungen" */}
                                  {item.name === "Andere Dienstleistungen" && (() => {
                                    const platform = otherPlatforms.find(p => p.name === dropdownItem.name);
                                    if (platform) {
                                      const IconComponent = platform.icon;
                                      // Apply platform-specific colors
                                      let colorClass = "w-4 h-4";
                                      if (platform.value === 'youtube') colorClass = "w-4 h-4 text-red-600";
                                      else if (platform.value === 'facebook') colorClass = "w-4 h-4 text-blue-600";
                                      else if (platform.value === 'linkedin') colorClass = "w-4 h-4 text-[#0A66C2]";
                                      else if (platform.value === 'twitter') colorClass = "w-4 h-4 text-slate-800";
                                      else if (platform.value === 'telegram') colorClass = "w-4 h-4 text-[#229ED9]";
                                      return <IconComponent className={colorClass} size={16} />;
                                    }
                                    return null;
                                  })()}
                                </span>
                                <span className="font-medium">{dropdownItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileMenuOpen?.(false);
                          setOpenDropdown(null);
                        }}
                        className="flex items-center space-x-2 px-4 py-3 font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-colors rounded-md mb-2"
                      >
                        {item.icon && item.color && (
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile Additional Features - at the bottom */}
                <div className="px-4 mt-6 pt-4 border-t border-border/30">
                  <div className="flex space-x-3">
                    {/* Favorites */}
                    <Button 
                      variant="ghost" 
                      className="flex-1 justify-center text-muted-foreground hover:text-foreground py-3"
                      onClick={() => {
                        navigate('/favorites');
                        setIsMenuOpen(false);
                        setIsMobileMenuOpen?.(false);
                      }}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Favoriten
                    </Button>
                    
                    {/* Compensation Claim */}
                    <CompensationRequestDialog 
                      trigger={
                        <Button 
                          variant="ghost" 
                          className="flex-1 justify-center text-muted-foreground hover:text-foreground py-3 w-full"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Ausgleichsantrag
                        </Button>
                      }
                    />
                  </div>
                </div>
                
                {/* Mobile Auth Section */}
                <div className="px-4 mt-6 pt-4 border-t border-border/30">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 px-3 py-2 bg-accent/20 rounded-lg">
                        <UserIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {user.email}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-center text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                          setIsMobileMenuOpen?.(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Abmelden
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <Button 
                        asChild
                        className="w-full bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Link 
                          to="/auth"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileMenuOpen?.(false);
                          }}
                        >
                          <UserIcon className="w-4 h-4 mr-2" />
                          <span>Anmelden</span>
                        </Link>
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Kein Konto?{' '}
                        <Link 
                          to="/auth?mode=signup" 
                          className="text-gradient-primary hover:underline font-semibold hover:text-primary transition-all duration-300 hover:shadow-sm"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileMenuOpen?.(false);
                          }}
                        >
                          Jetzt erstellen
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
