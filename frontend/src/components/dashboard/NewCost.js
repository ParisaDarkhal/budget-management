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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
////////////////////////////////////////////////////////////
const handleSave = async () => {};

////////////////////////////////////////////////////////////
const NewCostAddition = () => {
  const [costPrice, setCostPrice] = useState(0);

  return (
    <Grid item xs={2} sm={4} md={4} boxShadow={5}>
      <Item sx={{ mr: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add A New Cost
        </Typography>
      </Item>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        mt={2}
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

        <TextField
          id="outlined-select-month"
          select
          label="Select"
          defaultValue="January"
          helperText="Please select month"
        >
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="filled-basic"
          label="Price"
          variant="filled"
          name="price"
          value={costPrice}
          onChange={(event) => setCostPrice(event.target.value)}
        />
      </Box>
      <Button variant="contained" sx={{ mb: 3 }} onClick={handleSave}>
        Save
      </Button>
    </Grid>
  );
};

export default NewCostAddition;
