import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar sesión al cargar
  useEffect(() => {
    const checkAuth = async () => {
      if (authApi.isAuthenticated()) {
        try {
          const perfil = await authApi.getPerfil();
          setUser(perfil);
        } catch (err) {
          console.error('Error al verificar sesión:', err);
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await authApi.login(email, password);
      console.log("📦 Datos completos del login:", data);
      console.log("👤 Usuario:", data.user);
      console.log("🎭 Rol del usuario:", data.user?.rol);
      
      setUser(data.user);
      return data;
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al iniciar sesión';
      setError(mensaje);
      throw new Error(mensaje);
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading: loading,
        error: error,
        login: login,
        logout: logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};