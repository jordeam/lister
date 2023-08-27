const express = require("express");
const router = express.Router();

// Require our controllers.
const shoplistController = require("../controllers/shoplist");

/// Shop List ///

// GET group list
router.get("/", shoplistController.home);

module.exports = router;
