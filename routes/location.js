const express = require("express");
const router = express.Router();

// Require our controllers.
const locationController = require("../controllers/location");

/// PET ROUTES ///

// GET locations list
router.get("/", locationController.list);
router.post('/create', locationController.create);
router.get("/:id", locationController.home);
router.post("/:id", locationController.update);
router.get('/:id/delete', locationController.delete);

module.exports = router;
