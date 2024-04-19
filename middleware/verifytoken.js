const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const user = jwt.verify(token.split(" ")[1], "secret");

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, msg: "Not logged in" });
  }
};

module.exports = verifyToken;
