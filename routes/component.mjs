import express from "express";
const router = express.Router();

// Require our controllers.
import componentController from "../controllers/component.mjs";
import { ensureAuthenticated } from "../controllers/users.mjs";

/// PET ROUTES ///

// GET supercomponent list
router.get("/:id", componentController.home);

// id is group id
router.post("/create/:id", ensureAuthenticated, componentController.create);

// :id is the id of group
router.get("/select/:id", componentController.select);

// update on POST
router.post("/:id", ensureAuthenticated, componentController.update);

router.get("/:id/delete", ensureAuthenticated, componentController.delete);

export default router;
