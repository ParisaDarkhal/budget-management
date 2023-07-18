const User = require("./User");
const Category = require("./Category");
const Cost = require("./Cost");
const Goal = require("./Goal");

User.hasMany(Cost);
Cost.belongsTo(User);

Category.hasOne(Cost);
Cost.belongsTo(Category);

User.hasMany(Goal);
Goal.belongsTo(User);

module.exports = { User, Category, Cost, Goal };
