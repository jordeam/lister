const { seqlz } = require('../db');
const {Sequelize, Op} = require('sequelize');
const Supergroup = require("../models/supergroup");
const Group = require("../models/group");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
// const { param } = require('../app');

// Display list of all Supergroup.
exports.index = asyncHandler(async (req, res, next) => {
    const allSupergroups = await Supergroup.findAll({attributes: ['id', 'name'], order: seqlz.col('name')});
    res.render("supergroup_list", {
        supergroups_list: allSupergroups,
    });
});

// Display detail page for a specific Supergroup.
exports.list = asyncHandler(async (req, res, next) => {
  // Get details of supergroup and all associated pets (in parallel)
  const [allGroups, supergroup] = await Promise.all([Group.findAll({where: {supergroup_id: req.params.id}, order: [['name']]}), Supergroup.findOne({where: {id: req.params.id}})]);
  if (allGroups === null || supergroup === null) {
    // No results.
    const err = new Error("Supergrupo não encontrado");
    err.status = 404;
    return next(err);
  }

  res.render("supergroup_home", {
    supergroup,
    allGroups,
  });
});

// Create a new supergroup
exports.create = asyncHandler(async (req, res, next) => {
  const spgrp = await Supergroup.create({name: req.body.name});

  return res.redirect(spgrp.url);
});

exports.delete = asyncHandler(async (req, res, next) => {
  const spgroup = await Supergroup.findOne({ where: { id: req.params.id } });

  if (spgroup === null) {
    // No results.
    const err = new Error("Supergrupo não encontrado.");
    err.status = 404;
    return next(err);
  }

  await spgroup.destroy();
  res.redirect('/supergroup');
});
