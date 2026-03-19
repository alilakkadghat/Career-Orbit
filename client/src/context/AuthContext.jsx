import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading] = useState(false);

  // In client/src/context/AuthContext.jsx
  const API_URL =
    (
      import.meta.env.VITE_API_URL || "https://careerorbit-ai-2.onrender.com"
    ).replace(/\/$/, "") + "/api";

  useEffect(() => {
    if (token) {
      // Set axios defaults
      axios.defaults.headers.common["x-auth-token"] = token;
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      }, { timeout: 10000 }); // 10 second timeout for backend
      
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      return { success: true };
    } catch (err) {
      // If backend fails (timeout, 5xx, or network error), fallback to LocalStorage mock DB
      if (!err.response || err.response.status >= 500 || err.code === 'ECONNABORTED') {
          console.warn("Backend unavailable. Falling back to LocalStorage Auth.");
          const usersDB = JSON.parse(localStorage.getItem('mockUsers_DB') || '[]');
          const userMatch = usersDB.find(u => u.email === email && u.password === password);
          
          if (userMatch) {
              const fakeToken = "mock_token_" + Date.now();
              const userData = { id: userMatch.id, username: userMatch.username, email: userMatch.email, profileCompleted: userMatch.profileCompleted };
              
              setToken(fakeToken);
              setUser(userData);
              localStorage.setItem("token", fakeToken);
              localStorage.setItem("user", JSON.stringify(userData));
              return { success: true };
          } else {
              return { success: false, error: "Invalid credentials. If you haven't registered, create an account first." };
          }
      }

      return {
        success: false,
        error: err.response?.data?.msg || "Login failed",
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      }, { timeout: 10000 }); // 10 second timeout for backend

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      return { success: true };
    } catch (err) {
      // If backend fails, fallback to LocalStorage mock DB
      if (!err.response || err.response.status >= 500 || err.code === 'ECONNABORTED') {
          console.warn("Backend unavailable. Falling back to LocalStorage Auth.");
          const usersDB = JSON.parse(localStorage.getItem('mockUsers_DB') || '[]');
          
          if (usersDB.find(u => u.email === email)) {
              return { success: false, error: "Email already registered in LocalStorage." };
          }

          const newUser = { id: Date.now().toString(), username, email, password, profileCompleted: false };
          usersDB.push(newUser);
          localStorage.setItem('mockUsers_DB', JSON.stringify(usersDB));

          const fakeToken = "mock_token_" + Date.now();
          const userData = { id: newUser.id, username: newUser.username, email: newUser.email, profileCompleted: newUser.profileCompleted };
          
          setToken(fakeToken);
          setUser(userData);
          localStorage.setItem("token", fakeToken);
          localStorage.setItem("user", JSON.stringify(userData));
          
          return { success: true };
      }

      return {
        success: false,
        error: err.response?.data?.msg || "Registration failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["x-auth-token"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};;
