import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';

interface Milestone {
  age: number;
  milestone: string;
  savings: number;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  currentAge: number;
}

export function MilestoneTracker({ milestones, currentAge }: MilestoneTrackerProps) {
  if (milestones.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No milestones projected with current inputs
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500" />

      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const yearsAway = milestone.age - currentAge;
          const isPast = yearsAway <= 0;

          return (
            <motion.div
              key={`${milestone.age}-${milestone.milestone}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Timeline dot */}
              <div
                className={`
                  absolute left-4 w-5 h-5 rounded-full border-4
                  ${isPast
                    ? 'bg-primary-500 border-primary-200'
                    : 'bg-white border-primary-500'
                  }
                `}
              />

              {/* Content */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                      Age {milestone.age}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {milestone.milestone}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {yearsAway > 0
                        ? `${yearsAway} years from now`
                        : 'Current milestone'
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">
                      {formatCurrency(milestone.savings, { compact: true })}
                    </p>
                    <p className="text-xs text-gray-500">projected savings</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
