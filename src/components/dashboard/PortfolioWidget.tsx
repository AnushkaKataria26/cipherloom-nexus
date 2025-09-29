import { TrendingUp, TrendingDown, PieChart, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const portfolioData = {
  totalValue: "$12,847.32",
  totalChange: "+1,234.56",
  totalChangePercent: "+10.63%",
  isPositive: true,
};

const holdings = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    value: "$8,456.23",
    percentage: 65.8,
    change: "+5.23%",
    isPositive: true,
    color: "bg-cipher-blue",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    value: "$2,891.45",
    percentage: 22.5,
    change: "-1.87%",
    isPositive: false,
    color: "bg-cipher-cyan",
  },
  {
    symbol: "SOL",
    name: "Solana",
    value: "$987.65",
    percentage: 7.7,
    change: "+12.34%",
    isPositive: true,
    color: "bg-cipher-purple",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    value: "$511.99",
    percentage: 4.0,
    change: "-3.21%",
    isPositive: false,
    color: "bg-profit",
  },
];

export function PortfolioWidget() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Portfolio Overview</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardHeader>
      <CardContent>
        {/* Portfolio Summary */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-dark border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
            <div className={`flex items-center text-sm font-medium ${
              portfolioData.isPositive ? 'text-profit' : 'text-loss'
            }`}>
              {portfolioData.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {portfolioData.totalChangePercent}
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {portfolioData.totalValue}
          </div>
          <div className={`text-sm font-medium ${
            portfolioData.isPositive ? 'text-profit' : 'text-loss'
          }`}>
            {portfolioData.isPositive ? '+' : ''}{portfolioData.totalChange} (24h)
          </div>
        </div>

        {/* Holdings Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Holdings</span>
            <PieChart className="w-4 h-4 text-muted-foreground" />
          </div>
          
          {holdings.map((holding) => (
            <div key={holding.symbol} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${holding.color}`}></div>
                  <span className="font-medium text-foreground">{holding.symbol}</span>
                  <span className="text-sm text-muted-foreground">{holding.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{holding.value}</div>
                  <div className={`text-xs ${
                    holding.isPositive ? 'text-profit' : 'text-loss'
                  }`}>
                    {holding.change}
                  </div>
                </div>
              </div>
              <Progress 
                value={holding.percentage} 
                className="h-2"
                style={{
                  '--progress-foreground': `hsl(var(--${holding.color.replace('bg-', '').replace('-', '.')}))`
                } as React.CSSProperties}
              />
              <div className="text-xs text-muted-foreground text-right">
                {holding.percentage}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}