// API calls for user profile sync.
import apiClient from './apiClient.js';
import { mockUser } from '../constants/mockData.js';

export async function fetchMe() {
  try {
    const { data } = await apiClient.post('/auth/me');
    return { data: data.data, error: null };
  } catch {
    return { data: { ...mockUser }, error: null, isMock: true };
  }
}

export async function signup(payload) {
  try {
    const { data } = await apiClient.post('/auth/signup', payload);
    return { data: data.data, error: null };
  } catch {
    return { data: { ...mockUser, ...payload }, error: null, isMock: true };
  }
}
