const express = require("express"); //
const bcrypt = require("bcrypt");
const path = require("path"); //
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const controllers = require("./controllers");
const sequelize = require("./config/connection");
// const helpers = require("./utils/helpers");
const User = require("./models/User");
const { where } = require("sequelize");

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

app.use(controllers);
// user login
app.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("req.body :>> ", req.body);
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials!");
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// Starts the server to begin listening: first we need to connect to the database and then run the server
// false can be turned to true ONLY first time when I want to make the database
sequelize.sync({ force: false }).then(() => {
  myStore.sync();

  app.listen(PORT, () => {
    console.log("🐱🐱🐱Server listening on: http://localhost:" + PORT);
  });
});
