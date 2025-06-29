
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DataExport = () => {
  const { toast } = useToast();

  const handleExport = (format: string, period: string) => {
    toast({ 
      title: `Exporting data...`, 
      description: `Your ${period} data will be exported as ${format}` 
    });
  };

  const exportOptions = [
    {
      format: 'CSV',
      icon: FileSpreadsheet,
      description: 'Comma-separated values for spreadsheet applications'
    },
    {
      format: 'PDF',
      icon: FileText,
      description: 'Formatted report for easy reading and sharing'
    },
    {
      format: 'JSON',
      icon: FileText,
      description: 'Raw data in JSON format for developers'
    }
  ];

  const timePeriods = [
    { label: 'Last 7 days', value: 'week' },
    { label: 'Last 30 days', value: 'month' },
    { label: 'Last 3 months', value: 'quarter' },
    { label: 'All time', value: 'all' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Export your health data in various formats for backup or analysis.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Export Format</h3>
              <div className="space-y-3">
                {exportOptions.map((option) => (
                  <div key={option.format} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <option.icon className="h-5 w-5" />
                      <span className="font-medium">{option.format}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {option.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {timePeriods.map((period) => (
                        <Button
                          key={period.value}
                          size="sm"
                          variant="outline"
                          onClick={() => handleExport(option.format, period.label)}
                        >
                          {period.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">Quick Export</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleExport('PDF', 'monthly')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Monthly Report
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport('CSV', 'all')}
                  className="flex items-center gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  All Data (CSV)
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your exported data includes personal health information. Please handle it securely and only share it with trusted healthcare providers or applications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExport;
