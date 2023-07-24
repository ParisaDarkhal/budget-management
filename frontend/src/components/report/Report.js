import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useAuth } from "../../hooks/Auth";
import { Chart } from "react-google-charts";

// import Budget from "./Budget";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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

const data = [
  ["Cost", "Amount"],
  ["Rent", 400],
  ["Grocaries", 350],
  ["Car Lease", 300],
  ["Cloths", 200],
  ["Saving", 100],
];

const Report = () => {
  const [month, setMonth] = useState("");
  const options = {
    title: `Costs for month of ${month}`,
  };
  return (
    <Box>
      <Navbar />
      <Grid item xs={2} sm={4} md={4} boxShadow={5} mt={10}>
        <Item sx={{ mr: 3, mt: -2 }}>
          <Typography variant="h6" gutterBottom>
            What month do you want to see the report for?
          </Typography>
          <TextField
            id="outlined-select-month"
            select
            label="Select"
            defaultValue="January"
            helperText="Please select month"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Item>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </Grid>
    </Box>
  );
};
export default Report;
