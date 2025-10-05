import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceSelector from "@/components/ServiceSelector";
import PlatformCategorySummary from "@/components/PlatformCategorySummary";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { servicesByPlatform } from "@/lib/queries";
import { LinkedInIcon } from "@/components/SocialMediaIcons";
import { Users, MessageCircle, Star, ThumbsUp, Share, Smile } from "lucide-react";

const LinkedInServices = () => {
  /* const services = [
    {
      name: "LinkedIn Follower",
      icon: Users,
      description: "Erhöhe deine berufliche Reichweite mit echten LinkedIn Followern",
      packages: [
        { amount: "100 Unternehmensseiten-Follower", price: "12.99", originalPrice: "25.99", delivery: "48h" },
        { amount: "100 Profil-Follower", price: "9.99", originalPrice: "19.99", delivery: "48h" },
        { amount: "100 Mitglieder in Gruppen", price: "14.99", originalPrice: "29.99", delivery: "72h" },
        { amount: "500 Profil-Follower", price: "24.99", originalPrice: "49.99", delivery: "72h", popular: true },
        { amount: "1000 Profil-Follower", price: "39.99", originalPrice: "79.99", delivery: "96h" },
        { amount: "2500 Profil-Follower", price: "79.99", originalPrice: "159.99", delivery: "7 Tage" }
      ]
    },
    {
      name: "LinkedIn Likes",
      icon: ThumbsUp,
      description: "Steigere das Engagement deiner beruflichen Posts mit Beitrags-Gefällt mir",
      packages: [
        { amount: "50 Beitrags-Gefällt mir", price: "4.99", originalPrice: "9.99", delivery: "24h" },
        { amount: "200 Beitrags-Gefällt mir", price: "12.99", originalPrice: "25.99", delivery: "24h", popular: true },
        { amount: "500 Beitrags-Gefällt mir", price: "24.99", originalPrice: "49.99", delivery: "48h" },
        { amount: "1000 Beitrags-Gefällt mir", price: "39.99", originalPrice: "79.99", delivery: "72h" }
      ]
    },
    {
      name: "LinkedIn Shares",
      icon: Share,
      description: "Erweitere die Reichweite deiner Beiträge durch authentische Shares",
      packages: [
        { amount: "25 Beitrag teilen", price: "9.99", originalPrice: "19.99", delivery: "24h" },
        { amount: "50 Beitrag teilen", price: "17.99", originalPrice: "35.99", delivery: "48h", popular: true },
        { amount: "100 Beitrag teilen", price: "29.99", originalPrice: "59.99", delivery: "48h" },
        { amount: "250 Beitrag teilen", price: "59.99", originalPrice: "119.99", delivery: "72h" }
      ]
    },
    {
      name: "LinkedIn Comments",
      icon: MessageCircle,
      description: "Generiere professionelle Diskussionen unter deinen Posts",
      packages: [
        { amount: "5 Kommentar", price: "9.99", originalPrice: "19.99", delivery: "48h" },
        { amount: "5 Kommentar (weiblich)", price: "12.99", originalPrice: "25.99", delivery: "48h" },
        { amount: "5 Kommentar (männlich)", price: "12.99", originalPrice: "25.99", delivery: "48h" },
        { amount: "10 Kommentar", price: "17.99", originalPrice: "35.99", delivery: "48h", popular: true },
        { amount: "25 Kommentar", price: "34.99", originalPrice: "69.99", delivery: "72h" },
        { amount: "50 Kommentar", price: "59.99", originalPrice: "119.99", delivery: "96h" }
      ]
    },
    {
      name: "LinkedIn Reactions",
      icon: Smile,
      description: "Erhöhe das Engagement mit authentischen Reaktionen auf deine Beiträge",
      packages: [
        { amount: "50 Reactions", price: "6.99", originalPrice: "13.99", delivery: "24h" },
        { amount: "200 Reactions", price: "16.99", originalPrice: "33.99", delivery: "24h", popular: true },
        { amount: "500 Reactions", price: "34.99", originalPrice: "69.99", delivery: "48h" },
        { amount: "1000 Reactions", price: "59.99", originalPrice: "119.99", delivery: "72h" }
      ]
    }
  ]; */
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    client.fetch(servicesByPlatform, { slug: 'linkedin' }).then((data) => {
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#0A66C2]/10 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-[#0A66C2]/10 rounded-xl flex items-center justify-center">
                <LinkedInIcon className="w-8 h-8" color="#0A66C2" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stärke deine berufliche Präsenz und erweitere dein professionelles Netzwerk
              mit unseren hochwertigen LinkedIn Services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Selector */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <ServiceSelector 
            services={services} 
            platformName="LinkedIn" 
            platformColor="bg-[#0A66C2]" 
          />
          <div className="mt-16">
            <PlatformCategorySummary platformSlug="linkedin" limit={4} />
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
              <div className="w-16 h-16 bg-[#0A66C2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkedInIcon className="w-8 h-8" color="#0A66C2" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn Experten</h3>
              <p className="text-muted-foreground">
                Spezialisiert auf LinkedIn Marketing seit 2020
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

export default LinkedInServices;