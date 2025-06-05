
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

const initialWatchlist = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2450.75, change: +45.30, changePercent: +1.88 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3520.40, change: -32.15, changePercent: -0.90 },
  { symbol: "INFY", name: "Infosys Limited", price: 1580.25, change: +28.50, changePercent: +1.84 },
];

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [newSymbol, setNewSymbol] = useState("");

  const addToWatchlist = () => {
    if (newSymbol && !watchlist.find(stock => stock.symbol === newSymbol.toUpperCase())) {
      // Simulate adding a new stock with random data
      const newStock = {
        symbol: newSymbol.toUpperCase(),
        name: `${newSymbol.toUpperCase()} Limited`,
        price: Math.random() * 3000 + 100,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 5,
      };
      setWatchlist([...watchlist, newStock]);
      setNewSymbol("");
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
