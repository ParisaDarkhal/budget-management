const router = require("express").Router();
const { Goal } = require("../models");

// get all goals
router.get("/goals", async (req, res) => {
  try {
    const goals = await Goal.findAll();
    if (!goals) {
      res.status(400).json({ message: "Goal not found!" });
    } else {
      res.json(goals);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Problem!" });
  }
});
// get a goal by id
router.get("/goals/:id", async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await Goal.findOne({ where: { id: goalId } });
    if (!goal) {
      res.status(400).json({ message: "Goal not found!" });
    } else {
      res.json(goal);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Problem!" });
  }
});

// get a goal by user_id
router.get("/goals/goalByUserId/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const goalById = await Goal.findAll({
      where: {
        user_id: userId,
      },
    });
    if (!goalById) {
      res.status(400).json({ message: "User not found!" });
    } else {
      res.json(goalById);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Problem!" });
  }
});

// create a new goal
router.post("/goals/create", async (req, res) => {
  try {
    const updateData = req.body;
    const newUser = await Goal.create(updateData);
    if (!newUser) {
      res.json({ message: "Some problem happenned" });
    } else {
      res.status(200).json({ message: "Goal successfully created!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// update a goal
router.put("/goals/update/:id", async (req, res) => {
  try {
    const goalId = req.params.id;
    const updateData = req.body;
    const goal = await Goal.update(updateData, { where: { id: goalId } });
    if (goal) {
      res.json({ message: "Goal successfully updated!" });
    } else {
      res.status(404).json({ message: "Goal not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

//delete a goal
router.delete("/goals/delete/:id", async (req, res) => {
  try {
    const goalId = req.params.id;
    const deletedGoal = await Goal.destroy({ where: { id: goalId } });
    if (deletedGoal) {
      res.status(200).json({ message: "Goal was deleted successfully!" });
    } else {
      res.status(400).json({ message: "Goal not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

module.exports = router;