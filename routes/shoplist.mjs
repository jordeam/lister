import express from "express";
const router = express.Router();

// Require our controllers.
import shoplistController from "../controllers/shoplist.mjs";

/// Shop List ///

// GET group list
router.get("/", shoplistController.home);

router.get("/csv", shoplistController.csv);

export default router;
