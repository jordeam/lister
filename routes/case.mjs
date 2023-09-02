import express from "express";
const router = express.Router();

// Require our controllers.
import caseController from "../controllers/case.js";

/// PET ROUTES ///

// GET cases list
router.get("/", caseController.list);
// router.post('/create', caseController.create);
router.get("/:id", caseController.home);
router.post("/:id", caseController.update);
// router.get('/:id/delete', caseController.delete);

export default router;
