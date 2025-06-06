
// Real-time stock service with Indian market integration
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  prediction: string;
  lastUpdated: string;
}

// Indian market hours: 9:15 AM to 3:30 PM IST (Monday-Friday)
const isMarketOpen = (): boolean => {
  const now = new Date();
  const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
  const day = istTime.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = istTime.getHours();
  const minute = istTime.getMinutes();
  const currentTime = hour * 60 + minute;
  
  // Market closed on weekends
  if (day === 0 || day === 6) return false;
  
  // Market hours: 9:15 AM (555 minutes) to 3:30 PM (930 minutes)
  return currentTime >= 555 && currentTime <= 930;
};

// Mock data for Indian stocks with realistic prices
const mockStocks: Stock[] = [
  { 
    symbol: "RELIANCE", 
    name: "Reliance Industries Ltd.", 
    price: 2847.65, 
    change: -12.30, 
    changePercent: -0.43, 
    volume: 3240000, 
    marketCap: 1920000000000, 
    pe: 24.5, 
    prediction: "HOLD",
    lastUpdated: new Date().toISOString()
  },
  { 
    symbol: "TCS", 
    name: "Tata Consultancy Services", 
    price: 4156.40, 
    change: 45.15, 
    changePercent: 1.10, 
    volume: 1890000, 
    marketCap: 1510000000000, 
    pe: 28.3, 
    prediction: "BUY",
    lastUpdated: new Date().toISOString()
  },
  { 
    symbol: "HDFCBANK", 
    name: "HDFC Bank Limited", 
    price: 1745.80, 
    change: 8.60, 
    changePercent: 0.49, 
    volume: 2100000, 
    marketCap: 1320000000000, 
    pe: 18.7, 
    prediction: "BUY",
    lastUpdated: new Date().toISOString()
  },
  { 
    symbol: "INFY", 
    name: "Infosys Limited", 
    price: 1821.25, 
    change: -15.50, 
    changePercent: -0.84, 
    volume: 3450000, 
    marketCap: 754000000000, 
    pe: 22.1, 
    prediction: "HOLD",
    lastUpdated: new Date().toISOString()
  },
  { 
    symbol: "ICICIBANK", 
    name: "ICICI Bank Limited", 
    price: 1267.30, 
    change: 22.75, 
    changePercent: 1.83, 
    volume: 4200000, 
    marketCap: 889000000000, 
    pe: 16.9, 
    prediction: "BUY",
    lastUpdated: new Date().toISOString()
  },
];

class StockService {
  private stocks: Stock[] = [...mockStocks];
  private listeners: ((stocks: Stock[]) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.startRealTimeUpdates();
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  private async fetchRealData(symbol: string): Promise<Partial<Stock> | null> {
    if (!this.apiKey) return null;

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${this.apiKey}`
      );
      const data = await response.json();
      
      if (data['Global Quote']) {
        const quote = data['Global Quote'];
        return {
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          lastUpdated: quote['07. latest trading day']
        };
      }
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
    return null;
  }

  private startRealTimeUpdates() {
    // Update every 5 seconds if market is open, every 30 seconds if closed
    const updateInterval = isMarketOpen() ? 5000 : 30000;
    
    this.intervalId = setInterval(async () => {
      if (isMarketOpen()) {
        // During market hours, simulate real-time price movements
        this.stocks = this.stocks.map(stock => {
          const volatility = 0.5; // Reduced volatility for more realistic movements
          const priceChange = (Math.random() - 0.5) * volatility * (stock.price * 0.01);
          const newPrice = Math.max(stock.price + priceChange, 1);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;

          return {
            ...stock,
            price: newPrice,
            change: change,
            changePercent: changePercent,
            volume: stock.volume + Math.floor((Math.random() - 0.5) * 50000),
            lastUpdated: new Date().toISOString()
          };
        });
      } else {
        // Market closed - only update timestamp
        this.stocks = this.stocks.map(stock => ({
          ...stock,
          lastUpdated: new Date().toISOString()
        }));
      }
      
      this.notifyListeners();
    }, updateInterval);
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  getMarketStatus(): { isOpen: boolean; message: string } {
    const isOpen = isMarketOpen();
    return {
      isOpen,
      message: isOpen 
        ? "Market is OPEN" 
        : "Market is CLOSED - Next session starts at 9:15 AM IST"
    };
  }

  addStock(symbol: string, name: string): boolean {
    if (this.stocks.find(s => s.symbol === symbol)) {
      return false;
    }

    const newStock: Stock = {
      symbol: symbol.toUpperCase(),
      name,
      price: Math.random() * 2000 + 500,
      change: (Math.random() - 0.5) * 100,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 5000000) + 500000,
      marketCap: Math.floor(Math.random() * 1000000000000) + 50000000000,
      pe: Math.random() * 30 + 10,
      prediction: ["BUY", "HOLD", "SELL", "STRONG BUY"][Math.floor(Math.random() * 4)],
      lastUpdated: new Date().toISOString()
    };

    this.stocks.push(newStock);
    this.notifyListeners();
    return true;
  }

  subscribe(callback: (stocks: Stock[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.stocks]));
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export const stockService = new StockService();
