import express from "express";
const router = express.Router();

// Require our controllers.
import shoplistController from "../controllers/shoplist.js";

/// Shop List ///

// GET group list
router.get("/", shoplistController.home);

export default router;
