import { seqlz } from '../db.js';
import Supplier from "../models/supplier.js";

import asyncHandler from "express-async-handler";
// const { param } = require('../app');

const controller = {};

// Display list of all Supplier.
controller.list = asyncHandler(async (req, res, next) => {
    const allSuppliers = await Supplier.findAll({attributes: ['id', 'name'], order: seqlz.col('name')});
    res.render("supplier_list", {
        suppliers_list: allSuppliers,
    });
});

// Display detail page for a specific Supplier.
controller.home = asyncHandler(async (req, res, next) => {
  // Get details of supplier and all associated pets (in parallel)
  const supplier = await Supplier.findOne({where: {id: req.params.id}});
  if (supplier === null) {
    // No results.
    const err = new Error("Fornecedor não encontrado.");
    err.status = 404;
    return next(err);
  }

  res.render("supplier_home", {
    supplier,
  });
});

// update data for a specific Supplier.
controller.update = asyncHandler(async (req, res, next) => {
  // Get details of supplier and all associated pets (in parallel)
  const supplier = await Supplier.findOne({where: {id: req.params.id}});
  if (supplier === null) {
    // No results.
    const err = new Error("Fornecedor não encontrado.");
    err.status = 404;
    return next(err);
  }

  await Supplier.update({
    name: req.body.name,
    legalname:req.body.legalname,
    federal_code: req.body.federal_code,
    state_code: req.body.state_code,
    city_code: req.body.city_code,
    phone: req.body.phone,
    fax: req.body.fax
  }, {where: {id: req.params.id}});

  res.redirect("/supplier/");
});

// Display Supplier create form on GET
controller.create = asyncHandler(async (req, res, next) => {
    const supplier = new Supplier({
      name: req.body.name,
    });

    await supplier.save();

    res.redirect("/supplier/"+supplier.id.toString());
});

// Display Supplier create form on GET
controller.delete = asyncHandler(async (req, res, next) => {
  await Supplier.destroy({ where: { id: req.params.id }});
  res.redirect("/supplier/");
});

export default controller;
