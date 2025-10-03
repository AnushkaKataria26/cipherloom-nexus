import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
  { coin: "BTC", condition: "Price above $45,000", status: "active", type: "price" },
  { coin: "ETH", condition: "Price below $2,200", status: "triggered", type: "price" },
  { coin: "SOL", condition: "Volume spike +50%", status: "active", type: "volume" },
];

export default function Alerts() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Price Alerts</h1>
          </header>
          
          <main className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Set custom alerts for price movements and market events</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <Bell className={`h-5 w-5 ${alert.status === 'triggered' ? 'text-profit' : 'text-muted-foreground'}`} />
                      <div>
                        <div className="font-semibold">{alert.coin}</div>
                        <div className="text-sm text-muted-foreground">{alert.condition}</div>
                      </div>
                    </div>
                    <Badge variant={alert.status === 'active' ? 'outline' : 'default'}>
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
