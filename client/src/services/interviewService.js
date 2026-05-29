// API calls for mock interview sessions.
import apiClient from './apiClient.js';
import { mockInterviewSession } from '../constants/mockData.js';

export async function startInterview(payload) {
  try {
    const { data } = await apiClient.post('/interview/start', payload);
    return { data: data.data, error: null };
  } catch {
    return { data: mockInterviewSession, error: null, isMock: true };
  }
}

export async function sendInterviewMessage(payload) {
  try {
    const { data } = await apiClient.post('/interview/message', payload);
    return { data, error: null };
  } catch {
    return {
      data: { type: 'message', content: 'Walk me through your approach and time complexity.' },
      error: null,
      isMock: true,
    };
  }
}
