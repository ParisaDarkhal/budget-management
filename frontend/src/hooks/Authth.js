import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../utils/mutations"; // Import your GraphQL mutation

// Create the AuthContext to hold the user and isAuthenticated state
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is authenticated based on user state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // GraphQL login mutation
  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("datafromlogin :>> ", data);
      const { loginMutation } = data; // Update with the appropriate response fields from your GraphQL server
      setUser(loginMutation);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(loginMutation));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    },
    onError: (error) => {
      console.error("Login error:", error); // Handle and display the error
    },
  });

  // Login function
  const login = async (username, password) => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });
      console.log("dataInAuth :>> ", data);

      // Handle the response from the login mutation in the onCompleted callback
    } catch (error) {
      console.error("Login error:", error); // Handle and display the error
    }
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

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook: useAuth
export const useAuth = () => useContext(AuthContext);
