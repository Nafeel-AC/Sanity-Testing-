import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Zap } from "lucide-react";

const ExpandedQuickOrder = () => {
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
      { value: "saves", label: "Speichern" },
      { value: "shares", label: "Shares" },
      { value: "story-views", label: "Story Views" }
    ],
    tiktok: [
      { value: "followers", label: "Follower" },
      { value: "likes", label: "Likes" },
      { value: "views", label: "Views" },
      { value: "shares", label: "Shares" },
      { value: "comments", label: "Kommentare" },
      { value: "saves", label: "Speichern" }
    ],
    youtube: [
      { value: "subscribers", label: "Abonnenten" },
      { value: "views", label: "Views" },
      { value: "likes", label: "Likes" },
      { value: "comments", label: "Kommentare" },
      { value: "watchtime", label: "Wiedergabezeit" },
      { value: "shares", label: "Shares" }
    ],
    facebook: [
      { value: "likes", label: "Seiten-Likes" },
      { value: "followers", label: "Follower" },
      { value: "shares", label: "Shares" },
      { value: "comments", label: "Kommentare" },
      { value: "post-likes", label: "Post-Likes" },
      { value: "video-views", label: "Video Views" }
    ],
    twitter: [
      { value: "followers", label: "Follower" },
      { value: "likes", label: "Likes" },
      { value: "retweets", label: "Retweets" },
      { value: "views", label: "Views" },
      { value: "replies", label: "Antworten" },
      { value: "impressions", label: "Impressionen" }
    ],
    telegram: [
      { value: "members", label: "Mitglieder" },
      { value: "views", label: "Views" },
      { value: "votes", label: "Votes" },
      { value: "reactions", label: "Reaktionen" },
      { value: "shares", label: "Shares" },
      { value: "comments", label: "Kommentare" }
    ]
  };

  const packages = {
    // Instagram Packages
    "instagram-followers": [
      { value: "100", label: "100 Deutsche Follower - 7.99€", price: "7.99€" },
      { value: "250", label: "250 Deutsche Follower - 12.99€", price: "12.99€" },
      { value: "500", label: "500 Deutsche Follower - 19.99€", price: "19.99€" },
      { value: "1000", label: "1.000 Deutsche Follower - 34.99€", price: "34.99€" },
      { value: "2500", label: "2.500 Deutsche Follower - 74.99€", price: "74.99€" },
      { value: "5000", label: "5.000 Deutsche Follower - 134.99€", price: "134.99€" },
      { value: "10000", label: "10.000 Deutsche Follower - 249.99€", price: "249.99€" },
    ],
    "instagram-likes": [
      { value: "100", label: "100 Deutsche Likes - 3.99€", price: "3.99€" },
      { value: "250", label: "250 Deutsche Likes - 7.99€", price: "7.99€" },
      { value: "500", label: "500 Deutsche Likes - 12.99€", price: "12.99€" },
      { value: "1000", label: "1.000 Deutsche Likes - 19.99€", price: "19.99€" },
      { value: "2500", label: "2.500 Deutsche Likes - 39.99€", price: "39.99€" },
      { value: "5000", label: "5.000 Deutsche Likes - 69.99€", price: "69.99€" },
      { value: "10000", label: "10.000 Deutsche Likes - 124.99€", price: "124.99€" }
    ],
    "instagram-views": [
      { value: "1000", label: "1.000 Views - 2.99€", price: "2.99€" },
      { value: "5000", label: "5.000 Views - 9.99€", price: "9.99€" },
      { value: "10000", label: "10.000 Views - 17.99€", price: "17.99€" },
      { value: "25000", label: "25.000 Views - 39.99€", price: "39.99€" },
      { value: "50000", label: "50.000 Views - 69.99€", price: "69.99€" },
      { value: "100000", label: "100.000 Views - 124.99€", price: "124.99€" }
    ],
    "instagram-comments": [
      { value: "25", label: "25 Deutsche Kommentare - 14.99€", price: "14.99€" },
      { value: "50", label: "50 Deutsche Kommentare - 24.99€", price: "24.99€" },
      { value: "100", label: "100 Deutsche Kommentare - 44.99€", price: "44.99€" },
      { value: "250", label: "250 Deutsche Kommentare - 99.99€", price: "99.99€" }
    ],
    // TikTok Packages  
    "tiktok-followers": [
      { value: "100", label: "100 Deutsche Follower - 8.99€", price: "8.99€" },
      { value: "500", label: "500 Deutsche Follower - 24.99€", price: "24.99€" },
      { value: "1000", label: "1.000 Deutsche Follower - 39.99€", price: "39.99€" },
      { value: "2500", label: "2.500 Deutsche Follower - 84.99€", price: "84.99€" },
      { value: "5000", label: "5.000 Deutsche Follower - 149.99€", price: "149.99€" },
      { value: "10000", label: "10.000 Deutsche Follower - 279.99€", price: "279.99€" }
    ],
    "tiktok-likes": [
      { value: "100", label: "100 Deutsche Likes - 2.99€", price: "2.99€" },
      { value: "500", label: "500 Deutsche Likes - 9.99€", price: "9.99€" },
      { value: "1000", label: "1.000 Deutsche Likes - 16.99€", price: "16.99€" },
      { value: "5000", label: "5.000 Deutsche Likes - 64.99€", price: "64.99€" },
      { value: "10000", label: "10.000 Deutsche Likes - 119.99€", price: "119.99€" }
    ],
    "tiktok-views": [
      { value: "1000", label: "1.000 Views - 1.99€", price: "1.99€" },
      { value: "5000", label: "5.000 Views - 7.99€", price: "7.99€" },
      { value: "10000", label: "10.000 Views - 13.99€", price: "13.99€" },
      { value: "25000", label: "25.000 Views - 29.99€", price: "29.99€" },
      { value: "50000", label: "50.000 Views - 54.99€", price: "54.99€" },
      { value: "100000", label: "100.000 Views - 99.99€", price: "99.99€" }
    ],
    // YouTube Packages
    "youtube-subscribers": [
      { value: "100", label: "100 Deutsche Abonnenten - 14.99€", price: "14.99€" },
      { value: "250", label: "250 Deutsche Abonnenten - 29.99€", price: "29.99€" },
      { value: "500", label: "500 Deutsche Abonnenten - 49.99€", price: "49.99€" },
      { value: "1000", label: "1.000 Deutsche Abonnenten - 89.99€", price: "89.99€" },
      { value: "2500", label: "2.500 Deutsche Abonnenten - 199.99€", price: "199.99€" },
      { value: "5000", label: "5.000 Deutsche Abonnenten - 369.99€", price: "369.99€" }
    ],
    "youtube-views": [
      { value: "1000", label: "1.000 Views - 4.99€", price: "4.99€" },
      { value: "5000", label: "5.000 Views - 19.99€", price: "19.99€" },
      { value: "10000", label: "10.000 Views - 34.99€", price: "34.99€" },
      { value: "25000", label: "25.000 Views - 79.99€", price: "79.99€" },
      { value: "50000", label: "50.000 Views - 149.99€", price: "149.99€" },
      { value: "100000", label: "100.000 Views - 279.99€", price: "279.99€" }
    ],
    "youtube-likes": [
      { value: "100", label: "100 Deutsche Likes - 7.99€", price: "7.99€" },
      { value: "250", label: "250 Deutsche Likes - 16.99€", price: "16.99€" },
      { value: "500", label: "500 Deutsche Likes - 29.99€", price: "29.99€" },
      { value: "1000", label: "1.000 Deutsche Likes - 54.99€", price: "54.99€" },
      { value: "2500", label: "2.500 Deutsche Likes - 124.99€", price: "124.99€" }
    ],
    // Facebook Packages
    "facebook-likes": [
      { value: "100", label: "100 Deutsche Seiten-Likes - 8.99€", price: "8.99€" },
      { value: "250", label: "250 Deutsche Seiten-Likes - 19.99€", price: "19.99€" },
      { value: "500", label: "500 Deutsche Seiten-Likes - 34.99€", price: "34.99€" },
      { value: "1000", label: "1.000 Deutsche Seiten-Likes - 59.99€", price: "59.99€" },
      { value: "2500", label: "2.500 Deutsche Seiten-Likes - 134.99€", price: "134.99€" }
    ],
    "facebook-followers": [
      { value: "100", label: "100 Deutsche Follower - 9.99€", price: "9.99€" },
      { value: "250", label: "250 Deutsche Follower - 21.99€", price: "21.99€" },
      { value: "500", label: "500 Deutsche Follower - 37.99€", price: "37.99€" },
      { value: "1000", label: "1.000 Deutsche Follower - 64.99€", price: "64.99€" }
    ],
    // Twitter Packages
    "twitter-followers": [
      { value: "100", label: "100 Deutsche Follower - 11.99€", price: "11.99€" },
      { value: "250", label: "250 Deutsche Follower - 24.99€", price: "24.99€" },
      { value: "500", label: "500 Deutsche Follower - 42.99€", price: "42.99€" },
      { value: "1000", label: "1.000 Deutsche Follower - 74.99€", price: "74.99€" },
      { value: "2500", label: "2.500 Deutsche Follower - 169.99€", price: "169.99€" }
    ],
    "twitter-likes": [
      { value: "100", label: "100 Deutsche Likes - 5.99€", price: "5.99€" },
      { value: "250", label: "250 Deutsche Likes - 12.99€", price: "12.99€" },
      { value: "500", label: "500 Deutsche Likes - 21.99€", price: "21.99€" },
      { value: "1000", label: "1.000 Deutsche Likes - 37.99€", price: "37.99€" }
    ],
    // Telegram Packages
    "telegram-members": [
      { value: "100", label: "100 Deutsche Mitglieder - 12.99€", price: "12.99€" },
      { value: "250", label: "250 Deutsche Mitglieder - 27.99€", price: "27.99€" },
      { value: "500", label: "500 Deutsche Mitglieder - 49.99€", price: "49.99€" },
      { value: "1000", label: "1.000 Deutsche Mitglieder - 89.99€", price: "89.99€" }
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
    if (selectedPlatform && selectedCategory && selectedPackage) {
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
    <section className="py-8 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <Card className="max-w-5xl mx-auto card-glass">
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

export default ExpandedQuickOrder;