import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, Activity, Zap, Info, ChevronDown, ChevronUp, Star, Eye, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from "recharts";

const predictionData = [
  { name: "RELIANCE", confidence: 87, prediction: "STRONG BUY", targetPrice: 2650.50, currentPrice: 2420.30, upside: 9.5, risk: "Low", analysis: "Strong fundamentals with retail expansion driving growth", catalyst: "Q3 earnings beat", timeframe: "3-6 months" },
  { name: "TCS", confidence: 72, prediction: "HOLD", targetPrice: 3580.20, currentPrice: 3545.80, upside: 1.0, risk: "Medium", analysis: "Stable revenue but margin pressure from wage hikes", catalyst: "Digital transformation deals", timeframe: "6-12 months" },
  { name: "INFY", confidence: 91, prediction: "STRONG BUY", targetPrice: 1680.75, currentPrice: 1520.40, upside: 10.5, risk: "Low", analysis: "AI adoption accelerating client engagements", catalyst: "Large deal wins", timeframe: "2-4 months" },
  { name: "HDFCBANK", confidence: 68, prediction: "HOLD", targetPrice: 1720.30, currentPrice: 1695.50, upside: 1.5, risk: "Medium", analysis: "Credit growth strong but NIM under pressure", catalyst: "RBI policy stance", timeframe: "4-6 months" },
  { name: "ICICIBANK", confidence: 83, prediction: "BUY", targetPrice: 1250.80, currentPrice: 1180.25, upside: 6.0, risk: "Low", analysis: "Improving asset quality and ROE expansion", catalyst: "Corporate lending pickup", timeframe: "3-5 months" },
  { name: "WIPRO", confidence: 45, prediction: "SELL", targetPrice: 420.50, currentPrice: 485.30, upside: -13.3, risk: "High", analysis: "Market share loss to competitors", catalyst: "Weak guidance", timeframe: "1-3 months" },
];

const advancedModels = [
  { model: "LSTM Neural Network", accuracy: 87.3, trades: 145, roi: 24.5, sharpe: 1.8, description: "Deep learning model analyzing price patterns and volume", strength: "Pattern Recognition" },
  { model: "Transformer (GPT-4)", accuracy: 92.1, trades: 98, roi: 31.2, sharpe: 2.3, description: "Natural language processing for news sentiment", strength: "News Analysis" },
  { model: "Random Forest Ensemble", accuracy: 82.1, trades: 132, roi: 18.7, sharpe: 1.5, description: "Multiple decision trees for robust predictions", strength: "Risk Management" },
  { model: "XGBoost", accuracy: 85.8, trades: 156, roi: 22.1, sharpe: 1.7, description: "Gradient boosting for technical indicators", strength: "Technical Analysis" },
  { model: "CNN-LSTM Hybrid", accuracy: 89.4, trades: 123, roi: 28.9, sharpe: 2.1, description: "Combines pattern recognition with sequence modeling", strength: "Price Prediction" },
  { model: "Reinforcement Learning", accuracy: 79.2, trades: 89, roi: 35.4, sharpe: 2.5, description: "Self-learning agent for adaptive trading", strength: "Market Adaptation" },
];

const marketSentiment = [
  { factor: "Social Media Sentiment", score: 78, impact: "Positive", description: "Twitter/Reddit bullish on tech stocks" },
  { factor: "News Sentiment", score: 65, impact: "Neutral", description: "Mixed earnings reports across sectors" },
  { factor: "Analyst Reports", score: 82, impact: "Positive", description: "Upgrades outnumber downgrades 3:1" },
  { factor: "Insider Trading", score: 45, impact: "Negative", description: "Increased insider selling in midcaps" },
  { factor: "Options Flow", score: 71, impact: "Positive", description: "Call options volume exceeding puts" },
  { factor: "FII/DII Activity", score: 88, impact: "Very Positive", description: "Strong foreign inflows continue" },
];

const volatilityPrediction = [
  { time: "9:15", volatility: 12.5, volume: 2.3 },
  { time: "10:00", volatility: 15.2, volume: 3.1 },
  { time: "11:00", volatility: 18.7, volume: 4.2 },
  { time: "12:00", volatility: 14.3, volume: 2.8 },
  { time: "13:00", volatility: 16.9, volume: 3.5 },
  { time: "14:00", volatility: 21.4, volume: 5.1 },
  { time: "15:00", volatility: 25.8, volume: 6.7 },
  { time: "15:30", volatility: 19.2, volume: 4.3 },
];

const riskRewardMatrix = [
  { stock: "RELIANCE", risk: 15, reward: 25, marketCap: 16.2 },
  { stock: "TCS", risk: 12, reward: 18, marketCap: 13.8 },
  { stock: "INFY", risk: 18, reward: 28, marketCap: 7.2 },
  { stock: "HDFCBANK", risk: 22, reward: 20, marketCap: 12.1 },
  { stock: "ICICIBANK", risk: 20, reward: 24, marketCap: 8.9 },
  { stock: "WIPRO", risk: 28, reward: 12, marketCap: 2.8 },
];

const aiInsights = [
  {
    type: "BUY",
    stock: "INFY",
    reason: "Strong quarterly results, AI adoption driving growth",
    confidence: 91,
    timeframe: "3-6 months",
    catalyst: "Q3 earnings beat expected",
    detailedAnalysis: "Infosys is well-positioned to benefit from the AI revolution with its Cobalt cloud platform and strong client relationships. Recent large deal wins indicate robust demand.",
    riskFactors: ["Currency headwinds", "Visa restrictions"],
    priceTarget: "₹1,680"
  },
  {
    type: "SELL", 
    stock: "WIPRO",
    reason: "Declining market share, weak guidance",
    confidence: 78,
    timeframe: "1-2 months",
    catalyst: "Management guidance cut",
    detailedAnalysis: "Wipro continues to lose market share to larger competitors. Recent leadership changes and strategic pivots haven't yielded results yet.",
    riskFactors: ["Further guidance cuts", "Client concentration"],
    priceTarget: "₹420"
  },
  {
    type: "HOLD",
    stock: "TCS",
    reason: "Stable but limited upside, wait for better entry",
    confidence: 72,
    timeframe: "2-3 months", 
    catalyst: "Digital transformation deals",
    detailedAnalysis: "TCS remains a quality franchise but valuation appears stretched. Wait for a 5-8% correction for better entry points.",
    riskFactors: ["Margin pressure", "Slow growth"],
    priceTarget: "₹3,580"
  }
];

const generateEnhancedTechnicalAnalysis = (stockName: string) => ({
  rsi: Math.floor(Math.random() * 100),
  macd: (Math.random() - 0.5) * 10,
  stochastic: Math.floor(Math.random() * 100),
  williams: Math.floor(Math.random() * 100),
  momentum: (Math.random() - 0.5) * 20,
  cci: (Math.random() - 0.5) * 200,
  atr: Math.random() * 50,
  vwap: 2400 + (Math.random() - 0.5) * 200,
  bollinger: {
    upper: 2500 + Math.random() * 100,
    middle: 2450 + Math.random() * 50,
    lower: 2400 + Math.random() * 50
  }
});

const generateAdvancedRiskReward = (stockName: string) => [
  { metric: "Volatility", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Liquidity", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Momentum", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Trend Strength", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Support Level", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Resistance Level", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Volume Profile", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "News Sentiment", value: Math.floor(Math.random() * 100), fullMark: 100 },
];

const generateAdvancedPrediction = () => 
  Array.from({ length: 14 }, (_, i) => ({
    day: `Day ${i + 1}`,
    predicted: 2450 + (Math.random() - 0.5) * 200,
    confidence: 60 + Math.random() * 40,
    upper: 2500 + (Math.random() - 0.3) * 150,
    lower: 2400 + (Math.random() - 0.7) * 150,
  }));

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'];

export const MLPredictions = () => {
  const [selectedStock, setSelectedStock] = useState(predictionData[0]);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "STRONG BUY": return "bg-emerald-600";
      case "BUY": return "bg-emerald-500";
      case "HOLD": return "bg-yellow-500";
      case "SELL": return "bg-red-500";
      case "STRONG SELL": return "bg-red-600";
      default: return "bg-gray-500";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-emerald-400";
      case "Medium": return "text-yellow-400";
      case "High": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "BUY": return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case "SELL": return <TrendingDown className="h-4 w-4 text-red-400" />;
      case "HOLD": return <Target className="h-4 w-4 text-yellow-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const technicalAnalysis = generateEnhancedTechnicalAnalysis(selectedStock.name);
  const riskReward = generateAdvancedRiskReward(selectedStock.name);
  const predictionTimeline = generateAdvancedPrediction();

  return (
    <div className="space-y-6">
      {/* Enhanced AI Insights Section */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-400" />
            AI Trading Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="border border-slate-700 rounded-lg overflow-hidden">
                <div 
                  className="p-4 bg-slate-800 cursor-pointer hover:bg-slate-750 transition-colors"
                  onClick={() => setExpandedInsight(expandedInsight === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getInsightIcon(insight.type)}
                      <Badge className={`${getPredictionColor(insight.type)} text-white`}>
                        {insight.type}
                      </Badge>
                      <span className="text-white font-semibold text-lg">{insight.stock}</span>
                      <Badge variant="outline" className="text-gray-400">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-400 font-semibold">{insight.priceTarget}</span>
                      {expandedInsight === index ? 
                        <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      }
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{insight.reason}</p>
                </div>
                
                {expandedInsight === index && (
                  <div className="p-4 bg-slate-850 border-t border-slate-700 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Eye className="h-4 w-4 mr-2 text-blue-400" />
                            Detailed Analysis
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{insight.detailedAnalysis}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-yellow-400" />
                            Key Catalyst
                          </h4>
                          <p className="text-blue-300 text-sm">{insight.catalyst}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                            Risk Factors
                          </h4>
                          <ul className="space-y-1">
                            {insight.riskFactors.map((risk, idx) => (
                              <li key={idx} className="text-red-300 text-sm flex items-center">
                                <div className="w-1 h-1 bg-red-400 rounded-full mr-2"></div>
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-slate-700 rounded">
                            <div className="text-gray-400">Timeframe</div>
                            <div className="text-white font-medium">{insight.timeframe}</div>
                          </div>
                          <div className="p-2 bg-slate-700 rounded">
                            <div className="text-gray-400">Target</div>
                            <div className="text-emerald-400 font-medium">{insight.priceTarget}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Model Performance with Details */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-400" />
              Advanced ML Models Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {advancedModels.map((model, index) => (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden transition-all cursor-pointer ${
                  selectedModel === model.model ? 'border-blue-500 bg-blue-900/10' : 'border-slate-700'
                }`}
                onClick={() => setSelectedModel(selectedModel === model.model ? null : model.model)}
              >
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm font-medium">{model.model}</span>
                    <Badge variant="outline" className="text-xs text-blue-400">
                      {model.strength}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{model.accuracy}%</span>
                    <div className="flex space-x-3 text-xs">
                      <span className="text-emerald-400">ROI: {model.roi}%</span>
                      <span className="text-blue-400">Sharpe: {model.sharpe}</span>
                    </div>
                  </div>
                  <Progress value={model.accuracy} className="h-2 mb-2" />
                  
                  {selectedModel === model.model && (
                    <div className="mt-3 p-2 bg-slate-800 rounded text-xs text-gray-300 animate-fade-in">
                      {model.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Market Sentiment Analysis */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-400" />
              Market Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {marketSentiment.map((sentiment, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                  <div className="flex-1">
                    <div className="text-sm text-white">{sentiment.factor}</div>
                    <div className="text-xs text-gray-400">{sentiment.description}</div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-semibold text-white">{sentiment.score}</div>
                    <div className={`text-xs ${
                      sentiment.impact.includes('Positive') ? 'text-emerald-400' :
                      sentiment.impact === 'Negative' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {sentiment.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={marketSentiment} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" domain={[0, 100]} />
                <YAxis type="category" dataKey="factor" stroke="#9CA3AF" width={80} fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="score" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Stock Predictions with Analysis */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-emerald-400" />
            Enhanced Stock Predictions with AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {predictionData.map((stock, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg cursor-pointer transition-all border ${
                  selectedStock.name === stock.name 
                    ? 'bg-blue-900/20 border-blue-500 shadow-lg' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setSelectedStock(stock)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-lg">{stock.name}</span>
                  <Badge className={`${getPredictionColor(stock.prediction)} text-white`}>
                    {stock.prediction}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Current:</span>
                    <span className="text-white">₹{stock.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Target:</span>
                    <span className="text-emerald-400">₹{stock.targetPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Upside:</span>
                    <span className={stock.upside >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {stock.upside >= 0 ? '+' : ''}{stock.upside}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Risk:</span>
                    <span className={getRiskColor(stock.risk)}>{stock.risk}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">AI Confidence</span>
                    <span className="text-white">{stock.confidence}%</span>
                  </div>
                  <Progress value={stock.confidence} className="h-1.5" />
                </div>
                
                <div className="text-xs text-gray-400 mb-2">
                  <div className="mb-1"><strong>Analysis:</strong> {stock.analysis}</div>
                  <div className="mb-1"><strong>Catalyst:</strong> {stock.catalyst}</div>
                  <div><strong>Timeframe:</strong> {stock.timeframe}</div>
                </div>
                
                {selectedStock.name === stock.name && (
                  <div className="mt-3 p-2 bg-blue-900/20 rounded border border-blue-700/30 animate-fade-in">
                    <div className="text-xs text-blue-300">
                      <strong>Why this recommendation:</strong> Based on technical analysis, fundamental strength, and market sentiment, our AI models suggest this stock has {stock.upside >= 0 ? 'strong potential' : 'significant risk'} in the {stock.timeframe} timeframe.
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk-Reward Matrix & Portfolio Optimization */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-orange-400" />
            Risk-Reward Matrix & Portfolio Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-slate-800 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong>Interpretation:</strong> Stocks in the top-left quadrant (low risk, high reward) are ideal investments. 
              Our AI models consider {selectedStock.name} to be positioned in the <strong className="text-blue-400">
              {selectedStock.risk === 'Low' && selectedStock.upside > 5 ? 'optimal zone' : 
               selectedStock.risk === 'Medium' ? 'balanced zone' : 'high-risk zone'}</strong> for your portfolio.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={riskRewardMatrix}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                type="number" 
                dataKey="risk" 
                name="Risk" 
                unit="%" 
                stroke="#9CA3AF"
                domain={[0, 35]}
                label={{ value: 'Risk Level (%)', position: 'insideBottom', offset: -10, fill: '#9CA3AF' }}
              />
              <YAxis 
                type="number" 
                dataKey="reward" 
                name="Reward" 
                unit="%" 
                stroke="#9CA3AF"
                domain={[0, 35]}
                label={{ value: 'Expected Return (%)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
                formatter={(value, name) => [value + '%', name]}
                labelFormatter={(label) => `Stock: ${label}`}
              />
              <Scatter name="Stocks" dataKey="marketCap" fill="#3B82F6">
                {riskRewardMatrix.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Analysis for Selected Stock */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-400" />
            Deep Analysis - {selectedStock.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Enhanced Technical Indicators */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Technical Indicators</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-slate-800 rounded">
                  <span className="text-gray-300">RSI</span>
                  <span className={`font-semibold ${
                    technicalAnalysis.rsi > 70 ? 'text-red-400' : 
                    technicalAnalysis.rsi < 30 ? 'text-emerald-400' : 'text-yellow-400'
                  }`}>
                    {technicalAnalysis.rsi}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-800 rounded">
                  <span className="text-gray-300">MACD</span>
                  <span className={`font-semibold ${technicalAnalysis.macd >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {technicalAnalysis.macd.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-800 rounded">
                  <span className="text-gray-300">ATR</span>
                  <span className="text-white font-semibold">{technicalAnalysis.atr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-800 rounded">
                  <span className="text-gray-300">VWAP</span>
                  <span className="text-blue-400 font-semibold">₹{technicalAnalysis.vwap.toFixed(2)}</span>
                </div>
                <div className="p-2 bg-slate-800 rounded">
                  <span className="text-gray-300 text-sm">Bollinger Bands</span>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Upper:</span>
                      <span className="text-red-400">₹{technicalAnalysis.bollinger.upper.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Middle:</span>
                      <span className="text-yellow-400">₹{technicalAnalysis.bollinger.middle.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Lower:</span>
                      <span className="text-emerald-400">₹{technicalAnalysis.bollinger.lower.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Risk-Reward Radar */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Multi-Factor Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={riskReward}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                  <Radar
                    name="Analysis"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Enhanced Price Prediction with Confidence Bands */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">14-Day Price Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={predictionTimeline}>
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
                    dataKey="upper"
                    stackId="1"
                    stroke="none"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stackId="1"
                    stroke="none"
                    fill="#ffffff"
                    fillOpacity={0.1}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#F59E0B" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intraday Volatility & Volume Prediction */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Intraday Volatility Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={volatilityPrediction}>
                <defs>
                  <linearGradient id="colorVolatility" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
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
                  dataKey="volatility"
                  stroke="#EF4444"
                  fill="url(#colorVolatility)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Model Confidence Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'High Confidence (>80%)', value: 65, color: '#10B981' },
                    { name: 'Medium Confidence (60-80%)', value: 25, color: '#F59E0B' },
                    { name: 'Low Confidence (<60%)', value: 10, color: '#EF4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {[
                    { color: '#10B981' },
                    { color: '#F59E0B' },
                    { color: '#EF4444' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
