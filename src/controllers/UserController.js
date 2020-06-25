const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async showAll(req, res) {
    let users = await User.find({});
    return res.status(200).json(users);
  },

  async show(req, res) {
    const { id } = req.headers;
    let user = await User.findById(id);
    if (user) {
      return res.status(200).json({ user: user });
    } else {
      return res.status(400).json({ message: "This user doesnt exist!" });
    }
  },

  async store(req, res) {
    const { email, password, name, phone } = req.body;

    if (name.length < 8) {
      return res
        .status(400)
        .json({ message: "Name must have more then 8 caracters" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must have more then 6 digits" });
    }

    if (phone.length < 9) {
      return res
        .status(400)
        .json({ message: "Phone must have more then 9 digits" });
    }

    let findEmail = await User.findOne({ email });

    if (findEmail) {
      return res.status(400).json({
        message: "User already exist with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    });

    return res.status(200).json({ message: "User created!" });
  },

  async delete(req, res) {
    const { id } = req.headers;
    let userDelete = await User.findByIdAndDelete(id);

    if (userDelete) {
      return res.status(200).json({ message: "User deleted" });
    } else {
      return res.status(400).json({ message: "This user don't exist" });
    }
  },

  async update(req, res) {
    const { name, password, email, phone } = req.body;
    const { id } = req.headers;

    if (name.length < 8) {
      return res
        .status(400)
        .json({ message: "Name must have more then 8 caracters" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must have more then 6 digits" });
    }

    if (phone.length < 9) {
      return res
        .status(400)
        .json({ message: "Phone must have more then 9 digits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let updateUser = await User.findByIdAndUpdate(id, {
      name: name,
      password: hashedPassword,
      email: email,
      phone: phone,
    });

    if (updateUser) {
      return res.status(200).json({ message: "User updated" });
    } else {
      return res.status(400).json({ message: "This user don't exist" });
    }
  },
};
