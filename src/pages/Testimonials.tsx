import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;