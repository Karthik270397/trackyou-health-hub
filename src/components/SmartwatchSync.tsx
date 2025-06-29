
import { useState } from "react";
import { Watch, Smartphone, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SmartwatchSync = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [lastSync, setLastSync] = useState("2 hours ago");

  const devices = [
    {
      name: "Apple Watch",
      icon: "⌚",
      connected: true,
      battery: 85,
      lastSync: "5 min ago",
      dataTypes: ["steps", "heart rate", "sleep", "calories"]
    },
    {
      name: "Fitbit Versa",
      icon: "🏃‍♂️",
      connected: false,
      battery: 0,
      lastSync: "Never",
      dataTypes: ["steps", "heart rate", "sleep", "distance"]
    },
    {
      name: "Samsung Galaxy Watch",
      icon: "⌚",
      connected: false,
      battery: 0,
      lastSync: "Never",
      dataTypes: ["steps", "heart rate", "sleep", "stress"]
    },
    {
      name: "Google Fit",
      icon: "📱",
      connected: true,
      battery: 100,
      lastSync: "1 hour ago",
      dataTypes: ["steps", "distance", "calories"]
    }
  ];

  const syncedData = {
    steps: 8247,
    heartRate: 72,
    sleepHours: 7.5,
    caloriesBurned: 1850,
    distance: 6.2
  };

  const handleConnect = (deviceName: string) => {
    toast({
      title: "Connecting...",
      description: `Attempting to connect to ${deviceName}`,
    });
    
    setTimeout(() => {
      toast({
        title: "Connected!",
        description: `Successfully connected to ${deviceName}`,
      });
    }, 2000);
  };

  const handleManualSync = () => {
    toast({
      title: "Syncing...",
      description: "Fetching latest data from connected devices",
    });
    
    setTimeout(() => {
      setLastSync("Just now");
      toast({
        title: "Sync Complete!",
        description: "Your data has been updated successfully",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Smartwatch Integration</h2>
        <p className="text-muted-foreground">Connect and sync your wearable devices</p>
      </div>

      {/* Sync Status */}
      <Card className="health-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <h3 className="font-bold">Sync Status</h3>
            </div>
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-between">
              <span>Auto Sync</span>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
            <div className="flex items-center justify-between">
              <span>Last Sync</span>
              <span className="text-muted-foreground">{lastSync}</span>
            </div>
          </div>

          <Button onClick={handleManualSync} variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Manual Sync
          </Button>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Watch className="h-5 w-5" />
            Connected Devices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {devices.map((device, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{device.icon}</span>
                <div>
                  <h4 className="font-medium">{device.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last sync: {device.lastSync}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {device.dataTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {device.connected ? (
                  <div className="space-y-1">
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    {device.battery > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Battery: {device.battery}%
                      </p>
                    )}
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => handleConnect(device.name)}
                    className="bg-health-gradient"
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Synced Data Overview */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Today's Synced Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-health-blue">{syncedData.steps.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Steps</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-health-green">{syncedData.heartRate}</p>
              <p className="text-sm text-muted-foreground">Heart Rate</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-health-purple">{syncedData.sleepHours}h</p>
              <p className="text-sm text-muted-foreground">Sleep</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-health-orange">{syncedData.caloriesBurned}</p>
              <p className="text-sm text-muted-foreground">Calories</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-health-blue">{syncedData.distance}</p>
              <p className="text-sm text-muted-foreground">km</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartwatchSync;
