import express from "express";
const router = express.Router();

// Require Controllers.
import locationEntryController from "../controllers/locationentry.mjs";
import { ensureAuthenticated } from "../controllers/users.mjs";

// GET location entries
router.get("/:id", locationEntryController.home);
router.post("/:id", ensureAuthenticated, locationEntryController.update);
router.get("/:id/delete", ensureAuthenticated, locationEntryController.delete);
router.get("/create/:location_id", ensureAuthenticated, locationEntryController.choose);
router.post("/insert/:id", ensureAuthenticated, locationEntryController.insert);

export default router;
