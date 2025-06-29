
import { useState } from "react";
import { Target, Trophy, Flame, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const GoalSetting = () => {
  const { toast } = useToast();
  const [newGoal, setNewGoal] = useState("");
  const [goalType, setGoalType] = useState("weight");
  const [targetValue, setTargetValue] = useState("");

  const mockGoals = [
    {
      id: 1,
      title: "Reach 70kg",
      type: "weight",
      current: 72.5,
      target: 70,
      unit: "kg",
      progress: 71.4,
      streak: 15,
      status: "active"
    },
    {
      id: 2,
      title: "Walk 10,000 steps daily",
      type: "steps",
      current: 8500,
      target: 10000,
      unit: "steps",
      progress: 85,
      streak: 5,
      status: "active"
    },
    {
      id: 3,
      title: "Sleep 8 hours nightly",
      type: "sleep",
      current: 7.5,
      target: 8,
      unit: "hours",
      progress: 93.75,
      streak: 12,
      status: "active"
    },
    {
      id: 4,
      title: "Drink 8 glasses of water",
      type: "water",
      current: 6,
      target: 8,
      unit: "glasses",
      progress: 75,
      streak: 3,
      status: "active"
    }
  ];

  const completedGoals = [
    {
      title: "Log meals for 30 days",
      completedDate: "2024-06-15",
      badge: "Nutrition Master"
    },
    {
      title: "Exercise 3 times per week",
      completedDate: "2024-06-10",
      badge: "Fitness Enthusiast"
    }
  ];

  const handleAddGoal = () => {
    if (!newGoal || !targetValue) {
      toast({
        title: "Please fill all fields",
        description: "Goal title and target value are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Goal created successfully!",
      description: `${newGoal} has been added to your goals.`,
    });
    setNewGoal("");
    setTargetValue("");
  };

  const getGoalIcon = (type: string) => {
    switch (type) {
      case "weight": return "⚖️";
      case "steps": return "🚶";
      case "sleep": return "😴";
      case "water": return "💧";
      case "calories": return "🍎";
      default: return "🎯";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "text-green-600";
    if (progress >= 70) return "text-blue-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Your Goals</h2>
        <p className="text-muted-foreground">Set and track your health objectives</p>
      </div>

      {/* Goal Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="health-card text-center">
          <CardContent className="p-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-health-blue" />
            <p className="text-2xl font-bold">{mockGoals.length}</p>
            <p className="text-sm text-muted-foreground">Active Goals</p>
          </CardContent>
        </Card>

        <Card className="health-card text-center">
          <CardContent className="p-4">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-health-orange" />
            <p className="text-2xl font-bold">{completedGoals.length}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="health-card text-center">
          <CardContent className="p-4">
            <Flame className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">Best Streak</p>
          </CardContent>
        </Card>

        <Card className="health-card text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-health-green" />
            <p className="text-2xl font-bold">81%</p>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockGoals.map((goal) => (
            <div key={goal.id} className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getGoalIcon(goal.type)}</span>
                  <div>
                    <h4 className="font-medium">{goal.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    🔥 {goal.streak} day streak
                  </Badge>
                  <p className={`text-sm font-medium ${getProgressColor(goal.progress)}`}>
                    {goal.progress.toFixed(0)}%
                  </p>
                </div>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Completed Goals */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {completedGoals.map((goal, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">{goal.title}</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Completed on {new Date(goal.completedDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  🏆 {goal.badge}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Goal */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Create New Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal-type">Goal Type</Label>
            <select
              id="goal-type"
              className="w-full p-2 border border-input rounded-md bg-background"
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
            >
              <option value="weight">Weight Loss/Gain</option>
              <option value="steps">Daily Steps</option>
              <option value="sleep">Sleep Duration</option>
              <option value="water">Water Intake</option>
              <option value="calories">Calorie Target</option>
              <option value="exercise">Exercise Frequency</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                placeholder="e.g., Lose 5kg in 3 months"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-value">Target Value</Label>
              <Input
                id="target-value"
                type="number"
                placeholder="Enter target"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleAddGoal} className="w-full bg-health-gradient hover:shadow-lg">
            <Target className="h-4 w-4 mr-2" />
            Create Goal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSetting;
