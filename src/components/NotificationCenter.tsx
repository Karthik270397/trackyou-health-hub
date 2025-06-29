
import { useState, useEffect } from "react";
import { Bell, BellOff, Clock, Target, Droplets, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    mealReminders: true,
    waterReminders: true,
    sleepReminders: true,
    goalReminders: true,
    achievements: true
  });

  const mockNotifications = [
    {
      id: 1,
      type: "meal",
      title: "Lunch Time!",
      message: "Don't forget to log your lunch",
      time: "12:00 PM",
      read: false,
      icon: Utensils
    },
    {
      id: 2,
      type: "water",
      title: "Stay Hydrated",
      message: "Time for another glass of water",
      time: "2:30 PM",
      read: false,
      icon: Droplets
    },
    {
      id: 3,
      type: "achievement",
      title: "Goal Achieved!",
      message: "You've reached your daily step goal",
      time: "6:45 PM",
      read: true,
      icon: Target
    },
    {
      id: 4,
      type: "sleep",
      title: "Bedtime Reminder",
      message: "Time to wind down for better sleep",
      time: "10:00 PM",
      read: false,
      icon: Clock
    }
  ];

  const reminderTypes = [
    {
      key: "mealReminders",
      title: "Meal Reminders",
      description: "Breakfast, lunch, dinner logging",
      icon: Utensils,
      times: ["8:00 AM", "12:00 PM", "7:00 PM"]
    },
    {
      key: "waterReminders",
      title: "Water Reminders",
      description: "Hydration throughout the day",
      icon: Droplets,
      times: ["Every 2 hours"]
    },
    {
      key: "sleepReminders",
      title: "Sleep Reminders",
      description: "Bedtime and wake up alerts",
      icon: Clock,
      times: ["10:00 PM", "7:00 AM"]
    },
    {
      key: "goalReminders",
      title: "Goal Check-ins",
      description: "Daily progress reminders",
      icon: Target,
      times: ["6:00 PM"]
    }
  ];

  const handleToggleNotification = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Settings Updated",
      description: `${key} notifications ${!notificationSettings[key] ? 'enabled' : 'disabled'}`,
    });
  };

  const sendTestNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("TrackYou", {
            body: "This is a test notification from TrackYou!",
            icon: "/favicon.ico"
          });
          toast({
            title: "Test Notification Sent",
            description: "Check your device notifications",
          });
        }
      });
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Notifications</h2>
        <p className="text-muted-foreground">Manage your reminders and alerts</p>
      </div>

      {/* Notification Summary */}
      <Card className="health-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-health-blue" />
              <div>
                <h3 className="font-bold text-lg">Notification Center</h3>
                <p className="text-muted-foreground">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-health-blue">
              {unreadCount} new
            </Badge>
          </div>
          
          <Button onClick={sendTestNotification} variant="outline" className="w-full">
            <Bell className="h-4 w-4 mr-2" />
            Send Test Notification
          </Button>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`flex items-center gap-3 p-3 rounded-lg ${
                notification.read ? 'bg-muted/50' : 'bg-health-gradient/10 border-l-4 border-health-blue'
              }`}
            >
              <notification.icon className="h-6 w-6 text-health-blue" />
              <div className="flex-1">
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{notification.time}</p>
                {!notification.read && (
                  <Badge variant="secondary" className="mt-1">New</Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Reminder Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reminderTypes.map((reminder) => (
            <div key={reminder.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <reminder.icon className="h-6 w-6 text-health-blue" />
                <div>
                  <h4 className="font-medium">{reminder.title}</h4>
                  <p className="text-sm text-muted-foreground">{reminder.description}</p>
                  <div className="flex gap-1 mt-1">
                    {reminder.times.map((time, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Switch
                checked={notificationSettings[reminder.key]}
                onCheckedChange={() => handleToggleNotification(reminder.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Motivational Quotes */}
      <Card className="health-card bg-health-gradient text-white">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-lg mb-2">Daily Motivation</h3>
          <p className="text-lg italic">"Success is the sum of small efforts repeated day in and day out."</p>
          <p className="text-sm opacity-90 mt-2">- Robert Collier</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
