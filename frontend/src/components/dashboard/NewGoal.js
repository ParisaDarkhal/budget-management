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

////////////////////////////////////////////////////////////
const handleSave = async () => {};

////////////////////////////////////////////////////////////

const NewGoalAddition = () => {
  const [goal, setGoal] = useState("");
  const [goalPrice, setGoalPrice] = useState(0);
  return (
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
  );
};

export default NewGoalAddition;