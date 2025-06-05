
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: +2.34, changePercent: +1.35, prediction: "BUY" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.56, change: -1.23, changePercent: -0.85, prediction: "HOLD" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: +5.67, changePercent: +1.52, prediction: "BUY" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: -8.45, changePercent: -3.29, prediction: "SELL" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 134.12, change: +3.21, changePercent: +2.45, prediction: "BUY" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.30, change: +15.67, changePercent: +1.82, prediction: "STRONG BUY" },
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
                  <div className="text-white font-semibold">${stock.price}</div>
                  <div className={`text-sm flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
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
