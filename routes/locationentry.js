const express = require("express");
const router = express.Router();

// Require Controllers.
const locationEntryController = require("../controllers/locationentry");

// GET location entries
router.get("/:id", locationEntryController.home);
router.post("/:id", locationEntryController.update);
router.get("/:id/delete", locationEntryController.delete);
router.get("/create/:location_id", locationEntryController.choose);
router.post("/insert/:id", locationEntryController.insert);

module.exports = router;
