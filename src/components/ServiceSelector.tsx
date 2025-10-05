import { useState } from "react";
import { Star } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Package {
  amount: string;
  price: string;
  originalPrice: string;
  delivery: string;
  popular?: boolean;
}

interface Service {
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  packages: Package[];
}

interface ServiceSelectorProps {
  services: Service[];
  platformName: string;
  platformColor: string;
}

const ServiceSelector = ({ services, platformName, platformColor }: ServiceSelectorProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);

  const handleOrderClick = (pkg: Package, serviceName: string) => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um eine Bestellung aufzugeben');
      navigate('/auth');
      return;
    }

    const serviceNameParts = serviceName.split(' ');
    const categoryName = serviceNameParts.length > 1 ? serviceNameParts[1] : serviceName;

    window.dispatchEvent(new CustomEvent('openCart', {
      detail: {
        platform: platformName.toLowerCase(),
        category: categoryName.toLowerCase(),
        package: pkg.amount,
        price: pkg.price
      }
    }));
  };

  const handleFavoriteClick = (pkg: Package, serviceName: string, serviceIcon: React.ComponentType<any>) => {
    const serviceNameParts = serviceName.split(' ');
    const categoryName = serviceName.toLowerCase().startsWith(platformName.toLowerCase()) 
      ? serviceName.split(' ').slice(1).join(' ') || serviceName
      : serviceName;

    const favoriteItem = {
      id: `${platformName.toLowerCase()}-${categoryName.toLowerCase()}-${pkg.amount}`,
      platform: platformName,
      serviceName: serviceName,
      packageAmount: pkg.amount,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      delivery: pkg.delivery,
      platformColor: platformColor,
      icon: serviceIcon
    };

    toggleFavorite(favoriteItem);
    
    if (isFavorite(favoriteItem.id)) {
      toast.success('Aus Favoriten entfernt');
    } else {
      toast.success('Zu Favoriten hinzugefügt');
    }
  };

  if (showAllServices) {
    return (
      <div className="space-y-16">
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAllServices(false)}
            className="mb-8"
          >
            Zurück zur Auswahl
          </Button>
        </div>
        
        {services.map((service, serviceIndex) => (
          <div key={service.name} className="animate-fade-in" style={{ animationDelay: `${serviceIndex * 0.2}s` }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className={`w-12 h-12 ${platformColor} rounded-xl flex items-center justify-center`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{service.name}</h2>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.packages.map((pkg, pkgIndex) => (
                <Card 
                  key={pkgIndex} 
                  className={`card-service relative group ${pkg.popular ? 'ring-2 ring-primary/20' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-success text-success-foreground">
                        Beliebt
                      </Badge>
                    </div>
                  )}
                  
                  {/* Favorites Button */}
                  <button
                    onClick={() => handleFavoriteClick(pkg, service.name, service.icon)}
                    className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                     <Star 
                       className={`w-5 h-5 transition-colors ${
                         isFavorite(`${platformName.toLowerCase()}-${
                           service.name.toLowerCase().startsWith(platformName.toLowerCase()) 
                             ? service.name.split(' ').slice(1).join(' ').toLowerCase() || service.name.toLowerCase()
                             : service.name.toLowerCase()
                         }-${pkg.amount}`)
                           ? 'fill-yellow-500 text-yellow-500' 
                           : 'text-muted-foreground hover:text-yellow-500'
                       }`}
                     />
                  </button>
                  
                   <CardHeader className="text-center pb-4">
                     <CardTitle className="text-xl">{pkg.amount}</CardTitle>
                     <CardDescription>
                       {service.name.toLowerCase().startsWith(platformName.toLowerCase()) 
                         ? service.name.split(' ').slice(1).join(' ') || service.name
                         : service.name
                       }
                     </CardDescription>
                    
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <span className="text-3xl font-bold text-primary">€{pkg.price}</span>
                      <div className="text-left">
                        <div className="text-sm text-muted-foreground line-through">€{pkg.originalPrice}</div>
                        <div className="text-sm text-success font-medium">50% Rabatt</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-sm">Lieferung in {pkg.delivery}</span>
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
                      className={`w-full ${pkg.popular ? 'btn-hero' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                      onClick={() => handleOrderClick(pkg, service.name)}
                    >
                      In den Warenkorb
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (selectedService) {
    return (
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => setSelectedService(null)}
            className="mb-4"
          >
            Zurück zur Service-Auswahl
          </Button>
        </div>

        <div className="flex items-center space-x-3 mb-8">
          <div className={`w-12 h-12 ${platformColor} rounded-xl flex items-center justify-center`}>
            <selectedService.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selectedService.name}</h2>
            <p className="text-muted-foreground">{selectedService.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedService.packages.map((pkg, pkgIndex) => (
            <Card 
              key={pkgIndex} 
              className={`card-service relative group ${pkg.popular ? 'ring-2 ring-primary/20' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-success text-success-foreground">
                    Beliebt
                  </Badge>
                </div>
              )}
              
              {/* Favorites Button */}
              <button
                onClick={() => handleFavoriteClick(pkg, selectedService.name, selectedService.icon)}
                className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              >
                 <Star 
                   className={`w-5 h-5 transition-colors ${
                     isFavorite(`${platformName.toLowerCase()}-${
                       selectedService.name.toLowerCase().startsWith(platformName.toLowerCase()) 
                         ? selectedService.name.split(' ').slice(1).join(' ').toLowerCase() || selectedService.name.toLowerCase()
                         : selectedService.name.toLowerCase()
                     }-${pkg.amount}`)
                       ? 'fill-yellow-500 text-yellow-500' 
                       : 'text-muted-foreground hover:text-yellow-500'
                   }`}
                 />
              </button>
              
               <CardHeader className="text-center pb-4">
                 <CardTitle className="text-xl">{pkg.amount}</CardTitle>
                 <CardDescription>
                   {selectedService.name.toLowerCase().startsWith(platformName.toLowerCase()) 
                     ? selectedService.name.split(' ').slice(1).join(' ') || selectedService.name
                     : selectedService.name
                   }
                 </CardDescription>
                
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <span className="text-3xl font-bold text-primary">€{pkg.price}</span>
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground line-through">€{pkg.originalPrice}</div>
                    <div className="text-sm text-success font-medium">50% Rabatt</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">Lieferung in {pkg.delivery}</span>
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
                  className={`w-full ${pkg.popular ? 'btn-hero' : ''}`}
                  variant={pkg.popular ? 'default' : 'outline'}
                  onClick={() => handleOrderClick(pkg, selectedService.name)}
                >
                  In den Warenkorb
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-8">
        Welchen Service möchten Sie für {platformName} buchen?
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
        {services.map((service, index) => (
          <Card 
            key={service.name}
            className="card-service cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedService(service)}
          >
            <CardHeader className="text-center">
              <div className={`w-16 h-16 ${platformColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">
                {service.name.toLowerCase().startsWith(platformName.toLowerCase()) 
                  ? service.name.split(' ').slice(1).join(' ') || service.name
                  : service.name
                }
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                <span>Ab €{service.packages[0]?.price}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        onClick={() => setShowAllServices(true)}
        className="mt-4"
      >
        Alle Services anzeigen
      </Button>
    </div>
  );
};

export default ServiceSelector;