const { seqlz, testDbConnection } = require("../db");
const { DataTypes } = require("sequelize");

const Component = seqlz.define("component", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
  name: { type: DataTypes.TEXT, allowNull: false },
  group_id: { type: DataTypes.INTEGER, defaultValue: 0 },
  case_id: { type: DataTypes.INTEGER, defaultValue: 0 }
  ,
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return '/component/' + this.id.toString();
    }
  }
},
  {
    timestamps: false,
    raw: true
  });

module.exports = Component;
