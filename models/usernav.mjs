import { seqlz } from "../db.mjs";
import { Sequelize } from "sequelize";

const UserNav = seqlz.define("usernav", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
    group_id: { type: Sequelize.INTEGER, defaulValue: 0 },
    location_id: { type: Sequelize.INTEGER, defaulValue: 0 },
},
                           {
                               timestamps: false,
                               raw: true
                           });

export default UserNav;
