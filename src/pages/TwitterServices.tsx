import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceSelector from "@/components/ServiceSelector";
import PlatformCategorySummary from "@/components/PlatformCategorySummary";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { servicesByPlatform } from "@/lib/queries";
import CustomXIcon from "@/components/CustomXIcon";
import { Users, ThumbsUp, Repeat, Eye, Star, Heart, MessageCircle, BarChart3 } from "lucide-react";

const TwitterServices = () => {
  /* const services = [
    {
      name: "X Followers",
      icon: Users,
      description: "Echte, aktive Follower für nachhaltiges Wachstum",
      packages: [
        { amount: "100 Followers", price: "4.99", originalPrice: "9.99", delivery: "24h" },
        { amount: "250 Followers", price: "9.99", originalPrice: "19.99", delivery: "48h", popular: true },
        { amount: "500 Followers", price: "18.99", originalPrice: "37.99", delivery: "72h" },
        { amount: "1000 Followers", price: "34.99", originalPrice: "69.99", delivery: "96h" }
      ]
    },
    {
      name: "X Likes",
      icon: Heart,
      description: "Organische Likes für bessere Reichweite",
      packages: [
        { amount: "100 Likes", price: "2.99", originalPrice: "5.99", delivery: "12h" },
        { amount: "250 Likes", price: "4.99", originalPrice: "9.99", delivery: "24h", popular: true },
        { amount: "500 Likes", price: "9.99", originalPrice: "19.99", delivery: "24h" },
        { amount: "1000 Likes", price: "17.99", originalPrice: "35.99", delivery: "48h" }
      ]
    },
    {
      name: "X Retweets",
      icon: Repeat,
      description: "Virale Verbreitung durch authentische Retweets",
      packages: [
        { amount: "25 Retweets", price: "3.99", originalPrice: "7.99", delivery: "24h" },
        { amount: "50 Retweets", price: "6.99", originalPrice: "13.99", delivery: "24h", popular: true },
        { amount: "100 Retweets", price: "12.99", originalPrice: "25.99", delivery: "48h" },
        { amount: "250 Retweets", price: "29.99", originalPrice: "59.99", delivery: "72h" }
      ]
    },
    {
      name: "X Views",
      icon: Eye,
      description: "Mehr Sichtbarkeit für Ihre Inhalte",
      packages: [
        { amount: "5000 Videoaufrufe", price: "1.99", originalPrice: "3.99", delivery: "6h" },
        { amount: "10000 Videoaufrufe", price: "3.99", originalPrice: "7.99", delivery: "12h", popular: true },
        { amount: "25000 Impressions", price: "7.99", originalPrice: "15.99", delivery: "24h" },
        { amount: "50000 Impressions", price: "14.99", originalPrice: "29.99", delivery: "48h" }
      ]
    },
    {
      name: "X Comments",
      icon: MessageCircle,
      description: "Authentische Kommentare für mehr Engagement",
      packages: [
        { amount: "10 Comments", price: "4.99", originalPrice: "9.99", delivery: "24h" },
        { amount: "25 Comments", price: "9.99", originalPrice: "19.99", delivery: "48h", popular: true },
        { amount: "50 Comments", price: "18.99", originalPrice: "37.99", delivery: "72h" },
        { amount: "100 Comments", price: "34.99", originalPrice: "69.99", delivery: "96h" }
      ]
    }
  ]; */
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    client.fetch(servicesByPlatform, { slug: 'twitter' }).then((data) => {
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-800/5 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-slate-800/5 rounded-xl flex items-center justify-center">
                <CustomXIcon className="w-8 h-8 text-slate-800" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Steigern Sie Ihre X-Reichweite mit unseren professionellen Services. 
              Hochwertige Follower, Likes, Retweets und Views für organisches Wachstum.
            </p>
          </div>
        </div>
      </section>

      {/* Services Selector */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <ServiceSelector 
            services={services} 
            platformName="X" 
            platformColor="bg-slate-800" 
          />
          <div className="mt-16">
            <PlatformCategorySummary platformSlug="twitter" limit={4} />
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
              <div className="w-16 h-16 bg-slate-800/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CustomXIcon className="w-8 h-8 text-slate-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">X Experten</h3>
              <p className="text-muted-foreground">
                Spezialisiert auf X Marketing seit 2020
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

export default TwitterServices;