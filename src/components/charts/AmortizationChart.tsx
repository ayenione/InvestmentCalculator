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
import type { AmortizationEntry } from '../../types';

interface AmortizationChartProps {
  data: AmortizationEntry[];
  className?: string;
}

export function AmortizationChart({ data, className = '' }: AmortizationChartProps) {
  // Transform data to show cumulative principal and interest
  const chartData = data.map((entry) => ({
    period: entry.period,
    principal: entry.totalPrincipal,
    interest: entry.totalInterest,
    balance: entry.balance,
  }));

  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrincipalPaid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorInterestPaid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="period"
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
              name === 'principal' ? 'Principal Paid' : 'Interest Paid',
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
                {value === 'principal' ? 'Principal Paid' : 'Interest Paid'}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="principal"
            stackId="1"
            stroke="#10b981"
            fill="url(#colorPrincipalPaid)"
            name="principal"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#f59e0b"
            fill="url(#colorInterestPaid)"
            name="interest"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
