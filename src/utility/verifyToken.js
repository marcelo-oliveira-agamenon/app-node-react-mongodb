const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res.status(401).json({ message: "Access Denied" });
  }
  let token = bearerToken.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
