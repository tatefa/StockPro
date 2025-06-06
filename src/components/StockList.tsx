
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { StockChart } from "./StockChart";
import { AddStockDialog } from "./AddStockDialog";
import { stockService, Stock } from "@/services/stockService";

export const StockList = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  useEffect(() => {
    // Initial load
    setStocks(stockService.getStocks());

    // Subscribe to real-time updates
    const unsubscribe = stockService.subscribe(setStocks);

    return unsubscribe;
  }, []);

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "STRONG BUY": return "bg-emerald-600";
      case "BUY": return "bg-emerald-500";
      case "HOLD": return "bg-yellow-500";
      case "SELL": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleStockAdded = () => {
    // Stock list will automatically update via subscription
    console.log("Stock added successfully");
  };

  return (
    <>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Stock Watchlist</CardTitle>
          <AddStockDialog onStockAdded={handleStockAdded} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stocks.map((stock) => (
              <div 
                key={stock.symbol} 
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors cursor-pointer"
                onClick={() => handleStockClick(stock)}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold text-white text-lg">{stock.symbol}</div>
                    <div className="text-sm text-gray-400">{stock.name}</div>
                    <div className="text-xs text-gray-500">
                      Vol: {(stock.volume / 1000000).toFixed(2)}M | P/E: {stock.pe?.toFixed(1)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-white font-semibold">₹{stock.price.toFixed(2)}</div>
                    <div className={`text-sm flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
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

      {selectedStock && (
        <StockChart 
          stock={selectedStock} 
          onClose={() => setSelectedStock(null)}
        />
      )}
    </>
  );
};
