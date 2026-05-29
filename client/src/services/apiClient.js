// Axios instance with Firebase JWT interceptor and dev token.
import axios from 'axios';
import { auth, isFirebaseConfigured } from '../config/firebase.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 8000,
});

apiClient.interceptors.request.use(async (config) => {
  if (isFirebaseConfigured && auth?.currentUser) {
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  } else if (!isFirebaseConfigured) {
    config.headers.Authorization = 'Bearer dev-token';
  }
  return config;
});

export default apiClient;
