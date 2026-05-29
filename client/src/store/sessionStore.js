// Zustand store for interview session state.
import { create } from 'zustand';

export const useSessionStore = create((set) => ({
  sessionId: null,
  problem: '',
  messages: [],
  setSession: (sessionId, problem) => set({ sessionId, problem, messages: [] }),
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),
  clearSession: () => set({ sessionId: null, problem: '', messages: [] }),
}));
