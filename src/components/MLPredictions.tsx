import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const predictionData = [
  { name: "RELIANCE", confidence: 87, prediction: "STRONG BUY", targetPrice: 2650.50, currentPrice: 2420.30, upside: 9.5, risk: "Low" },
  { name: "TCS", confidence: 72, prediction: "HOLD", targetPrice: 3580.20, currentPrice: 3545.80, upside: 1.0, risk: "Medium" },
  { name: "INFY", confidence: 91, prediction: "STRONG BUY", targetPrice: 1680.75, currentPrice: 1520.40, upside: 10.5, risk: "Low" },
  { name: "HDFCBANK", confidence: 68, prediction: "HOLD", targetPrice: 1720.30, currentPrice: 1695.50, upside: 1.5, risk: "Medium" },
  { name: "ICICIBANK", confidence: 83, prediction: "BUY", targetPrice: 1250.80, currentPrice: 1180.25, upside: 6.0, risk: "Low" },
  { name: "WIPRO", confidence: 45, prediction: "SELL", targetPrice: 420.50, currentPrice: 485.30, upside: -13.3, risk: "High" },
];

const advancedModels = [
  { model: "LSTM Neural Network", accuracy: 87.3, trades: 145, roi: 24.5, sharpe: 1.8 },
  { model: "Transformer (GPT-4)", accuracy: 92.1, trades: 98, roi: 31.2, sharpe: 2.3 },
  { model: "Random Forest Ensemble", accuracy: 82.1, trades: 132, roi: 18.7, sharpe: 1.5 },
  { model: "XGBoost", accuracy: 85.8, trades: 156, roi: 22.1, sharpe: 1.7 },
  { model: "CNN-LSTM Hybrid", accuracy: 89.4, trades: 123, roi: 28.9, sharpe: 2.1 },
  { model: "Reinforcement Learning", accuracy: 79.2, trades: 89, roi: 35.4, sharpe: 2.5 },
];

const marketSentiment = [
  { factor: "Social Media Sentiment", score: 78, impact: "Positive" },
  { factor: "News Sentiment", score: 65, impact: "Neutral" },
  { factor: "Analyst Reports", score: 82, impact: "Positive" },
  { factor: "Insider Trading", score: 45, impact: "Negative" },
  { factor: "Options Flow", score: 71, impact: "Positive" },
  { factor: "FII/DII Activity", score: 88, impact: "Very Positive" },
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
    catalyst: "Q3 earnings beat expected"
  },
  {
    type: "SELL",
    stock: "WIPRO",
    reason: "Declining market share, weak guidance",
    confidence: 78,
    timeframe: "1-2 months",
    catalyst: "Management guidance cut"
  },
  {
    type: "HOLD",
    stock: "TCS",
    reason: "Stable but limited upside, wait for better entry",
    confidence: 72,
    timeframe: "2-3 months",
    catalyst: "Digital transformation deals"
  }
];

// Generate enhanced technical analysis
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

// Enhanced price prediction with confidence intervals
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
      {/* AI Insights Section */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-400" />
            AI Trading Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg border-l-4 border-l-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getInsightIcon(insight.type)}
                    <Badge className={`${getPredictionColor(insight.type)} text-white`}>
                      {insight.type}
                    </Badge>
                  </div>
                  <span className="text-white font-semibold">{insight.stock}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{insight.reason}</p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Confidence: {insight.confidence}%</span>
                  <span>{insight.timeframe}</span>
                </div>
                <div className="mt-2 text-xs text-blue-400">
                  Catalyst: {insight.catalyst}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Model Performance */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-400" />
              Advanced ML Models Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {advancedModels.map((model, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm font-medium">{model.model}</span>
                  <div className="flex space-x-3 text-xs">
                    <span className="text-emerald-400">ROI: {model.roi}%</span>
                    <span className="text-blue-400">Sharpe: {model.sharpe}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">{model.accuracy}%</span>
                  <span className="text-gray-400 text-xs">{model.trades} predictions</span>
                </div>
                <Progress value={model.accuracy} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Sentiment Analysis */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-400" />
              Market Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketSentiment} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" domain={[0, 100]} />
                <YAxis type="category" dataKey="factor" stroke="#9CA3AF" width={100} />
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

      {/* Enhanced Stock Predictions */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-emerald-400" />
            Enhanced Stock Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {predictionData.map((stock, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg cursor-pointer transition-colors border ${
                  selectedStock.name === stock.name 
                    ? 'bg-blue-900 border-blue-500' 
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-750'
                }`}
                onClick={() => setSelectedStock(stock)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-lg">{stock.name}</span>
                  <Badge className={`${getPredictionColor(stock.prediction)} text-white`}>
                    {stock.prediction}
                  </Badge>
                </div>
                
                <div className="space-y-2">
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
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-white">{stock.confidence}%</span>
                  </div>
                  <Progress value={stock.confidence} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk-Reward Matrix */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-orange-400" />
            Risk-Reward Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              />
              <YAxis 
                type="number" 
                dataKey="reward" 
                name="Reward" 
                unit="%" 
                stroke="#9CA3AF"
                domain={[0, 35]}
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
