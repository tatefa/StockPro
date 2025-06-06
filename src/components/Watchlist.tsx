
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { stockService, Stock } from "@/services/stockService";

export const Watchlist = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [newSymbol, setNewSymbol] = useState("");

  useEffect(() => {
    // Initial load
    const allStocks = stockService.getStocks();
    setStocks(allStocks);
    setWatchlist(allStocks.slice(0, 3)); // Initial watchlist with first 3 stocks

    // Subscribe to real-time updates
    const unsubscribe = stockService.subscribe((updatedStocks) => {
      setStocks(updatedStocks);
      // Update watchlist with latest data
      setWatchlist(prev => 
        prev.map(watchlistStock => 
          updatedStocks.find(s => s.symbol === watchlistStock.symbol) || watchlistStock
        )
      );
    });

    return unsubscribe;
  }, []);

  const addToWatchlist = () => {
    if (newSymbol) {
      const stock = stocks.find(s => s.symbol.toLowerCase() === newSymbol.toLowerCase());
      if (stock && !watchlist.find(w => w.symbol === stock.symbol)) {
        setWatchlist([...watchlist, stock]);
        setNewSymbol("");
      } else if (!stock) {
        // Try to add new stock via service
        const success = stockService.addStock(newSymbol, `${newSymbol} Limited`);
        if (success) {
          setNewSymbol("");
        }
      }
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Add to Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter stock symbol (e.g., RELIANCE)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
              onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
            />
            <Button onClick={addToWatchlist} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">My Watchlist ({watchlist.length} stocks)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {watchlist.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold text-white text-lg">{stock.symbol}</div>
                    <div className="text-sm text-gray-400">{stock.name}</div>
                    <div className="text-xs text-gray-500">
                      Vol: {(stock.volume / 1000000).toFixed(2)}M | MC: ₹{(stock.marketCap / 10000000).toFixed(0)}Cr
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-white font-semibold">₹{stock.price.toFixed(2)}</div>
                    <div className={`text-sm flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromWatchlist(stock.symbol)}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {watchlist.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>Your watchlist is empty. Add some stocks to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
