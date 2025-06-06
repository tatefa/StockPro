
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { DashboardInsights } from "@/components/DashboardInsights";
import { StockList } from "@/components/StockList";
import { NewsPanel } from "@/components/NewsPanel";
import { MLPredictions } from "@/components/MLPredictions";
import { Watchlist } from "@/components/Watchlist";
import { UserProfile } from "@/components/UserProfile";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header 
        onLogout={onLogout} 
        onUserProfileClick={() => setIsUserProfileOpen(true)}
      />
      
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-900 border-slate-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="stocks" className="data-[state=active]:bg-blue-600">
              Stocks
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-600">
              ML Predictions
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="data-[state=active]:bg-blue-600">
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-blue-600">
              News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardInsights />
            <PortfolioOverview />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StockList />
              </div>
              <div>
                <NewsPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stocks">
            <StockList />
          </TabsContent>

          <TabsContent value="predictions">
            <MLPredictions />
          </TabsContent>

          <TabsContent value="watchlist">
            <Watchlist />
          </TabsContent>

          <TabsContent value="news">
            <NewsPanel />
          </TabsContent>
        </Tabs>
      </div>

      <UserProfile 
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
      />
    </div>
  );
};
