import axios from 'axios';
import { logout } from './features/auth/authSlice';
import type { AppStore } from './store';

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store?.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch(logout());
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export default api;
