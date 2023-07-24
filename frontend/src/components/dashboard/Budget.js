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
import { useAuth } from "../../hooks/Auth";
import { addNewBudget } from "../../api/API";

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

const Budget = ({ toast }) => {
  const { user } = useAuth();
  const [month, setMonth] = useState("");
  const [budget, setBudget] = useState("");

  const handleSave = async (event) => {
    try {
      const userId = user.id;
      const data = await addNewBudget(userId, month, budget);
      if (data.message === "success") {
        toast.success(`Budget for {${month}} saved!`, {
          position: "bottom-right",
        });
      } else if (data.message === "error") {
        toast.error(data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {}
  };
  return (
    <Box display={"flex"} mt={8} mb={3}>
      <Box component="form" m={2} noValidate autoComplete="off">
        <TextField
          sx={{ marginRight: 3 }}
          id="filled-basic"
          label="Budget"
          variant="filled"
          name="budget"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
        />

        <TextField
          id="outlined-select-month"
          select
          label="Month"
          defaultValue="January"
          style={{ minWidth: 150 }}
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
