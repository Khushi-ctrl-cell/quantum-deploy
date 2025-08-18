import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart3, 
  GitBranch, 
  Settings, 
  Monitor,
  Zap
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "pipeline", label: "CI/CD Pipeline", icon: GitBranch },
    { id: "monitoring", label: "Monitoring", icon: Monitor },
  ];

  return (
    <nav className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">DevOps Portfolio</h1>
            <p className="text-sm text-muted-foreground">Automated CI/CD Pipeline</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 transition-all duration-300 ${
                isActive 
                  ? "bg-gradient-primary text-white animate-pulse-glow" 
                  : "hover:bg-card-glass"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;