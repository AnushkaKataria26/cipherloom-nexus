import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { toast } = useToast();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Settings</h1>
          </header>
          
          <main className="p-6 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-alerts">Price Alerts</Label>
                  <Switch id="price-alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="news-updates">News Updates</Label>
                  <Switch id="news-updates" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="portfolio-updates">Portfolio Updates</Label>
                  <Switch id="portfolio-updates" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-effects">Sound Effects</Label>
                  <Switch id="sound-effects" />
                </div>
              </CardContent>
            </Card>

            <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
