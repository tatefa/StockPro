
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";

const stocks = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2450.75, change: +45.30, changePercent: +1.88, prediction: "BUY" },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3520.40, change: -32.15, changePercent: -0.90, prediction: "HOLD" },
  { symbol: "INFY", name: "Infosys Limited", price: 1580.25, change: +28.50, changePercent: +1.84, prediction: "BUY" },
  { symbol: "HDFCBANK", name: "HDFC Bank Limited", price: 1645.80, change: -15.60, changePercent: -0.94, prediction: "HOLD" },
  { symbol: "ICICIBANK", name: "ICICI Bank Limited", price: 1125.30, change: +22.75, changePercent: +2.06, prediction: "BUY" },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd.", price: 785.60, change: +18.45, changePercent: +2.40, prediction: "STRONG BUY" },
];

export const StockList = () => {
  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "STRONG BUY": return "bg-emerald-600";
      case "BUY": return "bg-emerald-500";
      case "HOLD": return "bg-yellow-500";
      case "SELL": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Stock Watchlist</CardTitle>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold text-white text-lg">{stock.symbol}</div>
                  <div className="text-sm text-gray-400">{stock.name}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-white font-semibold">₹{stock.price}</div>
                  <div className={`text-sm flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {stock.change >= 0 ? '+' : ''}₹{stock.change} ({stock.changePercent}%)
                  </div>
                </div>
                
                <Badge className={`${getPredictionColor(stock.prediction)} text-white`}>
                  {stock.prediction}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
