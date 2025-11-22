import Icon from '../../../components/AppIcon';
import { ApiUsage } from '../types';

interface ApiMonitoringPanelProps {
  apiUsage: ApiUsage[];
}

const ApiMonitoringPanel = ({ apiUsage }: ApiMonitoringPanelProps) => {
  const formatResponseTime = (ms: number) => {
    return `${ms}ms`;
  };

  const formatErrorRate = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  const getErrorRateColor = (rate: number) => {
    if (rate < 1) return 'text-success';
    if (rate < 5) return 'text-warning';
    return 'text-destructive';
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">API Monitoring</h2>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-150">
            <Icon name="RefreshCw" size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Endpoint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Requests
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Avg Response
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Error Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Called
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {apiUsage.map((api, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Zap" size={16} className="text-primary" />
                    <span className="text-sm font-mono text-foreground">{api.endpoint}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">
                    {api.requests.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatResponseTime(api.avgResponseTime)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${getErrorRateColor(api.errorRate)}`}>
                    {formatErrorRate(api.errorRate)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatTimestamp(api.lastCalled)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded">
                    <Icon name="Circle" size={8} />
                    Healthy
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Activity" size={16} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Requests</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {apiUsage.reduce((sum, api) => sum + api.requests, 0).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-muted-foreground">Avg Response Time</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.round(apiUsage.reduce((sum, api) => sum + api.avgResponseTime, 0) / apiUsage.length)}ms
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Overall Error Rate</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {(apiUsage.reduce((sum, api) => sum + api.errorRate, 0) / apiUsage.length).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiMonitoringPanel;