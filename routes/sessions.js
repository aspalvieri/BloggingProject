const router = require("express").Router();

const SessionsController = require("../controllers/sessionsController.js");

//Routes
router.post("/authenticate", SessionsController.authenticate);
router.post("/logout", SessionsController.logout);

module.exports = router;