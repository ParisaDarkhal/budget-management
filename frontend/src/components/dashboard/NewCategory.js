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
import { addNewCategory } from "../../api/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NewCategoryAddition = () => {
  const [category, setCategory] = useState("");
  const [categoryType, setCategoryType] = useState("");

  const handleSave = async (event) => {
    try {
      const data = await addNewCategory(category, categoryType);
      if (data.status === "success") {
        toast.success("Category saved!");
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
    </>
  );
};

export default NewCategoryAddition;
