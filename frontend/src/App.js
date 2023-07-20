import React from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import SignUp from "./components/signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
