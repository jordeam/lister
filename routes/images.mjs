import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/:filename", function (req, res, next) {
    res.download('./public/images/' + req.params.filename);
});

export default router;
