import express from "express";
const router = express.Router();

// Require Controllers.
import locationEntryController from "../controllers/locationentry.mjs";
import { ensureAuthenticated } from "../controllers/users.mjs";

// GET location entries
router.get("/create/:location_id", ensureAuthenticated, locationEntryController.choose);
router.post("/insert/:id", ensureAuthenticated, locationEntryController.insert);
router.get("/:id", locationEntryController.home);
router.post("/:id", ensureAuthenticated, locationEntryController.update);
router.get("/:id/table", locationEntryController.home);
router.post("/:id/table", ensureAuthenticated, locationEntryController.update);
router.get("/:id/delete", ensureAuthenticated, locationEntryController.delete);

export default router;
