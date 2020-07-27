const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }
    let user = await User.findOne({ email: { $eq: username } });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        const userID = user._id;
        let token = jwt.sign({ userID }, process.env.TOKEN_SECRET, {
          expiresIn: 432000,
        });
        return res.status(200).json({
          message: "Login sucessful",
          authToken: token,
          loggedUser: user,
        });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    }
    return res
      .status(400)
      .json({ message: "Username doesnt exist to login with" });
  },

  async update(req, res) {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).send({ message: "Missing username or password" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    let user = await User.findOneAndUpdate(
      { email: { $eq: email } },
      { $set: { password: hashedPassword } }
    );

    if (user) {
      res.status(200).send({ message: "Your password is updated" });
    } else {
      res.status(400).send({ message: "Error in update" });
    }
  },
};
