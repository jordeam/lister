import express from "express";
const router = express.Router();

// Require our controllers.
import groupController from "../controllers/group.mjs";

/// PET ROUTES ///

// :id is the supergroup id
router.get("/select/:id", groupController.select);

// :id is the supergroup id
router.post("/create/:id", groupController.create);

// GET group list
router.get("/:id", groupController.home);

// GET group list
router.get("/:id/delete", groupController.delete);

export default router;
