import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios.js'; // Assuming your axios config is here

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on app startup
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
      } catch (error) {
        console.log("No user logged in.");
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      setUser(data.user); // Save user data, including role
      navigate('/dashboard'); // Navigate to the unified dashboard
    } catch (error) {
      console.error("Login failed", error);
      throw error; // Re-throw error to be handled by the form
    }
  };

  const signup = async (formData) => {
    try {
      const { data } = await api.post('/auth/signup', formData);
      setUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    navigate('/login');
  };

  // Provide the user, loading state, and functions to the rest of the app
  const value = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};