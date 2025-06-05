
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface StockChartProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    prediction: string;
  };
  onClose: () => void;
}

// Mock live chart data - in real app this would come from API
const generateLiveData = (symbol: string) => {
  const basePrice = symbol === "RELIANCE" ? 2450 : symbol === "TCS" ? 3520 : 1580;
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${9 + Math.floor(i / 2)}:${(i % 2) * 30}`,
    price: basePrice + (Math.random() - 0.5) * 100,
    volume: Math.floor(Math.random() * 1000000) + 500000,
  }));
};

// Mock RSI data
const generateRSI = () => {
  return Array.from({ length: 14 }, (_, i) => ({
    day: `Day ${i + 1}`,
    rsi: Math.random() * 100,
  }));
};

// Mock technical indicators
const getTechnicalIndicators = (symbol: string) => ({
  rsi: Math.floor(Math.random() * 100),
  macd: (Math.random() - 0.5) * 10,
  bb_upper: Math.floor(Math.random() * 100) + 2500,
  bb_lower: Math.floor(Math.random() * 100) + 2300,
  sma_20: Math.floor(Math.random() * 100) + 2400,
  ema_12: Math.floor(Math.random() * 100) + 2420,
});

export const StockChart = ({ stock, onClose }: StockChartProps) => {
  const liveData = generateLiveData(stock.symbol);
  const rsiData = generateRSI();
  const indicators = getTechnicalIndicators(stock.symbol);

  const getRSIColor = (rsi: number) => {
    if (rsi > 70) return "text-red-400";
    if (rsi < 30) return "text-emerald-400";
    return "text-yellow-400";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{stock.symbol}</h2>
              <p className="text-gray-400">{stock.name}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-3xl font-bold text-white">₹{stock.price}</span>
                <span className={`flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {stock.change >= 0 ? '+' : ''}₹{stock.change} ({stock.changePercent}%)
                </span>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Live Price Chart */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Live Price Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={liveData}>
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
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Technical Indicators */}
            <div className="space-y-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Technical Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">RSI (14)</span>
                    <span className={`font-semibold ${getRSIColor(indicators.rsi)}`}>
                      {indicators.rsi}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">MACD</span>
                    <span className={`font-semibold ${indicators.macd >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {indicators.macd.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">SMA (20)</span>
                    <span className="text-white font-semibold">₹{indicators.sma_20}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">EMA (12)</span>
                    <span className="text-white font-semibold">₹{indicators.ema_12}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-2">
                    <div className="text-sm text-gray-400 mb-2">Bollinger Bands</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Upper</span>
                      <span className="text-white">₹{indicators.bb_upper}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Lower</span>
                      <span className="text-white">₹{indicators.bb_lower}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* RSI Chart */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">RSI Indicator</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={rsiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    {/* Overbought line at 70 */}
                    <Line y={70} stroke="#EF4444" strokeDasharray="5 5" />
                    {/* Oversold line at 30 */}
                    <Line y={30} stroke="#10B981" strokeDasharray="5 5" />
                    <Line 
                      type="monotone" 
                      dataKey="rsi" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Volume Chart */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={liveData}>
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
                    <Bar dataKey="volume" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
