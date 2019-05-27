// Our router module
const router = require('express').Router();

// Our controller
const PagesController = require('../controllers/pagesController');

// Our routes
router.get(`/`, PagesController.show);
router.get(`/about`, PagesController.show);
router.get(`/contact`, PagesController.show);

// We have to export our changes
module.exports = router;