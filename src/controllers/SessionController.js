const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }
    let user = await User.findOne({ username });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        const userID = user._id;
        let token = jwt.sign({ userID }, process.env.TOKEN_SECRET, {
          expiresIn: 432000,
        });
        return res
          .status(200)
          .json({ message: "Login sucessful", authToken: token });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    }
    return res
      .status(400)
      .json({ message: "Username doesnt exist to login with" });
  },
};
