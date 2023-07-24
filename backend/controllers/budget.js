const router = require("express").Router();
const { Budget, User } = require("../models");

// get all budgets of a user for a specific month
router.post("/budget", async (req, res) => {
  try {
    const userId = req.body.userId;
    const month = req.body.month;
    const budgetByMonth = await Budget.findOne({
      where: {
        user_id: userId,
        month: month,
      },
    });
    if (!budgetByMonth) {
      res.json({ message: "Some problem happened." });
    } else {
      res.json(budgetByMonth);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Problem!" });
  }
});

// create a budget for a user in a month
router.post("/budget/create", async (req, res) => {
  try {
    const newBudgetData = req.body;
    const newBudget = await Budget.create(newBudgetData);
    if (!newBudget) {
      res.json({ message: "Some problem happened." });
    } else {
      res.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// update a budget
router.post("/budget/update", async (req, res) => {
  try {
    const updateData = req.body;
    const updatedBudget = await Budget.update(updateData);
    if (!updatedBudget) {
      res.json({ message: "Some problem happened." });
    } else {
      res.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});
module.exports = router;
