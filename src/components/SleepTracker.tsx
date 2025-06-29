
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Moon, Plus } from 'lucide-react';
import { useHealthData } from '@/hooks/useHealthData';
import { useToast } from '@/hooks/use-toast';

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState('');
  const { data } = useHealthData();
  const { toast } = useToast();

  const handleAddSleep = () => {
    if (!sleepHours) return;
    toast({ title: `${sleepHours} hours of sleep logged!` });
    setSleepHours('');
  };

  const chartData = data.sleep.map((hours, index) => ({
    day: `Day ${index + 1}`,
    hours: hours
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Sleep Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="sleep">Hours of Sleep</Label>
              <Input
                id="sleep"
                type="number"
                step="0.1"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                placeholder="8.0"
              />
            </div>
            <Button onClick={handleAddSleep} className="mt-6">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          
          {chartData.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTracker;
