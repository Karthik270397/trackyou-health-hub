
import { useState } from "react";
import { Plus, TrendingDown, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

const WeightTracker = () => {
  const { toast } = useToast();
  const [newWeight, setNewWeight] = useState("");
  const [selectedTime, setSelectedTime] = useState("morning");

  const mockWeightData = [
    { date: "2024-06-23", weight: 75.2, time: "morning" },
    { date: "2024-06-24", weight: 74.8, time: "morning" },
    { date: "2024-06-25", weight: 74.5, time: "morning" },
    { date: "2024-06-26", weight: 74.1, time: "morning" },
    { date: "2024-06-27", weight: 73.8, time: "morning" },
    { date: "2024-06-28", weight: 73.2, time: "morning" },
    { date: "2024-06-29", weight: 72.5, time: "morning" },
  ];

  const currentWeight = mockWeightData[mockWeightData.length - 1].weight;
  const previousWeight = mockWeightData[mockWeightData.length - 2].weight;
  const weightChange = currentWeight - previousWeight;
  const targetWeight = 70.0;

  const handleAddWeight = () => {
    if (!newWeight) {
      toast({
        title: "Please enter a weight",
        description: "Weight value is required to log your entry.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Weight logged successfully!",
      description: `${newWeight}kg recorded for ${selectedTime}`,
    });
    setNewWeight("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Weight Tracking</h2>
        <p className="text-muted-foreground">Monitor your weight journey</p>
      </div>

      {/* Current Weight Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-health-green">{currentWeight}kg</p>
            <p className="text-sm text-muted-foreground">Current Weight</p>
          </CardContent>
        </Card>

        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              {weightChange < 0 ? (
                <TrendingDown className="h-5 w-5 text-health-green" />
              ) : (
                <TrendingUp className="h-5 w-5 text-red-500" />
              )}
              <p className={`text-2xl font-bold ${weightChange < 0 ? 'text-health-green' : 'text-red-500'}`}>
                {Math.abs(weightChange).toFixed(1)}kg
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Weekly Change</p>
          </CardContent>
        </Card>

        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-health-blue">{targetWeight}kg</p>
            <p className="text-sm text-muted-foreground">Target Weight</p>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weight Trend (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [`${value}kg`, 'Weight']}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Add New Weight Entry */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Log New Weight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Enter your weight"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time of Day</Label>
              <select
                id="time"
                className="w-full p-2 border border-input rounded-md bg-background"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="morning">Morning (Before Breakfast)</option>
                <option value="after-breakfast">After Breakfast</option>
                <option value="before-lunch">Before Lunch</option>
                <option value="after-lunch">After Lunch</option>
                <option value="before-dinner">Before Dinner</option>
                <option value="after-dinner">After Dinner</option>
                <option value="before-workout">Before Workout</option>
                <option value="after-workout">After Workout</option>
              </select>
            </div>
          </div>
          <Button onClick={handleAddWeight} className="w-full bg-health-gradient hover:shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Log Weight
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracker;
