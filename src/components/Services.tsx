import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Music, Twitter, Facebook, MessageCircle } from "lucide-react";

const Services = () => {
  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      services: [
        { name: "Follower", count: "12 Services", price: "ab 2.99€", popular: true },
        { name: "Likes", count: "8 Services", price: "ab 1.99€" },
        { name: "Views", count: "6 Services", price: "ab 0.99€" },
        { name: "Kommentare", count: "4 Services", price: "ab 4.99€" }
      ]
    },
    {
      name: "TikTok",
      icon: Music,
      color: "text-black",
      bgColor: "bg-gray-50",
      services: [
        { name: "Follower", count: "10 Services", price: "ab 3.99€", popular: true },
        { name: "Likes", count: "8 Services", price: "ab 1.49€" },
        { name: "Views", count: "12 Services", price: "ab 0.79€" },
        { name: "Shares", count: "5 Services", price: "ab 2.99€" }
      ]
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      bgColor: "bg-red-50",
      services: [
        { name: "Abonnenten", count: "8 Services", price: "ab 4.99€" },
        { name: "Views", count: "15 Services", price: "ab 0.99€", popular: true },
        { name: "Likes", count: "6 Services", price: "ab 2.99€" },
        { name: "Kommentare", count: "4 Services", price: "ab 5.99€" }
      ]
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      services: [
        { name: "Follower", count: "7 Services", price: "ab 3.49€" },
        { name: "Likes", count: "5 Services", price: "ab 1.99€" },
        { name: "Retweets", count: "4 Services", price: "ab 2.49€", popular: true },
        { name: "Views", count: "6 Services", price: "ab 1.29€" }
      ]
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      services: [
        { name: "Likes", count: "6 Services", price: "ab 2.99€", popular: true },
        { name: "Follower", count: "5 Services", price: "ab 4.99€" },
        { name: "Shares", count: "4 Services", price: "ab 3.99€" },
        { name: "Kommentare", count: "3 Services", price: "ab 6.99€" }
      ]
    },
    {
      name: "Telegram",
      icon: MessageCircle,
      color: "text-blue-400",
      bgColor: "bg-blue-50",
      services: [
        { name: "Mitglieder", count: "4 Services", price: "ab 2.99€" },
        { name: "Views", count: "6 Services", price: "ab 0.99€", popular: true },
        { name: "Votes", count: "3 Services", price: "ab 1.99€" },
        { name: "Reactions", count: "5 Services", price: "ab 1.49€" }
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unsere <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hochwertige Social Media Services für alle großen Plattformen. 
            Schnell, sicher und zu fairen Preisen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <Card 
              key={platform.name} 
              className="card-service group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-12 h-12 ${platform.bgColor} rounded-xl flex items-center justify-center`}>
                    <platform.icon className={`w-6 h-6 ${platform.color}`} />
                  </div>
                  <CardTitle className="text-xl">{platform.name}</CardTitle>
                </div>
                <CardDescription>
                  Professionelle {platform.name} Services für mehr Reichweite
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {platform.services.map((service, serviceIndex) => (
                  <div 
                    key={serviceIndex}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{service.name}</span>
                          {service.popular && (
                            <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                              Beliebt
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{service.count}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{service.price}</div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  className="w-full mt-4 group-hover:shadow-md transition-all duration-200"
                  variant="outline"
                  onClick={() => {
                    const serviceRoutes = {
                      'Instagram': '/instagram',
                      'TikTok': '/tiktok',
                      'YouTube': '/youtube',
                      'Twitter/X': '#pricing',
                      'Facebook': '/facebook',
                      'Telegram': '#pricing'
                    };
                    const route = serviceRoutes[platform.name as keyof typeof serviceRoutes];
                    if (route?.startsWith('/')) {
                      window.location.href = route;
                    } else {
                      const element = document.querySelector('#pricing');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {platform.name} Services ansehen
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl border border-border">
          <h3 className="text-2xl font-bold mb-4">
            Nicht das Richtige dabei?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wir bieten auch maßgeschneiderte Lösungen für Ihre individuellen Bedürfnisse. 
            Kontaktieren Sie uns für ein personalisiertes Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-hero"
              onClick={() => {
                const element = document.querySelector('#pricing');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Individuelles Angebot anfragen
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const element = document.querySelector('#services');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Alle Services anzeigen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;