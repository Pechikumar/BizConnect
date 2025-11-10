import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useServices, Service } from "@/hooks/useServices";
import Header from "@/components/Header";
import CreateServiceDialog from "@/components/CreateServiceDialog";

const Dashboard = () => {
  const [userServices, setUserServices] = useState<Service[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const { getUserServices, deleteService } = useServices();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadUserServices();
    }
  }, [user]);

  const loadUserServices = async () => {
    const services = await getUserServices();
    setUserServices(services);
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
      loadUserServices();
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.display_name || user.email}
          </h1>
          <p className="text-muted-foreground">
            Manage your services and grow your business network
          </p>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Services</h2>
              <Button 
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-primary hover:bg-primary-hover"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userServices.map((service) => (
                <Card key={service.id} className="hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {service.category}
                        </CardDescription>
                      </div>
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {userServices.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-lg font-semibold mb-2">No Services Yet</h3>
                    <p className="text-muted-foreground mb-4 text-center">
                      Start by creating your first service to showcase your expertise
                    </p>
                    <Button 
                      onClick={() => setShowCreateDialog(true)}
                      className="bg-gradient-primary hover:bg-primary-hover"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Service
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Service Analytics</CardTitle>
                <CardDescription>
                  Track your service performance and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections">
            <Card>
              <CardHeader>
                <CardTitle>Business Connections</CardTitle>
                <CardDescription>
                  Manage your professional network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connections coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <CreateServiceDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={loadUserServices}
      />
    </div>
  );
};

export default Dashboard;