const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acces Denied");

  try {
    const verifies = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token!");
  }
};
