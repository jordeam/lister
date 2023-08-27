const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/:filename", function (req, res, next) {
    res.download('./public/scripts/' + req.params.filename);
});

module.exports = router;
