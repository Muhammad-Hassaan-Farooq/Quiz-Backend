const router = require("express").Router();

const {
  createIngredient,
  getIngredients,
  getIngredient,
} = require("../controllers/ingredient");

router.post("/", createIngredient);
router.get("/", getIngredients);
router.get("/:id", getIngredient);

module.exports = router;
