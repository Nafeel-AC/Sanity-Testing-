import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signIn, signUp, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Get the mode from URL params, default to "login"
  const mode = searchParams.get('mode') === 'signup' ? 'register' : 'login';

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
        navigate('/');
      }
    } catch (error) {
      toast.error('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      setIsSubmitting(false);
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('Passwort muss mindestens 6 Zeichen lang sein');
      setIsSubmitting(false);
      return;
    }

    if (!registerData.acceptTerms) {
      toast.error('Bitte akzeptieren Sie die AGB & Datenschutzerklärung');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await signUp(registerData.email, registerData.password, {
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        username: registerData.username,
        phone: registerData.phone
      });

      if (error) {
        if (error.message === 'User already registered') {
          toast.error('Ein Konto mit dieser E-Mail-Adresse existiert bereits');
        } else if (error.message?.includes('username')) {
          toast.error('Dieser Benutzername ist bereits vergeben');
        } else {
          toast.error('Registrierung fehlgeschlagen: ' + error.message);
        }
      } else {
        toast.success('Registrierung erfolgreich! Bitte prüfen Sie Ihre E-Mails zur Bestätigung.');
        // Reset form
        setRegisterData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false
        });
      }
    } catch (error) {
      toast.error('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-md md:max-w-lg lg:max-w-xl px-0 sm:px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient-primary mb-4">
              Willkommen zurück
            </h1>
            <p className="text-muted-foreground">
              Melden Sie sich an oder erstellen Sie ein neues Konto
            </p>
          </div>

          <Card className="card-glass shadow-2xl w-full mx-0 sm:mx-auto rounded-none sm:rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Anmeldung</CardTitle>
              <CardDescription>
                Wählen Sie Anmeldung oder Registrierung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={mode} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Anmelden</TabsTrigger>
                  <TabsTrigger value="register">Registrieren</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gradient-primary mb-2">Anmeldung</h2>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">E-Mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-email"
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
                      <Label htmlFor="login-password">Passwort</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-password"
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
                      className="btn-hero w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Wird angemeldet...' : 'Anmelden'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gradient-primary mb-2">Registrieren</h2>
                  </div>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Vorname</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Max"
                            value={registerData.firstName}
                            onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nachname</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Mustermann"
                            value={registerData.lastName}
                            onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Benutzername</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="maxmustermann"
                          value={registerData.username}
                          onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">E-Mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="max@beispiel.de"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefonnummer (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+49 123 456789"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Passwort</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mindestens 6 Zeichen"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Passwort wiederholen"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={registerData.acceptTerms}
                        onCheckedChange={(checked) => 
                          setRegisterData({...registerData, acceptTerms: !!checked})
                        }
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        Ich akzeptiere die{' '}
                        <a href="/terms" className="text-primary hover:underline">
                          AGB
                        </a>{' '}
                        und{' '}
                        <a href="/privacy" className="text-primary hover:underline">
                          Datenschutzerklärung
                        </a>
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="btn-hero w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Wird registriert...' : 'Konto erstellen'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;