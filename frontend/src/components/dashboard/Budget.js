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

const Budget = () => {
  const handleSave = () => {};
  return (
    <Box display={"flex"} mt={8} mb={3}>
      <Box component="form" m={2} noValidate autoComplete="off">
        <TextField
          sx={{ marginRight: 3 }}
          id="filled-basic"
          label="Budget"
          variant="filled"
          name="budget"
          //   value={}
          //   onChange={(event) => setGoal(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Month"
          variant="filled"
          name="month"
          //   value={goalPrice}
          //   onChange={(event) => setGoalPrice(event.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          style={{ height: 50, marginLeft: 10, marginTop: 3 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Budget;
