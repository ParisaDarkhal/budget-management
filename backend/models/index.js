const User = require("./User");
const Category = require("./Category");
const Cost = require("./Cost");
const Goal = require("./Goal");

// User.hasMany(Cost, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

Cost.belongsTo(User, {
  foreignKey: "user_id",
});

Cost.hasOne(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Category.belongsTo(Cost, {
  foreignKey: "category_id",
});

// User.hasMany(Goal, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

Goal.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Category, Cost, Goal };
