const { seqlz } = require("../db");
const { DataTypes } = require("sequelize");

const Location = seqlz.define("location", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
    name: { type: DataTypes.TEXT, allowNull: false, defaultValue: ''},
    note: { type: DataTypes.TEXT, allowNull: false, defaultValue: ''},
    nbox: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    quant: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    url: {
        type: DataTypes.VIRTUAL,
        get() {
            return '/location/'+this.id.toString();
        }
    }
},
                           {
                               timestamps: false,
                               raw: true
                           });

module.exports = Location;
