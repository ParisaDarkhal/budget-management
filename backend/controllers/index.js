const router = require("express").Router();
const users = require("./users");
const categories = require("./categories");
const goals = require("./goals");
const costs = require("./costs");

router.use("/users", users);
router.use("/categories", categories);
router.use("/goals", goals);
router.use("/costs", costs);

module.exports = router;
