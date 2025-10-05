import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import ScrollToTop from "./components/ScrollToTop";
import MobileBottomNav from "./components/MobileBottomNav";
import { useState } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import InstagramServices from "./pages/InstagramServices";
import TikTokServices from "./pages/TikTokServices";
import YouTubeServices from "./pages/YouTubeServices";
import FacebookServices from "./pages/FacebookServices";
import TwitterServices from "./pages/TwitterServices";
import LinkedInServices from "./pages/LinkedInServices";
import TelegramServices from "./pages/TelegramServices";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import HowItWorks from "./pages/HowItWorks";
import Auth from "./pages/Auth";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <div className="pb-20 md:pb-0">
              {/* Add padding bottom for mobile bottom nav */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/instagram" element={<InstagramServices />} />
                <Route path="/tiktok" element={<TikTokServices />} />
                <Route path="/youtube" element={<YouTubeServices />} />
                <Route path="/facebook" element={<FacebookServices />} />
                <Route path="/twitter" element={<TwitterServices />} />
                <Route path="/linkedin" element={<LinkedInServices />} />
                <Route path="/telegram" element={<TelegramServices />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/favorites" element={<Favorites />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <MobileBottomNav />
          </BrowserRouter>
        </TooltipProvider>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default App;
