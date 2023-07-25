const router = require("express").Router();
const sequelize = require("../config/connection");
const { Cost, Category, User } = require("../models");
const { Op, where } = require("sequelize");

// get all costs for a user in one specific category: 1-if not give month => for all times 2-if give month => for specific month (gets the request as a json object and returns an array) and includes the category data
router.post("/users", async (req, res) => {
  try {
    const userId = req.body.userId;
    if (req.body.month) {
      const costsByUserId = await Cost.findAll({
        where: {
          user_id: userId,
          month: req.body.month,
          category_id: req.body.categoryId,
        },
        include: [{ model: Category }],
      });
      if (!costsByUserId) {
        res.status(400).json({ message: "User not found!" });
      } else {
        res.json(costsByUserId);
      }
    } else {
      const costsByUserId = await Cost.findAll({
        where: {
          user_id: userId,
          category_id: req.body.categoryId,
        },
        include: [{ model: Category }],
      });
      if (!costsByUserId) {
        res.status(400).json({ message: "User not found!" });
      } else {
        res.json(costsByUserId);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// get costs by userId, for a category
router.post("/month", async (req, res) => {
  try {
    const userId = req.body.userId;
    const costsInAMonth = await Cost.findAll({
      where: {
        user_id: userId,
        month: req.body.month,
      },
      include: [{ model: Category }],
    });
    if (!costsInAMonth) {
      res.status(400).json({ message: "User not found!" });
    } else {
      res.json(costsInAMonth);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// create a cost for a user
router.post("/create", async (req, res) => {
  try {
    const newCostData = req.body;
    const newCost = await Cost.create(newCostData);
    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// get costs for a month for a user by category
router.post("/report", async (req, res) => {
  try {
    const queryData = req.body;
    const costMonthByCategory = await Cost.findAll({
      attributes: [
        "category_id",
        "month",
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
      ],
      where: { user_id: queryData.user_id, month: queryData.month },
      include: [{ model: Category }],
      group: ["category_id", "month"],
    });
    res.json(costMonthByCategory);
  } catch (error) {
    console.error(error);
  }
});

// get accumulative savings for a user
router.post("/saving", async (req, res) => {
  const queryData = req.body;
  try {
    const category = await Category.findOne({ where: { name: "saving" } });
    const totalSaving = await Cost.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
      ],
      where: {
        user_id: queryData.userId,
        category_id: category.id,
      },
    });
    res.json(totalSaving);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
