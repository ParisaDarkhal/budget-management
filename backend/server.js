const express = require("express"); //

const path = require("path"); //
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const controllers = require("./controllers");
const sequelize = require("./config/connection");
// const helpers = require("./utils/helpers");

//////////////////////////////////
const { User, Cost, Category, Goal } = require("./models");
//////////////////////////////////

const PORT = process.env.PORT || 3001;

// Sets up the Express App
const app = express();

const myStore = new SequelizeStore({
  db: sequelize,
});

// configure express
app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      // Stored in milliseconds
      maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    store: myStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    saveUninitialized: true,
  })
);

// to make it possible to make a POST request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To access the public/front-end content!
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", async (req, res) => {
  res.send("Server is running");
});

// app.use(controllers);

////////////////////////////////////////////////////////////////////////////
// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// get a user by id
app.get("/users/:id", async (req, res) => {
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
app.post("/users/signup", async (req, res) => {
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
app.put("/users/update/:id", async (req, res) => {
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
app.delete("/users/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { id: userId } });
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

/////////
// get all categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// get a category by id
app.get("/categories/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({ where: { id: categoryId } });
    if (category) {
      res.json(category);
    } else {
      res.status(400).json({ message: "Category not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// create a category
app.post("/categories/create", async (req, res) => {
  try {
    const name = req.body.name;
    const type = req.body.type;
    const newCategory = await Category.create({
      name: name,
      type: type,
    });
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// update a category
app.put("/categories/update/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updateData = req.body;
    const category = await Category.update(updateData, {
      where: { id: categoryId },
    });
    if (category) {
      res.json({ message: "Category successfully updated!" });
    } else {
      res.status(404).json({ message: "Category not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// delete a category
app.delete("/categories/delete/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: {
        id: categoryId,
      },
    });
    if (deletedCategory) {
      res.json({ message: "Category deleted." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

//////////
// get all goals
app.get("/goals", async (req, res) => {
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
app.get("/goals/:id", async (req, res) => {
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
app.get("/goals/goalByUserId/:user_id", async (req, res) => {
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
app.post("/goals/create", async (req, res) => {
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
app.put("/goals/update/:id", async (req, res) => {
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
app.delete("/goals/delete/:id", async (req, res) => {
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
//////////////////////////
// get all costs for a user in one specific category: 1-if not give month => for all times 2-if give month => for specific month (gets the request as a json object and returns an array) and includes the category data
app.post("/costs/users", async (req, res) => {
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

////////////////////////////////////////////////////////////////////////////

// Starts the server to begin listening: first we need to connect to the database and then run the server
// false can be turned to true ONLY first time when I want to make the database
sequelize.sync({ force: false }).then(() => {
  myStore.sync();

  app.listen(PORT, () => {
    console.log("🐱🐱🐱Server listening on: http://localhost:" + PORT);
  });
});
