const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

//routes
const authRouter = require("./routes/auth");
const ingredientRouter = require("./routes/ingredient");
const recipeRouter = require("./routes/recipe");

//middleware
const checkAdmin = require("./middleware/verifyadmin.js");
const verifyToken = require("./middleware/verifytoken.js");

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
//app.use(verifyToken);
app.use("/recipe", recipeRouter);
app.use(checkAdmin);
app.use("/ingredient", ingredientRouter);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Quiz");
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
connectDB();
