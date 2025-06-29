
import { useState } from "react";
import { Plus, Utensils, Search, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const MealLogger = () => {
  const { toast } = useToast();
  const [foodSearch, setFoodSearch] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [calories, setCalories] = useState("");

  const mockMeals = [
    { time: "Breakfast", foods: ["Oatmeal with berries", "Green tea"], calories: 320 },
    { time: "Lunch", foods: ["Grilled chicken salad", "Apple"], calories: 450 },
    { time: "Snack", foods: ["Greek yogurt"], calories: 150 },
    { time: "Dinner", foods: ["Salmon with vegetables"], calories: 530 },
  ];

  const totalCalories = mockMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const calorieTarget = 2000;

  const foodSuggestions = [
    { name: "Banana", calories: 105 },
    { name: "Apple", calories: 95 },
    { name: "Greek Yogurt", calories: 150 },
    { name: "Chicken Breast (100g)", calories: 165 },
    { name: "Brown Rice (1 cup)", calories: 216 },
    { name: "Broccoli (1 cup)", calories: 25 },
  ];

  const handleAddFood = () => {
    if (!foodSearch) {
      toast({
        title: "Please enter a food item",
        description: "Food name is required to log your meal.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Food logged successfully!",
      description: `${foodSearch} added to ${selectedMeal}`,
    });
    setFoodSearch("");
    setCalories("");
  };

  const handleBarcodeScan = () => {
    toast({
      title: "Barcode Scanner",
      description: "Barcode scanning feature coming soon! This will help you quickly log packaged foods.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Meal Tracking</h2>
        <p className="text-muted-foreground">Log your daily nutrition</p>
      </div>

      {/* Daily Calorie Summary */}
      <Card className="health-card bg-health-gradient text-white">
        <CardContent className="p-6 text-center">
          <p className="text-4xl font-bold">{totalCalories}</p>
          <p className="text-lg opacity-90">of {calorieTarget} calories</p>
          <div className="w-full bg-white/20 rounded-full h-2 mt-4">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalCalories / calorieTarget) * 100, 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Today's Meals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockMeals.map((meal, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">{meal.time}</h4>
                <p className="text-sm text-muted-foreground">{meal.foods.join(", ")}</p>
              </div>
              <Badge variant="secondary">{meal.calories} cal</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add New Food */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Log Food
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meal-type">Meal Type</Label>
            <select
              id="meal-type"
              className="w-full p-2 border border-input rounded-md bg-background"
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="food-search">Food Item</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="food-search"
                  placeholder="Search for food..."
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories (optional)</Label>
              <Input
                id="calories"
                type="number"
                placeholder="Enter calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddFood} className="flex-1 bg-health-gradient hover:shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Food
            </Button>
            <Button onClick={handleBarcodeScan} variant="outline" className="px-4">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Food Suggestions */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {foodSuggestions.map((food, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 flex flex-col items-start"
                onClick={() => {
                  setFoodSearch(food.name);
                  setCalories(food.calories.toString());
                }}
              >
                <span className="font-medium text-sm">{food.name}</span>
                <span className="text-xs text-muted-foreground">{food.calories} cal</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealLogger;
