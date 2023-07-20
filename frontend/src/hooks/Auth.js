import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

// Create the AuthContext to hold the user and isAuthenticated state
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth", {
        username,
        password,
      });

      console.log("data================= :>> ", response);
      const data = response.data;

      // Assuming your REST API returns user data upon successful login
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    } catch (error) {
      console.error("Login error:", error); // Handle and display the error
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    // Check if user data exists in storage and set the initial state
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedIsAuthenticated = JSON.parse(
      localStorage.getItem("isAuthenticated")
    );

    if (storedUser && storedIsAuthenticated) {
      setUser(storedUser);
      setIsAuthenticated(storedIsAuthenticated);
    }
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Update storage when user or isAuthenticated changes
    /* store user data and isAuthenticated state in storage */
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook: useAuth
export const useAuth = () => useContext(AuthContext);
