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

const months = [
  {
    value: "January",
    label: "January",
  },
  {
    value: "February",
    label: "February",
  },
  {
    value: "March",
    label: "March",
  },
  {
    value: "April",
    label: "April",
  },
  {
    value: "May",
    label: "May",
  },
  {
    value: "June",
    label: "June",
  },
  {
    value: "July",
    label: "July",
  },
  {
    value: "August",
    label: "August",
  },
  {
    value: "September",
    label: "September",
  },
  {
    value: "October",
    label: "October",
  },
  {
    value: "November",
    label: "November",
  },
  {
    value: "December",
    label: "December",
  },
];

const Budget = () => {
  const [month, setMonth] = useState("");
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
          id="outlined-select-month"
          select
          label="Month"
          defaultValue="January"
          //   helperText="Please select month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        >
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* <TextField
          id="filled-basic"
          label="Month"
          variant="filled"
          name="month"
          //   value={goalPrice}
          //   onChange={(event) => setGoalPrice(event.target.value)}
        /> */}
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
