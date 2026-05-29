// API calls for company question banks.
import apiClient from './apiClient.js';
import { COMPANIES } from '../constants/companies.js';

export async function fetchCompanies() {
  try {
    const { data } = await apiClient.get('/companies');
    return { data: data.data, error: null };
  } catch {
    return { data: COMPANIES, error: null, isMock: true };
  }
}

export async function fetchCompanyQuestions(name, filters = {}) {
  try {
    const { data } = await apiClient.get(`/companies/${name}/questions`, { params: filters });
    return { data: data.data, error: null };
  } catch {
    return { data: { questions: [], gapAnalysis: [] }, error: null, isMock: true };
  }
}
