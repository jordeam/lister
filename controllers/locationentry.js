const Location = require("../models/location");
const LocationEntry = require("../models/locationentry");
const Component = require("../models/component");
const asyncHandler = require("express-async-handler");
const Group = require('../models/group');
const SuperGroup = require('../models/supergroup');


// Edit a location entry
// need to pass locationentry, component, and location
exports.home = asyncHandler(async (req, res, next) => {
    const locationEntry = await LocationEntry.findOne({where: {id: req.params.id}});

    if (locationEntry === null) {
        // No results.
        const err = new Error("Entrada na Localização não encontrada.");
        err.status = 404;
        return next(err);
    }

    const [component, location] =
        await Promise.all(
            [Component.findOne({ where: { id: locationEntry.component_id } }),
             Location.findOne({ where: { id: locationEntry.location_id } })]);

    const group = await Group.findOne({where: {id: component.group_id}});
    res.render("locationentry_home", {
        locationentry: locationEntry,
        location,
        component,
        group,
    });
});

exports.update = asyncHandler(async (req, res, next) => {
    const locationEntry = await LocationEntry.findOne({where: {id: req.params.id}});

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

    res.redirect('/location/'+locationEntry.location_id.toString());
});

exports.delete = asyncHandler(async (req, res, next) => {
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


exports.choose = asyncHandler(async (req, res, next) => {
    const location = await Location.findOne({where: {id: req.params.location_id}});
    const allSuperGroups = await SuperGroup.findAll({order: [['name']]});
    const default_supergroup = 1;
    const allGroups = await Group.findAll({where: {supergroup_id: default_supergroup}, order: [['name']]});
    const default_group = 6;

    const allComponents = await Component.findAll({where: {group_id: default_group}, order: [['name']]});

    res.render('locationentry_choose', {
        location,
        supergroups: allSuperGroups,
        groups: allGroups,
        default_supergroup,
        default_group,
        components: allComponents
    });
});

exports.insert = asyncHandler(async (req, res, next) => {
    const location_id = (undefined === req.body.location_id) ? req.params.id : req.body.location_id;
    const component_id = (undefined === req.body.component_id) ? req.params.id : req.body.component_id;

    const locationEntry = await LocationEntry.create({location_id: location_id, component_id: component_id, quant: 0, quant_unit: 1, box: 1, labels: ''});
    res.redirect("/locationentry/"+locationEntry.id.toString());
});

