import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Users, TrendingUp, Shield, Eye, User, Play, MessageCircle, Share, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import heroGrowthArrowImage from "@/assets/hero-growth-arrow.jpg";
import { socialPlatforms } from "./SocialMediaIcons";

const Hero = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value);
    setSelectedService("");
    setSelectedPackage("");
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    setSelectedPackage("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-success/5">
      {/* Background Elements - Using will-change for performance */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 will-change-transform"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: "-1s" }}></div>

      <div className="container mx-auto px-4 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left opacity-100 translate-y-0 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary-light px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% DSGVO-konform & sicher</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient-hero">Social Media</span><br />
              <span className="text-foreground">Reichweite aufbauen</span><br />
              <span className="text-primary text-2xl md:text-3xl lg:text-4xl font-semibold">Ihr Partner für digitales Wachstum</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Steigern Sie Ihre Reichweite auf Instagram, TikTok, YouTube und mehr mit unseren 
              professionellen Social Media Services. Sicher, schnell und absolut diskret.
            </p>

            {/* Quick Order Section - Enhanced Design */}
            <div className="mb-8">
              <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto lg:mx-0">
                {/* Decorative Elements - Using transform to avoid layout shift */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full opacity-75"></div>
                
                <div className="text-center lg:text-left mb-6">
                  <div className="inline-flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold text-gradient-primary">Schnellbestellung</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Wählen Sie Ihr gewünschtes Service-Paket und starten Sie sofort</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Select value={selectedPlatform} onValueChange={handlePlatformChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Plattform wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {socialPlatforms.map((platform) => {
                        const IconComponent = platform.icon;
                        return (
                          <SelectItem key={platform.value} value={platform.value}>
                            <div className="flex items-center">
                              <div className={`w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-gradient-to-br ${platform.color}`}>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              {platform.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedService} onValueChange={handleServiceChange} disabled={!selectedPlatform}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Service wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="follower">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-primary">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          Follower
                        </div>
                      </SelectItem>
                      <SelectItem value="likes">
                        <div className="flex items-center">
                           <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-red-500">
                             <Heart className="w-4 h-4 text-white" />
                           </div>
                          Likes
                        </div>
                      </SelectItem>
                      <SelectItem value="views">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-blue-500">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                          Views
                        </div>
                      </SelectItem>
                      <SelectItem value="kommentare">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-green-500">
                            <MessageCircle className="w-4 h-4 text-white" />
                          </div>
                          Kommentare
                        </div>
                      </SelectItem>
                      <SelectItem value="shares">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-purple-500">
                            <Share className="w-4 h-4 text-white" />
                          </div>
                          Shares
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedPackage} onValueChange={setSelectedPackage} disabled={!selectedService}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Paket wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-yellow-500">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          Starter - 9.99€
                        </div>
                      </SelectItem>
                      <SelectItem value="professional">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-blue-600">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          Professional - 24.99€
                        </div>
                      </SelectItem>
                      <SelectItem value="enterprise">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-purple-600">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                          Enterprise - 79.99€
                        </div>
                      </SelectItem>
                      <SelectItem value="custom">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border border-border rounded-md flex items-center justify-center mr-2 bg-primary">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                          Custom - Individuell
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <button 
                    className="btn-hero px-4 py-3 rounded-lg font-medium text-white text-sm whitespace-nowrap h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      const event = new Event('openCart');
                      window.dispatchEvent(event);
                    }}
                    disabled={!selectedPlatform || !selectedService || !selectedPackage}
                  >
                    In den Warenkorb
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Indicators - Alternative SEO content */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">Trustpilot Bewertung</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">DSGVO-konform</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium">Organisches Wachstum</span>
              </div>
            </div>


            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border/50 max-w-2xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Lieferung</div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="text-2xl md:text-3xl font-bold text-success">100%</div>
                  <div className="text-sm text-muted-foreground">Sicher</div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative opacity-100 translate-y-0 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <img
                src={heroGrowthArrowImage}
                alt="Ihr Partner für digitales Wachstum - Social Media Marketing Services"
                className="w-full h-auto rounded-2xl shadow-2xl"
                width="800"
                height="600"
                loading="eager"
                style={{ aspectRatio: '4/3' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl will-change-auto"></div>
              
              {/* Responsive Social Media Icons */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
                {/* Mobile: Small compact grid in corner */}
                <div className="grid grid-cols-4 gap-1.5 p-2 bg-white/85 backdrop-blur-md rounded-lg shadow-lg border border-primary/20 sm:hidden">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-md flex items-center justify-center shadow-sm">
                    {socialPlatforms.find(p => p.value === 'instagram')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'instagram')!.icon, { className: "w-3 h-3 text-white" })
                    }
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-md flex items-center justify-center shadow-sm">
                    {socialPlatforms.find(p => p.value === 'youtube')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'youtube')!.icon, { className: "w-3 h-3 text-white" })
                    }
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-black to-gray-800 rounded-md flex items-center justify-center shadow-sm">
                    {socialPlatforms.find(p => p.value === 'tiktok')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'tiktok')!.icon, { className: "w-3 h-3 text-white" })
                    }
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-sm">
                    {socialPlatforms.find(p => p.value === 'facebook')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'facebook')!.icon, { className: "w-3 h-3 text-white" })
                    }
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-black to-gray-900 rounded-md flex items-center justify-center shadow-sm">
                    {socialPlatforms.find(p => p.value === 'twitter')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'twitter')!.icon, { className: "w-3 h-3 text-white" })
                    }
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-sm">
                    {socialPlatforms.find(p => p.value === 'linkedin')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'linkedin')!.icon, { className: "w-3 h-3 text-white" })
                    }
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-md flex items-center justify-center shadow-sm">
                    {socialPlatforms.find(p => p.value === 'telegram')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'telegram')!.icon, { className: "w-3 h-3 text-white" })
                    }
                  </div>
                  {/* Empty cell to balance the grid */}
                  <div className="w-6 h-6"></div>
                </div>

                {/* Tablet: Compact grid layout */}
                <div className="hidden sm:flex lg:hidden flex-wrap justify-center gap-2 p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-primary/20 max-w-[160px]">
                  <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'instagram')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'instagram')!.icon, { className: "w-4 h-4 text-white" })
                    }
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'youtube')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'youtube')!.icon, { className: "w-4 h-4 text-white" })
                    }
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'tiktok')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'tiktok')!.icon, { className: "w-4 h-4 text-white" })
                    }
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'facebook')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'facebook')!.icon, { className: "w-4 h-4 text-white" })
                    }
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-black to-gray-900 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'twitter')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'twitter')!.icon, { className: "w-4 h-4 text-white" })
                    }
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'linkedin')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'linkedin')!.icon, { className: "w-4 h-4 text-white" })
                    }
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'telegram')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'telegram')!.icon, { className: "w-4 h-4 text-white" })
                    }
                  </div>
                </div>

                {/* Desktop: Larger grid layout */}
                <div className="hidden lg:flex flex-wrap justify-center gap-3 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-primary/20 max-w-[180px]">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'instagram')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'instagram')!.icon, { className: "w-5 h-5 text-white" })
                    }
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'youtube')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'youtube')!.icon, { className: "w-5 h-5 text-white" })
                    }
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'tiktok')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'tiktok')!.icon, { className: "w-5 h-5 text-white" })
                    }
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'facebook')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'facebook')!.icon, { className: "w-5 h-5 text-white" })
                    }
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-900 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'twitter')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'twitter')!.icon, { className: "w-5 h-5 text-white" })
                    }
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'linkedin')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'linkedin')!.icon, { className: "w-5 h-5 text-white" })
                    }
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200">
                    {socialPlatforms.find(p => p.value === 'telegram')?.icon && 
                      React.createElement(socialPlatforms.find(p => p.value === 'telegram')!.icon, { className: "w-5 h-5 text-white" })
                    }
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements - Fixed positioning to prevent layout shift */}
            <div className="absolute top-0 right-0 transform -translate-y-4 translate-x-4 bg-success text-success-foreground px-4 py-2 rounded-full font-semibold">
              +500% Reichweite
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;