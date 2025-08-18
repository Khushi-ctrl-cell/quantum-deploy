import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Activity, 
  Users, 
  GitCommit, 
  Timer, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Cloud,
  Database,
  Cpu
} from "lucide-react";

const Dashboard = () => {
  // Mock data for charts
  const deploymentData = [
    { name: "Mon", deployments: 4, success: 4, failed: 0 },
    { name: "Tue", deployments: 6, success: 5, failed: 1 },
    { name: "Wed", deployments: 8, success: 8, failed: 0 },
    { name: "Thu", deployments: 5, success: 4, failed: 1 },
    { name: "Fri", deployments: 7, success: 7, failed: 0 },
    { name: "Sat", deployments: 3, success: 3, failed: 0 },
    { name: "Sun", deployments: 2, success: 2, failed: 0 }
  ];

  const performanceData = [
    { name: "00:00", cpu: 45, memory: 62, requests: 120 },
    { name: "04:00", cpu: 35, memory: 58, requests: 80 },
    { name: "08:00", cpu: 65, memory: 75, requests: 200 },
    { name: "12:00", cpu: 85, memory: 82, requests: 350 },
    { name: "16:00", cpu: 75, memory: 79, requests: 280 },
    { name: "20:00", cpu: 55, memory: 68, requests: 150 }
  ];

  const statusData = [
    { name: "Success", value: 85, color: "hsl(142, 72%, 29%)" },
    { name: "Failed", value: 10, color: "hsl(0, 84%, 60%)" },
    { name: "Pending", value: 5, color: "hsl(38, 92%, 50%)" }
  ];

  const stats = [
    {
      title: "Total Deployments",
      value: "127",
      change: "+12%",
      icon: Activity,
      trend: "up"
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+8%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Commits Today",
      value: "23",
      change: "+15%",
      icon: GitCommit,
      trend: "up"
    },
    {
      title: "Avg Deploy Time",
      value: "4.2m",
      change: "-5%",
      icon: Timer,
      trend: "down"
    }
  ];

  const recentDeployments = [
    { id: 1, app: "Frontend", version: "v2.1.4", status: "success", time: "2 minutes ago" },
    { id: 2, app: "API Gateway", version: "v1.8.2", status: "success", time: "15 minutes ago" },
    { id: 3, app: "Database", version: "v3.2.1", status: "running", time: "1 hour ago" },
    { id: 4, app: "Auth Service", version: "v1.5.0", status: "success", time: "2 hours ago" },
    { id: 5, app: "Notification", version: "v2.0.3", status: "failed", time: "3 hours ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "status-success";
      case "failed": return "status-error";
      case "running": return "status-running";
      default: return "status-warning";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-primary">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Deployment Trends */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Deployment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deploymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 28% 17%)" />
                <XAxis dataKey="name" stroke="hsl(215 20.2% 65.1%)" />
                <YAxis stroke="hsl(215 20.2% 65.1%)" />
                <Bar dataKey="success" fill="hsl(142, 72%, 29%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 28% 17%)" />
                <XAxis dataKey="name" stroke="hsl(215 20.2% 65.1%)" />
                <YAxis stroke="hsl(215 20.2% 65.1%)" />
                <Line type="monotone" dataKey="cpu" stroke="hsl(214 88% 55%)" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke="hsl(258 90% 66%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Deployments */}
        <Card className="glass-card border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              Recent Deployments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeployments.map((deployment) => (
                <div key={deployment.id} className="flex items-center justify-between p-3 rounded-lg bg-card-glass">
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{deployment.app}</p>
                      <p className="text-sm text-muted-foreground">{deployment.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(deployment.status)}>
                      {deployment.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{deployment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deployment Status */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Deployment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;