import type { AnyScenario, Scenario } from '../types';

const STORAGE_KEY = 'investment-calculator-scenarios';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function saveScenario<T>(
  name: string,
  type: AnyScenario['type'],
  inputs: T
): Scenario<T> {
  const scenarios = getAllScenarios();

  const newScenario: Scenario<T> = {
    id: generateId(),
    name,
    type,
    inputs,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  scenarios.push(newScenario as AnyScenario);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));

  return newScenario;
}

export function updateScenario<T>(
  id: string,
  updates: Partial<Omit<Scenario<T>, 'id' | 'createdAt'>>
): Scenario<T> | null {
  const scenarios = getAllScenarios();
  const index = scenarios.findIndex((s) => s.id === id);

  if (index === -1) return null;

  const updated = {
    ...scenarios[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  } as Scenario<T>;

  scenarios[index] = updated as AnyScenario;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));

  return updated;
}

export function deleteScenario(id: string): boolean {
  const scenarios = getAllScenarios();
  const filtered = scenarios.filter((s) => s.id !== id);

  if (filtered.length === scenarios.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function getScenario(id: string): AnyScenario | null {
  const scenarios = getAllScenarios();
  return scenarios.find((s) => s.id === id) || null;
}

export function getAllScenarios(): AnyScenario[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getScenariosByType(type: AnyScenario['type']): AnyScenario[] {
  return getAllScenarios().filter((s) => s.type === type);
}

export function duplicateScenario(id: string, newName?: string): AnyScenario | null {
  const original = getScenario(id);
  if (!original) return null;

  const scenarios = getAllScenarios();
  const duplicated: AnyScenario = {
    ...original,
    id: generateId(),
    name: newName || `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  scenarios.push(duplicated);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));

  return duplicated;
}

export function exportScenarios(ids: string[]): string {
  const scenarios = getAllScenarios().filter((s) => ids.includes(s.id));
  return JSON.stringify(scenarios, null, 2);
}

export function importScenarios(jsonString: string): number {
  try {
    const imported = JSON.parse(jsonString) as AnyScenario[];
    const existing = getAllScenarios();

    // Generate new IDs for imported scenarios
    const withNewIds = imported.map((s) => ({
      ...s,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const combined = [...existing, ...withNewIds];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));

    return withNewIds.length;
  } catch {
    return 0;
  }
}

export function getRecentScenarios(limit: number = 5): AnyScenario[] {
  return getAllScenarios()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
}

export function clearAllScenarios(): void {
  localStorage.removeItem(STORAGE_KEY);
}
