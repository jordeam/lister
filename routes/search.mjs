import express from "express";
const router = express.Router();

// Require our controllers.
import searchController from "../controllers/search.mjs";

/// PET ROUTES ///

// GET searchs list
router.get("/", searchController.get);
router.post('/', searchController.post);

export default router;
