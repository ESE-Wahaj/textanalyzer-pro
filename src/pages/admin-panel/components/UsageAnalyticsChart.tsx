import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { UsageAnalytics } from '../types';

interface UsageAnalyticsChartProps {
  data: UsageAnalytics[];
}

const UsageAnalyticsChart = ({ data }: UsageAnalyticsChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Usage Analytics</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg transition-colors duration-150 ${
                chartType === 'line' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label="Line chart view"
            >
              <Icon name="TrendingUp" size={20} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg transition-colors duration-150 ${
                chartType === 'bar' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label="Bar chart view"
            >
              <Icon name="BarChart3" size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Line 
                type="monotone" 
                dataKey="analyses" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Analyses"
                dot={{ fill: 'var(--color-primary)', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                name="Active Users"
                dot={{ fill: 'var(--color-secondary)', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="apiCalls" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                name="API Calls"
                dot={{ fill: 'var(--color-accent)', r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Bar 
                dataKey="analyses" 
                fill="var(--color-primary)" 
                name="Analyses"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="users" 
                fill="var(--color-secondary)" 
                name="Active Users"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="apiCalls" 
                fill="var(--color-accent)" 
                name="API Calls"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="p-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="FileText" size={16} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Analyses</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data.reduce((sum, item) => sum + item.analyses, 0).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Active Users</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data.reduce((sum, item) => sum + item.users, 0).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Zap" size={16} className="text-accent" />
              <span className="text-sm font-medium text-muted-foreground">API Calls</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data.reduce((sum, item) => sum + item.apiCalls, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalyticsChart;