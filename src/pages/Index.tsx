import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import Dashboard from "@/components/Dashboard";
import PipelinePage from "@/components/PipelinePage";
import MonitoringPage from "@/components/MonitoringPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage setActiveTab={setActiveTab} />;
      case "dashboard":
        return <Dashboard />;
      case "pipeline":
        return <PipelinePage />;
      case "monitoring":
        return <MonitoringPage />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
