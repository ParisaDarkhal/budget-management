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
import React, { useState, useEffect } from "react";
import { getCategories, addNewCost } from "../../api/API";
import { useAuth } from "../../hooks/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const NewCostAddition = () => {
  const [costPrice, setCostPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const getCats = async () => {
      const d = await getCategories();
      setAllCategories(d);
    };
    getCats();
    // getCategories().then((res) => setAllCategories(res)); //this is another way to write the function above
  }, []);

  const categories = allCategories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleCategroyChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategory(event.target.value);
    setCategoryId(selectedCategoryId);
  };

  const handleSave = async (event) => {
    try {
      const userId = user.id;
      const data = await addNewCost(categoryId, userId, month, costPrice);
      if (data.status === "success") {
        toast.success("New cost saved!");
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
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
            value={category}
            onChange={handleCategroyChange}
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
            value={month}
            onChange={(event) => setMonth(event.target.value)}
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
    </>
  );
};

export default NewCostAddition;
