
import { useState } from "react";
import { Download, FileText, Database, Calendar, Settings, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const DataExport = () => {
  const { toast } = useToast();
  const [autoBackup, setAutoBackup] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const exportOptions = [
    {
      type: "PDF Report",
      icon: FileText,
      description: "Complete health report with charts and insights",
      size: "2.5 MB",
      format: "PDF"
    },
    {
      type: "JSON Data",
      icon: Database,
      description: "Raw data export for backup or migration",
      size: "1.2 MB",
      format: "JSON"
    },
    {
      type: "CSV Spreadsheet",
      icon: Calendar,
      description: "Tabular data for analysis in Excel/Sheets",
      size: "800 KB",
      format: "CSV"
    }
  ];

  const dataUsage = {
    totalEntries: 1247,
    weightLogs: 89,
    mealLogs: 456,
    sleepLogs: 78,
    goalEntries: 34,
    storageUsed: "4.2 MB",
    lastBackup: "Yesterday at 3:45 PM"
  };

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `Preparing your ${type} export...`,
    });

    setTimeout(() => {
      toast({
        title: "Export Complete!",
        description: `Your ${type} has been downloaded successfully.`,
      });
    }, 2000);
  };

  const handleClearData = () => {
    toast({
      title: "Clear Data",
      description: "This action cannot be undone. Are you sure?",
      variant: "destructive",
    });
  };

  const handleCloudBackup = () => {
    toast({
      title: "Cloud Backup",
      description: "Your data has been backed up to the cloud securely.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Data & Settings</h2>
        <p className="text-muted-foreground">Manage your data and app preferences</p>
      </div>

      {/* Data Usage Overview */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-health-blue">{dataUsage.totalEntries}</p>
              <p className="text-sm text-muted-foreground">Total Entries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-health-green">{dataUsage.weightLogs}</p>
              <p className="text-sm text-muted-foreground">Weight Logs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-health-orange">{dataUsage.mealLogs}</p>
              <p className="text-sm text-muted-foreground">Meal Logs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-health-purple">{dataUsage.sleepLogs}</p>
              <p className="text-sm text-muted-foreground">Sleep Logs</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span>Storage Used: {dataUsage.storageUsed}</span>
              <Badge variant="outline">Last Backup: {dataUsage.lastBackup}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {exportOptions.map((option, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <option.icon className="h-8 w-8 text-health-blue" />
                <div>
                  <h4 className="font-medium">{option.type}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  <Badge variant="outline" className="mt-1">
                    {option.size} • {option.format}
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={() => handleExport(option.type)}
                className="bg-health-gradient"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium">Auto Cloud Backup</h4>
              <p className="text-sm text-muted-foreground">Automatically backup data to cloud</p>
            </div>
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive reminders and updates</p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">Use dark theme</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Backup & Restore */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Backup & Restore</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleCloudBackup} className="w-full bg-health-gradient">
            <Database className="h-4 w-4 mr-2" />
            Backup to Cloud
          </Button>
          
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Restore from Backup
          </Button>
          
          <Button onClick={handleClearData} variant="destructive" className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExport;
