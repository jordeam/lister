import { seqlz } from '../db.mjs';
import { QueryTypes} from 'sequelize';
import Location from "../models/location.mjs";
import asyncHandler from "express-async-handler";

const controller = {};

// List all locations
controller.list = asyncHandler(async (req, res, next) => {
  const allLocations = await Location.findAll({order: seqlz.col('name')});
  res.render("location_list", {
    user: req.user,
    allLocations,
  });
});

// List all components of a location
controller.home = asyncHandler(async (req, res, next) => {
  // Get details of supergroup and all associated pets (in parallel)
  const [entries, loc] =
        await Promise.all(
            [seqlz.query("select location_entry.id, components.name as cname,groups.name as gname,component_id,quant,quant_unit,box,labels from location_entry, components, groups where component_id = components.id and group_id = groups.id and location_id=? order by groups.name, components.name",
                             { replacements: [req.params.id],
                               type: QueryTypes.SELECT }),
             Location.findOne({where: {id: req.params.id}})]);
  if (loc === null) {
    // No results.
    const err = new Error("Localização não encontrada");
    err.status = 404;
    return next(err);
  }

  res.render("location_home", {
    user: req.user,
    location: loc,
    entries,
  });
});

// List all components of a location
controller.update = asyncHandler(async (req, res, next) => {
    const loc = await Location.findOne({ where: {id: req.params.id}});

    if (loc === null) {
        // No results.
        const err = new Error("Localização não encontrada");
        err.status = 404;
        return next(err);
    }

    loc.name = req.body.name;
    loc.quant = req.body.quant;
    loc.note = req.body.note;

    await loc.save();

    res.redirect(loc.url);
});

// List all components of a location
controller.create = asyncHandler(async (req, res, next) => {
    const loc = await Location.create({name: req.body.locname});

    res.redirect(loc.url);
});

controller.delete = asyncHandler(async (req, res, next) => {
    const location = await Location.findOne({where: {id: req.params.id}});

    if (location === null) {
        // No results.
        const err = new Error("Localização não encontrada.");
        err.status = 404;
        return next(err);
    }

    await location.destroy();
    res.redirect('/location/');
});

export default controller;
