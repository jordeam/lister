const express = require("express");
const router = express.Router();

// Require our controllers.
const caseController = require("../controllers/case");

/// PET ROUTES ///

// GET cases list
router.get("/", caseController.list);
// router.post('/create', caseController.create);
router.get("/:id", caseController.home);
router.post("/:id", caseController.update);
// router.get('/:id/delete', caseController.delete);

module.exports = router;
