import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '../common';

interface SaveScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  defaultName?: string;
}

export function SaveScenarioModal({
  isOpen,
  onClose,
  onSave,
  defaultName = '',
}: SaveScenarioModalProps) {
  const [name, setName] = useState(defaultName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Save Scenario
              </h2>
              <form onSubmit={handleSubmit}>
                <Input
                  label="Scenario Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Retirement Plan A"
                  autoFocus
                />
                <div className="flex justify-end gap-3 mt-6">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!name.trim()}>
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
