import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const testimonials = [
    {
      name: "Michael K.",
      platform: "Instagram",
      service: "Follower + Likes",
      rating: 5,
      verified: true,
      text: "Unglaublicher Service! Mein Instagram-Account ist organisch und natürlich gewachsen. Die Follower sind echt und die Lieferung war super schnell.",
      results: "+2.500 Follower",
      date: "vor 3 Tagen"
    },
    {
      name: "Sabine L.",
      platform: "TikTok",
      service: "Views + Likes",
      rating: 5,
      verified: true,
      text: "Fantastische Ergebnisse! Meine TikTok-Inhalte sind dank SocialNova viral gegangen. Professioneller Service mit echtem Engagement von aktiven Nutzern.",
      results: "+50K Views",
      date: "vor 1 Woche"
    },
    {
      name: "Thomas R.",
      platform: "YouTube",
      service: "Abonnenten + Views",
      rating: 5,
      verified: true,
      text: "Endlich ein Anbieter, der seine Versprechen hält! Mein YouTube-Kanal wächst konstant. Exzellenter Support und echte Ergebnisse.",
      results: "+1.200 Abonnenten",
      date: "vor 5 Tagen"
    },
    {
      name: "Anna S.",
      platform: "Facebook",
      service: "Seiten-Likes",
      rating: 5,
      verified: true,
      text: "Perfekt für mein lokales Unternehmen! Mehr Likes haben mehr Vertrauen gebracht und letztendlich mehr Kunden. Eine großartige Investition.",
      results: "+800 Seiten-Likes",
      date: "vor 2 Wochen"
    },
    {
      name: "Markus W.",
      platform: "Instagram",
      service: "Story Views + Saves",
      rating: 5,
      verified: true,
      text: "Als Influencer ist Sichtbarkeit alles. SocialNova hat mir geholfen, meine Zielgruppe zu erreichen und authentische Kooperationen zu bekommen.",
      results: "+10K Story Views",
      date: "vor 4 Tagen"
    },
    {
      name: "Carlos M.",
      platform: "TikTok",
      service: "Follower + Shares",
      rating: 5,
      verified: true,
      text: "Schnell, diskret und effektiv. Meine Inhalte erreichen jetzt ein viel größeres Publikum. Die Investition hat sich in wenigen Tagen amortisiert.",
      results: "+3.200 Follower",
      date: "vor 6 Tagen"
    },
    {
      name: "Julia P.",
      platform: "YouTube",
      service: "Views + Kommentare",
      rating: 5,
      verified: true,
      text: "100% professioneller Service. Die Ergebnisse kamen schnell und die Qualität ist außergewöhnlich. Ich empfehle SocialNova wärmstens weiter!",
      results: "+15K Views",
      date: "vor 1 Woche"
    },
    {
      name: "Francesca R.",
      platform: "Instagram",
      service: "Follower + Engagement",
      rating: 5,
      verified: true,
      text: "Excellente Erfahrung! Mein Instagram-Profil hat jetzt viel mehr Glaubwürdigkeit. Die Follower sind aktiv und echt.",
      results: "+1.800 Follower",
      date: "vor 4 Tagen"
    }
  ];

  const stats = [
    { number: "25.000+", label: "Zufriedene Kunden" },
    { number: "99.8%", label: "Erfolgsrate" },
    { number: "24h", label: "Durchschnittliche Lieferzeit" },
    { number: "4.9/5", label: "Kundenbewertung" }
  ];

  return (
    <section id="testimonials" className="py-8 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Was unsere <span className="text-gradient-primary">Kunden sagen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Über 25.000 zufriedene Kunden vertrauen bereits auf SocialNova. 
            Lesen Sie echte Bewertungen und Erfolgsgeschichten.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, showAll ? testimonials.length : 3).map((testimonial, index) => (
            <Card 
              key={index} 
              className="card-service group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.platform} • {testimonial.date}
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {testimonial.service}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                {/* Results */}
                <div className="flex flex-col items-center space-y-2">
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer">
                    {testimonial.results}
                  </Badge>
                  <div className="text-xs text-muted-foreground text-center">
                    Verifizierte Bewertung
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && testimonials.length > 3 && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              size="lg"
              className="bg-gradient-to-r from-primary/5 to-success/5 border-primary/20 hover:from-primary/10 hover:to-success/10 hover:border-primary/40 transition-all duration-300 hover:scale-105"
            >
              <ChevronDown className="w-4 h-4 mr-2" />
              Weitere ansehen
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;