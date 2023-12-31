const router = require("express").Router();
const { Budget, User } = require("../models");

// get all budgets of a user for a specific month
router.post("/", async (req, res) => {
  try {
    const userId = req.body.user_id;
    const month = req.body.month;
    console.log("month :>> ", month);
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
router.post("/create", async (req, res) => {
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
router.post("/update/:id", async (req, res) => {
  try {
    const budgetId = req.params.id;
    const updateData = req.body;
    const updatedBudget = await Budget.update(updateData, {
      where: { id: budgetId },
    });
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
