import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { PriceWidget } from "@/components/dashboard/PriceWidget";
import { PortfolioWidget } from "@/components/dashboard/PortfolioWidget";
import { NewsWidget } from "@/components/dashboard/NewsWidget";
import heroImage from "@/assets/crypto-hero.jpg";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 space-y-6 p-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-dark border border-border">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative p-8 md:p-12">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      CipherLoom
                    </span>
                  </h1>
                  <p className="text-xl text-text-secondary mb-6 leading-relaxed">
                    Your comprehensive crypto dashboard for advanced trading, portfolio management, 
                    and market analysis. Stay ahead of the market with real-time insights and AI-powered forecasting.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:shadow-cipher-glow transition-all duration-200">
                      Explore Markets
                    </button>
                    <button className="px-6 py-3 bg-surface-light text-foreground font-semibold rounded-lg border border-border hover:bg-surface-accent transition-all duration-200">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Overview */}
            <MarketOverview />

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PriceWidget />
                <NewsWidget />
              </div>
              <div className="space-y-6">
                <PortfolioWidget />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
