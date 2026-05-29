// API call for dashboard aggregate data.
import apiClient from './apiClient.js';
import { mockDashboard } from '../constants/mockData.js';

export async function fetchDashboard() {
  try {
    const { data } = await apiClient.get('/dashboard');
    return { data: data.data, error: null };
  } catch {
    return { data: mockDashboard, error: null, isMock: true };
  }
}
