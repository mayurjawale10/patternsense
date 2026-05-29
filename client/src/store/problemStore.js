// Zustand store for current analysed problem context.
import { create } from 'zustand';

export const useProblemStore = create((set) => ({
  currentProblem: null,
  lastAnalysis: null,
  setCurrentProblem: (problem) => set({ currentProblem: problem }),
  setLastAnalysis: (analysis) => set({ lastAnalysis: analysis }),
  clear: () => set({ currentProblem: null, lastAnalysis: null }),
}));
