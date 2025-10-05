import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { socialPlatforms } from "./SocialMediaIcons";
import { useState } from "react";

const ServicesGrid = () => {
  const [showAdditional, setShowAdditional] = useState(false);
  
  // Define main platforms that should be visible initially
  const mainPlatformNames = ["Instagram", "TikTok", "X", "YouTube"];
  
  // Separate main platforms from additional ones
  const mainPlatforms = socialPlatforms.filter(platform => 
    mainPlatformNames.includes(platform.name)
  ).sort((a, b) => 
    mainPlatformNames.indexOf(a.name) - mainPlatformNames.indexOf(b.name)
  );
  
  const additionalPlatforms = socialPlatforms.filter(platform => 
    !mainPlatformNames.includes(platform.name)
  );

  const createServiceData = (platform) => ({
    name: platform.name,
    icon: platform.icon,
    color: platform.color,
    bgColor: `bg-gradient-to-br ${platform.color}/10 hover:${platform.color}/20`,
    href: platform.href
  });

  const mainServices = mainPlatforms.map(createServiceData);
  const additionalServices = additionalPlatforms.map(createServiceData);

  const PlatformCard = ({ service, className = "" }) => {
    const IconComponent = service.icon;
    return (
      <Card className={`bg-gradient-to-br from-card to-card-hover border-2 border-transparent hover:border-primary/50 transition-all duration-500 hover:scale-105 md:hover:scale-110 cursor-pointer shadow-lg hover:shadow-2xl group ${className}`}>
        <CardContent className="p-4 md:p-6 lg:p-8 text-center">
          <div className={`w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
            <IconComponent className="w-8 md:w-10 h-8 md:h-10 text-white group-hover:scale-125 transition-transform duration-300" size={32} />
          </div>
          <h3 className="font-bold text-sm md:text-base lg:text-lg text-foreground group-hover:text-primary transition-colors duration-300">{service.name}</h3>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-8" id="services">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Wählen Sie Ihre <span className="text-gradient-primary">Plattform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Steigern Sie Ihre Reichweite auf allen wichtigen Social Media Plattformen
          </p>
        </div>

        {/* Main Platforms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
          {mainServices.map((service) => (
            <Link key={service.name} to={service.href}>
              <PlatformCard service={service} />
            </Link>
          ))}
        </div>

        {/* Additional Platforms Toggle Button - Only show if not expanded */}
        {additionalServices.length > 0 && !showAdditional && (
          <div className="text-center mb-8">
            <Button 
              onClick={() => setShowAdditional(true)}
              className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Weitere Plattformen
                <ChevronDown className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </div>
        )}

        {/* Additional Platforms Grid - Same Style as Main Platforms */}
        {showAdditional && additionalServices.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto animate-fade-in">
            {additionalServices.map((service) => (
              <Link key={service.name} to={service.href}>
                <PlatformCard service={service} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;