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
      res.status(400).json({ message: "User not found." });
    } else {
      res.json(budgetByMonth);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Problem!" });
  }
});
