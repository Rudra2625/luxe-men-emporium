import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { userAPI } from '../services/api';
import { api } from '../services/api';

// 1. Define the type for context value
interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

// 2. Provide a default value that matches the interface
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// 3. Define props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Initializing auth...');
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('Stored token:', token);
      console.log('Stored user:', storedUser);
      
      if (token && storedUser) {
        try {
          // Set initial state from localStorage
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
          console.log('Auth initialized with stored data');
          
          // Set the token in API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Optionally verify token and update user data in background
          userAPI.getProfile().then(userData => {
            console.log('Profile verified:', userData);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }).catch(error => {
            console.error('Error verifying profile:', error);
            // Only clear if it's an auth error
            if (error.response && error.response.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setIsLoggedIn(false);
              setUser(null);
            }
          });
        } catch (error) {
          console.error('Error during auth initialization:', error);
          // If there's an error parsing stored data, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        console.log('No stored auth data found');
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string, userData: any) => {
    console.log('Login called with:', { token, userData });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log('Logout called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
