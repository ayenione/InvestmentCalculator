import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common';
import { ScenarioCard } from './ScenarioCard';
import {
  getScenariosByType,
  deleteScenario,
  duplicateScenario,
} from '../../utils/scenarios';
import type { AnyScenario } from '../../types';

interface SavedScenariosProps {
  type: AnyScenario['type'];
  onLoad: (scenario: AnyScenario) => void;
  refreshKey?: number;
}

export function SavedScenarios({ type, onLoad, refreshKey = 0 }: SavedScenariosProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scenarios = useMemo(
    () => getScenariosByType(type),
    [type, refreshKey]
  );

  const handleDuplicate = (id: string) => {
    duplicateScenario(id);
    // Force re-render would need a callback here
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this scenario?')) {
      deleteScenario(id);
    }
  };

  if (scenarios.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <span>
          Saved Scenarios ({scenarios.length})
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {scenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onLoad={onLoad}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
