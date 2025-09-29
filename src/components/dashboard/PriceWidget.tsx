import { TrendingUp, TrendingDown, Star, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const cryptoData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: "$43,287.50",
    change24h: "+2.34%",
    change7d: "+8.21%",
    marketCap: "$848.2B",
    volume: "$23.1B",
    isPositive: true,
    isFavorite: true,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,682.41",
    change24h: "-1.23%",
    change7d: "+5.67%",
    marketCap: "$322.4B",
    volume: "$15.8B",
    isPositive: false,
    isFavorite: true,
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    price: "$312.89",
    change24h: "+3.45%",
    change7d: "+12.34%",
    marketCap: "$47.8B",
    volume: "$1.2B",
    isPositive: true,
    isFavorite: false,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: "$98.76",
    change24h: "+5.67%",
    change7d: "+18.45%",
    marketCap: "$42.1B",
    volume: "$2.8B",
    isPositive: true,
    isFavorite: false,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: "$0.4521",
    change24h: "-2.11%",
    change7d: "-1.34%",
    marketCap: "$15.9B",
    volume: "$456M",
    isPositive: false,
    isFavorite: false,
  },
];

export function PriceWidget() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Top Cryptocurrencies</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {cryptoData.map((crypto, index) => (
            <div 
              key={crypto.id} 
              className={`flex items-center justify-between p-4 hover:bg-surface-light transition-colors ${
                index !== cryptoData.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {crypto.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{crypto.name}</span>
                      <span className="text-sm text-muted-foreground">{crypto.symbol}</span>
                      {crypto.isFavorite && (
                        <Star className="w-3 h-3 text-warning fill-current" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Vol: {crypto.volume}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-foreground">{crypto.price}</div>
                <div className="flex items-center justify-end space-x-2">
                  <div className={`flex items-center text-sm font-medium ${
                    crypto.isPositive ? 'text-profit' : 'text-loss'
                  }`}>
                    {crypto.isPositive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {crypto.change24h}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem>Add to Portfolio</DropdownMenuItem>
                      <DropdownMenuItem>Set Alert</DropdownMenuItem>
                      <DropdownMenuItem>View Chart</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}