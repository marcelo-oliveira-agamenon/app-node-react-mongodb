const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  let token = bearerToken.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
