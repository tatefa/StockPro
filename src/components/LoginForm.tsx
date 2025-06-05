
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, BarChart3 } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
      </div>
      
      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
            <div className="p-3 bg-blue-600 rounded-xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">StockML Pro</h1>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-white leading-tight">
              AI-Powered
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent block">
                Portfolio Management
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Leverage advanced machine learning models to optimize your stock portfolio, 
              track market trends, and make data-driven investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="flex items-center space-x-3 text-gray-300">
              <BarChart3 className="h-6 w-6 text-blue-400" />
              <span>ML Predictions</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Shield className="h-6 w-6 text-emerald-400" />
              <span>Secure Trading</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
              <CardDescription className="text-gray-300">
                Access your portfolio dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Sign In to Dashboard
                </Button>
                
                <div className="text-center">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
