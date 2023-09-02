import express from "express";
const router = express.Router();

// Require our controllers.
import locationController from "../controllers/location.mjs";

/// PET ROUTES ///

// GET locations list
router.get("/", locationController.list);
router.post('/create', locationController.create);
router.get("/:id", locationController.home);
router.post("/:id", locationController.update);
router.get('/:id/delete', locationController.delete);

export default router;
