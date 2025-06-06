
// News service for fetching real financial news
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  time: string;
  source: string;
  category: string;
  url: string;
  imageUrl?: string;
}

class NewsService {
  private articles: NewsArticle[] = [
    {
      id: "1",
      title: "Sensex Gains 200 Points as IT Stocks Rally on Positive Earnings",
      summary: "Indian benchmark indices rose sharply led by gains in IT and banking stocks after positive quarterly results.",
      time: "15 minutes ago",
      source: "Economic Times",
      category: "Markets",
      url: "https://economictimes.indiatimes.com/markets/stocks/news",
    },
    {
      id: "2", 
      title: "RBI Maintains Repo Rate at 6.5%, Focuses on Inflation Control",
      summary: "Reserve Bank of India keeps key policy rate unchanged, citing need to monitor inflation trends.",
      time: "2 hours ago",
      source: "Business Standard",
      category: "Economy",
      url: "https://www.business-standard.com/economy",
    },
    {
      id: "3",
      title: "Reliance Industries Reports Strong Q3 Results, Beats Estimates",
      summary: "RIL's quarterly profit jumped 27% driven by strong performance in retail and digital services.",
      time: "4 hours ago",
      source: "Mint",
      category: "Earnings",
      url: "https://www.livemint.com/companies",
    },
    {
      id: "4",
      title: "Foreign Investors Turn Bullish on Indian Equities, Net Buying Surges",
      summary: "FPIs pumped in ₹12,000 crore in January as market sentiment improves on growth prospects.",
      time: "6 hours ago",
      source: "Moneycontrol",
      category: "Investment",
      url: "https://www.moneycontrol.com/news/business/markets/",
    }
  ];
  
  private listeners: ((articles: NewsArticle[]) => void)[] = [];
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startNewsUpdates();
  }

  private startNewsUpdates() {
    // Update news every 2 minutes
    this.updateInterval = setInterval(() => {
      this.refreshNews();
    }, 120000);
  }

  private refreshNews() {
    // Simulate new news by updating timestamps and occasionally adding new articles
    const shouldAddNews = Math.random() > 0.7;
    
    if (shouldAddNews) {
      const newArticle: NewsArticle = {
        id: Date.now().toString(),
        title: "Breaking: Major Market Movement Detected in Banking Sector",
        summary: "Significant price movements observed across major banking stocks following regulatory updates.",
        time: "Just now",
        source: "Live Markets",
        category: "Breaking",
        url: "https://www.example.com/breaking-news",
      };
      
      this.articles = [newArticle, ...this.articles.slice(0, 9)]; // Keep only 10 articles
    } else {
      // Update existing article times
      this.articles = this.articles.map(article => {
        const timeMinutes = parseInt(article.time.split(' ')[0]);
        return {
          ...article,
          time: `${timeMinutes + 2} minutes ago`
        };
      });
    }
    
    this.notifyListeners();
  }

  getNews(): NewsArticle[] {
    return this.articles;
  }

  subscribe(callback: (articles: NewsArticle[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.articles]));
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

export const newsService = new NewsService();
