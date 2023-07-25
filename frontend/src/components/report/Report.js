import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/Auth";
import { Chart } from "react-google-charts";
import { reportCostsForMonth, totalSaving } from "../../api/API";

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

const Report = () => {
  const [month, setMonth] = useState("");
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const handleShow = async (event) => {
    try {
      const userId = user.id;
      const datafromDB = await reportCostsForMonth(userId, month);
      transformData(datafromDB);
    } catch (error) {
      console.error(error);
    }
  };

  const transformData = (items) => {
    const newData = [["Category", "Amount"]];
    for (let index = 0; index < items.length; index++) {
      const CategoryName = items[index].category.name;
      const totalAmountForCat = parseFloat(items[index].totalAmount);
      newData.push([CategoryName, totalAmountForCat]);
    }
    setData(newData);
  };
  const options = {
    title: `Costs for month of ${month}`,
  };
  const [userTotalSaving, setUserTotalSaving] = useState(0);
  useEffect(() => {
    setUserTotalSaving(totalSaving());
    //i need to set the list of goals for the user here too

    return () => {}; //i need to make the function to compare the saving and the goals price and return goals with price <= saving
  }, []);

  return (
    <Box>
      <Navbar />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 2, md: 6 }}
      >
        <Grid item xs={2} sm={4} md={4} boxShadow={5} mt={10}>
          <Item sx={{ mr: 0, mt: -2 }}>
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
            <Button
              variant="contained"
              sx={{ my: 1, mx: 3 }}
              onClick={handleShow}
            >
              Show
            </Button>
          </Item>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={2} boxShadow={5} mt={10}>
          <Item sx={{ mr: 0, mt: -2 }}>
            <Typography variant="h6" gutterBottom>
              Now, your saving is enough to buy
            </Typography>
          </Item>
          <Item sx={{ mr: 0, mt: -2 }}>
            <Typography variant="h6" gutterBottom>
              ☠️☠️☠️ Be carefull about your expenses! You have spent 80% of your
              budget so far! ☠️☠️☠️
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Report;
