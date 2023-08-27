const { seqlz, testDbConnection } = require("../db");
const { DataTypes } = require("sequelize");

const Group = seqlz.define("group", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
  name: { type: DataTypes.TEXT, allowNull: false },
  supergroup_id: { type: DataTypes.INTEGER, allowNull: true, defaulValue: 0 },
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return '/group/'+this.id.toString();
    }
  }
},
                        {
                          timestamps: false,
                          raw: true
                        });

module.exports = Group;
