
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, Utensils, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHealthData } from '@/hooks/useHealthData';

interface QuickLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickLogModal: React.FC<QuickLogModalProps> = ({ open, onOpenChange }) => {
  const [weight, setWeight] = useState('');
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const { toast } = useToast();
  const { addWeightEntry, addMealEntry } = useHealthData();

  const handleWeightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;
    
    await addWeightEntry(parseFloat(weight));
    setWeight('');
    toast({ title: 'Weight logged successfully!' });
    onOpenChange(false);
  };

  const handleMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName || !calories) return;
    
    await addMealEntry({
      name: mealName,
      calories: parseInt(calories),
      time: new Date().toLocaleTimeString()
    });
    setMealName('');
    setCalories('');
    toast({ title: 'Meal logged successfully!' });
    onOpenChange(false);
  };

  const handleSleepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sleepHours) return;
    
    setSleepHours('');
    toast({ title: 'Sleep logged successfully!' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quick Log</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weight" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Weight
            </TabsTrigger>
            <TabsTrigger value="meal" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Meal
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Sleep
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="space-y-4">
            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Log Weight</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="meal" className="space-y-4">
            <form onSubmit={handleMealSubmit} className="space-y-4">
              <div>
                <Label htmlFor="meal-name">Meal Name</Label>
                <Input
                  id="meal-name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="e.g., Breakfast, Lunch"
                  required
                />
              </div>
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="Enter calories"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Log Meal</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-4">
            <form onSubmit={handleSleepSubmit} className="space-y-4">
              <div>
                <Label htmlFor="sleep">Sleep Hours</Label>
                <Input
                  id="sleep"
                  type="number"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(e.target.value)}
                  placeholder="Enter sleep hours"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Log Sleep</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuickLogModal;
