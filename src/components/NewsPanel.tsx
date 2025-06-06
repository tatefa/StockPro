
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsService, NewsArticle } from "@/services/newsService";

export const NewsPanel = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setNews(newsService.getNews());
    
    const unsubscribe = newsService.subscribe(setNews);
    return unsubscribe;
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Breaking": return "bg-red-600";
      case "Markets": return "bg-blue-600";
      case "Economy": return "bg-green-600";
      case "Earnings": return "bg-purple-600";
      case "Investment": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center">
          <span>Market News</span>
          <Badge className="ml-2 bg-emerald-600 text-white animate-pulse">LIVE</Badge>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-gray-400 hover:text-white"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((article) => (
            <div 
              key={article.id} 
              className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer"
              onClick={() => handleNewsClick(article.url)}
            >
              <div className="flex items-start justify-between mb-2">
                <Badge className={`text-xs text-white ${getCategoryColor(article.category)}`}>
                  {article.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.time}
                </div>
              </div>
              
              <h3 className="text-white font-medium mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{article.summary}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{article.source}</span>
                <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
