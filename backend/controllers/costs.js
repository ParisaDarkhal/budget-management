const router = require("express").Router();
const { Cost, Category } = require("../models");

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
module.exports = router;
