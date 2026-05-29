// API calls for problem analysis.
import apiClient from './apiClient.js';

export async function analyseProblem(payload) {
  try {
    const { data } = await apiClient.post('/analyse', payload);
    return { data: data.data || data, error: null };
  } catch (err) {
    const message = err.response?.data?.error || 'Could not reach the server. Start the API and try again.';
    return { data: null, error: message };
  }
}
