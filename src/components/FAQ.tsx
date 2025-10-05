import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Ist der Service legal und sicher?",
      answer: "Ja, absolut. Alle unsere Services entsprechen den Nutzungsbedingungen der jeweiligen Plattformen und sind vollständig DSGVO-konform. Wir arbeiten ausschließlich mit echten, aktiven Profilen und verwenden keine Bots oder gefälschte Accounts."
    },
    {
      question: "Wie schnell werden die Services geliefert?",
      answer: "Die meisten Services werden innerhalb von 24 Stunden geliefert. Premium-Kunden erhalten ihre Bestellungen sogar innerhalb von 12 Stunden. Bei größeren Bestellungen kann die Lieferung bis zu 72 Stunden dauern, um ein natürliches Wachstum zu gewährleisten."
    },
    {
      question: "Bekomme ich echte Follower und Likes?",
      answer: "Ja, wir liefern ausschließlich echte Follower, Likes und andere Interaktionen von aktiven Nutzern. Alle Profile sind authentisch und entsprechen den Qualitätsstandards der sozialen Netzwerke."
    },
    {
      question: "Was passiert, wenn Follower oder Likes wieder verschwinden?",
      answer: "Wir bieten eine 30-Tage-Retention-Garantie auf alle unsere Services. Sollten innerhalb dieser Zeit Follower oder Likes verloren gehen, ersetzen wir diese kostenlos. Bei unseren Premium-Paketen gilt sogar eine lebenslange Garantie."
    },
    {
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer: "Wir akzeptieren alle gängigen Zahlungsmethoden: Kreditkarten (Visa, Mastercard), PayPal, SEPA-Lastschrift, Sofortüberweisung und Kryptowährungen. Alle Zahlungen sind SSL-verschlüsselt und sicher."
    },
    {
      question: "Benötigen Sie mein Passwort?",
      answer: "Nein, niemals! Wir benötigen ausschließlich Ihren Benutzernamen oder die URL Ihres Profils. Geben Sie niemals Ihr Passwort an Dritte weiter. Seriöse Anbieter fragen nie nach Ihren Login-Daten."
    },
    {
      question: "Kann ich meine Bestellung stornieren?",
      answer: "Ja, Sie können Ihre Bestellung innerhalb von 30 Minuten nach der Bestellung kostenfrei stornieren, solange die Bearbeitung noch nicht begonnen hat. Nach Beginn der Bearbeitung ist eine Stornierung leider nicht mehr möglich."
    },
    {
      question: "Gibt es eine Geld-zurück-Garantie?",
      answer: "Ja, wir bieten eine 14-Tage-Geld-zurück-Garantie. Wenn Sie mit unserem Service nicht zufrieden sind, erstatten wir Ihnen den vollen Kaufpreis zurück. Kontaktieren Sie einfach unseren Kundenservice."
    },
    {
      question: "Wie kann ich den Support kontaktieren?",
      answer: "Unser Kundenservice ist 24/7 für Sie da. Sie erreichen uns per E-Mail, Live-Chat auf der Website oder über unser Ticket-System. Premium-Kunden erhalten zusätzlich einen persönlichen Account Manager."
    },
    {
      question: "Arbeiten Sie auch mit Unternehmen zusammen?",
      answer: "Ja, wir bieten spezielle Enterprise-Lösungen für Unternehmen, Agenturen und Influencer. Diese umfassen maßgeschneiderte Pakete, White-Label-Services und dedizierte Account Manager. Kontaktieren Sie uns für ein individuelles Angebot."
    }
  ];

  return (
    <section id="faq" className="py-12 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Häufig gestellte <span className="text-gradient-primary">Fragen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hier finden Sie Antworten auf die wichtigsten Fragen zu unseren Services. 
            Sollten Sie weitere Fragen haben, kontaktieren Sie gerne unseren Support.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-service animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:text-primary transition-colors duration-200 px-3 md:px-4 py-2 md:py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed px-3 md:px-4 pb-3 md:pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section - Complete Redesign */}
        <div className="text-center mt-16">
          <div className="relative">
            <div className="bg-gradient-to-br from-card via-card-hover to-card rounded-3xl p-8 md:p-12 border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in" style={{ animationDelay: "1s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 rounded-3xl opacity-50"></div>
              <div className="relative z-10">
                {/* Enhanced 3D Circle */}
                <div className="w-20 h-20 mx-auto mb-8 relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary-glow to-success-light rounded-full shadow-2xl animate-pulse-glow group relative overflow-hidden border-4 border-white/30 hover:border-white/50 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-primary/60 via-success-light/40 to-primary-glow/60 animate-flow-color rounded-full"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-primary-glow/80 via-success-light/60 to-primary/80 rounded-full shadow-inner"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-full"></div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/50 via-success-light/50 to-primary/50 rounded-full blur-xl opacity-80 animate-pulse"></div>
                </div>

                <h3 className="text-4xl font-bold mb-6 text-foreground">
                  Noch Fragen?
                </h3>
                <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
                  Unser Expert*innen-Team steht Ihnen rund um die Uhr zur Verfügung und beantwortet gerne all Ihre Fragen persönlich.
                </p>

                {/* Buttons with Identical Sizing */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <Button 
                    className="btn-hero flex items-center justify-center h-12 px-6 text-base font-semibold w-full sm:w-48"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <Mail className="w-5 h-5 mr-2" strokeWidth={2} />
                    <span>Jetzt kontaktieren</span>
                  </Button>

                  <a 
                    href="https://wa.me/491234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-hero inline-flex items-center justify-center h-12 px-6 text-base font-semibold w-full sm:w-48"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.58-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                    </svg>
                    <span>WhatsApp Chat</span>
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-border/30">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Sofortige Antwort</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Kostenlose Beratung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;