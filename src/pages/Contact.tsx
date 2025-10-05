import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/4915123456789?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zu%20Ihren%20Services', '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-success/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="secondary">
                <MessageSquare className="w-4 h-4 mr-2" />
                24/7 Support
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient-hero">Kontakt</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Haben Sie Fragen? Unser Support-Team ist rund um die Uhr für Sie da.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Contact Form */}
              <Card className="card-service">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Send className="w-6 h-6 mr-2 text-primary" />
                    Nachricht senden
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Schreiben Sie uns eine Nachricht und wir melden uns innerhalb von 24 Stunden zurück.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Vorname</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Ihr Vorname"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nachname</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Ihr Nachname"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail Adresse</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="ihre.email@beispiel.de"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Betreff</Label>
                      <Input 
                        id="subject" 
                        placeholder="Worum geht es?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Ihre Nachricht</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Schreiben Sie uns Ihre Nachricht..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full btn-hero" size="lg">
                      <Send className="w-5 h-5 mr-2" />
                      Nachricht senden
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                
                {/* Quick Contact */}
                <Card className="card-service">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center">
                      <MessageCircle className="w-6 h-6 mr-2 text-success" />
                      Sofortige Hilfe
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={handleWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white" 
                      size="lg"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Chat öffnen
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">oder</p>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                      <Mail className="w-5 h-5 mr-2 text-primary" />
                      <a href="mailto:support@socialnova.eu" className="text-primary hover:underline font-medium">
                        support@socialnova.eu
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Details */}
                <Card className="card-service">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Kontaktinformationen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">E-Mail Support</h4>
                        <p className="text-muted-foreground mb-2">Für alle allgemeinen Anfragen</p>
                        <a href="mailto:support@socialnova.eu" className="text-primary hover:underline">
                          support@socialnova.eu
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Telefon Support</h4>
                        <p className="text-muted-foreground mb-2">Mo-Fr: 9:00-18:00 Uhr</p>
                        <a href="tel:+4915123456789" className="text-success hover:underline">
                          +49 151 234 567 89
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Antwortzeiten</h4>
                        <p className="text-muted-foreground">E-Mail: Innerhalb 24h</p>
                        <p className="text-muted-foreground">WhatsApp: Sofort</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Unternehmen</h4>
                        <p className="text-muted-foreground">SocialNova GmbH</p>
                        <p className="text-muted-foreground">Deutschland</p>
                      </div>
                    </div>

                  </CardContent>
                </Card>

                {/* FAQ Link */}
                <Card className="card-service">
                  <CardContent className="text-center py-8">
                    <h3 className="text-lg font-semibold mb-2">Häufige Fragen</h3>
                    <p className="text-muted-foreground mb-4">
                      Viele Antworten finden Sie bereits in unseren FAQ
                    </p>
                    <Button variant="outline" size="lg">
                      FAQ durchsuchen
                    </Button>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;