import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useContext } from "react";
import NewCategoryAddition from "./NewCategory";
import NewGoalAddition from "./NewGoal";
import NewCostAddition from "./NewCost";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ flexGrow: 1 }} mt={10} mx={3}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <NewCategoryAddition />
          <NewGoalAddition />
          <NewCostAddition />
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
