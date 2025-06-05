
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";

const news = [
  {
    title: "Apple Reports Strong Q4 Earnings, Beats Expectations",
    summary: "Apple's revenue increased 5% year-over-year, driven by strong iPhone and Services performance.",
    time: "2 hours ago",
    source: "MarketWatch",
    category: "Earnings"
  },
  {
    title: "Fed Signals Potential Rate Cuts in 2024",
    summary: "Federal Reserve officials hint at possible interest rate adjustments based on inflation data.",
    time: "4 hours ago",
    source: "CNBC",
    category: "Economy"
  },
  {
    title: "Tech Sector Rallies on AI Optimism",
    summary: "Major technology stocks surge as investors show renewed confidence in AI developments.",
    time: "6 hours ago",
    source: "Bloomberg",
    category: "Technology"
  },
  {
    title: "Tesla Announces New Gigafactory Location",
    summary: "Electric vehicle maker reveals plans for new manufacturing facility to meet growing demand.",
    time: "8 hours ago",
    source: "Reuters",
    category: "Corporate"
  }
];

export const NewsPanel = () => {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((article, index) => (
            <div key={index} className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.time}
                </div>
              </div>
              
              <h3 className="text-white font-medium mb-2 line-clamp-2">{article.title}</h3>
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
