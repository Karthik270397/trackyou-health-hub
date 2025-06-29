
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Watch, Smartphone, Activity, Wifi, WifiOff } from 'lucide-react';

const SmartwatchSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  const devices = [
    { name: 'Apple Watch', icon: Watch, status: 'Available' },
    { name: 'Fitbit', icon: Activity, status: 'Available' },
    { name: 'Samsung Galaxy Watch', icon: Watch, status: 'Available' },
    { name: 'Garmin', icon: Activity, status: 'Available' }
  ];

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Watch className="h-5 w-5" />
            Smartwatch Sync
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {isConnected ? <Wifi className="h-5 w-5 text-green-500" /> : <WifiOff className="h-5 w-5 text-gray-400" />}
              <div>
                <p className="font-medium">
                  {isConnected ? 'Connected to Apple Watch' : 'No device connected'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? 'Syncing data automatically' : 'Connect a device to sync your data'}
                </p>
              </div>
            </div>
            <Badge variant={isConnected ? 'default' : 'secondary'}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>

          {!isConnected && (
            <div className="space-y-3">
              <h3 className="font-medium">Available Devices</h3>
              {devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <device.icon className="h-5 w-5" />
                    <span>{device.name}</span>
                  </div>
                  <Button onClick={handleConnect} size="sm">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          )}

          {isConnected && (
            <div className="space-y-3">
              <h3 className="font-medium">Sync Settings</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Sync steps automatically</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Sync heart rate data</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Sync sleep data</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Sync workout data</span>
                </label>
              </div>
              <Button onClick={() => setIsConnected(false)} variant="outline" className="w-full">
                Disconnect Device
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartwatchSync;
