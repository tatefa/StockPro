
// Mock real-time stock service - in production, replace with actual API
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
}

// Mock data that simulates real-time updates
const mockStocks: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2450.75, change: 45.30, changePercent: 1.88, volume: 2340000, marketCap: 1654000000000, pe: 24.5, prediction: "BUY" },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3520.40, change: -32.15, changePercent: -0.90, volume: 1890000, marketCap: 1280000000000, pe: 28.3, prediction: "HOLD" },
  { symbol: "INFY", name: "Infosys Limited", price: 1580.25, change: 28.50, changePercent: 1.84, volume: 3450000, marketCap: 654000000000, pe: 22.1, prediction: "BUY" },
  { symbol: "HDFCBANK", name: "HDFC Bank Limited", price: 1645.80, change: -15.60, changePercent: -0.94, volume: 2100000, marketCap: 908000000000, pe: 18.7, prediction: "HOLD" },
  { symbol: "ICICIBANK", name: "ICICI Bank Limited", price: 1125.30, change: 22.75, changePercent: 2.06, volume: 4200000, marketCap: 789000000000, pe: 16.9, prediction: "BUY" },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd.", price: 785.60, change: 18.45, changePercent: 2.40, volume: 1800000, marketCap: 169000000000, pe: 15.2, prediction: "STRONG BUY" },
];

class StockService {
  private stocks: Stock[] = [...mockStocks];
  private listeners: ((stocks: Stock[]) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.startRealTimeUpdates();
  }

  private startRealTimeUpdates() {
    // Simulate real-time price updates every 3 seconds
    this.intervalId = setInterval(() => {
      this.stocks = this.stocks.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 20,
        change: (Math.random() - 0.5) * 50,
        changePercent: (Math.random() - 0.5) * 3,
        volume: stock.volume + Math.floor((Math.random() - 0.5) * 100000),
      }));
      
      this.notifyListeners();
    }, 3000);
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  addStock(symbol: string, name: string): boolean {
    if (this.stocks.find(s => s.symbol === symbol)) {
      return false; // Stock already exists
    }

    const newStock: Stock = {
      symbol: symbol.toUpperCase(),
      name,
      price: Math.random() * 3000 + 100,
      change: (Math.random() - 0.5) * 100,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 5000000) + 500000,
      marketCap: Math.floor(Math.random() * 1000000000000) + 50000000000,
      pe: Math.random() * 30 + 10,
      prediction: ["BUY", "HOLD", "SELL", "STRONG BUY"][Math.floor(Math.random() * 4)],
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
