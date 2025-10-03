import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BarChart3, PieChart } from "lucide-react";

export default function Analytics() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Analytics</h1>
          </header>
          
          <main className="p-6 space-y-6">
            <Tabs defaultValue="market" className="w-full">
              <TabsList>
                <TabsTrigger value="market">Market Analysis</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
                <TabsTrigger value="technical">Technical Indicators</TabsTrigger>
              </TabsList>
              
              <TabsContent value="market" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="bg-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
                      <TrendingUp className="h-4 w-4 text-profit" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-profit">Bullish</div>
                      <p className="text-xs text-muted-foreground">67% of coins up</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
                      <BarChart3 className="h-4 w-4 text-cipher-blue" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1.85T</div>
                      <p className="text-xs text-muted-foreground">+3.2% from yesterday</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium">BTC Dominance</CardTitle>
                      <PieChart className="h-4 w-4 text-cipher-cyan" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">52.3%</div>
                      <p className="text-xs text-muted-foreground">-0.5% this week</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Detailed portfolio analytics coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Technical Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Advanced technical analysis tools coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
