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
const Dashboard = () => {
  //////////////////////////
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [goalPrice, setGoalPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [categoryType, setCategoryType] = useState("");
  console.log("categoryType :>> ", categoryType);
  //////////////////////////
  return (
    <Box>
      <Navbar />
      <Box sx={{ flexGrow: 1 }} mt={10} mx={3}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4} boxShadow={5}>
            <Item sx={{ mr: 3 }}>
              <Typography variant="h5" gutterBottom>
                Add A Category
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
                id="filled-basic"
                label="Category Name"
                variant="filled"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Category Type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={categoryType}
                  onChange={(event) => setCategoryType(event.target.value)}
                >
                  <FormControlLabel
                    value="fixed"
                    control={<Radio />}
                    label="Fixed"
                  />
                  <FormControlLabel
                    value="variable"
                    control={<Radio />}
                    label="Variable"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Grid>

          <Grid item xs={2} sm={4} md={4} boxShadow={5}>
            <Item sx={{ mr: 3 }}>
              <Typography variant="h5" gutterBottom>
                Add A Goal
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
                id="filled-basic"
                label="Goal Name"
                variant="filled"
                name="goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Price"
                variant="filled"
                name="price"
                value={goalPrice}
                onChange={(event) => setGoalPrice(event.target.value)}
              />
            </Box>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Grid>

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
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
