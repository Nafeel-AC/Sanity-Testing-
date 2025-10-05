import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, ShoppingCart as ShoppingCartIcon, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  platform: string;
  service: string;
  package: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      platform: 'Instagram',
      service: 'Likes',
      package: '1.000 Likes',
      price: 8.99,
      quantity: 1
    },
    {
      id: '2', 
      platform: 'TikTok',
      service: 'Views',
      package: '5.000 Views',
      price: 4.99,
      quantity: 2
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full lg:w-96 bg-card border-l border-border z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Card className="h-full rounded-none border-0 flex flex-col">
          
          {/* Header */}
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center">
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                Warenkorb
                {cartItems.length > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    {getTotalItems()}
                  </Badge>
                )}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="flex-1 overflow-y-auto px-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ihr Warenkorb ist leer</h3>
                <p className="text-muted-foreground mb-6">
                  Fügen Sie Services hinzu, um loszulegen
                </p>
                <Button onClick={onClose} variant="outline">
                  Weiter einkaufen
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.platform}
                          </Badge>
                          <span className="text-sm font-medium">{item.service}</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {item.package}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">
                              {(item.price * item.quantity).toFixed(2)}€
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.price.toFixed(2)}€ je Stück
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="ml-2 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="flex-shrink-0 border-t border-border p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Zwischensumme:</span>
                  <span>{getTotalPrice().toFixed(2)}€</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Versand:</span>
                  <span className="text-success">Kostenlos</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>Gesamt:</span>
                  <span className="text-primary">{getTotalPrice().toFixed(2)}€</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full btn-hero" size="lg">
                  Zur Kasse ({getTotalPrice().toFixed(2)}€)
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onClose}
                >
                  Weiter einkaufen
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  ✓ Sichere Bezahlung • ✓ Sofortige Lieferung • ✓ 30 Tage Geld-zurück
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default ShoppingCart;