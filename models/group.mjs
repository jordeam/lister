import { seqlz } from "../db.mjs";
import { DataTypes } from "sequelize";

const Group = seqlz.define("group", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
  name: { type: DataTypes.TEXT, allowNull: false },
  supergroup_id: { type: DataTypes.INTEGER, allowNull: true, defaulValue: 0 },
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return '/group/'+this.id;
    }
  }
},
                        {
                          timestamps: false,
                          raw: true
                        });

export default Group;
