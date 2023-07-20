import { Box, Typography, Grid } from "@mui/material";

import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useContext } from "react";

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Box>
        <p>Here is Dashboard!</p>
      </Box>
    </Box>
  );
};

export default Dashboard;
