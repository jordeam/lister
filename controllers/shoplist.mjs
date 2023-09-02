import { seqlz } from '../db.mjs';
import { QueryTypes} from 'sequelize';
import asyncHandler from "express-async-handler";

const controller = {};

// Edit a location entry
// need to pass locationentry, component, and location
controller.home = asyncHandler(async (req, res, next) => {
    const shoplist = await seqlz.query("select c.name as cname, g.name as gname, sum(l.quant * le.quant_unit - le.quant) as in_stock from locations as l, groups as g, components as c, location_entry as le where g.id = c.group_id and l.id = le.location_id and l.quant > 0 and c.id = le.component_id group by c.id, c.name, g.name order by gname, cname",
                                    {
                                        type: QueryTypes.SELECT
                                    });
    res.render('shoplist_home',
               {
                   shoplist: shoplist
               });
});

export default controller;
