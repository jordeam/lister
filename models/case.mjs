import { seqlz } from "../db.js";
import { DataTypes } from "sequelize";

const Case = seqlz.define("case", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true },
  name: { type: DataTypes.TEXT, allowNull: false },
  descr: { type: DataTypes.TEXT, defaultValue: '' },
  url: {
        type: DataTypes.VIRTUAL,
        get() {
            return '/case/'+this.id;
        }
    }
},
  {
    timestamps: false,
    raw: true
  });

export default Case;
