import { ExternalLink, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const newsData = [
  {
    id: 1,
    title: "Bitcoin ETF Sees Record $2.1B Inflows as Institutional Adoption Accelerates",
    summary: "Major financial institutions continue to pour capital into Bitcoin ETFs, marking a significant milestone in cryptocurrency adoption.",
    source: "CryptoNews",
    publishedAt: "2 hours ago",
    category: "ETF",
    sentiment: "positive",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Ethereum Upgrade Successfully Reduces Gas Fees by 40%",
    summary: "The latest network upgrade has significantly improved transaction efficiency and reduced costs for users.",
    source: "Ethereum Foundation",
    publishedAt: "4 hours ago",
    category: "Technology",
    sentiment: "positive",
    readTime: "2 min read",
  },
  {
    id: 3,
    title: "Regulatory Clarity Emerges as SEC Provides New Crypto Guidelines",
    summary: "New regulatory framework offers clearer guidelines for cryptocurrency operations and compliance.",
    source: "RegCrypto",
    publishedAt: "6 hours ago",
    category: "Regulation",
    sentiment: "neutral",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "DeFi Protocol Launches Innovative Yield Farming Solution",
    summary: "Revolutionary DeFi platform introduces sustainable yield farming with enhanced security features.",
    source: "DeFi Weekly",
    publishedAt: "8 hours ago",
    category: "DeFi",
    sentiment: "positive",
    readTime: "3 min read",
  },
];

const getCategoryColor = (category: string) => {
  const colors = {
    ETF: "bg-cipher-blue/20 text-cipher-blue border-cipher-blue/30",
    Technology: "bg-cipher-cyan/20 text-cipher-cyan border-cipher-cyan/30",
    Regulation: "bg-warning/20 text-warning border-warning/30",
    DeFi: "bg-cipher-purple/20 text-cipher-purple border-cipher-purple/30",
  };
  return colors[category as keyof typeof colors] || "bg-surface-light text-text-secondary border-border";
};

const getSentimentIcon = (sentiment: string) => {
  if (sentiment === "positive") return <TrendingUp className="w-3 h-3 text-profit" />;
  return null;
};

export function NewsWidget() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Latest Crypto News</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <ExternalLink className="w-4 h-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {newsData.map((article, index) => (
            <div 
              key={article.id}
              className={`p-4 hover:bg-surface-light transition-colors cursor-pointer ${
                index !== newsData.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  {getSentimentIcon(article.sentiment)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.publishedAt}
                </div>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
                {article.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-text-secondary">{article.source}</span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}