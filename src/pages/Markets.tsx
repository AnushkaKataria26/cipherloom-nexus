import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const marketData = [
  { symbol: "BTC", name: "Bitcoin", price: "$43,567.89", change: "+5.23%", volume: "$28.5B", marketCap: "$850B", isPositive: true },
  { symbol: "ETH", name: "Ethereum", price: "$2,289.45", change: "-1.87%", volume: "$15.2B", marketCap: "$275B", isPositive: false },
  { symbol: "SOL", name: "Solana", price: "$98.76", change: "+12.34%", volume: "$4.8B", marketCap: "$42B", isPositive: true },
  { symbol: "ADA", name: "Cardano", price: "$0.52", change: "-3.21%", volume: "$890M", marketCap: "$18B", isPositive: false },
  { symbol: "AVAX", name: "Avalanche", price: "$38.45", change: "+8.92%", volume: "$1.2B", marketCap: "$14B", isPositive: true },
  { symbol: "DOT", name: "Polkadot", price: "$7.23", change: "+2.15%", volume: "$780M", marketCap: "$9.5B", isPositive: true },
];

export default function Markets() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMarkets = marketData.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Markets</h1>
          </header>
          
          <main className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search cryptocurrencies..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>All Cryptocurrencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMarkets.map((coin) => (
                    <div key={coin.symbol} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-surface-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Star className="h-4 w-4" />
                        </Button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">{coin.symbol}</span>
                            <span className="text-sm text-muted-foreground">{coin.name}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">Vol: {coin.volume}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{coin.price}</div>
                          <div className="text-sm text-muted-foreground">Cap: {coin.marketCap}</div>
                        </div>
                        <Badge variant={coin.isPositive ? "default" : "destructive"} className="min-w-[80px] justify-center">
                          {coin.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {coin.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
