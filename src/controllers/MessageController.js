const Message = require("../models/Message");

module.exports = {
  async conversationsWith(req, res) {
    const { to, from } = req.headers;
    let mess = await Message.find({
      $and: [{ toUser: { $eq: to } }, { fromUser: { $eq: from } }],
    });
    if (mess) {
      return res.status(200).json({ data: mess });
    } else {
      return res
        .status(400)
        .json({ message: "There's no conversation between users" });
    }
  },
  async showToUser(req, res) {
    const { toUser } = req.headers;
    let mess = await Message.find(toUser);

    if (mess) {
      return res.status(200).json({ messages: mess });
    } else {
      return res.status(400).json({ error: "" });
    }
  },
  async showFromUser(req, res) {
    const { fromUser } = req.headers;
    let mess = await Message.find(fromUser);

    if (mess) {
      return res.status(200).json({ messages: mess });
    } else {
      return res.status(400).json({ error: "" });
    }
  },
  async store(req, res) {
    const { toUser, fromUser, body, date, read } = req.body;
    const mess = await Message.create({
      toUser: toUser,
      fromUser: fromUser,
      body: body,
      date: date,
      read: read,
    });

    return res.status(200).json({ message: "Message sended" });
  },
  async update(req, res) {
    const { id } = req.headers;
    let mess = await Message.findById(id);

    if (mess) {
    }
  },
  async delete(req, res) {
    const { id } = req.headers;
    let mess = await Message.findByIdAndDelete(id);

    if (mess) {
      return res.status(200).json({ messages: "Message deleted" });
    } else {
      return res.status(400).json({ error: "No message with this id" });
    }
  },
};
