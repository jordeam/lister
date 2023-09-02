import { seqlz } from "../db.mjs";
import { DataTypes } from "sequelize";

const Supplier = seqlz.define("supplier", {
  id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true},
  name: {type: DataTypes.TEXT, defaultValue: '', allowNull: false},
  legalname: { type: DataTypes.TEXT, defaultValue: ''},
  federal_code: { type: DataTypes.TEXT, defaultValue: ''},
  state_code: { type: DataTypes.TEXT, defaultValue: ''},
  city_code: { type: DataTypes.TEXT, defaultValue: ''},
  phone: { type: DataTypes.TEXT, defaultValue: ''},
  fax: { type: DataTypes.TEXT, defaultValue: ''},
  url: {
    type: DataTypes.VIRTUAL,
    get() {
      return '/supplier/' + this.id;
    }
  }
},
                           {
                             timestamps: false,
                             raw: true
                           });

export default Supplier;
