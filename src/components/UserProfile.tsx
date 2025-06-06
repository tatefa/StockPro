
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const userPortfolio = {
  totalInvested: 250000,
  currentValue: 287500,
  totalGainLoss: 37500,
  gainLossPercent: 15.0,
  holdings: [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      quantity: 50,
      avgPrice: 2300,
      currentPrice: 2450.75,
      invested: 115000,
      currentValue: 122537.5,
      gainLoss: 7537.5,
      gainLossPercent: 6.55,
      recommendation: "HOLD"
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 25,
      avgPrice: 3600,
      currentPrice: 3520.40,
      invested: 90000,
      currentValue: 88010,
      gainLoss: -1990,
      gainLossPercent: -2.21,
      recommendation: "BUY MORE"
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      quantity: 30,
      avgPrice: 1500,
      currentPrice: 1580.25,
      invested: 45000,
      currentValue: 47407.5,
      gainLoss: 2407.5,
      gainLossPercent: 5.35,
      recommendation: "HOLD"
    }
  ]
};

export const UserProfile = ({ isOpen, onClose }: UserProfileProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "BUY MORE": return "bg-emerald-600";
      case "HOLD": return "bg-yellow-500";
      case "SELL": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">User Portfolio</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-300 text-sm flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Total Invested
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">₹{userPortfolio.totalInvested.toLocaleString()}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-300 text-sm flex items-center">
                  <PieChart className="h-4 w-4 mr-2" />
                  Current Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">₹{userPortfolio.currentValue.toLocaleString()}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-300 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Total Gain/Loss
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${userPortfolio.totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {userPortfolio.totalGainLoss >= 0 ? '+' : ''}₹{userPortfolio.totalGainLoss.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-300 text-sm">Gain/Loss %</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${userPortfolio.gainLossPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {userPortfolio.gainLossPercent >= 0 ? '+' : ''}{userPortfolio.gainLossPercent}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Holdings */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Your Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userPortfolio.holdings.map((holding) => (
                  <div key={holding.symbol} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-white text-lg">{holding.symbol}</div>
                        <div className="text-sm text-gray-400">{holding.name}</div>
                      </div>
                      <Badge className={`${getRecommendationColor(holding.recommendation)} text-white`}>
                        {holding.recommendation}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Quantity</div>
                        <div className="text-white font-medium">{holding.quantity}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Avg Price</div>
                        <div className="text-white font-medium">₹{holding.avgPrice}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Current Price</div>
                        <div className="text-white font-medium">₹{holding.currentPrice}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Invested</div>
                        <div className="text-white font-medium">₹{holding.invested.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                      <div>
                        <div className="text-gray-400 text-sm">Current Value</div>
                        <div className="text-white font-semibold">₹{holding.currentValue.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">Gain/Loss</div>
                        <div className={`font-semibold flex items-center ${holding.gainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {holding.gainLoss >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                          {holding.gainLoss >= 0 ? '+' : ''}₹{holding.gainLoss.toLocaleString()} ({holding.gainLossPercent}%)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Investment Insights */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Investment Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>Your portfolio is performing well with a 15% overall gain. Consider rebalancing if any single stock exceeds 40% of your portfolio.</div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>TCS is showing a temporary dip. Consider buying more if you believe in the company's long-term prospects.</div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>Your portfolio is well-diversified across different sectors. Maintain this balance for steady growth.</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
