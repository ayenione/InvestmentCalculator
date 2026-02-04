import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatChartValue } from '../../utils/formatters';
import type { InvestmentGrowthDataPoint } from '../../types';

interface GrowthChartProps {
  data: InvestmentGrowthDataPoint[];
  className?: string;
}

export function GrowthChart({ data, className = '' }: GrowthChartProps) {
  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
            label={{
              value: 'Years',
              position: 'insideBottomRight',
              offset: -5,
              fill: '#6b7280',
            }}
          />
          <YAxis
            tickFormatter={formatChartValue}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
            width={80}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatChartValue(value),
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span className="text-gray-600 capitalize">{value}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="principal"
            stackId="1"
            stroke="#6366f1"
            fill="url(#colorPrincipal)"
            name="principal"
          />
          <Area
            type="monotone"
            dataKey="contributions"
            stackId="1"
            stroke="#8b5cf6"
            fill="url(#colorContributions)"
            name="contributions"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#10b981"
            fill="url(#colorInterest)"
            name="interest"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
