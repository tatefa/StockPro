
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, Brain, Target, Activity } from "lucide-react";

const predictionData = [
  { name: "RELIANCE", confidence: 87, prediction: "BUY", targetPrice: 2650.50 },
  { name: "TCS", confidence: 72, prediction: "HOLD", targetPrice: 3580.20 },
  { name: "INFY", confidence: 91, prediction: "BUY", targetPrice: 1680.75 },
  { name: "HDFCBANK", confidence: 68, prediction: "HOLD", targetPrice: 1720.30 },
  { name: "ICICIBANK", confidence: 83, prediction: "BUY", targetPrice: 1250.80 },
];

const modelPerformance = [
  { model: "LSTM Neural Network", accuracy: 87.3, trades: 145 },
  { model: "Random Forest", accuracy: 82.1, trades: 132 },
  { model: "Support Vector Machine", accuracy: 79.8, trades: 128 },
  { model: "Gradient Boosting", accuracy: 84.5, trades: 139 },
];

// Generate technical analysis data for selected stock
const generateTechnicalAnalysis = (stockName: string) => ({
  rsi: Math.floor(Math.random() * 100),
  macd: (Math.random() - 0.5) * 10,
  stochastic: Math.floor(Math.random() * 100),
  williams: Math.floor(Math.random() * 100),
  momentum: (Math.random() - 0.5) * 20,
  cci: (Math.random() - 0.5) * 200,
});

// Risk-reward analysis
const generateRiskReward = (stockName: string) => [
  { metric: "Volatility", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Liquidity", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Momentum", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Trend Strength", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Support Level", value: Math.floor(Math.random() * 100), fullMark: 100 },
  { metric: "Resistance Level", value: Math.floor(Math.random() * 100), fullMark: 100 },
];

// Price prediction timeline
const generatePredictionTimeline = () => 
  Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    predicted: 2450 + (Math.random() - 0.5) * 200,
    confidence: 60 + Math.random() * 40,
  }));

export const MLPredictions = () => {
  const [selectedStock, setSelectedStock] = useState(predictionData[0]);

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "BUY": return "bg-emerald-500";
      case "HOLD": return "bg-yellow-500";
      case "SELL": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const technicalAnalysis = generateTechnicalAnalysis(selectedStock.name);
  const riskReward = generateRiskReward(selectedStock.name);
  const predictionTimeline = generatePredictionTimeline();

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-400" />
              ML Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {modelPerformance.map((model, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{model.model}</span>
                  <span className="text-white font-semibold">{model.accuracy}%</span>
                </div>
                <Progress value={model.accuracy} className="h-2" />
                <div className="text-xs text-gray-400">{model.trades} predictions made</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-emerald-400" />
              Today's Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictionData.map((stock, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedStock.name === stock.name ? 'bg-blue-900' : 'bg-slate-800 hover:bg-slate-750'
                }`}
                onClick={() => setSelectedStock(stock)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-white font-semibold">{stock.name}</span>
                  <Badge className={`${getPredictionColor(stock.prediction)} text-white`}>
                    {stock.prediction}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm">Target: ₹{stock.targetPrice}</div>
                  <div className="text-gray-400 text-xs">Confidence: {stock.confidence}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced analysis for selected stock */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-400" />
            Detailed Analysis - {selectedStock.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Technical Indicators */}
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
                  <span className="text-gray-300">Stochastic</span>
                  <span className="text-white font-semibold">{technicalAnalysis.stochastic}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-800 rounded">
                  <span className="text-gray-300">Williams %R</span>
                  <span className="text-white font-semibold">{technicalAnalysis.williams}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-800 rounded">
                  <span className="text-gray-300">Momentum</span>
                  <span className={`font-semibold ${technicalAnalysis.momentum >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {technicalAnalysis.momentum.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-800 rounded">
                  <span className="text-gray-300">CCI</span>
                  <span className="text-white font-semibold">{technicalAnalysis.cci.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Risk-Reward Radar */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Risk-Reward Analysis</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={riskReward}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <Radar
                    name="Risk-Reward"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Price Prediction Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">7-Day Price Prediction</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={predictionTimeline}>
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
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#F59E0B" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Prediction Confidence Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="confidence" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
