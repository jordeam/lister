const { seqlz, testDbConnection } = require("../db");
const { Sequelize } = require("sequelize");

const UserNav = seqlz.define("usernav", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
    group_id: { type: Sequelize.INTEGER, defaulValue: 0 },
    location_id: { type: Sequelize.INTEGER, defaulValue: 0 },
},
                           {
                               timestamps: false,
                               raw: true
                           });

module.exports = UserNav;
