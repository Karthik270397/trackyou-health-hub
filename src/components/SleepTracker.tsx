
import { useState } from "react";
import { Plus, Moon, Sun, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

const SleepTracker = () => {
  const { toast } = useToast();
  const [sleepHours, setSleepHours] = useState([7.5]);
  const [sleepQuality, setSleepQuality] = useState([4]);
  const [bedTime, setBedTime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:00");

  const mockSleepData = [
    { date: "Mon", hours: 7.2, quality: 4 },
    { date: "Tue", hours: 8.1, quality: 5 },
    { date: "Wed", hours: 6.8, quality: 3 },
    { date: "Thu", hours: 7.5, quality: 4 },
    { date: "Fri", hours: 6.2, quality: 2 },
    { date: "Sat", hours: 8.5, quality: 5 },
    { date: "Sun", hours: 7.8, quality: 4 },
  ];

  const averageSleep = mockSleepData.reduce((sum, day) => sum + day.hours, 0) / mockSleepData.length;
  const averageQuality = mockSleepData.reduce((sum, day) => sum + day.quality, 0) / mockSleepData.length;

  const handleLogSleep = () => {
    toast({
      title: "Sleep logged successfully!",
      description: `${sleepHours[0]} hours with quality rating of ${sleepQuality[0]}/5`,
    });
  };

  const getMoodEmoji = (quality: number) => {
    const emojis = ["😴", "😕", "😐", "😊", "😁"];
    return emojis[quality - 1] || "😐";
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 4) return "#10b981";
    if (quality >= 3) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Sleep Tracking</h2>
        <p className="text-muted-foreground">Monitor your sleep patterns</p>
      </div>

      {/* Sleep Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <Moon className="h-8 w-8 mx-auto mb-2 text-health-purple" />
            <p className="text-3xl font-bold text-health-purple">{averageSleep.toFixed(1)}h</p>
            <p className="text-sm text-muted-foreground">Average Sleep</p>
          </CardContent>
        </Card>

        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-health-orange" />
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-bold text-health-orange">{averageQuality.toFixed(1)}</p>
              <span className="text-2xl">{getMoodEmoji(Math.round(averageQuality))}</span>
            </div>
            <p className="text-sm text-muted-foreground">Average Quality</p>
          </CardContent>
        </Card>

        <Card className="health-card">
          <CardContent className="p-4 text-center">
            <Sun className="h-8 w-8 mx-auto mb-2 text-health-blue" />
            <p className="text-3xl font-bold text-health-blue">7</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Sleep Chart */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Weekly Sleep Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSleepData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'hours' ? `${value} hours` : `${value}/5`,
                    name === 'hours' ? 'Sleep Duration' : 'Quality'
                  ]}
                />
                <Bar 
                  dataKey="hours" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Log Sleep */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Log Sleep
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedtime">Bedtime</Label>
              <Input
                id="bedtime"
                type="time"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waketime">Wake Time</Label>
              <Input
                id="waketime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sleep Duration: {sleepHours[0]} hours</Label>
              <Slider
                value={sleepHours}
                onValueChange={setSleepHours}
                max={12}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Sleep Quality: {sleepQuality[0]}/5 {getMoodEmoji(sleepQuality[0])}
              </Label>
              <Slider
                value={sleepQuality}
                onValueChange={setSleepQuality}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Great</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          <Button onClick={handleLogSleep} className="w-full bg-wellness-gradient hover:shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Log Sleep
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTracker;
