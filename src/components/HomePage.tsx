import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Container, 
  GitBranch, 
  Cloud, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Code,
  Server,
  Shield
} from "lucide-react";

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

const HomePage = ({ setActiveTab }: HomePageProps) => {
  const techStack = [
    { name: "React", color: "bg-blue-500" },
    { name: "Docker", color: "bg-blue-600" },
    { name: "Kubernetes", color: "bg-blue-700" },
    { name: "Jenkins", color: "bg-orange-500" },
    { name: "AWS", color: "bg-yellow-600" },
    { name: "GitHub Actions", color: "bg-gray-700" }
  ];

  const features = [
    {
      icon: GitBranch,
      title: "Automated CI/CD",
      description: "Continuous integration and deployment with GitHub Actions"
    },
    {
      icon: Container,
      title: "Containerization",
      description: "Docker containers for consistent deployments across environments"
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Scalable cloud infrastructure with Kubernetes orchestration"
    },
    {
      icon: Shield,
      title: "Security & Monitoring",
      description: "Built-in security scanning and comprehensive monitoring"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="glass-card p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-primary animate-float">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DevOps Portfolio Project
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            A comprehensive demonstration of modern DevOps practices featuring automated CI/CD pipelines, 
            containerization, and cloud deployment strategies.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              className="btn-tech"
              onClick={() => setActiveTab("dashboard")}
            >
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="glass-card border-primary/50 hover:bg-primary/10"
              onClick={() => setActiveTab("pipeline")}
            >
              <GitBranch className="mr-2 h-4 w-4" />
              View Pipeline
            </Button>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-2">
          {techStack.map((tech) => (
            <Badge 
              key={tech.name} 
              variant="secondary" 
              className={`${tech.color} text-white hover:scale-105 transition-transform`}
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              className="glass-card p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-primary">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What is CI/CD Section */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">What is CI/CD?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit mb-4">
              <Code className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Continuous Integration</h3>
            <p className="text-muted-foreground">
              Automatically merge code changes and run tests to catch issues early
            </p>
          </div>
          <div className="text-center">
            <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit mb-4">
              <Server className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Continuous Deployment</h3>
            <p className="text-muted-foreground">
              Automatically deploy tested code to production environments
            </p>
          </div>
          <div className="text-center">
            <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground">
              Ensure code quality through automated testing and validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;