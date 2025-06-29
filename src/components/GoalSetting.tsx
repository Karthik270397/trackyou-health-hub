
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Target, Plus } from 'lucide-react';
import { useHealthData } from '@/hooks/useHealthData';
import { useToast } from '@/hooks/use-toast';

const GoalSetting = () => {
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const { data } = useHealthData();
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!goalName || !goalTarget) return;
    toast({ title: `Goal "${goalName}" added successfully!` });
    setGoalName('');
    setGoalTarget('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goal Setting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goal">Goal Name</Label>
              <Input
                id="goal"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Lose 5kg"
              />
            </div>
            <div>
              <Label htmlFor="target">Target</Label>
              <Input
                id="target"
                type="number"
                value={goalTarget}
                onChange={(e) => setGoalTarget(e.target.value)}
                placeholder="70"
              />
            </div>
          </div>
          <Button onClick={handleAddGoal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Goals</CardTitle>
        </CardHeader>
        <CardContent>
          {data.goals.length === 0 ? (
            <p className="text-muted-foreground">No goals set yet</p>
          ) : (
            <div className="space-y-4">
              {data.goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.progress}%
                    </span>
                  </div>
                  <Progress value={goal.progress} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSetting;
