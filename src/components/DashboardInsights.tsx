
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarketStatus } from "./MarketStatus";
import { stockService } from "@/services/stockService";

export const DashboardInsights = () => {
  const [stocks, setStocks] = useState(stockService.getStocks());

  useEffect(() => {
    const unsubscribe = stockService.subscribe(setStocks);
    return unsubscribe;
  }, []);

  // Calculate insights based on real stock data
  const topPerformer = stocks.reduce((prev, current) => 
    (prev.changePercent > current.changePercent) ? prev : current
  );

  const gainers = stocks.filter(stock => stock.changePercent > 0).length;
  const totalStocks = stocks.length;
  const bullishPercent = ((gainers / totalStocks) * 100).toFixed(0);

  const insights = [
    {
      title: "Top Performer",
      value: topPerformer.symbol,
      detail: `${topPerformer.changePercent > 0 ? '+' : ''}${topPerformer.changePercent.toFixed(2)}% today`,
      icon: Crown,
      color: topPerformer.changePercent > 0 ? "text-emerald-400" : "text-red-400",
      bgColor: topPerformer.changePercent > 0 ? "bg-emerald-600" : "bg-red-600"
    },
    {
      title: "Market Sentiment",
      value: parseInt(bullishPercent) > 50 ? "Bullish" : "Bearish",
      detail: `${bullishPercent}% stocks up`,
      icon: parseInt(bullishPercent) > 50 ? TrendingUp : TrendingDown,
      color: parseInt(bullishPercent) > 50 ? "text-emerald-400" : "text-red-400",
      bgColor: parseInt(bullishPercent) > 50 ? "bg-emerald-600" : "bg-red-600"
    },
    {
      title: "Volatility Alert",
      value: "Medium",
      detail: "VIX at 18.5",
      icon: AlertTriangle,
      color: "text-yellow-400",
      bgColor: "bg-yellow-600"
    },
    {
      title: "Active Stocks",
      value: `${totalStocks}`,
      detail: "In watchlist",
      icon: Target,
      color: "text-blue-400",
      bgColor: "bg-blue-600"
    }
  ];

  const marketStats = [
    { label: "NIFTY 50", value: "21,735.50", change: "+125.30", changePercent: "+0.58%" },
    { label: "SENSEX", value: "72,240.30", change: "+420.75", changePercent: "+0.59%" },
    { label: "BANK NIFTY", value: "46,180.25", change: "-85.40", changePercent: "-0.18%" },
  ];

  return (
    <div className="space-y-6">
      <MarketStatus />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{insight.title}</CardTitle>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${insight.color}`}>{insight.value}</div>
              <p className="text-xs text-gray-400">{insight.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Indian Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketStats.map((stat, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg">
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className={`text-sm flex items-center ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.change} ({stat.changePercent})
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
