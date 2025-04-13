import axios from 'axios';

const api = axios.create({
  baseURL: 'https://authenticate-fhbs.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { username, email, password });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.message || 'Registration failed' };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.message || 'Login failed' };
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.message || 'Failed to fetch profile' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  return true;
};