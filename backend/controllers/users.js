const router = require("express").Router();
const { User } = require("../models");

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// get a user by id
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ message: "User not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// create a user
router.post("/users/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = await User.create({
      username: username,
      password: password,
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// update a user
router.put("/users/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const user = await User.update(updateData, { where: { id: userId } });
    if (user) {
      res.json({ message: "User successfully updated!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// delete a user
router.delete("/users/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { id: userId } });
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

module.exports = router;
