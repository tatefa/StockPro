import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, PieChart, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, BarChart, Bar, Pie } from "recharts";

const portfolioData = [
  { name: "Jan", value: 950000, invested: 900000 },
  { name: "Feb", value: 980000, invested: 920000 },
  { name: "Mar", value: 1020000, invested: 950000 },
  { name: "Apr", value: 990000, invested: 970000 },
  { name: "May", value: 1080000, invested: 1000000 },
  { name: "Jun", value: 1150000, invested: 1050000 },
];

const sectorAllocation = [
  { name: "Technology", value: 35, amount: 402750 },
  { name: "Banking", value: 25, amount: 287500 },
  { name: "Healthcare", value: 15, amount: 172500 },
  { name: "Energy", value: 12, amount: 138300 },
  { name: "Consumer", value: 8, amount: 92000 },
  { name: "Others", value: 5, amount: 57500 },
];

const topHoldings = [
  { name: "RELIANCE", allocation: 18, value: 207450, change: 2.3 },
  { name: "TCS", allocation: 15, value: 172500, change: -0.8 },
  { name: "INFY", allocation: 12, value: 138000, change: 1.9 },
  { name: "HDFCBANK", allocation: 10, value: 115000, change: 0.5 },
  { name: "ICICIBANK", allocation: 8, value: 92000, change: 1.2 },
];

const performanceMetrics = [
  { metric: "1D Return", value: "+2.08%", amount: "+₹23,400" },
  { metric: "1W Return", value: "+5.2%", amount: "+₹59,800" },
  { metric: "1M Return", value: "+12.5%", amount: "+₹1,28,000" },
  { metric: "YTD Return", value: "+28.9%", amount: "+₹2,62,500" },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'];

export const PortfolioOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Portfolio</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹11,52,500</div>
            <p className="text-xs text-emerald-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Today's P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">+₹23,400</div>
            <p className="text-xs text-emerald-400">+2.08% today</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Invested Amount</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">₹10,50,000</div>
            <p className="text-xs text-gray-400">Total invested</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Unrealized P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">+₹1,02,500</div>
            <p className="text-xs text-emerald-400">+9.76% gains</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Portfolio Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="invested"
                  stackId="1"
                  stroke="#10B981"
                  fill="url(#colorInvested)"
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stackId="2"
                  stroke="#3B82F6"
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Sector Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={sectorAllocation}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Top Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topHoldings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <div>
                      <div className="text-white font-medium">{holding.name}</div>
                      <div className="text-gray-400 text-sm">{holding.allocation}% allocation</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">₹{holding.value.toLocaleString()}</div>
                    <div className={`text-sm ${holding.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {holding.change >= 0 ? '+' : ''}{holding.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="text-gray-300">{metric.metric}</div>
                  <div className="text-right">
                    <div className={`font-semibold ${metric.value.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-400">{metric.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
