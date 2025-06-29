
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Scale, Plus } from 'lucide-react';
import { useHealthData } from '@/hooks/useHealthData';
import { useToast } from '@/hooks/use-toast';

const WeightTracker = () => {
  const [newWeight, setNewWeight] = useState('');
  const { data, addWeightEntry } = useHealthData();
  const { toast } = useToast();

  const handleAddWeight = async () => {
    if (!newWeight) return;
    await addWeightEntry(parseFloat(newWeight));
    toast({ title: "Weight added successfully!" });
    setNewWeight('');
  };

  const chartData = data.weight.map((weight, index) => ({
    day: `Day ${index + 1}`,
    weight: weight
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Weight Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="70.5"
              />
            </div>
            <Button onClick={handleAddWeight} className="mt-6">
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
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracker;
