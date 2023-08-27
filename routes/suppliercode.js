const express = require("express");
const router = express.Router();

// Require our controllers.
const suppliercodeController = require("../controllers/suppliercode");

/// PET ROUTES ///

// GET suppliercode list
// router.get("/", suppliercodeController.list);

// id is component id
router.post("/create/:id", suppliercodeController.create);

router.get("/:id", suppliercodeController.home);
router.post("/:id", suppliercodeController.update);
router.get("/:id/delete", suppliercodeController.delete);

module.exports = router;
