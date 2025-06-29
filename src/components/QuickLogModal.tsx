
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, Utensils, Droplets, Moon } from 'lucide-react';
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
  const [water, setWater] = useState('');
  const [sleep, setSleep] = useState('');
  const { toast } = useToast();
  const { addWeightEntry, addMealEntry } = useHealthData();

  const handleWeightSubmit = async () => {
    if (!weight) return;
    await addWeightEntry(parseFloat(weight));
    toast({ title: "Weight logged successfully!" });
    setWeight('');
    onOpenChange(false);
  };

  const handleMealSubmit = async () => {
    if (!mealName || !calories) return;
    await addMealEntry({ name: mealName, calories: parseInt(calories), time: new Date().toLocaleTimeString() });
    toast({ title: "Meal logged successfully!" });
    setMealName('');
    setCalories('');
    onOpenChange(false);
  };

  const handleWaterSubmit = () => {
    if (!water) return;
    toast({ title: `${water} glasses of water logged!` });
    setWater('');
    onOpenChange(false);
  };

  const handleSleepSubmit = () => {
    if (!sleep) return;
    toast({ title: `${sleep} hours of sleep logged!` });
    setSleep('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quick Log</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weight">
              <Scale className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="meal">
              <Utensils className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="water">
              <Droplets className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="sleep">
              <Moon className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70.5"
              />
            </div>
            <Button onClick={handleWeightSubmit} className="w-full">
              Log Weight
            </Button>
          </TabsContent>
          
          <TabsContent value="meal" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meal">Meal Name</Label>
              <Input
                id="meal"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="Breakfast"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="350"
              />
            </div>
            <Button onClick={handleMealSubmit} className="w-full">
              Log Meal
            </Button>
          </TabsContent>
          
          <TabsContent value="water" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="water">Glasses of Water</Label>
              <Input
                id="water"
                type="number"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                placeholder="8"
              />
            </div>
            <Button onClick={handleWaterSubmit} className="w-full">
              Log Water
            </Button>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sleep">Hours of Sleep</Label>
              <Input
                id="sleep"
                type="number"
                step="0.1"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                placeholder="8.0"
              />
            </div>
            <Button onClick={handleSleepSubmit} className="w-full">
              Log Sleep
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuickLogModal;
