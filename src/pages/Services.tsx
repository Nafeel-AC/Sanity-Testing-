// src/pages/Services.tsx
import { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { allServicesQuery } from "@/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Instagram,
  Youtube,
  Music,
  Twitter,
  Facebook,
  MessageCircle,
  Linkedin
} from "lucide-react";

// Typisierung
type Tier = {
  quantity: number;
  normalpreis: number;
  aktionspreis?: number;
};

type Paket = {
  name: string;
  tiers: Tier[];
};

type Service = {
  _id: string;
  name: string;
  platform: string;
  description?: string;
  pakete?: Paket[];
};

// Plattform-Mapping für Icon + Farbe
const platformMeta: Record<
  string,
  { icon: any; color: string; bgColor: string; href: string }
> = {
  Instagram: { icon: Instagram, color: "from-pink-500 to-rose-500", bgColor: "bg-gradient-to-br from-pink-50 to-rose-50", href: "/instagram" },
  TikTok: { icon: Music, color: "from-black to-slate-800", bgColor: "bg-gradient-to-br from-slate-50 to-gray-50", href: "/tiktok" },
  YouTube: { icon: Youtube, color: "from-red-500 to-red-600", bgColor: "bg-gradient-to-br from-red-50 to-orange-50", href: "/youtube" },
  Facebook: { icon: Facebook, color: "from-blue-500 to-blue-600", bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50", href: "/facebook" },
  "Twitter/X": { icon: Twitter, color: "from-slate-800 to-black", bgColor: "bg-gradient-to-br from-slate-50 to-gray-50", href: "/twitter" },
  Telegram: { icon: MessageCircle, color: "from-blue-400 to-cyan-500", bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50", href: "/telegram" },
  LinkedIn: { icon: Linkedin, color: "from-blue-600 to-blue-800", bgColor: "bg-gradient-to-br from-blue-50 to-blue-100", href: "/linkedin" },
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(allServicesQuery)
      .then((data) => setServices(data))
      .catch((err) => console.error("Sanity fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center pt-32">Lade Services...</div>;
  if (!services.length) return <div className="text-center pt-32">Keine Services gefunden.</div>;

  // Services nach Plattform gruppieren
  const servicesByPlatform = services.reduce((acc, service) => {
    const platform = service.platform || "Sonstige";
    if (!acc[platform]) acc[platform] = [];
    acc[platform].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Unsere Services</h1>

        {Object.entries(servicesByPlatform).map(([platform, platformServices]) => {
          const meta = platformMeta[platform] || {
            icon: Instagram,
            color: "from-gray-500 to-gray-600",
            bgColor: "bg-gray-50",
            href: "#",
          };
          const Icon = meta.icon;

          return (
            <div key={platform} className="mb-12">
              <div className="flex items-center mb-6 space-x-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${meta.bgColor}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">{platform}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformServices.map((service) => (
                  <Card key={service._id} className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{service.description || "Keine Beschreibung"}</p>
                      {service.pakete?.map((paket) => (
                        <div key={paket.name} className="mb-2">
                          <span className="font-medium">{paket.name}:</span>
                          <ul className="text-xs ml-4 list-disc">
                            {paket.tiers.map((tier, idx) => (
                              <li key={idx}>
                                {tier.quantity} Stück – {tier.aktionspreis ?? tier.normalpreis} €
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
