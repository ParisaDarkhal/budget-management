import { Box, Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import React from "react";
import Navbar from "../navbar/Navbar";
import NewCategoryAddition from "./NewCategory";
import NewGoalAddition from "./NewGoal";
import NewCostAddition from "./NewCost";
import Budget from "./Budget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Budget toast={toast} />
      <Box mx={3}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 6, md: 12 }}
        >
          <NewCategoryAddition toast={toast} />
          <NewGoalAddition toast={toast} />
          <NewCostAddition toast={toast} />
        </Grid>
      </Box>
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
    </Box>
  );
};

export default Dashboard;
