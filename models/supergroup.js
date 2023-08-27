const { seqlz } = require("../db");
const { DataTypes } = require("sequelize");

const SuperGroup = seqlz.define("supergroup", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true},
    name: {type: DataTypes.TEXT, allowNull: false},
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return '/supergroup/'+this.id.toString();
    }
  }
},
                             {
                               timestamps: false,
                               raw: true
                             });

module.exports = SuperGroup;
