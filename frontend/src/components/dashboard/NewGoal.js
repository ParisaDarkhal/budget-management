import { Box, Typography, Grid, Button, Paper, TextField } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import React from "react";
import { useState } from "react";
import { addNewGoal } from "../../api/API";

import { useAuth } from "../../hooks/Auth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NewGoalAddition = ({ toast }) => {
  const [goal, setGoal] = useState("");
  const [goalPrice, setGoalPrice] = useState(0.0);
  const { user } = useAuth();

  const handleSave = async (event) => {
    try {
      const userId = user.id;
      const data = await addNewGoal(goal, goalPrice, userId);
      if (data.status === "success") {
        toast.success("Goal saved!", {
          position: "bottom-center",
        });
      } else if (data.status === "error") {
        toast.error(data.message, {
          position: "bottom-center",
        });
      }
    } catch (error) {}
  };
  return (
    <>
      <Grid item xs={2} sm={4} md={4} boxShadow={5}>
        <Item sx={{ mr: 3, mt: -2 }}>
          <Typography variant="h6" gutterBottom>
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
    </>
  );
};

export default NewGoalAddition;
