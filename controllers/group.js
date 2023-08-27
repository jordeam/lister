const Group = require("../models/group");
const SuperGroup = require("../models/supergroup");
const Component = require("../models/component");
const asyncHandler = require("express-async-handler");

// List components of a specific group
exports.home = asyncHandler(async (req, res, next) => {
    // Get details of supergroup and all associated pets (in parallel)
    const [allComponents, group] = await Promise.all([Component.findAll({where: {group_id: req.params.id}, order:[['name']]}), Group.findOne({where: { id: req.params.id}})]);

    if (group === null) {
        // No results.
        const err = new Error("Grupo não encontrado.");
        err.status = 404;
        return next(err);
    }

    const superGroup = await SuperGroup.findOne({where: {id: group.supergroup_id}});

    res.render("group_home", {
        group,
        supergroup: superGroup,
        allComponents,
    });
});

// Paramameters:
// id: is the id of supergroup
exports.select = asyncHandler(async (req, res, next) => {
    const allGroups = await Group.findAll({where: {supergroup_id: req.params.id}, order: [['name']]});

    res.render('group_select', {
        groups: allGroups
    });
});

// Create a new group with supergroup :id parameter
exports.create = asyncHandler(async (req, res, next) => {
  const grp = await Group.create({name: req.body.name, supergroup_id: req.params.id});

  return res.redirect(grp.url);
});

exports.delete = asyncHandler(async (req, res, next) => {
  const group = await Group.findOne({ where: { id: req.params.id } });

  if (group === null) {
    // No results.
    const err = new Error("Grupo não encontrado.");
    err.status = 404;
    return next(err);
  }

  const supergroup_id = group.supergroup_id;
  await group.destroy();
  res.redirect('/supergroup/'+supergroup_id);
});
