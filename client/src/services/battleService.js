// API calls for battle mode.
import apiClient from './apiClient.js';

export async function createBattle(problemId) {
  try {
    const { data } = await apiClient.post('/battle/create', { problemId });
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.error || 'Could not create battle' };
  }
}

export async function joinBattle(token) {
  try {
    const { data } = await apiClient.post(`/battle/join/${token}`);
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.error || 'Invalid invite' };
  }
}

export async function submitBattle(battleId, submission) {
  try {
    const { data } = await apiClient.post('/battle/submit', { battleId, ...submission });
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.error || 'Submit failed' };
  }
}

export async function fetchBattle(battleId) {
  try {
    const { data } = await apiClient.get(`/battle/${battleId}`);
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.error || 'Battle not found' };
  }
}
