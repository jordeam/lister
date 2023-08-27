const express = require("express");
const router = express.Router();

// Require our controllers.
const componentController = require("../controllers/component");

/// PET ROUTES ///

// GET supercomponent list
router.get("/:id", componentController.home);

// id is group id
router.post("/create/:id", componentController.create);

// :id is the id of group
router.get("/select/:id", componentController.select);

router.post("/:id", componentController.update);
router.get("/:id/delete", componentController.delete);

module.exports = router;
