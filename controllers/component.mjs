import { seqlz } from '../db.mjs';
import {QueryTypes, Op} from 'sequelize';
import Location from "../models/location.mjs";
import Case from '../models/case.mjs';
import Group from '../models/group.mjs';
import Component from "../models/component.mjs";
import LocationEntry from '../models/locationentry.mjs';

import asyncHandler from "express-async-handler";

const controller = {};

// Show component data
controller.home = asyncHandler(async (req, res, next) => {
  // Get details of supergroup and all associated pets (in parallel)
  const comp = await Component.findOne({ where: { id: req.params.id } });

  if (comp === null) {
    // No results.
    const err = new Error("Componente não encontrado.");
    err.status = 404;
    return next(err);
  }

  const [group, ccase] =
    await Promise.all([Group.findOne({ where: { id: comp.group_id } }),
    Case.findOne({ where: { id: comp.case_id } }),
    ]);

  const suppliercodes = await seqlz.query("select sc.id, s.name as s_name, code, rounding, active, manufact_pn, m.name as m_name from suppliercodes as sc, suppliers as s, manufacturers as m where supplier_id = s.id and manufact_id=m.id and component_id = $1",
    {
      bind: [comp.id],
      type: QueryTypes.SELECT
    });

  const locations = await seqlz.query("select lo.id, lo.name, le.box from location_entry as le, locations as lo where location_id = lo.id and component_id = $1",
    {
      bind: [comp.id],
      type: QueryTypes.SELECT,
    }); // await Location.findAll({ where: { id: { [Op.in]: locList } } });
  const allLocations = await Location.findAll({ order: [['name']] });

  res.render("component_home", {
    user: req.user,
    component: comp,
    group,
    ccase,
    locations,
    allLocations,
    suppliercodes,
  });
});

controller.update = asyncHandler(async (req, res, next) => {
    console.log("Aqui!");
    console.log(`id=${req.params.id}`);
    console.log(`name=${req.body.name}`);

    await Component.update({name: req.body.name}, {where: {id: req.params.id}});

    res.redirect('/component/'+req.params.id.toString());
});

// Paramameters:
// :id is the id of group
controller.select = asyncHandler(async (req, res, next) => {
    const allComponents = await Component.findAll({where: {group_id: req.params.id}, order: [['name']]});

    res.render('component_select', {
      user: req.user,
      components: allComponents
    });
});

// Paramameters:
// id: is the id of group
controller.create = asyncHandler(async (req, res, next) => {
    const component = await Component.create({group_id: req.params.id, name: req.body.name, case_id: 0});
    res.redirect('/component/'+component.id);
});

// Paramameters:
// id: is the id of component
controller.delete = asyncHandler(async (req, res, next) => {
    const comp = await Component.findOne({where: {id: req.params.id}});
    const group_id = comp.group_id;
    // must destroy all location entries
    await LocationEntry.destroy({where: {component_id: comp.id}});
    await comp.destroy();
    res.redirect('/group/'+group_id.toString());
});

export default controller;
