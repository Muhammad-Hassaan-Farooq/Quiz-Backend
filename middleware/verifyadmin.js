const jwt = require("jsonwebtoken");

const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token.split(" ")[1], "secret");

  if (user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, msg: "Must be admin" });
  }
};

module.exports = checkAdmin;
