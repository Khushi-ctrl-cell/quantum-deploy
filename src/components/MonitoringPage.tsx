import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  Monitor, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi,
  Server,
  Database,
  Shield,
  Clock
} from "lucide-react";

const MonitoringPage = () => {
  // Mock monitoring data
  const systemMetrics = [
    { time: "00:00", cpu: 45, memory: 62, disk: 35, network: 120 },
    { time: "04:00", cpu: 35, memory: 58, disk: 38, network: 80 },
    { time: "08:00", cpu: 65, memory: 75, disk: 42, network: 200 },
    { time: "12:00", cpu: 85, memory: 82, disk: 45, network: 350 },
    { time: "16:00", cpu: 75, memory: 79, disk: 48, network: 280 },
    { time: "20:00", cpu: 55, memory: 68, disk: 40, network: 150 }
  ];

  const responseTimeData = [
    { time: "00:00", api: 120, frontend: 45, database: 25 },
    { time: "04:00", api: 95, frontend: 38, database: 22 },
    { time: "08:00", api: 150, frontend: 52, database: 35 },
    { time: "12:00", api: 180, frontend: 65, database: 45 },
    { time: "16:00", api: 160, frontend: 58, database: 38 },
    { time: "20:00", api: 130, frontend: 48, database: 28 }
  ];

  const services = [
    { name: "API Gateway", status: "healthy", uptime: "99.9%", response: "120ms", cpu: 45, memory: 62 },
    { name: "Frontend App", status: "healthy", uptime: "99.8%", response: "45ms", cpu: 25, memory: 38 },
    { name: "Database", status: "healthy", uptime: "99.95%", response: "25ms", cpu: 35, memory: 55 },
    { name: "Auth Service", status: "warning", uptime: "98.2%", response: "250ms", cpu: 75, memory: 82 },
    { name: "Notification", status: "error", uptime: "95.1%", response: "500ms", cpu: 15, memory: 25 }
  ];

  const alerts = [
    { 
      id: 1, 
      severity: "high", 
      message: "High memory usage on Auth Service", 
      time: "2 minutes ago",
      service: "Auth Service"
    },
    { 
      id: 2, 
      severity: "medium", 
      message: "API response time above threshold", 
      time: "15 minutes ago",
      service: "API Gateway"
    },
    { 
      id: 3, 
      severity: "low", 
      message: "Disk usage increasing on Database", 
      time: "1 hour ago",
      service: "Database"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "status-success";
      case "warning": return "status-warning";
      case "error": return "status-error";
      default: return "status-warning";
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high": return "status-error";
      case "medium": return "status-warning";
      case "low": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "status-warning";
    }
  };

  const healthMetrics = [
    { label: "Overall Uptime", value: "99.2%", icon: CheckCircle, color: "text-green-500" },
    { label: "Avg Response Time", value: "145ms", icon: Clock, color: "text-blue-500" },
    { label: "Active Alerts", value: "3", icon: AlertTriangle, color: "text-yellow-500" },
    { label: "Services Online", value: "4/5", icon: Server, color: "text-green-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-primary`}>
                    <Icon className={`h-6 w-6 text-white`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Metrics Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              System Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 28% 17%)" />
                <XAxis dataKey="time" stroke="hsl(215 20.2% 65.1%)" />
                <YAxis stroke="hsl(215 20.2% 65.1%)" />
                <Area type="monotone" dataKey="cpu" stroke="hsl(214 88% 55%)" fill="hsl(214 88% 55% / 0.3)" />
                <Area type="monotone" dataKey="memory" stroke="hsl(258 90% 66%)" fill="hsl(258 90% 66% / 0.3)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Response Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 28% 17%)" />
                <XAxis dataKey="time" stroke="hsl(215 20.2% 65.1%)" />
                <YAxis stroke="hsl(215 20.2% 65.1%)" />
                <Line type="monotone" dataKey="api" stroke="hsl(214 88% 55%)" strokeWidth={2} />
                <Line type="monotone" dataKey="frontend" stroke="hsl(258 90% 66%)" strokeWidth={2} />
                <Line type="monotone" dataKey="database" stroke="hsl(142, 72%, 29%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Service Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card-glass">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gradient-primary">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground">Uptime: {service.uptime}</span>
                      <span className="text-sm text-muted-foreground">Response: {service.response}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Cpu className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{service.cpu}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{service.memory}%</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg bg-card-glass">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">Service: {alert.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getAlertColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Overview */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Infrastructure Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit mb-4">
                <Server className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Kubernetes Cluster</h3>
              <p className="text-muted-foreground">5 nodes, 23 pods running</p>
              <Badge className="status-success mt-2">Healthy</Badge>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Database</h3>
              <p className="text-muted-foreground">PostgreSQL 14.2, 500GB storage</p>
              <Badge className="status-success mt-2">Healthy</Badge>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit mb-4">
                <Wifi className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Load Balancer</h3>
              <p className="text-muted-foreground">AWS ALB, 2 targets</p>
              <Badge className="status-success mt-2">Healthy</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringPage;