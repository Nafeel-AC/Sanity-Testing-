import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PricingCarousel = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const plans = [
    {
      id: "starter-plan",
      name: "Starter",
      icon: Zap,
      price: "9.99",
      originalPrice: "19.99",
      description: "Perfekt für den Einstieg",
      badge: "Beliebt",
      badgeColor: "bg-success/10 text-success border-success/20",
      features: [
        "500 Instagram Follower",
        "1.000 Instagram Likes",
        "5.000 TikTok Views",
        "24h Lieferzeit",
        "DSGVO-konform",
        "E-Mail Support"
      ],
      cta: "In den Warenkorb",
      highlighted: false,
      delivery: "24h",
      platform: "Bundle",
      serviceName: "Starter Paket"
    },
    {
      id: "professional-plan",
      name: "Professional",
      icon: Star,
      price: "24.99",
      originalPrice: "49.99",
      description: "Für ambitionierte Creator",
      badge: "Bestseller",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      features: [
        "2.000 Instagram Follower",
        "5.000 Instagram Likes",
        "25.000 TikTok Views",
        "1.000 YouTube Views",
        "12h Express-Lieferung",
        "Premium Support",
        "Retention-Garantie",
        "Analytics Dashboard"
      ],
      cta: "In den Warenkorb",
      highlighted: true,
      delivery: "12h",
      platform: "Bundle",
      serviceName: "Professional Paket"
    },
    {
      id: "enterprise-plan",
      name: "Enterprise",
      icon: Crown,
      price: "79.99",
      originalPrice: "159.99",
      description: "Maximale Reichweite",
      badge: "Premium",
      badgeColor: "bg-warning/10 text-warning border-warning/20",
      features: [
        "10.000 Instagram Follower",
        "25.000 Instagram Likes",
        "100.000 TikTok Views",
        "10.000 YouTube Views",
        "Sofort-Lieferung",
        "Priority Support 24/7",
        "Lebenslange Garantie",
        "Persönlicher Account Manager",
        "Custom Services",
        "White-Label Option"
      ],
      cta: "In den Warenkorb",
      highlighted: false,
      delivery: "Sofort",
      platform: "Bundle",
      serviceName: "Enterprise Paket"
    }
  ];

  const handleFavoriteClick = (plan: any) => {
    const favoriteItem = {
      id: plan.id,
      platform: plan.platform,
      serviceName: plan.serviceName,
      packageAmount: plan.name,
      price: plan.price,
      originalPrice: plan.originalPrice,
      delivery: plan.delivery,
      platformColor: "bg-gradient-to-r from-primary to-success",
      icon: plan.icon
    };

    toggleFavorite(favoriteItem);
    
    if (isFavorite(plan.id)) {
      toast.success('Aus Favoriten entfernt');
    } else {
      toast.success('Zu Favoriten hinzugefügt');
    }
  };

  const handleOrderClick = () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um eine Bestellung aufzugeben');
      navigate('/auth');
      return;
    }
    
    // Open shopping cart
    const event = new Event('openCart');
    window.dispatchEvent(event);
  };

  return (
    <section id="pricing" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Influencer <span className="text-gradient-primary">Pakete</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wählen Sie das perfekte Paket für Ihre Bedürfnisse. 
            Alle Preise verstehen sich inkl. MwSt. und ohne versteckte Kosten.
          </p>
          
          {/* Discount Banner */}
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success border border-success/20 px-4 py-2 rounded-full mt-6">
            <span className="text-sm font-medium">🎉 Launch-Angebot: 50% Rabatt auf alle Pakete</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Enhanced Navigation Indicators */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {plans.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === 1 ? 'bg-primary scale-125 shadow-lg shadow-primary/30' : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                → Weitere Pakete verfügbar
              </div>
            </div>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {plans.map((plan, index) => (
                <CarouselItem key={plan.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                   <Card 
                     className={`card-pricing relative animate-fade-in h-full transform-gpu group ${
                       plan.highlighted 
                         ? 'ring-2 ring-primary/30 shadow-2xl shadow-primary/20 scale-105 bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-3xl hover:shadow-primary/30 hover:scale-110' 
                         : 'hover:shadow-xl hover:shadow-primary/10 hover:scale-102 bg-gradient-to-br from-card to-card/95'
                     } transition-all duration-500`}
                     style={{ 
                       animationDelay: `${index * 0.2}s`
                     }}
                   >
                     {plan.highlighted && (
                       <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                         <Badge className="bg-gradient-to-r from-primary to-primary-variant text-primary-foreground px-4 py-1 shadow-lg animate-pulse">
                           Empfohlen
                         </Badge>
                       </div>
                     )}
                     
                       {/* Favorites Button */}
                       <button
                         onClick={() => handleFavoriteClick(plan)}
                         className="absolute top-10 right-3 z-50 opacity-60 group-hover:opacity-100 transition-all duration-300 hover:scale-110 bg-white/80 backdrop-blur-sm rounded-full p-1"
                       >
                          <Star 
                            className={`w-4 h-4 transition-colors ${
                              isFavorite(plan.id)
                                ? 'fill-yellow-500 text-yellow-500' 
                                : 'text-muted-foreground hover:text-yellow-500'
                            }`}
                          />
                       </button>
                    
                    <CardHeader className="text-center pb-6 relative">
                      {plan.highlighted && (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-t-lg" />
                      )}
                      
                      <div className="flex items-center justify-center space-x-2 mb-4 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                          plan.highlighted 
                            ? 'bg-gradient-to-br from-primary to-primary-variant text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <plan.icon className="w-6 h-6" />
                        </div>
                        <Badge className={`${plan.badgeColor} shadow-md`}>
                          {plan.badge}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-2xl mb-2 relative z-10">{plan.name}</CardTitle>
                      <CardDescription className="text-base relative z-10">{plan.description}</CardDescription>
                      
                      <div className="flex items-center justify-center space-x-2 mt-6 relative z-10">
                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                        <div className="text-left">
                          <div className="text-sm text-muted-foreground line-through">€{plan.originalPrice}</div>
                          <div className="text-sm text-muted-foreground">einmalig</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                     <CardContent className="flex flex-col h-full relative">
                       <ul className="space-y-2 mb-6 flex-grow">
                         {plan.features.map((feature, featureIndex) => (
                           <li key={featureIndex} className="flex items-center space-x-3">
                             <Check className="w-4 h-4 text-success flex-shrink-0" />
                             <span className="text-sm">{feature}</span>
                           </li>
                         ))}
                       </ul>
                       
                        <Button 
                          className={`w-full transition-all duration-300 ${
                            plan.highlighted 
                              ? 'btn-hero shadow-lg hover:shadow-xl hover:scale-105' 
                              : 'btn-hero'
                          }`}
                          size="lg"
                          onClick={handleOrderClick}
                        >
                          {plan.cta}
                        </Button>
                     </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-gradient-to-r from-primary to-primary-hover text-white border-0 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:from-primary-hover hover:to-primary" />
            <CarouselNext className="hidden md:flex -right-12 bg-gradient-to-r from-primary to-primary-hover text-white border-0 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:from-primary-hover hover:to-primary" />
          </Carousel>

          {/* Swipe Indicator */}
          <div className="flex md:hidden justify-center mt-6 text-xs text-muted-foreground">
            <span className="animate-bounce">← Wischen Sie für weitere Pakete →</span>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm font-medium">SSL-verschlüsselt</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-sm font-medium">Sichere Zahlung</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🇪🇺</div>
              <div className="text-sm font-medium">DSGVO-konform</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">📞</div>
              <div className="text-sm font-medium">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCarousel;