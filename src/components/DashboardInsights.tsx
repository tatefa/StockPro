
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DashboardInsights = () => {
  const insights = [
    {
      title: "Top Performer",
      value: "ADANIPORTS",
      detail: "+2.40% today",
      icon: Crown,
      color: "text-emerald-400",
      bgColor: "bg-emerald-600"
    },
    {
      title: "Market Sentiment",
      value: "Bullish",
      detail: "65% stocks up",
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-600"
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
      title: "Sector Leader",
      value: "Technology",
      detail: "IT stocks surging",
      icon: Target,
      color: "text-blue-400",
      bgColor: "bg-blue-600"
    }
  ];

  const marketStats = [
    { label: "NIFTY 50", value: "19,435.50", change: "+125.30", changePercent: "+0.65%" },
    { label: "SENSEX", value: "65,220.30", change: "+420.75", changePercent: "+0.65%" },
    { label: "BANK NIFTY", value: "44,180.25", change: "-85.40", changePercent: "-0.19%" },
  ];

  return (
    <div className="space-y-6">
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
          <CardTitle className="text-white">Market Overview</CardTitle>
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
