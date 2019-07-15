const router = require("express").Router();

const AuthorsController = require("../controllers/authorsController.js");

//Routes
router.post(`/`, AuthorsController.create);

module.exports = router;