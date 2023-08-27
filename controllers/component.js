const { seqlz } = require('../db');
const {QueryTypes, Op} = require('sequelize');
const Location = require("../models/location");
const Case = require('../models/case');
const Group = require('../models/group');
const Component = require("../models/component");
const LocationEntry = require('../models/locationentry');

const asyncHandler = require("express-async-handler");

// Show component data
exports.home = asyncHandler(async (req, res, next) => {
  // Get details of supergroup and all associated pets (in parallel)
  comp = await Component.findOne({ where: { id: req.params.id } });

  if (comp === null) {
    // No results.
    const err = new Error("Componente não encontrado.");
    err.status = 404;
    return next(err);
  }

  const [group, ccase, locEntries] =
    await Promise.all([Group.findOne({ where: { id: comp.group_id } }),
    Case.findOne({ where: { id: comp.case_id } }),
    LocationEntry.findAll({ where: { component_id: comp.id } })
    ]);

  const suppliercodes = await seqlz.query("select sc.id, s.name as s_name, code, rounding, active, manufact_pn, m.name as m_name from suppliercodes as sc, suppliers as s, manufacturers as m where supplier_id = s.id and manufact_id=m.id and component_id = $1",
    {
      bind: [comp.id],
      type: QueryTypes.SELECT
    });

  let locList = [];
  for (let le of locEntries) {
    locList.push(le.location_id);
  }

  const locations = await Location.findAll({ where: { id: { [Op.in]: locList } } });
  const allLocations = await Location.findAll({ order: [['name']] });

  res.render("component_home", {
    component: comp,
    group,
    ccase,
    locEntries,
    locations,
    allLocations,
    suppliercodes,
  });
});

exports.update = asyncHandler(async (req, res, next) => {
    console.log("Aqui!");
    console.log(`id=${req.params.id}`);
    console.log(`name=${req.body.name}`);

    await Component.update({name: req.body.name}, {where: {id: req.params.id}});

    res.redirect('/component/'+req.params.id.toString());
});

// Paramameters:
// :id is the id of group
exports.select = asyncHandler(async (req, res, next) => {
    const allComponents = await Component.findAll({where: {group_id: req.params.id}, order: [['name']]});

    res.render('component_select', {
        components: allComponents
    });
});

// Paramameters:
// id: is the id of group
exports.create = asyncHandler(async (req, res, next) => {
    const component = await Component.create({group_id: req.params.id, name: req.body.name, case_id: 0});
    res.redirect('/component/'+component.id);
});

// Paramameters:
// id: is the id of component
exports.delete = asyncHandler(async (req, res, next) => {
    const comp = await Component.findOne({where: {id: req.params.id}});
    const group_id = comp.group_id;
    // must destroy all location entries
    await LocationEntry.destroy({where: {component_id: comp.id}});
    await comp.destroy();
    res.redirect('/group/'+group_id.toString());
});
