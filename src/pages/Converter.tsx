import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Converter() {
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("43567.89");
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USD");
  const { toast } = useToast();

  const handleSwap = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleConvert = () => {
    toast({
      title: "Conversion complete",
      description: `${fromAmount} ${fromCurrency} = ${toAmount} ${toCurrency}`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Currency Converter</h1>
          </header>
          
          <main className="p-6">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Convert Cryptocurrency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" className="min-w-[100px]">BTC</Button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full"
                      onClick={handleSwap}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        value={toAmount}
                        onChange={(e) => setToAmount(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" className="min-w-[100px]">USD</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-accent">
                    <div className="text-sm text-muted-foreground">Exchange Rate</div>
                    <div className="text-lg font-semibold">1 BTC = $43,567.89 USD</div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleConvert}>Convert</Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
