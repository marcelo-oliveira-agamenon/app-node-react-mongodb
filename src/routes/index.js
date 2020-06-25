const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const SessionController = require("../controllers/SessionController");
const MessageController = require("../controllers/MessageController");

//routes to user CRUD
router.get("/api/users", UserController.showAll);
router.get("/api/users/:id", UserController.show);
router.post("/api/users/add", UserController.store);
router.delete("/api/users/delete/:id", UserController.delete);
router.put("/api/users/update/:id", UserController.update);

//routes to login auth
router.post("/login", SessionController.store);

//routes to message
router.get("/api/toMess/:id", MessageController.showToUser);
router.get("/api/fromMess/:id", MessageController.showFromUser);
router.post("/api/mess/add", MessageController.store);
router.put("/api/mess/:id", MessageController.update);
router.delete("api/mess/:id", MessageController.delete);

module.exports = router;
