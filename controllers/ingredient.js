const Ingredient = require("../models/ingredient");

const createIngredient = async (req, res) => {
  try {
    const { name, description } = req.body;

    const ingredient = await Ingredient.create({ name, description });

    res.status(201).json({
      success: true,
      msg: "Ingredient created successfully",
      data: [ingredient],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();

    res.status(200).json({
      success: true,
      msg: "Ingredients fetched successfully",
      data: ingredients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const getIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient) {
      return res
        .status(404)
        .json({ success: true, msg: "Ingredient not found", data: [] });
    }

    res.status(200).json({
      success: true,
      msg: "Ingredient fetched successfully",
      data: [ingredient],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

module.exports = { createIngredient, getIngredients, getIngredient };
