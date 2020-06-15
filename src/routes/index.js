const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const SessionController = require("../controllers/SessionController");

//routes to user CRUD
router.get("/api/users", UserController.showAll);
router.get("/api/users/:id", UserController.show);
router.post("/api/users/add", UserController.store);
router.delete("/api/users/delete/:id", UserController.delete);
//router.patch("/api/users/update/:id", UserController.update);

//routes to login auth
router.post("/api/login", SessionController.store);

module.exports = router;
