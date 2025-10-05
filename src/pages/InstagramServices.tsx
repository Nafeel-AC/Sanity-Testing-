import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServiceSelector from "@/components/ServiceSelector";
import PlatformCategorySummary from "@/components/PlatformCategorySummary";
import { Users, Eye, MessageCircle, Bookmark, Share, Instagram, Star, Heart, UserPlus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { servicesByPlatform } from "@/lib/queries";

const InstagramServices = () => {
  // Hardcoded services retained for reference; replaced by CMS fetch below
  /* const services = [
    {
      name: "Instagram Followers",
      icon: Users,
      description: "Deutsche, aktive Follower für nachhaltiges Wachstum",
      packages: [
        { amount: "100 Followers", price: "7.99", originalPrice: "15.99", delivery: "24h" },
        { amount: "250 Followers", price: "12.99", originalPrice: "25.99", delivery: "24h" },
        { amount: "500 Followers", price: "19.99", originalPrice: "39.99", delivery: "24h", popular: true },
        { amount: "1000 Followers", price: "34.99", originalPrice: "69.99", delivery: "48h" }
      ]
    },
    {
      name: "Instagram Likes",
      icon: Heart,
      description: "Deutsche Likes für bessere Reichweite und Engagement",
      packages: [
        { amount: "100 Likes", price: "3.99", originalPrice: "7.99", delivery: "6h" },
        { amount: "250 Likes", price: "7.99", originalPrice: "15.99", delivery: "12h" },
        { amount: "500 Likes", price: "12.99", originalPrice: "25.99", delivery: "12h", popular: true },
        { amount: "1000 Likes", price: "19.99", originalPrice: "39.99", delivery: "24h" }
      ]
    },
    {
      name: "Instagram Comments",
      icon: MessageCircle,
      description: "Deutsche Kommentare von echten Profilen",
      packages: [
        { amount: "10 Emoji Comments", price: "9.99", originalPrice: "19.99", delivery: "24h" },
        { amount: "25 Random Comments", price: "14.99", originalPrice: "29.99", delivery: "24h", popular: true },
        { amount: "50 Male Comments", price: "24.99", originalPrice: "49.99", delivery: "48h" },
        { amount: "50 Female Comments", price: "24.99", originalPrice: "49.99", delivery: "48h" }
      ]
    },
    {
      name: "Instagram Shares",
      icon: Share,
      description: "Shares für virale Verbreitung Ihrer Inhalte",
      packages: [
        { amount: "100 Shares", price: "9.99", originalPrice: "19.99", delivery: "12h" },
        { amount: "250 Shares", price: "19.99", originalPrice: "39.99", delivery: "24h", popular: true },
        { amount: "500 Shares", price: "34.99", originalPrice: "69.99", delivery: "24h" },
        { amount: "1000 Shares", price: "64.99", originalPrice: "129.99", delivery: "48h" }
      ]
    },
    {
      name: "Instagram Save",
      icon: Bookmark,
      description: "Speicherungen für höhere Reichweite im Algorithmus",
      packages: [
        { amount: "100 Saves", price: "7.99", originalPrice: "15.99", delivery: "12h" },
        { amount: "250 Saves", price: "16.99", originalPrice: "33.99", delivery: "24h", popular: true },
        { amount: "500 Saves", price: "29.99", originalPrice: "59.99", delivery: "24h" },
        { amount: "1000 Saves", price: "54.99", originalPrice: "109.99", delivery: "48h" }
      ]
    },
    {
      name: "Instagram Views",
      icon: Eye,
      description: "Mehr Views für Ihre Stories, Reels und Live Streams",
      packages: [
        { amount: "1000 Story Views", price: "2.99", originalPrice: "5.99", delivery: "3h" },
        { amount: "5000 Reel Views", price: "9.99", originalPrice: "19.99", delivery: "6h", popular: true },
        { amount: "10000 Live Stream Views", price: "17.99", originalPrice: "35.99", delivery: "12h" },
        { amount: "25000 Story Views", price: "39.99", originalPrice: "79.99", delivery: "24h" }
      ]
    },
    {
      name: "Instagram Channel Members",
      icon: UserPlus,
      description: "Channel Members für Ihren Instagram Kanal",
      packages: [
        { amount: "50 Channel Members", price: "19.99", originalPrice: "39.99", delivery: "48h" },
        { amount: "100 Channel Members", price: "34.99", originalPrice: "69.99", delivery: "72h", popular: true },
        { amount: "250 Channel Members", price: "74.99", originalPrice: "149.99", delivery: "96h" },
        { amount: "500 Channel Members", price: "134.99", originalPrice: "269.99", delivery: "7 Tage" }
      ]
    },
    {
      name: "Instagram Direct Message",
      icon: Send,
      description: "Direkte Nachrichten für persönliches Engagement",
      packages: [
        { amount: "10 Direct Messages", price: "12.99", originalPrice: "25.99", delivery: "24h" },
        { amount: "25 Direct Messages", price: "24.99", originalPrice: "49.99", delivery: "48h", popular: true },
        { amount: "50 Direct Messages", price: "44.99", originalPrice: "89.99", delivery: "72h" },
        { amount: "100 Direct Messages", price: "79.99", originalPrice: "159.99", delivery: "96h" }
      ]
    }
  ]; */

  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    client.fetch(servicesByPlatform, { slug: 'instagram' }).then((data) => {
      const mapped = (data || []).map((svc: any) => ({
        name: svc.name,
        icon: Users, // Keep UI icon mapping; not stored in CMS
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-pink-500/10 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-pink-500/10 rounded-xl flex items-center justify-center">
                <Instagram className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Steigern Sie Ihre Instagram-Reichweite mit unseren professionellen Services. 
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
            platformName="Instagram" 
            platformColor="bg-pink-500" 
          />
          <div className="mt-16">
            <PlatformCategorySummary platformSlug="instagram" limit={4} />
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
              <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instagram Experten</h3>
              <p className="text-muted-foreground">
                Spezialisiert auf Instagram Marketing seit 2020
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

export default InstagramServices;