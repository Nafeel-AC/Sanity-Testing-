import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open('https://wa.me/4915123456789?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zu%20Ihren%20Services', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:support@socialnova.eu?subject=Support Anfrage&body=Hallo,%0D%0A%0D%0AIch habe eine Frage zu Ihren Services...', '_blank');
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 text-white animate-pulse-glow border-2 border-white"
          size="sm"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-36 md:bottom-32 right-6 z-40 w-80 animate-slide-up">
          <Card className="card-glass border shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4 relative">
              <Button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full hover:bg-muted/50 bg-white/80"
                variant="ghost"
              >
                <X className="w-4 h-4" />
              </Button>
              <CardTitle className="text-lg font-semibold flex items-center pr-8">
                <MessageCircle className="w-5 h-5 mr-2 text-success" />
                Wie können wir helfen?
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Unser Support-Team ist 24/7 für Sie da
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Button
                onClick={handleWhatsApp}
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white py-8"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">WhatsApp Chat</div>
                  <div className="text-xs opacity-90">Sofortige Antwort</div>
                </div>
              </Button>
              
              <Link to="/contact" className="w-full">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="w-full justify-start py-8 border-2 hover:border-primary/50"
                  size="lg"
                >
                  <Mail className="w-5 h-5 mr-4" />
                  <div className="text-left">
                    <div className="font-semibold">Kontakt aufnehmen</div>
                    <div className="text-xs text-muted-foreground">Formular ausfüllen</div>
                  </div>
                </Button>
              </Link>
              
              <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground">
                  📧 support@socialnova.eu
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default LiveChat;