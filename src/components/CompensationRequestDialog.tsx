import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileText, Hash, Mail, X } from "lucide-react";
import { toast } from "sonner";

interface CompensationFormData {
  orderNumber: string;
  email: string;
}

interface CompensationRequestDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

const CompensationRequestDialog = ({ trigger, className }: CompensationRequestDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CompensationFormData>({
    defaultValues: {
      orderNumber: "",
      email: "",
    },
  });

  const onSubmit = async (data: CompensationFormData) => {
    console.log("Form submission started", data);
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Ausgleichsantrag erfolgreich eingereicht!");
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Fehler beim Einreichen des Antrags. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    console.log("Dialog state changing to:", open);
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const handleTriggerClick = () => {
    console.log("Trigger clicked, opening dialog");
    setIsOpen(true);
  };

  const defaultTrigger = (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleTriggerClick}
      className={`flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors ${className || "px-3"}`}
    >
      <FileText className="w-4 h-4" />
      <span className="text-sm font-medium">Ausgleichsantrag</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          <div onClick={handleTriggerClick}>
            {trigger}
          </div>
        ) : (
          defaultTrigger
        )}
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0 border-0 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        {/* Close Button - Responsive positioning */}
        <DialogClose asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 p-0 rounded-full bg-background/90 hover:bg-background border border-border/50 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </Button>
        </DialogClose>
        
        {/* Background Pattern - Responsive */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-success/5 to-primary/10 opacity-50"></div>
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full transform translate-x-4 sm:translate-x-8 -translate-y-4 sm:-translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-success/20 to-transparent rounded-full transform -translate-x-3 sm:-translate-x-6 translate-y-3 sm:translate-y-6"></div>
        
        {/* Content Container - Responsive padding */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm">
          <DialogHeader className="text-center mb-6 sm:mb-8">
            <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent mb-3 sm:mb-4">
              Ausgleichsantrag
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-md mx-auto px-2 sm:px-0">
              Bei Problemen mit garantierten Bestellungen kannst du hier schnell und einfach einen Ausgleich beantragen.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <FormField
                control={form.control}
                name="orderNumber"
                rules={{ 
                  required: "Bestellnummer ist erforderlich",
                  minLength: { value: 3, message: "Bestellnummer muss mindestens 3 Zeichen lang sein" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-semibold text-foreground">
                      Bestellnummer *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary z-10 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                        <Input 
                          placeholder="Bestellnummer eingeben"
                          className="h-10 sm:h-12 pl-10 sm:pl-12 border-2 border-input focus:border-primary hover:border-primary/50 bg-background transition-all duration-200 text-sm sm:text-base font-medium relative z-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "E-Mail-Adresse ist erforderlich",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ungültige E-Mail-Adresse"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-semibold text-foreground">
                      E-Mail-Adresse *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary z-10 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                        <Input 
                          type="email"
                          placeholder="ihre.email@beispiel.de"
                          className="h-10 sm:h-12 pl-10 sm:pl-12 border-2 border-input focus:border-primary hover:border-primary/50 bg-background transition-all duration-200 text-sm sm:text-base font-medium relative z-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <div className="pt-4 sm:pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-12 lg:h-14 bg-gradient-to-r from-primary via-primary to-success hover:from-primary-hover hover:via-primary-hover hover:to-success text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Wird eingereicht...</span>
                    </div>
                  ) : (
                    "Ausgleich beantragen"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompensationRequestDialog;