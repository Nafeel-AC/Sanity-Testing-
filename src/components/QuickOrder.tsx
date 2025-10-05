import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QuickOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const platforms = [
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "youtube", label: "YouTube" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter/X" },
    { value: "telegram", label: "Telegram" }
  ];

  const categories = {
    instagram: [
      { value: "followers", label: "Follower" },
      { value: "likes", label: "Likes" },
      { value: "views", label: "Views" },
      { value: "comments", label: "Kommentare" },
      { value: "saves", label: "Speichern" }
    ],
    tiktok: [
      { value: "followers", label: "Follower" },
      { value: "likes", label: "Likes" },
      { value: "views", label: "Views" },
      { value: "shares", label: "Shares" },
      { value: "comments", label: "Kommentare" }
    ],
    youtube: [
      { value: "subscribers", label: "Abonnenten" },
      { value: "views", label: "Views" },
      { value: "likes", label: "Likes" },
      { value: "comments", label: "Kommentare" },
      { value: "watchtime", label: "Wiedergabezeit" }
    ],
    facebook: [
      { value: "likes", label: "Likes" },
      { value: "followers", label: "Follower" },
      { value: "shares", label: "Shares" },
      { value: "comments", label: "Kommentare" }
    ],
    twitter: [
      { value: "followers", label: "Follower" },
      { value: "likes", label: "Likes" },
      { value: "retweets", label: "Retweets" },
      { value: "views", label: "Views" }
    ],
    telegram: [
      { value: "members", label: "Mitglieder" },
      { value: "views", label: "Views" },
      { value: "votes", label: "Votes" },
      { value: "reactions", label: "Reaktionen" }
    ]
  };

  const packages = {
    "instagram-followers": [
      { value: "500", label: "500 Follower - 4.99€", price: "4.99€" },
      { value: "1000", label: "1.000 Follower - 8.99€", price: "8.99€" },
      { value: "2500", label: "2.500 Follower - 19.99€", price: "19.99€" },
      { value: "5000", label: "5.000 Follower - 34.99€", price: "34.99€" },
      { value: "10000", label: "10.000 Follower - 64.99€", price: "64.99€" }
    ],
    "instagram-likes": [
      { value: "100", label: "100 Likes - 1.99€", price: "1.99€" },
      { value: "500", label: "500 Likes - 4.99€", price: "4.99€" },
      { value: "1000", label: "1.000 Likes - 8.99€", price: "8.99€" },
      { value: "2500", label: "2.500 Likes - 19.99€", price: "19.99€" },
      { value: "5000", label: "5.000 Likes - 34.99€", price: "34.99€" }
    ],
    "tiktok-views": [
      { value: "1000", label: "1.000 Views - 1.49€", price: "1.49€" },
      { value: "5000", label: "5.000 Views - 4.99€", price: "4.99€" },
      { value: "10000", label: "10.000 Views - 8.99€", price: "8.99€" },
      { value: "25000", label: "25.000 Views - 19.99€", price: "19.99€" },
      { value: "50000", label: "50.000 Views - 34.99€", price: "34.99€" }
    ],
    "youtube-views": [
      { value: "500", label: "500 Views - 2.99€", price: "2.99€" },
      { value: "1000", label: "1.000 Views - 4.99€", price: "4.99€" },
      { value: "5000", label: "5.000 Views - 19.99€", price: "19.99€" },
      { value: "10000", label: "10.000 Views - 34.99€", price: "34.99€" },
      { value: "25000", label: "25.000 Views - 74.99€", price: "74.99€" }
    ]
  };

  const getCurrentPackages = () => {
    if (!selectedPlatform || !selectedCategory) return [];
    const key = `${selectedPlatform}-${selectedCategory}`;
    return packages[key as keyof typeof packages] || [];
  };

  const getCurrentCategories = () => {
    if (!selectedPlatform) return [];
    return categories[selectedPlatform as keyof typeof categories] || [];
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um eine Bestellung aufzugeben');
      navigate('/auth');
      return;
    }

    if (selectedPlatform && selectedCategory && selectedPackage) {
      // Open shopping cart
      window.dispatchEvent(new CustomEvent('openCart', {
        detail: {
          platform: selectedPlatform,
          category: selectedCategory,
          package: selectedPackage
        }
      }));
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-success/5">
      <div className="container mx-auto px-4 lg:px-8">
        <Card className="max-w-4xl mx-auto card-glass">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold">
                Schnell-Bestellung
              </CardTitle>
            </div>
            <p className="text-muted-foreground text-lg">
              Wählen Sie Ihre Plattform, Kategorie und Paket für eine sofortige Bestellung
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Platform Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  1. Plattform wählen
                </label>
                <Select value={selectedPlatform} onValueChange={(value) => {
                  setSelectedPlatform(value);
                  setSelectedCategory("");
                  setSelectedPackage("");
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Plattform auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  2. Kategorie wählen
                </label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setSelectedPackage("");
                  }}
                  disabled={!selectedPlatform}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kategorie auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCurrentCategories().map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Package Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  3. Paket wählen
                </label>
                <Select 
                  value={selectedPackage} 
                  onValueChange={setSelectedPackage}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Paket auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCurrentPackages().map((pkg) => (
                      <SelectItem key={pkg.value} value={pkg.value}>
                        {pkg.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="btn-hero px-12 py-4 text-lg"
                onClick={handleAddToCart}
                disabled={!selectedPlatform || !selectedCategory || !selectedPackage}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                In den Warenkorb
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                ✓ Sofortige Lieferung nach Zahlung • ✓ 24/7 Support • ✓ Geld-zurück-Garantie
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuickOrder;