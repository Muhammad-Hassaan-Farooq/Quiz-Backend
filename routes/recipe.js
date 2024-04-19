const router = require("express").Router();
const verifyadmin = require("../middleware/verifyadmin");

const {
  createRecipe,
  getRecipes,
  getRecipe,
} = require("../controllers/recipe");

const Recipe = require("../models/recipe");

router.post("/", verifyadmin, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipe);

module.exports = router;
