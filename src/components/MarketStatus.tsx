
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { stockService } from "@/services/stockService";

export const MarketStatus = () => {
  const [marketStatus, setMarketStatus] = useState({ isOpen: false, message: "" });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateStatus = () => {
      setMarketStatus(stockService.getMarketStatus());
      setCurrentTime(new Date());
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-4 bg-slate-800 p-3 rounded-lg">
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-300">
          {currentTime.toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })} IST
        </span>
      </div>
      <Badge 
        className={`${marketStatus.isOpen ? 'bg-emerald-600' : 'bg-red-600'} text-white`}
      >
        {marketStatus.message}
      </Badge>
    </div>
  );
};
