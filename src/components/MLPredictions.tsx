
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Brain, Target } from "lucide-react";

const predictionData = [
  { name: "AAPL", confidence: 87, prediction: "BUY", targetPrice: 185.50 },
  { name: "GOOGL", confidence: 72, prediction: "HOLD", targetPrice: 145.20 },
  { name: "MSFT", confidence: 91, prediction: "BUY", targetPrice: 395.75 },
  { name: "TSLA", confidence: 68, prediction: "SELL", targetPrice: 220.30 },
  { name: "AMZN", confidence: 83, prediction: "BUY", targetPrice: 142.80 },
];

const modelPerformance = [
  { model: "LSTM Neural Network", accuracy: 87.3, trades: 145 },
  { model: "Random Forest", accuracy: 82.1, trades: 132 },
  { model: "Support Vector Machine", accuracy: 79.8, trades: 128 },
  { model: "Gradient Boosting", accuracy: 84.5, trades: 139 },
];

export const MLPredictions = () => {
  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "BUY": return "bg-emerald-500";
      case "HOLD": return "bg-yellow-500";
      case "SELL": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

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
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-white font-semibold">{stock.name}</span>
                  <Badge className={`${getPredictionColor(stock.prediction)} text-white`}>
                    {stock.prediction}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm">Target: ${stock.targetPrice}</div>
                  <div className="text-gray-400 text-xs">Confidence: {stock.confidence}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

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
