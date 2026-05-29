// API calls for AI question generation.
import apiClient from './apiClient.js';

export async function generateQuestions(payload) {
  try {
    const { data } = await apiClient.post('/generate', payload);
    return { data: data.data, error: null };
  } catch (err) {
    const message = err.response?.data?.error || 'Generation failed. Check API connection.';
    return { data: null, error: message };
  }
}
