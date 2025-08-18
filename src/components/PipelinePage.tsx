import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  GitBranch, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play, 
  Pause,
  RefreshCw,
  GitCommit,
  Container,
  Cloud,
  Shield,
  AlertTriangle
} from "lucide-react";

const PipelinePage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate pipeline progress
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const pipelineSteps = [
    {
      id: 1,
      name: "Code Checkout",
      description: "Fetch latest code from repository",
      status: "completed",
      duration: "15s",
      icon: GitCommit
    },
    {
      id: 2,
      name: "Install Dependencies",
      description: "npm install & dependency resolution",
      status: "completed", 
      duration: "2m 34s",
      icon: RefreshCw
    },
    {
      id: 3,
      name: "Run Tests",
      description: "Unit tests, integration tests, linting",
      status: isRunning ? "running" : "completed",
      duration: isRunning ? "1m 23s" : "3m 12s",
      icon: Shield
    },
    {
      id: 4,
      name: "Build Application",
      description: "Create production build artifacts",
      status: isRunning ? "pending" : "completed",
      duration: isRunning ? "-" : "1m 45s",
      icon: Container
    },
    {
      id: 5,
      name: "Security Scan",
      description: "Vulnerability scanning & code analysis",
      status: isRunning ? "pending" : "completed",
      duration: isRunning ? "-" : "45s",
      icon: Shield
    },
    {
      id: 6,
      name: "Deploy to Staging",
      description: "Deploy to staging environment",
      status: isRunning ? "pending" : "completed",
      duration: isRunning ? "-" : "2m 18s",
      icon: Cloud
    },
    {
      id: 7,
      name: "Integration Tests",
      description: "End-to-end testing in staging",
      status: isRunning ? "pending" : "completed",
      duration: isRunning ? "-" : "4m 32s",
      icon: CheckCircle
    },
    {
      id: 8,
      name: "Deploy to Production",
      description: "Production deployment with blue-green strategy",
      status: isRunning ? "pending" : "completed",
      duration: isRunning ? "-" : "3m 21s",
      icon: Cloud
    }
  ];

  const getStepStatus = (step: any) => {
    if (isRunning && step.status === "running") {
      return "running";
    }
    if (isRunning && step.status === "pending") {
      return "pending";
    }
    return step.status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "running":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="status-success">Completed</Badge>;
      case "running":
        return <Badge className="status-running">Running</Badge>;
      case "failed":
        return <Badge className="status-error">Failed</Badge>;
      default:
        return <Badge className="status-warning">Pending</Badge>;
    }
  };

  const runPipeline = () => {
    setIsRunning(true);
    setProgress(0);
  };

  const recentBuilds = [
    { id: "#142", commit: "Fix auth bug", branch: "main", status: "success", time: "5m ago", author: "john.doe" },
    { id: "#141", commit: "Add new feature", branch: "feature/ui", status: "success", time: "1h ago", author: "jane.smith" },
    { id: "#140", commit: "Update dependencies", branch: "main", status: "failed", time: "2h ago", author: "bob.wilson" },
    { id: "#139", commit: "Refactor components", branch: "main", status: "success", time: "4h ago", author: "alice.brown" }
  ];

  return (
    <div className="space-y-6">
      {/* Pipeline Header */}
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GitBranch className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>CI/CD Pipeline Status</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Automated build and deployment pipeline
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={runPipeline}
                disabled={isRunning}
                className="btn-tech"
              >
                {isRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Pipeline
                  </>
                )}
              </Button>
            </div>
          </div>
          {isRunning && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pipeline Progress</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Pipeline Steps */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Pipeline Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              const status = getStepStatus(step);
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                    status === "running" 
                      ? "bg-primary/10 border border-primary/20 animate-pulse-glow" 
                      : "bg-card-glass"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      {getStatusIcon(status)}
                    </div>
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{step.name}</h3>
                      {getStatusBadge(status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium">{step.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Builds */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="h-5 w-5 text-primary" />
            Recent Builds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBuilds.map((build) => (
              <div key={build.id} className="flex items-center justify-between p-3 rounded-lg bg-card-glass">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {build.id}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {build.branch}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">{build.commit}</p>
                    <p className="text-sm text-muted-foreground">by {build.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={build.status === "success" ? "status-success" : "status-error"}>
                    {build.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{build.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Configuration */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Pipeline Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Triggers</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Push to main branch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Pull request creation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Manual trigger</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Environments</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="status-success">Staging</Badge>
                  <span className="text-sm">Auto-deploy on success</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="status-warning">Production</Badge>
                  <span className="text-sm">Manual approval required</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelinePage;