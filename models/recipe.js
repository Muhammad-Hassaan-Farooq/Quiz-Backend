const mongoose = require("mongoose");
const ingredient = require("./ingredient");
const schema = mongoose.Schema;

const recipeSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
});

module.exports = mongoose.model("Recipe", recipeSchema);
