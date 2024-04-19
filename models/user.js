const mongoose = require("mongoose");

const userRoles = ["admin", "user"];
const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: userRoles,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
