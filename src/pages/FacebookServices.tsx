import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceSelector from "@/components/ServiceSelector";
import PlatformCategorySummary from "@/components/PlatformCategorySummary";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { servicesByPlatform } from "@/lib/queries";
import CustomFacebookIcon from "@/components/CustomFacebookIcon";
import { Users, ThumbsUp, Eye, MessageCircle, UserPlus, Share, Star } from "lucide-react";

const FacebookServices = () => {
  /* const services = [
    {
      name: "Followers",
      icon: Users,
      description: "Echte Follower für Ihr Facebook-Profil",
      packages: [
        { amount: "Seitenabonnenten", price: "14.99", originalPrice: "29.99", delivery: "24h" },
        { amount: "Profilabonnenten", price: "24.99", originalPrice: "49.99", delivery: "48h", popular: true }
      ]
    },
    {
      name: "Likes / Reactions",
      icon: ThumbsUp,
      description: "Organische Likes und Reaktionen für bessere Reichweite",
      packages: [
        { amount: "Seitenlikes", price: "7.99", originalPrice: "15.99", delivery: "12h" },
        { amount: "Emoji-Reaktionen", price: "14.99", originalPrice: "29.99", delivery: "24h", popular: true },
        { amount: "Kommentar Likes", price: "12.99", originalPrice: "24.99", delivery: "24h" },
        { amount: "Post Likes", price: "9.99", originalPrice: "19.99", delivery: "12h" }
      ]
    },
    {
      name: "Group Members",
      icon: UserPlus,
      description: "Aktive Mitglieder für Ihre Facebook-Gruppe",
      packages: [
        { amount: "100", price: "19.99", originalPrice: "39.99", delivery: "48h" },
        { amount: "250", price: "44.99", originalPrice: "89.99", delivery: "72h", popular: true },
        { amount: "500", price: "84.99", originalPrice: "169.99", delivery: "96h" }
      ]
    },
    {
      name: "Views",
      icon: Eye,
      description: "Mehr Views für Ihre Videos und Livestreams",
      packages: [
        { amount: "Video/Reel aufrufe", price: "9.99", originalPrice: "19.99", delivery: "24h" },
        { amount: "Livestream aufrufe", price: "17.99", originalPrice: "34.99", delivery: "48h", popular: true }
      ]
    },
    {
      name: "Comments",
      icon: MessageCircle,
      description: "Authentische Kommentare von echten Profilen",
      packages: [
        { amount: "25", price: "17.99", originalPrice: "34.99", delivery: "48h" },
        { amount: "50", price: "29.99", originalPrice: "59.99", delivery: "48h", popular: true },
        { amount: "100", price: "54.99", originalPrice: "109.99", delivery: "72h" }
      ]
    }
  ]; */
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    client.fetch(servicesByPlatform, { slug: 'facebook' }).then((data) => {
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-600/10 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-blue-600/10 rounded-xl flex items-center justify-center">
                <CustomFacebookIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Steigern Sie Ihre Facebook-Reichweite mit unseren professionellen Services. 
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
            platformName="Facebook" 
            platformColor="bg-blue-600" 
          />
          <div className="mt-16">
            <PlatformCategorySummary platformSlug="facebook" limit={4} />
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
              <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CustomFacebookIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Facebook Experten</h3>
              <p className="text-muted-foreground">
                Spezialisiert auf Facebook Marketing seit 2020
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

export default FacebookServices;