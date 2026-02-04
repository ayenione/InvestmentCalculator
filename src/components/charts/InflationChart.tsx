import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatChartValue } from '../../utils/formatters';
import type { InflationYearlyData } from '../../types';

interface InflationChartProps {
  data: InflationYearlyData[];
  className?: string;
}

export function InflationChart({ data, className = '' }: InflationChartProps) {
  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
            label={{
              value: 'Year',
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
              name === 'value' ? 'Nominal Value' : 'Purchasing Power',
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
              <span className="text-gray-600">
                {value === 'value' ? 'Nominal Value' : 'Purchasing Power'}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            name="value"
          />
          <Line
            type="monotone"
            dataKey="purchasingPower"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            name="purchasingPower"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
