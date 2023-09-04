import express from "express";
import { ensureAuthenticated } from "../controllers/users.mjs";

const router = express.Router();

// Require our controllers.
import supergroupController from "../controllers/supergroup.mjs";

/// PET ROUTES ///

// GET supergroup list
router.get("/", supergroupController.index);

// create a new supergroup
router.post("/create", ensureAuthenticated, supergroupController.create);

// show a supergroup home page, containing its groups
router.get("/:id", supergroupController.list);

router.get("/:id/delete", ensureAuthenticated, supergroupController.delete);

export default router;
