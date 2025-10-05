import { ArrowRight, ShieldCheck, Zap, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: ShieldCheck,
      title: "Service auswählen",
      description: "Wählen Sie aus unserem umfangreichen Portfolio die perfekte Lösung für Ihre Social Media Ziele.",
      details: ["Über 50 verschiedene Services", "Alle großen Plattformen", "Transparente Preise"],
      color: "from-primary to-primary-variant"
    },
    {
      number: "02", 
      icon: Zap,
      title: "Blitzschnelle Bestellung",
      description: "Einfacher Bestellprozess ohne Registrierung. Sichere Zahlung und sofortige Bearbeitung.",
      details: ["Keine Registrierung nötig", "Sichere Zahlungsabwicklung", "Sofortige Bestellbestätigung"],
      color: "from-success to-success-variant"
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Organisches Wachstum",
      description: "Sehen Sie zu, wie Ihre Reichweite binnen 24 Stunden natürlich und nachhaltig wächst.",
      details: ["Lieferung innerhalb 24h", "100% echte Profile", "Nachhaltiges Wachstum"],
      color: "from-primary to-primary-glow"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="py-12 bg-gradient-to-br from-muted/30 via-background to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">So einfach geht's</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            In nur <span className="text-gradient-primary">3 Schritten</span> zum Erfolg
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unser bewährter Prozess garantiert Ihnen schnelle Ergebnisse und maximale Sicherheit.
            Keine versteckten Kosten, keine Komplikationen.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-10 transform translate-x-4">
                  <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-4 h-4 text-primary/60" />
                </div>
              )}
              
              <div className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-6 mt-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-card to-card-hover border border-border rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default HowItWorks;