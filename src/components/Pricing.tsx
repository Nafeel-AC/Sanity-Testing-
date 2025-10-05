import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
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
      cta: "Starter wählen",
      highlighted: false
    },
    {
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
      cta: "Professional wählen",
      highlighted: true
    },
    {
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
      cta: "Enterprise wählen",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`card-pricing relative animate-fade-in ${
                plan.highlighted 
                  ? 'ring-2 ring-primary/20 shadow-xl scale-105' 
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Empfohlen
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    plan.highlighted 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <Badge className={plan.badgeColor}>
                    {plan.badge}
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="flex items-center justify-center space-x-2 mt-6">
                  <span className="text-4xl font-bold text-primary">€{plan.price}</span>
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground line-through">€{plan.originalPrice}</div>
                    <div className="text-sm text-muted-foreground">einmalig</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'btn-hero' 
                      : 'bg-secondary hover:bg-secondary-hover'
                  }`}
                  size="lg"
                  onClick={() => {
                    // Open shopping cart
                    const event = new Event('openCart');
                    window.dispatchEvent(event);
                  }}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
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

export default Pricing;