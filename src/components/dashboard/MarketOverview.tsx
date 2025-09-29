import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const marketStats = [
  {
    title: "Total Market Cap",
    value: "$2.45T",
    change: "+2.34%",
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: "24h Volume",
    value: "$89.2B",
    change: "-1.23%",
    isPositive: false,
    icon: BarChart3,
  },
  {
    title: "BTC Dominance",
    value: "42.8%",
    change: "+0.45%",
    isPositive: true,
    icon: TrendingUp,
  },
  {
    title: "Active Cryptocurrencies",
    value: "13,247",
    change: "+12",
    isPositive: true,
    icon: TrendingUp,
  },
];

export function MarketOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {marketStats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border hover:shadow-cipher-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className={`flex items-center text-sm font-medium ${
                stat.isPositive ? 'text-profit' : 'text-loss'
              }`}>
                {stat.isPositive ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}