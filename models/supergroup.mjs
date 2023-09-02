import { seqlz } from "../db.mjs";
import { DataTypes } from "sequelize";

const SuperGroup = seqlz.define("supergroup", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true},
    name: {type: DataTypes.TEXT, allowNull: false},
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return '/supergroup/'+this.id;
    }
  }
},
                             {
                               timestamps: false,
                               raw: true
                             });

export default SuperGroup;
