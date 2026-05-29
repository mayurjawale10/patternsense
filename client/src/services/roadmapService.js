// API calls for study roadmap.
import apiClient from './apiClient.js';

export async function fetchRoadmap() {
  try {
    const { data } = await apiClient.get('/roadmap');
    return { data: data.data, error: null };
  } catch {
    return { data: null, error: null, isMock: true };
  }
}

export async function generateRoadmap(payload) {
  try {
    const { data } = await apiClient.post('/roadmap/generate', payload);
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.error || 'Roadmap generation failed. Check API and ANTHROPIC_API_KEY.' };
  }
}
