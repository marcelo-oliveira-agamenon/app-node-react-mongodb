const express = require("express");
const router = express.Router();
const verifyToken = require("../utility/verifyToken");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");

const UserController = require("../controllers/UserController");
const SessionController = require("../controllers/SessionController");
const MessageController = require("../controllers/MessageController");

//routes to user CRUD
router.get("/api/users", verifyToken, UserController.showAll);
router.get("/api/users/:id", verifyToken, UserController.show);
router.post(
  "/api/users/add",
  multer(multerConfig).single("avatarFile"),
  UserController.store
);
router.delete("/api/users/delete/:id", verifyToken, UserController.delete);
router.put(
  "/api/users/update/:id",
  [verifyToken, multer(multerConfig).single("avatarFile")],
  UserController.update
);

//routes to login auth
router.post("/login", SessionController.store);
router.post("/resetPassword", SessionController.update);

//routes to message
router.get("/api/converWith", verifyToken, MessageController.conversationsWith);
router.post("/api/mess/add", verifyToken, MessageController.store);
router.put(
  "/api/mess/readStatus/:id",
  verifyToken,
  MessageController.updateReadStatus
);
router.delete("/api/delete/:id", verifyToken, MessageController.delete);

module.exports = router;
