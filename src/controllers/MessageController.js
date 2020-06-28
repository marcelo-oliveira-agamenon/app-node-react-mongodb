const Message = require("../models/Message");
const User = require("../models/User");

module.exports = {
  async conversationsWith(req, res) {
    const { to, from } = req.headers;
    if (!to || !from) {
      return res.status(400).json({ message: "Missing data from header" });
    }
    let mess = await Message.find({
      $and: [{ toUser: { $eq: to } }, { fromUser: { $eq: from } }],
    });
    let toUserDetails = await User.findById(to, { name: true });
    let fromUserDetails = await User.findById(from, { name: true });

    if (mess) {
      return res.status(200).json({
        data: mess,
        dataOfUsers: {
          toUser: toUserDetails.name,
          fromUser: fromUserDetails.name,
        },
        qtyMessages: mess.length,
      });
    } else {
      return res
        .status(400)
        .json({ message: "There's no conversation between users" });
    }
  },
  async store(req, res) {
    const { toUser, fromUser, body, date, read } = req.body;
    if (!toUser || !fromUser || !body || !date || !read) {
      return res.status(400).json({ message: "Missing body fields" });
    }
    const mess = await Message.create({
      toUser: toUser,
      fromUser: fromUser,
      body: body,
      date: date,
      read: read,
    });

    if (mess) {
      return res.status(200).json({ message: "Message sended" });
    } else {
      return res.status(400).json({ message: "Error creating message" });
    }
  },
  async updateReadStatus(req, res) {
    const { messid } = req.headers;
    if (!messid) {
      return res.status(400).json({ message: "Missing data from header" });
    }
    let mess = await Message.findByIdAndUpdate(messid, {
      read: true,
    });

    if (mess) {
      if (mess.read) {
        return res
          .status(200)
          .json({ message: "This message was already read" });
      } else {
        return res.status(200).json({ message: "Status changed" });
      }
    } else {
      return res.status(400).json({ message: "Error in update" });
    }
  },
  async delete(req, res) {
    const { id } = req.headers;
    if (!id) {
      return res.status(400).json({ message: "Missing data from header" });
    }
    let mess = await Message.findByIdAndDelete(id);

    if (mess) {
      return res.status(200).json({ messages: "Message deleted" });
    } else {
      return res.status(400).json({ error: "No message with this id" });
    }
  },
};
