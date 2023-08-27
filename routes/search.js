const express = require("express");
const router = express.Router();

// Require our controllers.
const searchController = require("../controllers/search");

/// PET ROUTES ///

// GET searchs list
router.get("/", searchController.get);
router.post('/', searchController.post);

module.exports = router;
