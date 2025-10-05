import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceSelector from "@/components/ServiceSelector";
import PlatformCategorySummary from "@/components/PlatformCategorySummary";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { servicesByPlatform } from "@/lib/queries";
import CustomTelegramIcon from "@/components/CustomTelegramIcon";
import { Users, MessageCircle, Star, Eye, UserPlus, Share } from "lucide-react";

const TelegramServices = () => {
  /* const services = [
    {
      name: "Channel / Group Members",
      icon: Users,
      description: "Echte, aktive Members für Ihre Telegram Kanäle und Gruppen",
      packages: [
        { amount: "100 Channel Members", price: "9.99", originalPrice: "19.99", delivery: "24h" },
        { amount: "250 Group Members", price: "19.99", originalPrice: "39.99", delivery: "48h", popular: true },
        { amount: "500 Channel Members", price: "34.99", originalPrice: "69.99", delivery: "72h" },
        { amount: "1000 Group Members", price: "64.99", originalPrice: "129.99", delivery: "96h" }
      ]
    },
    {
      name: "Post Views",
      icon: Eye,
      description: "Mehr Views für Ihre Telegram Posts und Kanäle",
      packages: [
        { amount: "1000 Post Views", price: "3.99", originalPrice: "7.99", delivery: "12h" },
        { amount: "5000 Channel Views", price: "14.99", originalPrice: "29.99", delivery: "24h", popular: true },
        { amount: "10000 Post Views", price: "24.99", originalPrice: "49.99", delivery: "48h" },
        { amount: "25000 Channel Views", price: "49.99", originalPrice: "99.99", delivery: "72h" }
      ]
    },
    {
      name: "Comments",
      icon: MessageCircle,
      description: "Authentische Kommentare für besseres Engagement",
      packages: [
        { amount: "50 Post Comments", price: "7.99", originalPrice: "15.99", delivery: "12h" },
        { amount: "100 Channel Comments", price: "16.99", originalPrice: "33.99", delivery: "24h", popular: true },
        { amount: "250 Post Comments", price: "29.99", originalPrice: "59.99", delivery: "48h" },
        { amount: "500 Channel Comments", price: "54.99", originalPrice: "109.99", delivery: "72h" }
      ]
    },
    {
      name: "Post Shares / Repost",
      icon: Share,
      description: "Shares und Reposts für virale Verbreitung Ihrer Inhalte",
      packages: [
        { amount: "50 Post Shares", price: "9.99", originalPrice: "19.99", delivery: "24h" },
        { amount: "100 Reposts", price: "17.99", originalPrice: "35.99", delivery: "48h", popular: true },
        { amount: "250 Post Shares", price: "39.99", originalPrice: "79.99", delivery: "72h" },
        { amount: "500 Reposts", price: "74.99", originalPrice: "149.99", delivery: "96h" }
      ]
    }
  ]; */
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    client.fetch(servicesByPlatform, { slug: 'telegram' }).then((data) => {
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#229ED9]/10 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-[#229ED9]/10 rounded-xl flex items-center justify-center">
                <CustomTelegramIcon className="w-8 h-8 text-[#229ED9]" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Erweitern Sie Ihre Telegram-Reichweite mit unseren professionellen Services. 
              Hochwertige Members, Views, Reactions und Shares für organisches Wachstum.
            </p>
          </div>
        </div>
      </section>

      {/* Services Selector */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <ServiceSelector 
            services={services} 
            platformName="Telegram" 
            platformColor="bg-[#229ED9]" 
          />
          <div className="mt-16">
            <PlatformCategorySummary platformSlug="telegram" limit={4} />
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
              <div className="w-16 h-16 bg-[#229ED9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CustomTelegramIcon className="w-8 h-8 text-[#229ED9]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Telegram Experten</h3>
              <p className="text-muted-foreground">
                Spezialisiert auf Telegram Marketing seit 2020
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

export default TelegramServices;