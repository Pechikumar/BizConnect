import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight, Star, Users, Briefcase, Target } from "lucide-react";
import { Service } from "@/hooks/useServices";

const Index = () => {
  // Sample service data
  const featuredServices: Service[] = [
    {
      id: "1",
      user_id: "mock",
      title: "Digital Marketing Strategy",
      description: "Comprehensive digital marketing strategies to boost your online presence and drive conversions.",
      category: "Marketing",
      price_range: "$2,500",
      location: "New York, NY",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        company_name: "MarketPro Solutions",
        display_name: "Marketing Expert"
      }
    },
    {
      id: "2", 
      user_id: "mock",
      title: "Web Development & Design",
      description: "Custom web applications and responsive designs that engage users and drive business growth.",
      category: "Development",
      price_range: "$5,000", 
      location: "San Francisco, CA",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        company_name: "TechCraft Studios",
        display_name: "Dev Team"
      }
    },
    {
      id: "3",
      user_id: "mock",
      title: "Financial Consulting", 
      description: "Expert financial advisory services to optimize your business finances and investment strategies.",
      category: "Finance",
      price_range: "$1,200",
      location: "Chicago, IL", 
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        company_name: "FinanceWise Inc",
        display_name: "Finance Advisor"
      }
    }
  ];

  const categories = [
    "Marketing", "Development", "Design", "Finance", "Consulting", "Legal", "HR", "Sales"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Search & Filter Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for services, companies, or keywords..."
                  className="pl-12 h-12 bg-card border-border shadow-sm"
                />
              </div>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover top-rated services from verified businesses ready to help you grow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover shadow-elegant">
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose BizConnect */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose BizConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The platform built specifically for B2B service discovery and networking
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-card border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Verified Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All businesses are thoroughly vetted and verified to ensure quality and reliability.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Targeted Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI-powered system matches you with the most relevant services for your needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Read reviews, compare ratings, and make informed decisions with transparent feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Business Network?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already connecting, collaborating, and growing together on BizConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary hover:text-primary-hover shadow-elegant">
              Start Free Today
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
