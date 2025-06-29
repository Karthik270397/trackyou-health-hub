
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Utensils, Plus } from 'lucide-react';
import { useHealthData } from '@/hooks/useHealthData';
import { useToast } from '@/hooks/use-toast';

const MealLogger = () => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const { data, addMealEntry } = useHealthData();
  const { toast } = useToast();

  const handleAddMeal = async () => {
    if (!mealName || !calories) return;
    await addMealEntry({
      name: mealName,
      calories: parseInt(calories),
      time: new Date().toLocaleTimeString()
    });
    toast({ title: "Meal added successfully!" });
    setMealName('');
    setCalories('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Meal Logger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meal">Meal Name</Label>
              <Input
                id="meal"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="Breakfast"
              />
            </div>
            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="350"
              />
            </div>
          </div>
          <Button onClick={handleAddMeal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {data.meals.length === 0 ? (
            <p className="text-muted-foreground">No meals logged today</p>
          ) : (
            <div className="space-y-2">
              {data.meals.map((meal, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>{meal.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {meal.calories} cal at {meal.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MealLogger;
