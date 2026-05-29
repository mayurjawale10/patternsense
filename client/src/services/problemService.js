// API calls for problem history and hints.
import apiClient from './apiClient.js';
import { mockHint } from '../constants/mockData.js';

export async function fetchHint(problemId, hintLevel) {
  try {
    const { data } = await apiClient.post('/hints', { problemId, hintLevel });
    return { data: data.data, error: null };
  } catch (err) {
    const message = err.response?.data?.error || 'Could not load hint. Analyse a problem on the server first.';
    if (!problemId || problemId.length < 12) {
      return { data: mockHint, error: null, isMock: true };
    }
    return { data: null, error: message };
  }
}

export async function fetchProblemHistory(page = 1) {
  try {
    const { data } = await apiClient.get('/problems/history', { params: { page } });
    return { data: data.data, error: null };
  } catch {
    return { data: { items: [], total: 0, page: 1 }, error: null, isMock: true };
  }
}
