import { seqlz } from '../db.mjs';
import { QueryTypes } from 'sequelize';
import Location from "../models/location.mjs";
import LocationEntry from "../models/locationentry.mjs";
import Component from "../models/component.mjs";
import Case from "../models/case.mjs";
import asyncHandler from "express-async-handler";
import Group from '../models/group.mjs';
import SuperGroup from '../models/supergroup.mjs';

const controller = {};

// Edit a location entry
// need to pass locationentry, component, and location
controller.home = asyncHandler(async (req, res, next) => {
  const locationEntry = await LocationEntry.findOne({ where: { id: req.params.id } });

  if (locationEntry === null) {
    // No results.
    const err = new Error("Entrada na Localização não encontrada.");
    err.status = 404;
    return next(err);
  }

  const [component, location] =
    await Promise.all(
      [Component.findOne({ where: { id: locationEntry.component_id }}),
      Location.findOne({ where: { id: locationEntry.location_id } })]);

  const ccase = await Case.findOne({ where: { id: component.case_id }});
  const group = await Group.findOne({ where: { id: component.group_id }});

  const from_table = /table$/.test(req.originalUrl);

  res.render("locationentry_home", {
    user: req.user,
    locationentry: locationEntry,
    location,
    component,
    ccase,
    group,
    from_table,
  });
});

controller.update = asyncHandler(async (req, res, next) => {
  const locationEntry = await LocationEntry.findOne({ where: { id: req.params.id } });

  if (locationEntry === null) {
    // No results.
    const err = new Error("Entrada na Localização não encontrada.");
    err.status = 404;
    return next(err);
  }

  locationEntry.box = req.body.box;
  locationEntry.quant = req.body.quant;
  locationEntry.quant_unit = req.body.quant_unit;
  locationEntry.labels = req.body.labels;
  await locationEntry.save();

  const retURL = "/location/" + locationEntry.location_id + (/table$/.test(req.originalUrl) ? "/table" : "");
  res.redirect(retURL);
});

controller.delete = asyncHandler(async (req, res, next) => {
  const locationEntry = await LocationEntry.findOne({ where: { id: req.params.id } });

  if (locationEntry === null) {
    // No results.
    const err = new Error("Entrada na Localização não encontrada.");
    err.status = 404;
    return next(err);
  }

  const id = locationEntry.location_id;
  await locationEntry.destroy();
  res.redirect('/location/' + id.toString());
});

// Insert a new location_entry, i.e., a new component in a location
controller.choose = asyncHandler(async (req, res, next) => {
  const location = await Location.findOne({ where: { id: req.params.location_id } });
  const allSuperGroups = await SuperGroup.findAll({ order: [['name']] });
  const default_supergroup = 1;
  const allGroups = await Group.findAll({ where: { supergroup_id: default_supergroup }, order: [['name']] });
  const default_group = 6;

  const allComponents = await seqlz.query(
    "SELECT c.id, c.name, cs.name AS csname FROM components AS c, cases AS cs WHERE group_id = $1 AND cs.id = case_id ORDER BY c.name, cs.name",
    {
      bind: [default_group],
      type: QueryTypes.SELECT,
    }
  );

  res.render('locationentry_choose', {
    user: req.user,
    location,
    supergroups: allSuperGroups,
    groups: allGroups,
    default_supergroup,
    default_group,
    components: allComponents
  });
});

controller.insert = asyncHandler(async (req, res, next) => {
  const location_id = (undefined === req.body.location_id) ? req.params.id : req.body.location_id;
  const component_id = (undefined === req.body.component_id) ? req.params.id : req.body.component_id;

  const locationEntry = await LocationEntry.create({ location_id: location_id, component_id: component_id, quant: 0, quant_unit: 1, box: 1, labels: '' });
  res.redirect("/locationentry/" + locationEntry.id.toString());
});

export default controller;
