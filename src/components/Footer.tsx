import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { socialPlatforms } from "./SocialMediaIcons";
import { useState } from "react";

const Footer = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const serviceLinks = socialPlatforms.map(platform => ({
    name: `${platform.name} Services`,
    href: platform.href
  }));

  const companyLinks = [
    { name: "Über uns", href: "/about" },
    { name: "Kundenbewertungen", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Kontakt", href: "/contact" },
    { name: "Wie es funktioniert", href: "/how-it-works" },
    { name: "Blog", href: "/blog" }
  ];

  const legalLinks = [
    { name: "Impressum", href: "#" },
    { name: "Datenschutz", href: "#" },
    { name: "AGB", href: "#" },
    { name: "Cookie-Richtlinie", href: "#" },
    { name: "Widerrufsrecht", href: "#" }
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-border/20">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Verpassen Sie keine Updates
            </h3>
            <p className="text-background/70 mb-8 max-w-2xl mx-auto">
              Erhalten Sie exklusive Angebote, neue Services und Marketing-Tipps 
              direkt in Ihr Postfach. Jederzeit abbestellbar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Ihre E-Mail-Adresse"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8">
                Abonnieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SN</span>
            </div>
            <span className="text-xl font-bold text-background">SocialNova</span>
          </Link>
            <p className="text-background/70 mb-6 leading-relaxed">
              Deutschlands führende Plattform für professionelle Social Media Marketing Services. 
              Wir helfen Ihnen dabei, Ihre Reichweite organisch und sicher zu steigern.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-background/70">support@socialnova.de</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-background/70">+49 (0) 30 12345678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-background/70">Berlin, Deutschland</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialPlatforms.slice(0, 6).map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <Link 
                    key={platform.value}
                    to={platform.href} 
                    className={`w-10 h-10 ${platform.bgColor} rounded-full flex items-center justify-center text-white ${platform.hoverColor} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  >
                    <IconComponent size={16} className="text-white" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-background hover:text-primary transition-all duration-300 group"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-all duration-300 group-hover:text-primary ${servicesOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${servicesOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
              <div className="bg-background/5 rounded-lg p-4 backdrop-blur-sm">
                <ul className="space-y-2">
                  {serviceLinks.map((link, index) => {
                    const platform = socialPlatforms.find(p => link.href === p.href);
                    const IconComponent = platform?.icon;
                    return (
                      <li key={index}>
                        <Link 
                          to={link.href}
                          className="text-background/70 hover:text-primary transition-all duration-200 block py-2 px-3 rounded-md hover:bg-primary/10 flex items-center space-x-3"
                        >
                          {IconComponent && (
                            <div className={`w-5 h-5 ${platform.bgColor} rounded-md flex items-center justify-center`}>
                              <IconComponent className="text-white" size={12} />
                            </div>
                          )}
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-background hover:text-primary transition-all duration-300 group"
            >
              Unternehmen
              <ChevronDown className={`w-4 h-4 transition-all duration-300 group-hover:text-primary ${companyOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${companyOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
              <div className="bg-background/5 rounded-lg p-4 backdrop-blur-sm">
                <ul className="space-y-2">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        className="text-background/70 hover:text-primary transition-all duration-200 block py-2 px-3 rounded-md hover:bg-primary/10"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Rechtliches</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-background/70 text-sm mb-4 md:mb-0 text-center md:text-left">
              © 2024 SocialNova. Alle Rechte vorbehalten.
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <span className="text-background/70 flex items-center whitespace-nowrap">🇪🇺 DSGVO-konform</span>
              <span className="text-background/70">•</span>
              <span className="text-background/70 flex items-center whitespace-nowrap">🔒 SSL-verschlüsselt</span>
              <span className="text-background/70">•</span>
              <span className="text-background/70 flex items-center whitespace-nowrap">⚡ 24h Lieferung</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;