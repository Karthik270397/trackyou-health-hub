
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, Target, Droplets, Moon } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'Time to log your weight!',
      message: 'You haven\'t logged your weight today.',
      time: '2 hours ago',
      icon: Target,
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Goal achieved!',
      message: 'You\'ve reached your daily step goal of 10,000 steps!',
      time: '5 hours ago',
      icon: Target,
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Hydration reminder',
      message: 'Remember to drink water!',
      time: '1 day ago',
      icon: Droplets,
      read: true
    }
  ]);

  const [settings, setSettings] = useState({
    weightReminders: true,
    mealReminders: true,
    waterReminders: true,
    sleepReminders: true,
    goalAlerts: true
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground">No notifications</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <notification.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        {!notification.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Weight logging reminders</span>
            </div>
            <Switch
              checked={settings.weightReminders}
              onCheckedChange={() => toggleSetting('weightReminders')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Meal logging reminders</span>
            </div>
            <Switch
              checked={settings.mealReminders}
              onCheckedChange={() => toggleSetting('mealReminders')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              <span>Water intake reminders</span>
            </div>
            <Switch
              checked={settings.waterReminders}
              onCheckedChange={() => toggleSetting('waterReminders')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span>Sleep reminders</span>
            </div>
            <Switch
              checked={settings.sleepReminders}
              onCheckedChange={() => toggleSetting('sleepReminders')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Goal achievement alerts</span>
            </div>
            <Switch
              checked={settings.goalAlerts}
              onCheckedChange={() => toggleSetting('goalAlerts')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
