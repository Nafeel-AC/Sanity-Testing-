import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceSelector from "@/components/ServiceSelector";
import PlatformCategorySummary from "@/components/PlatformCategorySummary";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { servicesByPlatform } from "@/lib/queries";
import TikTokIcon from "@/components/TikTokIcon";
import { Users, Eye, MessageCircle, Share, Bookmark, Star, Heart } from "lucide-react";

const TikTokServices = () => {
  /* const services = [
    {
      name: "Follower",
      icon: Users,
      description: "Echte, aktive Follower für nachhaltiges Wachstum",
      packages: [
        { amount: "1000 Follower", price: "12.99", originalPrice: "24.99", delivery: "24h" },
        { amount: "2500 Follower", price: "24.99", originalPrice: "49.99", delivery: "48h", popular: true },
        { amount: "5000 Follower", price: "44.99", originalPrice: "89.99", delivery: "72h" },
        { amount: "10000 Follower", price: "84.99", originalPrice: "169.99", delivery: "96h" }
      ]
    },
    {
      name: "Likes",
      icon: Heart,
      description: "Organische Likes für bessere Reichweite",
      packages: [
        { amount: "2500 Post Likes", price: "7.99", originalPrice: "15.99", delivery: "12h" },
        { amount: "5000 Post Likes", price: "14.99", originalPrice: "29.99", delivery: "24h", popular: true },
        { amount: "10000 Ads Likes", price: "24.99", originalPrice: "49.99", delivery: "24h" },
        { amount: "25000 Post Likes", price: "49.99", originalPrice: "99.99", delivery: "48h" }
      ]
    },
    {
      name: "Comments",
      icon: MessageCircle,
      description: "Authentische Kommentare von echten Profilen",
      packages: [
        { amount: "25 Emoji Comments", price: "12.99", originalPrice: "24.99", delivery: "24h" },
        { amount: "50 Random Comments", price: "22.99", originalPrice: "44.99", delivery: "24h", popular: true },
        { amount: "100 Emoji Comments", price: "39.99", originalPrice: "79.99", delivery: "48h" },
        { amount: "250 Random Comments", price: "79.99", originalPrice: "159.99", delivery: "72h" }
      ]
    },
    {
      name: "Views",
      icon: Eye,
      description: "Mehr Views für Ihre Videos und Live Streams", 
      packages: [
        { amount: "10000 Video Views", price: "4.99", originalPrice: "9.99", delivery: "6h" },
        { amount: "25000 Video Views", price: "9.99", originalPrice: "19.99", delivery: "12h", popular: true },
        { amount: "50000 Live Stream Views", price: "17.99", originalPrice: "34.99", delivery: "24h" },
        { amount: "100000 Video Views", price: "32.99", originalPrice: "64.99", delivery: "48h" }
      ]
    },
    {
      name: "Saves",
      icon: Bookmark,
      description: "Speicherungen für höhere Reichweite im Algorithmus",
      packages: [
        { amount: "100 Saves", price: "9.99", originalPrice: "19.99", delivery: "12h" },
        { amount: "250 Saves", price: "19.99", originalPrice: "39.99", delivery: "24h", popular: true },
        { amount: "500 Saves", price: "34.99", originalPrice: "69.99", delivery: "24h" },
        { amount: "1000 Saves", price: "64.99", originalPrice: "129.99", delivery: "48h" }
      ]
    },
    {
      name: "Shares",
      icon: Share,
      description: "Shares für virale Verbreitung Ihrer Videos",
      packages: [
        { amount: "100 Shares", price: "8.99", originalPrice: "17.99", delivery: "12h" },
        { amount: "250 Shares", price: "18.99", originalPrice: "37.99", delivery: "24h", popular: true },
        { amount: "500 Shares", price: "32.99", originalPrice: "65.99", delivery: "24h" },
        { amount: "1000 Shares", price: "59.99", originalPrice: "119.99", delivery: "48h" }
      ]
    }
  ]; */
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    client.fetch(servicesByPlatform, { slug: 'tiktok' }).then((data) => {
      const mapped = (data || []).map((svc: any) => ({
        name: svc.name,
        icon: Users,
        description: svc.description,
        packages: (svc.pakete?.[0]?.tiers || []).map((t: any) => ({
          amount: t.amount,
          price: String(t.salePrice ?? ''),
          originalPrice: String(t.normalPrice ?? ''),
          delivery: t.delivery,
          popular: !!t.popular,
        }))
      }));
      setServices(mapped);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-28">{/* Account for fixed header */}
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-black/5 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-black/5 rounded-xl flex items-center justify-center">
                <TikTokIcon className="w-8 h-8 text-black" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Steigern Sie Ihre TikTok-Reichweite mit unseren professionellen Services. 
              Hochwertige Follower, Likes, Views und Kommentare für organisches Wachstum.
            </p>
          </div>
        </div>
      </section>

      {/* Services Selector */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <ServiceSelector 
            services={services} 
            platformName="TikTok" 
            platformColor="bg-black" 
          />
          <div className="mt-16">
            <PlatformCategorySummary platformSlug="tiktok" limit={4} />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warum SocialNova?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vertrauen Sie auf unsere Erfahrung und Expertise im Social Media Marketing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Qualität</h3>
              <p className="text-muted-foreground">
                Nur echte, aktive Profile für nachhaltiges Wachstum
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">25.000+ Kunden</h3>
              <p className="text-muted-foreground">
                Vertrauen bereits auf unsere Services
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TikTokIcon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">TikTok Experten</h3>
              <p className="text-muted-foreground">
                Spezialisiert auf TikTok Marketing seit 2020
              </p>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </div>
  );
};

export default TikTokServices;