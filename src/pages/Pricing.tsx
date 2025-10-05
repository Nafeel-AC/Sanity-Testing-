import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Rocket, Instagram, Music, Youtube, Facebook, Twitter, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { pricingPlansQuery } from "@/lib/queries";

const Pricing = () => {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    setLoadingPlans(true);
    client.fetch(pricingPlansQuery)
      .then((data) => setPlans(data || []))
      .finally(() => setLoadingPlans(false));
  }, []);

  const platformPackages = [
    {
      platform: "Instagram",
      packages: [
        { name: "Instagram Likes", options: ["100 für 1.99€", "500 für 4.99€", "1.000 für 8.99€", "2.500 für 19.99€", "5.000 für 34.99€"] },
        { name: "Instagram Follower", options: ["100 für 3.99€", "500 für 14.99€", "1.000 für 24.99€", "2.500 für 54.99€", "5.000 für 99.99€"] },
        { name: "Instagram Views", options: ["1.000 für 1.49€", "5.000 für 4.99€", "10.000 für 8.99€", "25.000 für 19.99€", "50.000 für 34.99€"] },
        { name: "Instagram Kommentare", options: ["10 für 2.99€", "25 für 5.99€", "50 für 9.99€", "100 für 17.99€", "250 für 39.99€"] }
      ]
    },
    {
      platform: "TikTok", 
      packages: [
        { name: "TikTok Likes", options: ["100 für 1.99€", "500 für 4.99€", "1.000 für 8.99€", "2.500 für 19.99€", "5.000 für 34.99€"] },
        { name: "TikTok Follower", options: ["100 für 4.99€", "500 für 19.99€", "1.000 für 34.99€", "2.500 für 74.99€", "5.000 für 139.99€"] },
        { name: "TikTok Views", options: ["1.000 für 1.49€", "5.000 für 4.99€", "10.000 für 8.99€", "25.000 für 19.99€", "100.000 für 59.99€"] },
        { name: "TikTok Shares", options: ["50 für 2.99€", "100 für 4.99€", "250 für 9.99€", "500 für 17.99€", "1.000 für 32.99€"] }
      ]
    },
    {
      platform: "YouTube",
      packages: [
        { name: "YouTube Views", options: ["500 für 2.99€", "1.000 für 4.99€", "5.000 für 19.99€", "10.000 für 34.99€", "25.000 für 74.99€"] },
        { name: "YouTube Abonnenten", options: ["50 für 9.99€", "100 für 17.99€", "250 für 39.99€", "500 für 74.99€", "1.000 für 139.99€"] },
        { name: "YouTube Likes", options: ["50 für 2.99€", "100 für 4.99€", "250 für 9.99€", "500 für 17.99€", "1.000 für 32.99€"] },
        { name: "YouTube Kommentare", options: ["5 für 4.99€", "10 für 7.99€", "25 für 14.99€", "50 für 27.99€", "100 für 49.99€"] }
      ]
    },
    {
      platform: "Facebook",
      packages: [
        { name: "Facebook Likes", options: ["100 für 2.49€", "500 für 9.99€", "1.000 für 17.99€", "2.500 für 39.99€", "5.000 für 69.99€"] },
        { name: "Facebook Follower", options: ["100 für 4.99€", "500 für 19.99€", "1.000 für 34.99€", "2.500 für 74.99€", "5.000 für 139.99€"] },
        { name: "Facebook Views", options: ["1.000 für 1.99€", "5.000 für 7.99€", "10.000 für 14.99€", "25.000 für 32.99€", "50.000 für 59.99€"] },
        { name: "Facebook Shares", options: ["25 für 3.99€", "50 für 6.99€", "100 für 12.99€", "250 für 29.99€", "500 für 54.99€"] }
      ]
    },
    {
      platform: "Twitter",
      packages: [
        { name: "Twitter Likes", options: ["100 für 2.99€", "500 für 12.99€", "1.000 für 22.99€", "2.500 für 49.99€", "5.000 für 89.99€"] },
        { name: "Twitter Follower", options: ["100 für 5.99€", "500 für 24.99€", "1.000 für 44.99€", "2.500 für 99.99€", "5.000 für 179.99€"] },
        { name: "Twitter Retweets", options: ["50 für 3.99€", "100 für 6.99€", "250 für 14.99€", "500 für 27.99€", "1.000 für 49.99€"] },
        { name: "Twitter Views", options: ["5.000 für 2.99€", "10.000 für 4.99€", "25.000 für 11.99€", "50.000 für 21.99€", "100.000 für 39.99€"] }
      ]
    },
    {
      platform: "Telegram",
      packages: [
        { name: "Telegram Mitglieder", options: ["100 für 4.99€", "500 für 19.99€", "1.000 für 34.99€", "2.500 für 74.99€", "5.000 für 139.99€"] },
        { name: "Telegram Views", options: ["1.000 für 1.99€", "5.000 für 7.99€", "10.000 für 14.99€", "25.000 für 32.99€", "50.000 für 59.99€"] },
        { name: "Telegram Reaktionen", options: ["50 für 2.99€", "100 für 4.99€", "250 für 9.99€", "500 für 17.99€", "1.000 für 32.99€"] },
        { name: "Telegram Shares", options: ["25 für 3.99€", "50 für 6.99€", "100 für 12.99€", "250 für 29.99€", "500 für 54.99€"] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-success/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="secondary">
                <Rocket className="w-4 h-4 mr-2" />
                Transparent & Fair
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient-hero">Preise & Pakete</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transparente Preise ohne versteckte Kosten. Wählen Sie das perfekte Paket für Ihren Erfolg.
              </p>
            </div>
          </div>
        </section>

        {/* Main Packages */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Influencer Pakete</h2>
              <p className="text-lg text-muted-foreground">Komplette Pakete für maximalen Erfolg</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {(plans || []).map((plan: any, index: number) => {
                // Map color/icon styling by popularity index for now
                const styleByIndex: any = {
                  0: { icon: Zap, color: "text-primary", bgColor: "bg-primary/10" },
                  1: { icon: Star, color: "text-success", bgColor: "bg-success/10" },
                  2: { icon: Crown, color: "text-warning", bgColor: "bg-warning/10" }
                };
                const style = styleByIndex[index] || styleByIndex[0];
                const Icon = style.icon;
                return (
                  <Card key={plan._id || plan.name} className={`card-pricing relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                    {plan.popular ? (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1">
                          Beliebteste Wahl
                        </Badge>
                      </div>
                    ) : null}
                    
                    <CardHeader className="text-center pb-6">
                      <div className={`w-16 h-16 ${style.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-8 h-8 ${style.color}`} />
                      </div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <p className="text-muted-foreground">{plan.description}</p>
                      <div className="mt-4">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-4xl font-bold">{Number(plan.price).toFixed(2)}€</span>
                          {plan.originalPrice ? (
                            <span className="text-lg text-muted-foreground line-through">{Number(plan.originalPrice).toFixed(2)}€</span>
                          ) : null}
                        </div>
                        {plan.originalPrice ? (
                          <p className="text-sm text-success font-medium">
                            Sie sparen {(Number(plan.originalPrice) - Number(plan.price)).toFixed(2)}€
                          </p>
                        ) : null}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {(plan.features || []).map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-success flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${plan.popular ? 'btn-hero' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                      >
                        {plan.name} wählen
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Individual Platform Services */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Einzelne Services</h2>
              <p className="text-lg text-muted-foreground">Individuelle Pakete für spezielle Anforderungen</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {(showAllPlatforms ? platformPackages : platformPackages.slice(0, 3)).map((platform, index) => {
                const platformIcons: any = {
                  Instagram: Instagram,
                  TikTok: Music,
                  YouTube: Youtube,
                  Facebook: Facebook,
                  Twitter: Twitter,
                  Telegram: MessageCircle
                };
                const Icon = platformIcons[platform.platform];
                const colors: any = {
                  Instagram: "from-pink-500 to-rose-500",
                  TikTok: "from-black to-slate-800", 
                  YouTube: "from-red-500 to-red-600",
                  Facebook: "from-blue-500 to-blue-600",
                  Twitter: "from-slate-800 to-slate-900",
                  Telegram: "from-blue-400 to-blue-500"
                };
                
                return (
                  <Card key={platform.platform} className="card-service border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                    <CardHeader className="text-center pb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-card to-card-hover border border-border flex items-center justify-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${colors[platform.platform]} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold">{platform.platform} Services</CardTitle>
                      <p className="text-muted-foreground">Professionelle {platform.platform} Marketing Pakete</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {platform.packages.slice(0, 4).map((pkg, pkgIndex) => (
                          <div key={pkgIndex} className="text-center p-4 bg-muted/50 rounded-lg">
                            <div className="text-sm font-medium text-primary mb-1">{pkg.name.split(' ')[1]}</div>
                            <div className="text-xs text-muted-foreground">ab {pkg.options[0].split(' für ')[1]}</div>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full btn-hero" 
                        size="lg"
                        onClick={() => window.location.href = `/${platform.platform.toLowerCase()}`}
                      >
                        {platform.platform} Services ansehen
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {!showAllPlatforms && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3"
                  onClick={() => setShowAllPlatforms(true)}
                >
                  Mehr Plattformen anzeigen
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className="card-glass max-w-4xl mx-auto">
              <CardContent className="text-center py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Noch Fragen zu unseren Preisen?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Unser Support-Team steht Ihnen 24/7 zur Verfügung und hilft Ihnen bei der Auswahl des perfekten Pakets.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-hero">
                    Jetzt Support kontaktieren
                  </Button>
                  <Button size="lg" variant="outline">
                    FAQ ansehen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;