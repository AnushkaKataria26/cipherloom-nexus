import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { PriceChart } from "@/components/charts/PriceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { fetchTopCryptos } from "@/lib/cryptoApi";

export default function CoinDetail() {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoinData();
  }, [coinId]);

  const loadCoinData = async () => {
    const data = await fetchTopCryptos(250);
    const coin = data.find((c) => c.id === coinId);
    setCoinData(coin);
    setLoading(false);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <p>Loading...</p>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (!coinData) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <p>Coin not found</p>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/markets")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Markets
            </Button>

            <div className="flex items-center gap-4">
              <img src={coinData.image} alt={coinData.name} className="w-12 h-12" />
              <div>
                <h1 className="text-3xl font-bold">{coinData.name}</h1>
                <p className="text-muted-foreground text-lg">{coinData.symbol.toUpperCase()}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Current Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    ${coinData.current_price.toLocaleString()}
                  </p>
                  <div className={`flex items-center gap-1 mt-2 ${
                    coinData.price_change_percentage_24h >= 0
                      ? "text-profit"
                      : "text-loss"
                  }`}>
                    {coinData.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-semibold">
                      {coinData.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Market Cap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    ${(coinData.market_cap / 1e9).toFixed(2)}B
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Rank #{coinData.market_cap_rank || 'N/A'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>24h Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    ${(coinData.total_volume / 1e9).toFixed(2)}B
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    High: ${coinData.high_24h?.toLocaleString() || 'N/A'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Market Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h High</span>
                    <span className="font-semibold">${coinData.high_24h?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Low</span>
                    <span className="font-semibold">${coinData.low_24h?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Circulating Supply</span>
                    <span className="font-semibold">
                      {coinData.circulating_supply 
                        ? `${(coinData.circulating_supply / 1e6).toFixed(2)}M` 
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Supply</span>
                    <span className="font-semibold">
                      {coinData.total_supply 
                        ? `${(coinData.total_supply / 1e6).toFixed(2)}M` 
                        : 'N/A'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Price Changes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1 Hour</span>
                    <span className={`font-semibold ${
                      (coinData.price_change_percentage_1h_in_currency || 0) >= 0 
                        ? 'text-profit' 
                        : 'text-loss'
                    }`}>
                      {(coinData.price_change_percentage_1h_in_currency || 0) >= 0 ? '+' : ''}
                      {(coinData.price_change_percentage_1h_in_currency || 0).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24 Hours</span>
                    <span className={`font-semibold ${
                      coinData.price_change_percentage_24h >= 0 
                        ? 'text-profit' 
                        : 'text-loss'
                    }`}>
                      {coinData.price_change_percentage_24h >= 0 ? '+' : ''}
                      {coinData.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7 Days</span>
                    <span className={`font-semibold ${
                      (coinData.price_change_percentage_7d_in_currency || 0) >= 0 
                        ? 'text-profit' 
                        : 'text-loss'
                    }`}>
                      {(coinData.price_change_percentage_7d_in_currency || 0) >= 0 ? '+' : ''}
                      {(coinData.price_change_percentage_7d_in_currency || 0).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">30 Days</span>
                    <span className={`font-semibold ${
                      (coinData.price_change_percentage_30d_in_currency || 0) >= 0 
                        ? 'text-profit' 
                        : 'text-loss'
                    }`}>
                      {(coinData.price_change_percentage_30d_in_currency || 0) >= 0 ? '+' : ''}
                      {(coinData.price_change_percentage_30d_in_currency || 0).toFixed(2)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <PriceChart coinId={coinData.id} coinName={coinData.name} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
