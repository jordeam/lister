const express = require("express");
const router = express.Router();

// Require our controllers.
const supplierController = require("../controllers/supplier");

/// PET ROUTES ///

// GET supplier list
router.get("/", supplierController.list);
router.post("/create", supplierController.create);
router.get("/:id", supplierController.home);
router.post("/:id", supplierController.update);
router.get("/:id/delete", supplierController.delete);

module.exports = router;
