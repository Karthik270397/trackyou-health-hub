
import { useState } from "react";
import { Plus, TrendingUp, Target, Moon, Utensils, Scale, Users, Watch, Bell, Download, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import WeightTracker from "@/components/WeightTracker";
import MealLogger from "@/components/MealLogger";
import SleepTracker from "@/components/SleepTracker";
import GoalSetting from "@/components/GoalSetting";
import CommunityChallenge from "@/components/CommunityChallenge";
import SmartwatchSync from "@/components/SmartwatchSync";
import DataExport from "@/components/DataExport";
import NotificationCenter from "@/components/NotificationCenter";
import QuickLogModal from "@/components/QuickLogModal";
import PeriodSelector from "@/components/PeriodSelector";
import { useToast } from "@/hooks/use-toast";
import { useHealthData } from "@/hooks/useHealthData";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [period, setPeriod] = useState("week");
  const [quickLogOpen, setQuickLogOpen] = useState(false);
  const { toast } = useToast();
  const { data: healthData, loading } = useHealthData(period);
  const { user, signOut } = useAuth();

  const mockData = {
    currentWeight: healthData.weight[healthData.weight.length - 1] || 72.5,
    targetWeight: 70.0,
    caloriesConsumed: healthData.calories[healthData.calories.length - 1] || 1450,
    caloriesTarget: 2000,
    sleepHours: healthData.sleep[healthData.sleep.length - 1] || 7.5,
    sleepTarget: 8,
    waterIntake: healthData.water[healthData.water.length - 1] || 6,
    waterTarget: 8,
    stepCount: healthData.steps[healthData.steps.length - 1] || 8500,
    stepTarget: 10000
  };

  const handleQuickLog = () => {
    setQuickLogOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Signed out successfully!" });
    } catch (error) {
      toast({ title: "Error signing out", variant: "destructive" });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Welcome back, {user?.email?.split('@')[0]}!</h1>
          <p className="text-muted-foreground">Let's continue your health journey</p>
        </div>
        <div className="flex items-center gap-4">
          <PeriodSelector value={period} onValueChange={setPeriod} />
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <Scale className="h-8 w-8 mx-auto mb-2 text-health-green" />
            <p className="text-2xl font-bold">{mockData.currentWeight}kg</p>
            <p className="text-sm text-muted-foreground">Current Weight</p>
          </CardContent>
        </Card>

        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <Utensils className="h-8 w-8 mx-auto mb-2 text-health-blue" />
            <p className="text-2xl font-bold">{mockData.caloriesConsumed}</p>
            <p className="text-sm text-muted-foreground">Calories Today</p>
          </CardContent>
        </Card>

        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <Moon className="h-8 w-8 mx-auto mb-2 text-health-purple" />
            <p className="text-2xl font-bold">{mockData.sleepHours}h</p>
            <p className="text-sm text-muted-foreground">Sleep Last Night</p>
          </CardContent>
        </Card>

        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-health-orange" />
            <p className="text-2xl font-bold">{mockData.stepCount}</p>
            <p className="text-sm text-muted-foreground">Steps Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Today's Progress ({period})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm">
              <span>Calories</span>
              <span>{mockData.caloriesConsumed}/{mockData.caloriesTarget}</span>
            </div>
            <Progress value={(mockData.caloriesConsumed / mockData.caloriesTarget) * 100} className="mt-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm">
              <span>Water Intake</span>
              <span>{mockData.waterIntake}/{mockData.waterTarget} glasses</span>
            </div>
            <Progress value={(mockData.waterIntake / mockData.waterTarget) * 100} className="mt-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm">
              <span>Steps</span>
              <span>{mockData.stepCount.toLocaleString()}/{mockData.stepTarget.toLocaleString()}</span>
            </div>
            <Progress value={(mockData.stepCount / mockData.stepTarget) * 100} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      {/* Motivational Quote */}
      <Card className="health-card bg-health-gradient text-white">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-medium">"The groundwork for all happiness is good health."</p>
          <p className="text-sm opacity-90 mt-2">- Leigh Hunt</p>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your health data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "dashboard", label: "Dashboard", icon: TrendingUp },
            { id: "weight", label: "Weight", icon: Scale },
            { id: "meals", label: "Meals", icon: Utensils },
            { id: "sleep", label: "Sleep", icon: Moon },
            { id: "goals", label: "Goals", icon: Target },
            { id: "community", label: "Community", icon: Users },
            { id: "sync", label: "Sync", icon: Watch },
            { id: "notifications", label: "Alerts", icon: Bell },
            { id: "export", label: "Data", icon: Download }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 transition-all duration-300"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "weight" && <WeightTracker />}
          {activeTab === "meals" && <MealLogger />}
          {activeTab === "sleep" && <SleepTracker />}
          {activeTab === "goals" && <GoalSetting />}
          {activeTab === "community" && <CommunityChallenge />}
          {activeTab === "sync" && <SmartwatchSync />}
          {activeTab === "notifications" && <NotificationCenter />}
          {activeTab === "export" && <DataExport />}
        </div>

        {/* Floating Action Button */}
        <Button
          onClick={handleQuickLog}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="lg"
        >
          <Plus className="h-6 w-6" />
        </Button>

        {/* Quick Log Modal */}
        <QuickLogModal 
          open={quickLogOpen} 
          onOpenChange={setQuickLogOpen} 
        />
      </div>
    </div>
  );
};

export default Index;
