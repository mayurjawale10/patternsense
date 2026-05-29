// API calls for pattern confidence and notes.
import apiClient from './apiClient.js';
import { mockPatterns } from '../constants/mockData.js';

export async function fetchPatterns() {
  try {
    const { data } = await apiClient.get('/patterns');
    return { data: data.data, error: null };
  } catch {
    return { data: mockPatterns, error: null, isMock: true };
  }
}
