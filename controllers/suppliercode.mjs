import { seqlz } from '../db.mjs';
import Suppliercode from "../models/suppliercode.mjs";
import Supplier from "../models/supplier.mjs";
import Manufacturer from "../models/manufacturer.mjs";
import Component from '../models/component.mjs';
import Group from '../models/group.mjs';

import asyncHandler from "express-async-handler";

const controller = {};

// Display detail page for a specific Suppliercode.
controller.home = asyncHandler(async (req, res, next) => {
  // Get details of suppliercode and all associated pets (in parallel)
  const suppliercode = await Suppliercode.findOne({where: {id: req.params.id}});

  if (suppliercode === null) {
    // No results.
    const err = new Error("Código de fornecedor não encontrado.");
    err.status = 404;
    return next(err);
  }

  const component = await Component.findOne({where: {id: suppliercode.component_id}});
  const group = await Group.findOne({where: {id: component.group_id}});

  const [suppliers, manufacturers] = await Promise.all([
    Supplier.findAll({order: seqlz.col('name')}),
    Manufacturer.findAll({order: seqlz.col('name')}),
  ]);

  res.render("suppliercode_home", {
    suppliercode,
    component,
    group,
    suppliers,
    manufacturers,
  });
});

// update data for a specific Suppliercode.
controller.update = asyncHandler(async (req, res, next) => {
  // Get details of suppliercode and all associated pets (in parallel)
  const suppliercode = await Suppliercode.findOne({where: {id: req.params.id}});
  if (suppliercode === null) {
    // No results.
    const err = new Error("Entrada de código de compra não encontrada.");
    err.status = 404;
    return next(err);
  }

  await Suppliercode.update({
    manufact_pn: req.body.manufact,
    code: req.body.code,
    supplier_id: req.body.supplier,
    manufact_id: req.body.manufact,
  }, {where: {id: req.params.id}});

  res.redirect("/component/"+suppliercode.component_id);
});

// Display Suppliercode create form on GET
controller.create = asyncHandler(async (req, res, next) => {
    const suppliercode = new Suppliercode({
      manufact_pn: req.body.partnumber,
      component_id: req.params.id,
    });

    await suppliercode.save();

    res.redirect("/suppliercode/"+suppliercode.id);
});

// Display Suppliercode create form on GET
controller.delete = asyncHandler(async (req, res, next) => {
  const sc = await Suppliercode.findOne({where: {id: req.params.id}});
  const component_id = sc.component_id;
  await sc.destroy();
  res.redirect("/component/"+component_id);
});

export default controller;
