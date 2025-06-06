
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, Crown, Info, ChevronRight, Activity, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MarketStatus } from "./MarketStatus";
import { stockService } from "@/services/stockService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export const DashboardInsights = () => {
  const [stocks, setStocks] = useState(stockService.getStocks());
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = stockService.subscribe(setStocks);
    return unsubscribe;
  }, []);

  // Calculate insights based on real stock data
  const topPerformer = stocks.reduce((prev, current) => 
    (prev.changePercent > current.changePercent) ? prev : current
  );

  const worstPerformer = stocks.reduce((prev, current) => 
    (prev.changePercent < current.changePercent) ? prev : current
  );

  const gainers = stocks.filter(stock => stock.changePercent > 0).length;
  const totalStocks = stocks.length;
  const bullishPercent = ((gainers / totalStocks) * 100).toFixed(0);

  const averageVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0) / stocks.length;
  const highVolumeStocks = stocks.filter(stock => stock.volume > averageVolume * 1.5).length;

  // Generate market trend data for visualization
  const marketTrendData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    nifty: 21700 + (Math.random() - 0.5) * 200,
    sensex: 72000 + (Math.random() - 0.5) * 800,
    volume: 2.5 + Math.random() * 1.5
  }));

  const insights = [
    {
      id: "top-performer",
      title: "Top Performer",
      value: topPerformer.symbol,
      detail: `${topPerformer.changePercent > 0 ? '+' : ''}${topPerformer.changePercent.toFixed(2)}% today`,
      icon: Crown,
      color: topPerformer.changePercent > 0 ? "text-emerald-400" : "text-red-400",
      bgColor: topPerformer.changePercent > 0 ? "bg-emerald-600" : "bg-red-600",
      explanation: `${topPerformer.symbol} is leading the market today with strong momentum. This could be due to positive earnings, sector rotation, or favorable news. Monitor for continued strength.`,
      actionable: `Consider: ${topPerformer.changePercent > 5 ? 'Take profits if overextended' : 'Add to watchlist for potential breakout'}`
    },
    {
      id: "market-sentiment",
      title: "Market Sentiment",
      value: parseInt(bullishPercent) > 50 ? "Bullish" : "Bearish",
      detail: `${bullishPercent}% stocks up`,
      icon: parseInt(bullishPercent) > 50 ? TrendingUp : TrendingDown,
      color: parseInt(bullishPercent) > 50 ? "text-emerald-400" : "text-red-400",
      bgColor: parseInt(bullishPercent) > 50 ? "bg-emerald-600" : "bg-red-600",
      explanation: `Current market breadth shows ${parseInt(bullishPercent) > 70 ? 'strong bullish' : parseInt(bullishPercent) > 50 ? 'mild bullish' : parseInt(bullishPercent) > 30 ? 'mixed' : 'bearish'} sentiment. This indicates ${parseInt(bullishPercent) > 50 ? 'risk-on' : 'risk-off'} behavior among investors.`,
      actionable: `Strategy: ${parseInt(bullishPercent) > 60 ? 'Look for growth stocks and momentum plays' : 'Focus on defensive stocks and quality names'}`
    },
    {
      id: "volatility",
      title: "Volatility Alert",
      value: worstPerformer.changePercent < -3 ? "High" : worstPerformer.changePercent < -1 ? "Medium" : "Low",
      detail: `Worst: ${worstPerformer.symbol} ${worstPerformer.changePercent.toFixed(2)}%`,
      icon: AlertTriangle,
      color: worstPerformer.changePercent < -3 ? "text-red-400" : worstPerformer.changePercent < -1 ? "text-yellow-400" : "text-emerald-400",
      bgColor: worstPerformer.changePercent < -3 ? "bg-red-600" : worstPerformer.changePercent < -1 ? "bg-yellow-600" : "bg-emerald-600",
      explanation: `Market volatility is ${worstPerformer.changePercent < -3 ? 'elevated with significant selling pressure' : worstPerformer.changePercent < -1 ? 'moderate with some weakness' : 'contained with stable price action'}. This affects risk management strategies.`,
      actionable: `Risk Management: ${worstPerformer.changePercent < -3 ? 'Reduce position sizes and avoid leveraged trades' : 'Normal position sizing with stop losses'}`
    },
    {
      id: "volume-activity",
      title: "Volume Activity", 
      value: `${highVolumeStocks}/${totalStocks}`,
      detail: "High volume stocks",
      icon: Activity,
      color: highVolumeStocks > totalStocks/2 ? "text-blue-400" : "text-gray-400",
      bgColor: highVolumeStocks > totalStocks/2 ? "bg-blue-600" : "bg-gray-600",
      explanation: `${highVolumeStocks} stocks are trading above average volume, indicating ${highVolumeStocks > totalStocks/2 ? 'strong institutional interest' : 'normal trading activity'}. High volume confirms price movements.`,
      actionable: `Focus: ${highVolumeStocks > totalStocks/2 ? 'Monitor high-volume movers for trend confirmation' : 'Wait for volume confirmation before major positions'}`
    }
  ];

  const marketStats = [
    { 
      label: "NIFTY 50", 
      value: "21,735.50", 
      change: "+125.30", 
      changePercent: "+0.58%",
      support: "21,600",
      resistance: "21,850"
    },
    { 
      label: "SENSEX", 
      value: "72,240.30", 
      change: "+420.75", 
      changePercent: "+0.59%",
      support: "71,800",
      resistance: "72,500"
    },
    { 
      label: "BANK NIFTY", 
      value: "46,180.25", 
      change: "-85.40", 
      changePercent: "-0.18%",
      support: "45,900",
      resistance: "46,400"
    },
  ];

  return (
    <div className="space-y-6">
      <MarketStatus />
      
      {/* Enhanced Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <Card 
            key={insight.id} 
            className={`bg-slate-900 border-slate-800 cursor-pointer transition-all duration-200 hover:border-blue-500 ${
              selectedInsight === insight.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''
            }`}
            onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{insight.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <insight.icon className={`h-4 w-4 ${insight.color}`} />
                <ChevronRight className={`h-3 w-3 text-gray-400 transition-transform ${
                  selectedInsight === insight.id ? 'rotate-90' : ''
                }`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${insight.color}`}>{insight.value}</div>
              <p className="text-xs text-gray-400">{insight.detail}</p>
              
              {selectedInsight === insight.id && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-300 leading-relaxed">{insight.explanation}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-blue-300 leading-relaxed">{insight.actionable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Trend Visualization */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-400" />
            Market Trend Analysis (7-Day)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketTrendData}>
              <defs>
                <linearGradient id="niftyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="sensexGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Area
                type="monotone"
                dataKey="nifty"
                stroke="#3B82F6"
                fill="url(#niftyGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="sensex"
                stroke="#10B981" 
                fill="url(#sensexGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enhanced Market Overview */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Indian Market Overview with Technical Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketStats.map((stat, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className={`text-sm flex items-center ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {stat.change} ({stat.changePercent})
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-slate-700 rounded">
                      <div className="text-gray-400">Support</div>
                      <div className="text-emerald-400 font-medium">{stat.support}</div>
                    </div>
                    <div className="p-2 bg-slate-700 rounded">
                      <div className="text-gray-400">Resistance</div>
                      <div className="text-red-400 font-medium">{stat.resistance}</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {stat.change.startsWith('+') ? 
                      `Above support, watch for ${stat.resistance} breakout` : 
                      `Near support ${stat.support}, critical level to hold`
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Insights */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-400" />
            Today's Trading Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Market Opportunities</h3>
              <div className="space-y-3">
                <div className="p-3 bg-emerald-900/20 border border-emerald-700/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Bullish Setup</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    IT sector showing strength with {topPerformer.symbol} leading. 
                    Consider momentum plays in technology names.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">Volume Breakout</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {highVolumeStocks} stocks trading above average volume. 
                    Strong institutional participation indicates conviction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Risk Factors</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 font-medium">Weakness Alert</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {worstPerformer.symbol} down {Math.abs(worstPerformer.changePercent).toFixed(2)}%. 
                    Monitor for broader sector weakness.
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Market Health</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Overall market sentiment {parseInt(bullishPercent) > 50 ? 'positive' : 'cautious'}. 
                    Maintain disciplined risk management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
