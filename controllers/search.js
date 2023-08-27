const { seqlz } = require('../db');
const { QueryTypes} = require('sequelize');
const Component = require("../models/component");
const asyncHandler = require("express-async-handler");


// List all components of a location
exports.get = asyncHandler(async (req, res, next) => {
  res.render("search_home");
});

exports.post = asyncHandler(async (req, res, next) => {
  const components = await seqlz.query("SELECT c.id, c.name, g.name AS g_name FROM components AS c, groups AS g WHERE g.id = c.group_id AND c.name ~ $1",
                                    {
                                      bind: [req.body.expr],
                                      type: QueryTypes.SELECT,
                                    });

  const clocs = [];
  for (i in components) {
    const cloc = await seqlz.query("SELECT l.id,l.name,le.box,le.quant,le.id FROM locations as l, location_entry as le WHERE l.id = le.location_id AND le.component_id = $1 ORDER BY l.name",
                                {
                                  bind: [req.body.expr],
                                  type: QueryTypes.SELECT,
                                });
    clocs.push(cloc);
  }

  const partnumbers = await seqlz.query("select c.id, c.name, g.name as g_name, sc.manufact_pn, sc.code, s.name as s_name, m.name as m_name from suppliercodes as sc, components as c, groups as g, suppliers as s, manufacturers as m where manufact_id = m.id and supplier_id = s.id and component_id = c.id and group_id = g.id and (manufact_pn ~ $1 or code ~ $1)",
                                    {
                                      bind: [req.body.expr],
                                      type: QueryTypes.SELECT,
                                    });
  res.render("search_home", {
    expr: req.body.expr,
    components,
    clocs,
    partnumbers,
  });
});
