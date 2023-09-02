const { seqlz } = require('../db');
const Case = require("../models/case");

const asyncHandler = require("express-async-handler");

// Display list of all Case.
exports.list = asyncHandler(async (req, res, next) => {
    const allCases = await Case.findAll({order: seqlz.col('name')});
    res.render("case_list", {
        cases_list: allCases,
    });
});

// Display detail page for a specific Case.
exports.home = asyncHandler(async (req, res, next) => {
  // Get details of case and all associated pets (in parallel)
  const ccase = await Case.findOne({where: {id: req.params.id}});
  if (ccase === null) {
    // No results.
    const err = new Error("Invólucro não encontrado");
    err.status = 404;
    return next(err);
  }

  res.render("case_home", {
    ccase,
  });
});

exports.update = asyncHandler(async (req, res, next) => {
  const ccase = await Case.findOne({where: {id: req.params.id}});

  ccase.name = req.body.name;
  ccase.descr = req.body.descr;

  await ccase.save();

  res.redirect('/case/');
});

