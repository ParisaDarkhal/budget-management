import React from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import SignUp from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Report from "./components/report/Report";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}

export default App;
