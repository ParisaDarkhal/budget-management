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
    console.log("users :>> ", users);
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
app.put("/users/:id", async (req, res) => {
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
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { id: userId } });
    res.json(deletedUser);
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
