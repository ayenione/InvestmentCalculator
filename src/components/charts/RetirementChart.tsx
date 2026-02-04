import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { formatChartValue } from '../../utils/formatters';
import type { RetirementProjectionPoint } from '../../types';

interface RetirementChartProps {
  data: RetirementProjectionPoint[];
  retirementAge: number;
  className?: string;
}

export function RetirementChart({
  data,
  retirementAge,
  className = '',
}: RetirementChartProps) {
  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="age"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
            label={{
              value: 'Age',
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
            formatter={(value: number) => [formatChartValue(value), 'Savings']}
            labelFormatter={(label) => `Age ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <ReferenceLine
            x={retirementAge}
            stroke="#10b981"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: 'Retirement',
              position: 'top',
              fill: '#10b981',
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#6366f1"
            fill="url(#colorSavings)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
