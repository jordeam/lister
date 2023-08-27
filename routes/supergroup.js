const express = require("express");
const router = express.Router();

// Require our controllers.
const supergroupController = require("../controllers/supergroup");

/// PET ROUTES ///

// GET supergroup list
router.get("/", supergroupController.index);

// create a new supergroup
router.post("/create", supergroupController.create);

// show a supergroup home page, containing its groups
router.get("/:id", supergroupController.list);

router.get("/:id/delete", supergroupController.delete);

module.exports = router;
