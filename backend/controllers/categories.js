const router = require("express").Router();
const { Category } = require("../models");

// get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem!" });
  }
});

// get a category by id
router.get("/categories/:id", async (req, res) => {
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
router.post("/categories/create", async (req, res) => {
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
router.put("/categories/update/:id", async (req, res) => {
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
router.delete("/categories/delete/:id", async (req, res) => {
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

module.exports = router;
