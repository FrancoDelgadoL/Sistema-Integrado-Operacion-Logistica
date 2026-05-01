import axios from 'axios';

const API_URL = 'http://localhost:5225/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (email, password) => {
    try {
      const response = await api.post('/Auth/login', { email, password });
      console.log("Respuesta del backend:", response.data);
      
      if (response.data.success) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error("Login fallido");
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/Auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  },

  getPerfil: async () => {
    const response = await api.get('/Auth/perfil');
    return response.data;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default api;