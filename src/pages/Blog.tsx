import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Die besten Strategien für Instagram Growth 2024",
      description: "Entdecken Sie die neuesten Trends und bewährten Methoden für nachhaltiges Instagram-Wachstum.",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&h=300&fit=crop",
      author: "SocialNova Team",
      date: "15. März 2024",
      readTime: "5 Min Lesezeit",
      category: "Instagram",
      featured: true
    },
    {
      id: 2,
      title: "TikTok Marketing: Viral gehen leicht gemacht",
      description: "Lernen Sie, wie Sie mit den richtigen Strategien Ihre TikTok-Reichweite maximieren können.",
      image: "https://images.unsplash.com/photo-1563203369-26f2e4a5cf24?w=500&h=300&fit=crop",
      author: "Marketing Experte",
      date: "12. März 2024", 
      readTime: "8 Min Lesezeit",
      category: "TikTok"
    },
    {
      id: 3,
      title: "Social Media Analytics: Die wichtigsten KPIs",
      description: "Verstehen Sie, welche Kennzahlen wirklich wichtig sind für Ihren Social Media Erfolg.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      author: "Data Analyst",
      date: "10. März 2024",
      readTime: "6 Min Lesezeit",
      category: "Analytics"
    }
  ];

  const categories = ["Alle", "Instagram", "TikTok", "YouTube", "Analytics", "Marketing"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-success/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-hero">Blog & Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bleiben Sie auf dem neuesten Stand mit Expertentipps, Strategien und Insights 
              für erfolgreiches Social Media Marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Alle" ? "default" : "outline"}
                size="sm"
                className={category === "Alle" ? "bg-gradient-to-r from-primary to-success text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Post */}
            {blogPosts
              .filter(post => post.featured)
              .map((post) => (
                <div key={post.id} className="lg:col-span-2">
                  <Card className="card-service overflow-hidden group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-success/10 relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-success text-white">
                        Featured
                      </Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="bg-gradient-to-r from-primary to-success text-white group">
                        Artikel lesen
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}

            {/* Recent Posts Sidebar */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Neueste Artikel</h3>
              {blogPosts
                .filter(post => !post.featured)
                .map((post) => (
                  <Card key={post.id} className="card-service group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-success/10 relative overflow-hidden rounded-t-2xl">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button variant="outline" size="sm" className="w-full group">
                        Mehr erfahren
                        <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 border-2 hover:bg-gradient-to-r hover:from-primary hover:to-success hover:text-white hover:border-transparent transition-all duration-300"
            >
              Weitere Artikel laden
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;