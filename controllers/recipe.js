const Recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  try {
    const { name, description, ingredients } = req.body;
    const recipe = await Recipe.create({ name, description, ingredients });

    res.status(201).json({
      success: true,
      msg: "Recipe created successfully",
      data: [recipe],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("ingredients", "name");

    res.status(200).json({
      success: true,
      msg: "Recipes fetched successfully",
      data: recipes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: true, msg: "Recipe not found", data: [] });
    }

    res.status(200).json({
      success: true,
      msg: "Recipe fetched successfully",
      data: [recipe],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

module.exports = { createRecipe, getRecipes, getRecipe };
