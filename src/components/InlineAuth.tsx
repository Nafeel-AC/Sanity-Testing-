import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InlineAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const InlineAuth = ({ isOpen, onClose }: InlineAuthProps) => {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);

      if (error) {
        if (error.message === 'Invalid login credentials') {
          toast.error('Ungültige E-Mail oder Passwort');
        } else if (error.message === 'Email not confirmed') {
          toast.error('Bitte bestätigen Sie Ihre E-Mail-Adresse');
        } else {
          toast.error('Anmeldung fehlgeschlagen: ' + error.message);
        }
      } else {
        toast.success('Erfolgreich angemeldet!');
        onClose();
        setLoginData({ email: '', password: '' });
      }
    } catch (error) {
      toast.error('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile: Full-width overlay */}
      <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="md:hidden fixed inset-x-4 top-1/2 -translate-y-1/2 z-50">
        <Card className="bg-background border border-border shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Anmelden</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile-email">E-Mail / Benutzername</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="mobile-email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile-password">Passwort</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="mobile-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ihr Passwort"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wird angemeldet...' : 'Anmelden'}
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  Kein Konto?{' '}
                  <Link 
                    to="/auth" 
                    className="text-primary hover:underline font-medium"
                    onClick={onClose}
                  >
                    Jetzt erstellen
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Desktop: Dropdown */}
      <div className="hidden md:block absolute top-full right-0 mt-2 w-[500px] z-50">
        <Card className="bg-background border border-border shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Anmelden</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="desktop-email">E-Mail / Benutzername</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="desktop-email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desktop-password">Passwort</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="desktop-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ihr Passwort"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 h-12" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wird angemeldet...' : 'Anmelden'}
              </Button>

              {/* Social Login Options */}
              <div className="flex items-center justify-center space-x-4 py-4 border-t border-border">
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-black hover:bg-gray-800 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.128-1.507-.703-2.448-2.906-2.448-4.676 0-3.808 2.762-7.308 7.963-7.308 4.187 0 7.432 2.98 7.432 6.965 0 4.153-2.62 7.497-6.254 7.497-1.224 0-2.357-.638-2.75-1.378 0 0-.599 2.282-.744 2.84-.269 1.026-.996 2.315-1.483 3.097C9.095 23.667 10.532 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-[#1877F2] hover:bg-[#166FE5] rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-black hover:bg-gray-800 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  Kein Konto?{' '}
                  <Link 
                    to="/auth" 
                    className="text-primary hover:underline font-medium"
                    onClick={onClose}
                  >
                    Jetzt erstellen
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InlineAuth;