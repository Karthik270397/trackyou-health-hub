
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface HealthData {
  weight: number[];
  meals: any[];
  sleep: number[];
  goals: any[];
  steps: number[];
  water: number[];
  calories: number[];
}

export const useHealthData = (period: string = 'week') => {
  const [data, setData] = useState<HealthData>({
    weight: [],
    meals: [],
    sleep: [],
    goals: [],
    steps: [],
    water: [],
    calories: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchHealthData();
    }
  }, [user, period]);

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      
      // For now, return mock data until database is set up
      const mockData: HealthData = {
        weight: [72.5, 72.3, 72.1, 71.9, 71.8],
        meals: [
          { name: 'Breakfast', calories: 350, time: '08:00' },
          { name: 'Lunch', calories: 550, time: '12:30' },
          { name: 'Dinner', calories: 650, time: '19:00' }
        ],
        sleep: [7.5, 8.0, 7.2, 8.1, 7.8],
        goals: [
          { name: 'Lose 2kg', progress: 60, target: 70 },
          { name: 'Walk 10k steps', progress: 85, target: 10000 }
        ],
        steps: [8500, 9200, 7800, 10100, 9500],
        water: [6, 8, 7, 8, 6],
        calories: [1450, 1620, 1380, 1550, 1490]
      };
      
      setData(mockData);
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addWeightEntry = async (weight: number) => {
    try {
      if (!user) return;
      
      // For now, just update local state
      setData(prev => ({
        ...prev,
        weight: [...prev.weight, weight]
      }));
      
      console.log('Weight entry added:', weight);
    } catch (error) {
      console.error('Error adding weight entry:', error);
    }
  };

  const addMealEntry = async (meal: any) => {
    try {
      if (!user) return;
      
      setData(prev => ({
        ...prev,
        meals: [...prev.meals, meal]
      }));
      
      console.log('Meal entry added:', meal);
    } catch (error) {
      console.error('Error adding meal entry:', error);
    }
  };

  return {
    data,
    loading,
    addWeightEntry,
    addMealEntry,
    refreshData: fetchHealthData
  };
};
