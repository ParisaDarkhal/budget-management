import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useContext } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

/////////////////////////////////
const categories = [
  {
    value: "Rent",
    label: "Rent",
  },
  {
    value: "Car Lease",
    label: "Car Lease",
  },
  {
    value: "Grocaries",
    label: "Grocaries",
  },
  {
    value: "Cloths",
    label: "Cloths",
  },
];

////////////////////////////////

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Item>Add A New Cost</Item>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              boxShadow={5}
            >
              <TextField
                id="outlined-select-category"
                select
                label="Select"
                defaultValue="Rent"
                helperText="Please select category"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField id="filled-basic" label="Month" variant="filled" />
              <TextField id="filled-basic" label="Price" variant="filled" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
