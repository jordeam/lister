const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

index = asyncHandler(async (req, res, next) => {
  res.render("index", {});
});

/* GET home page. */
router.get("/", index);

router.get('/favicon.ico', function (req, res) {
  res.download('./public/images/favicon.ico');
});

module.exports = router;
