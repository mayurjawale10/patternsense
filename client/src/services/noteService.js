// API calls for user notes.
import apiClient from './apiClient.js';
import { mockNotes } from '../constants/mockData.js';

export async function fetchNotes(search = '') {
  try {
    const { data } = await apiClient.get('/notes', { params: { search } });
    return { data: data.data, error: null };
  } catch {
    return { data: mockNotes, error: null, isMock: true };
  }
}

export async function saveNote(payload) {
  try {
    const { data } = await apiClient.post('/notes', payload);
    return { data: data.data, error: null };
  } catch {
    return { data: { ...payload, _id: payload.id || 'mock-new' }, error: null, isMock: true };
  }
}
