
import { Button } from "@/components/ui/button";
import { TrendingUp, LogOut, User } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
  onUserProfileClick: () => void;
}

export const Header = ({ onLogout, onUserProfileClick }: HeaderProps) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">StockML Pro</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onUserProfileClick}
            className="flex items-center space-x-2 text-gray-300 hover:bg-slate-800"
          >
            <User className="h-5 w-5" />
            <span>Hi user</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
            className="border-slate-700 text-gray-300 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
